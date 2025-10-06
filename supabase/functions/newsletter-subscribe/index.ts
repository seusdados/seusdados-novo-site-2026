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
        const { email, name, utm } = requestData;

        // Validate required fields
        if (!email) {
            throw new Error('Email is required');
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }

        // Access environment variables
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');

        if (!serviceRoleKey || !supabaseUrl) {
            throw new Error('Supabase configuration missing');
        }

        // Prepare subscription data
        const subscriptionData = {
            email: email.toLowerCase(),
            name: name || null,
            utm_source: utm?.source || null,
            utm_medium: utm?.medium || null,
            utm_campaign: utm?.campaign || null,
            is_active: true
        };

        console.log('Newsletter subscription for:', email);

        // Insert subscription into database (upsert to handle duplicates)
        const insertResponse = await fetch(`${supabaseUrl}/rest/v1/newsletter_subscriptions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation,resolution=merge-duplicates'
            },
            body: JSON.stringify(subscriptionData)
        });

        if (!insertResponse.ok) {
            const errorText = await insertResponse.text();
            
            // Check if it's a duplicate email error
            if (errorText.includes('duplicate') || errorText.includes('unique')) {
                console.log('Email already subscribed:', email);
                
                // Return success anyway for UX (don't reveal if email exists)
                const result = {
                    data: {
                        email: email,
                        status: 'subscribed',
                        message: 'Successfully subscribed to newsletter'
                    }
                };

                return new Response(JSON.stringify(result), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }

            console.error('Database insert failed:', errorText);
            throw new Error(`Newsletter subscription failed: ${errorText}`);
        }

        const insertedSubscription = await insertResponse.json();
        console.log('Newsletter subscription successful:', email);

        // Return success response
        const result = {
            data: {
                email: email,
                status: 'subscribed',
                message: 'Successfully subscribed to newsletter'
            }
        };

        return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Newsletter subscription error:', error);

        const errorResponse = {
            error: {
                code: 'NEWSLETTER_SUBSCRIPTION_FAILED',
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