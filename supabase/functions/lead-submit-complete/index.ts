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
        // Extract data from request body
        const requestData = await req.json();
        const { 
            person, 
            company, 
            interest, 
            score, 
            consents, 
            utm,
            page,
            formType,
            wizardData
        } = requestData;

        // Validate required fields
        if (!person?.name || !person?.email) {
            throw new Error('Nome e email são obrigatórios');
        }

        if (!consents?.privacy) {
            throw new Error('Consentimento de privacidade é obrigatório');
        }

        // Access environment variables
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');

        if (!serviceRoleKey || !supabaseUrl) {
            throw new Error('Supabase configuration missing');
        }

        // Prepare lead data
        const leadData = {
            // Person info
            name: person.name,
            email: person.email,
            phone: person.phone || null,
            
            // Company info
            company_name: company?.name || null,
            cnpj: company?.cnpj || null,
            
            // Interest and solution
            interest_solution: interest?.solution || 'implementacao',
            
            // Scoring data
            score_total: score?.total || 0,
            score_maturity: score?.maturity || 0,
            score_fit: score?.fit || 0,
            score_intent: score?.intent || 0,
            
            // Consents
            consent_privacy: consents.privacy,
            consent_marketing: consents.marketing || false,
            
            // UTM and tracking
            utm_source: utm?.source || null,
            utm_medium: utm?.medium || null,
            utm_campaign: utm?.campaign || null,
            utm_term: utm?.term || null,
            utm_content: utm?.content || null,
            
            // Form and page info
            form_type: formType || 'contact',
            source_page: page || req.headers.get('referer') || null,
            
            // Wizard specific data
            wizard_session_id: wizardData?.sessionId || null,
            wizard_responses: wizardData?.responses || null,
            
            // Timestamps
            created_at: new Date().toISOString()
        };

        console.log('Submitting lead:', person.email, interest?.solution);

        // Insert lead into database
        const insertResponse = await fetch(`${supabaseUrl}/rest/v1/leads`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(leadData)
        });

        if (!insertResponse.ok) {
            const errorText = await insertResponse.text();
            console.error('Lead submission failed:', errorText);
            throw new Error(`Erro ao salvar lead: ${errorText}`);
        }

        const savedLead = await insertResponse.json();
        console.log('Lead saved successfully:', savedLead[0]?.id);

        // Log event for analytics
        const eventData = {
            event_name: 'lead_submitted',
            event_data: {
                lead_id: savedLead[0]?.id,
                solution: interest?.solution,
                form_type: formType,
                has_score: score?.total > 0,
                utm_source: utm?.source
            },
            created_at: new Date().toISOString()
        };

        // Insert event (non-blocking)
        fetch(`${supabaseUrl}/rest/v1/lead_events`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        }).catch(err => console.warn('Event logging failed:', err));

        return new Response(JSON.stringify({
            data: {
                success: true,
                leadId: savedLead[0]?.id,
                message: 'Lead enviado com sucesso!'
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Lead submission error:', error);

        const errorResponse = {
            error: {
                code: 'LEAD_SUBMISSION_FAILED',
                message: error.message,
                timestamp: new Date().toISOString()
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});