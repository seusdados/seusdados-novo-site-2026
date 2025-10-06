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
            message,
            subject,
            priority
        } = await req.json();

        // Validação dos campos obrigatórios
        if (!name || !email || !message) {
            throw new Error('Nome, email e mensagem são obrigatórios');
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

        // Preparar dados da submissão de contato
        const contactData = {
            name: name.trim(),
            email: email.toLowerCase().trim(),
            phone: phone ? phone.trim() : null,
            company: company ? company.trim() : null,
            message: message.trim(),
            subject: subject ? subject.trim() : 'Contato pelo site',
            priority: priority || 'normal',
            status: 'new',
            created_at: new Date().toISOString()
        };

        console.log('Inserindo submissão de contato:', contactData);

        // Inserir submissão no banco de dados
        const contactResponse = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(contactData)
        });

        if (!contactResponse.ok) {
            const errorText = await contactResponse.text();
            console.error('Erro ao inserir submissão de contato:', errorText);
            throw new Error(`Falha ao salvar mensagem: ${errorText}`);
        }

        const contactResult = await contactResponse.json();
        const contactId = contactResult[0].id;

        console.log('Submissão de contato salva com sucesso:', contactId);

        // Resposta de sucesso
        const result = {
            data: {
                contactId: contactId,
                message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
                status: 'success'
            }
        };

        return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Erro na submissão de contato:', error);

        const errorResponse = {
            error: {
                code: 'CONTACT_SUBMISSION_FAILED',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});