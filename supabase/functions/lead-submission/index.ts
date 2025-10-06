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
            name, 
            email, 
            phone, 
            company, 
            cnpj, 
            segment, 
            interest,
            utm_source,
            utm_medium,
            utm_campaign,
            utm_content,
            utm_term
        } = await req.json();

        // Validação dos campos obrigatórios
        if (!name || !email || !company) {
            throw new Error('Nome, email e empresa são obrigatórios');
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

        // Preparar dados do lead
        const leadData = {
            name: name.trim(),
            email: email.toLowerCase().trim(),
            phone: phone ? phone.trim() : null,
            company: company.trim(),
            cnpj: cnpj ? cnpj.trim() : null,
            segment: segment || null,
            interest: interest || 'geral',
            utm_source: utm_source || null,
            utm_medium: utm_medium || null,
            utm_campaign: utm_campaign || null,
            utm_content: utm_content || null,
            utm_term: utm_term || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        console.log('Inserindo lead:', leadData);

        // Inserir lead no banco de dados
        const leadResponse = await fetch(`${supabaseUrl}/rest/v1/leads`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(leadData)
        });

        if (!leadResponse.ok) {
            const errorText = await leadResponse.text();
            console.error('Erro ao inserir lead:', errorText);
            throw new Error(`Falha ao salvar lead: ${errorText}`);
        }

        const leadResult = await leadResponse.json();
        const leadId = leadResult[0].id;

        console.log('Lead salvo com sucesso:', leadId);

        // Resposta de sucesso
        const result = {
            data: {
                leadId: leadId,
                message: 'Lead enviado com sucesso!',
                status: 'success'
            }
        };

        return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Erro na submissão do lead:', error);

        const errorResponse = {
            error: {
                code: 'LEAD_SUBMISSION_FAILED',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});