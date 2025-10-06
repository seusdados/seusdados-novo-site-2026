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
            utm, 
            consents, 
            page 
        } = requestData;

        // Validate required fields
        if (!person?.name || !person?.email) {
            throw new Error('Name and email are required');
        }

        if (!interest?.solution) {
            throw new Error('Interest solution is required');
        }

        // Valid solutions check
        const validSolutions = ['implementacao', 'dpo', 'treinamento', 'auditoria', 'governanca'];
        if (!validSolutions.includes(interest.solution)) {
            throw new Error('Invalid solution type');
        }

        // Privacy consent is required
        if (!consents?.privacy) {
            throw new Error('Privacy consent is required');
        }

        // Access environment variables
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');

        if (!serviceRoleKey || !supabaseUrl) {
            throw new Error('Supabase configuration missing');
        }

        // Generate unique lead ID
        const leadId = crypto.randomUUID();
        const timestamp = new Date().toISOString();

        // Prepare lead data
        const leadData = {
            lead_id: leadId,
            timestamp: timestamp,
            person_name: person.name,
            person_email: person.email,
            person_phone: person.phone || null,
            company_name: company?.name || null,
            company_cnpj: company?.cnpj || null,
            interest_solution: interest.solution,
            consent_privacy: consents.privacy,
            consent_marketing: consents.marketing || false,
            utm_source: utm?.source || null,
            utm_medium: utm?.medium || null,
            utm_campaign: utm?.campaign || null,
            utm_term: utm?.term || null,
            utm_content: utm?.content || null,
            page: page || null,
            score_maturity: score?.maturity || null,
            score_fit: score?.fit || null,
            score_intent: score?.intent || null,
            score_total: score?.total || null
        };

        console.log('Inserting lead data:', leadId);

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
            console.error('Database insert failed:', errorText);
            throw new Error(`Database insert failed: ${errorText}`);
        }

        const insertedLead = await insertResponse.json();
        console.log('Lead inserted successfully:', leadId);

        // Return success response
        const result = {
            data: {
                leadId: leadId,
                timestamp: timestamp,
                status: 'submitted',
                message: 'Lead captured successfully'
            }
        };

        return new Response(JSON.stringify(result), {
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