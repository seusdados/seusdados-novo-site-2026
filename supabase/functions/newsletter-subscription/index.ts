Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Credentials': 'false'
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
        const { 
            email, 
            name,
            utm_source,
            utm_medium,
            utm_campaign
        } = await req.json();

        // Validação do email obrigatório
        if (!email) {
            throw new Error('Email é obrigatório');
        }

        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Email inválido');
        }

        // Obter credenciais do Supabase
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');

        if (!serviceRoleKey || !supabaseUrl) {
            throw new Error('Configuração do Supabase não encontrada');
        }

        // Verificar se email já existe
        const checkResponse = await fetch(`${supabaseUrl}/rest/v1/newsletter_subscribers?email=eq.${encodeURIComponent(email.toLowerCase().trim())}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json'
            }
        });

        if (!checkResponse.ok) {
            throw new Error('Erro ao verificar assinatura existente');
        }

        const existingSubscribers = await checkResponse.json();
        
        if (existingSubscribers && existingSubscribers.length > 0) {
            // Email já existe - reativar se estiver inativo
            const existingSubscriber = existingSubscribers[0];
            if (existingSubscriber.status === 'unsubscribed') {
                // Reativar assinatura
                const updateResponse = await fetch(`${supabaseUrl}/rest/v1/newsletter_subscribers?id=eq.${existingSubscriber.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${serviceRoleKey}`,
                        'apikey': serviceRoleKey,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        status: 'active',
                        subscribed_at: new Date().toISOString(),
                        unsubscribed_at: null
                    })
                });

                if (!updateResponse.ok) {
                    throw new Error('Erro ao reativar assinatura');
                }

                return new Response(JSON.stringify({
                    data: {
                        message: 'Assinatura reativada com sucesso!',
                        status: 'reactivated'
                    }
                }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            } else {
                return new Response(JSON.stringify({
                    data: {
                        message: 'Email já está inscrito na newsletter',
                        status: 'already_subscribed'
                    }
                }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        // Preparar dados da assinatura
        const subscriptionData = {
            email: email.toLowerCase().trim(),
            name: name ? name.trim() : null,
            status: 'active',
            subscribed_at: new Date().toISOString(),
            utm_source: utm_source || null,
            utm_medium: utm_medium || null,
            utm_campaign: utm_campaign || null
        };

        console.log('Inserindo assinatura:', subscriptionData);

        // Inserir nova assinatura
        const subscriptionResponse = await fetch(`${supabaseUrl}/rest/v1/newsletter_subscribers`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(subscriptionData)
        });

        if (!subscriptionResponse.ok) {
            const errorText = await subscriptionResponse.text();
            console.error('Erro ao inserir assinatura:', errorText);
            throw new Error(`Falha ao salvar assinatura: ${errorText}`);
        }

        const subscriptionResult = await subscriptionResponse.json();
        const subscriptionId = subscriptionResult[0].id;

        console.log('Assinatura salva com sucesso:', subscriptionId);

        // Resposta de sucesso
        const result = {
            data: {
                subscriptionId: subscriptionId,
                message: 'Inscrição na newsletter realizada com sucesso!',
                status: 'subscribed'
            }
        };

        return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Erro na inscrição da newsletter:', error);

        const errorResponse = {
            error: {
                code: 'NEWSLETTER_SUBSCRIPTION_FAILED',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});