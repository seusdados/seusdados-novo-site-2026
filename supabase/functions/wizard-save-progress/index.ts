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
            session_id, 
            step_id,
            response,
            score,
            user_data,
            progress,
            completed
        } = requestData;

        // Validate required fields
        if (!session_id) {
            throw new Error('Session ID is required');
        }

        // Access environment variables
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');

        if (!serviceRoleKey || !supabaseUrl) {
            throw new Error('Supabase configuration missing');
        }

        console.log('Saving wizard progress:', { session_id, step_id });

        // Prepare response data - adapting to existing table structure
        const responseData = {
            session_id,
            user_data: user_data || {},
            responses: response ? { [step_id || 'current']: response } : {},
            progress: progress || 0,
            score: score || 0,
            completed: completed || false
        };

        // First try to update existing record
        const updateResponse = await fetch(`${supabaseUrl}/rest/v1/questionnaire_responses?session_id=eq.${session_id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(responseData)
        });

        let result;
        
        if (updateResponse.ok) {
            const updated = await updateResponse.json();
            if (updated && updated.length > 0) {
                result = updated[0];
                console.log('Wizard progress updated:', session_id);
            } else {
                // No existing record found, insert new one
                const insertResponse = await fetch(`${supabaseUrl}/rest/v1/questionnaire_responses`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${serviceRoleKey}`,
                        'apikey': serviceRoleKey,
                        'Content-Type': 'application/json',
                        'Prefer': 'return=representation'
                    },
                    body: JSON.stringify(responseData)
                });

                if (!insertResponse.ok) {
                    const errorText = await insertResponse.text();
                    console.error('Database insert failed:', errorText);
                    throw new Error(`Database insert failed: ${errorText}`);
                }

                const inserted = await insertResponse.json();
                result = inserted[0];
                console.log('Wizard progress inserted:', session_id);
            }
        } else {
            const errorText = await updateResponse.text();
            console.error('Database update failed:', errorText);
            throw new Error(`Database update failed: ${errorText}`);
        }

        return new Response(JSON.stringify({
            data: {
                session_id: session_id,
                step_id: step_id,
                status: 'saved',
                score: score || 0,
                progress: progress || 0
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Wizard save progress error:', error);

        const errorResponse = {
            error: {
                code: 'WIZARD_SAVE_FAILED',
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