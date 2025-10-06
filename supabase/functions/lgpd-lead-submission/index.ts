import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

interface LeadData {
  nome: string;
  email: string;
  empresa?: string;
  telefone?: string;
  tipo_interesse: string;
  mensagem?: string;
  origem?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

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
    // Validate request method
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: { code: 'METHOD_NOT_ALLOWED', message: 'Only POST method is allowed' } }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request data
    const leadData: LeadData = await req.json();
    console.log('Received lead data:', leadData);

    // Validate required fields
    if (!leadData.nome || !leadData.email || !leadData.tipo_interesse) {
      return new Response(
        JSON.stringify({ 
          error: { 
            code: 'VALIDATION_ERROR', 
            message: 'Campos obrigatórios: nome, email, tipo_interesse' 
          } 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadData.email)) {
      return new Response(
        JSON.stringify({ 
          error: { 
            code: 'INVALID_EMAIL', 
            message: 'Formato de email inválido' 
          } 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    console.log('Supabase URL:', supabaseUrl);
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Prepare data for insertion (simplified)
    const insertData = {
      nome: leadData.nome.trim(),
      email: leadData.email.toLowerCase().trim(),
      empresa: leadData.empresa?.trim() || null,
      telefone: leadData.telefone?.trim() || null,
      tipo_interesse: leadData.tipo_interesse,
      mensagem: leadData.mensagem?.trim() || null,
      origem: leadData.origem || 'implementacao_lgpd',
      ip_address: '127.0.0.1', // Fixed IP for testing
      user_agent: req.headers.get('user-agent') || 'unknown',
      utm_source: leadData.utm_source || null,
      utm_medium: leadData.utm_medium || null,
      utm_campaign: leadData.utm_campaign || null
    };

    console.log('Insert data:', insertData);

    // Insert lead into database
    const { data, error } = await supabase
      .from('lgpd_leads')
      .insert([insertData])
      .select('id, nome, email, created_at')
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ 
          error: { 
            code: 'DATABASE_ERROR', 
            message: 'Erro ao salvar lead no banco de dados',
            details: error.message
          } 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Lead created successfully:', data);

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true,
        data: {
          id: data.id,
          nome: data.nome,
          email: data.email,
          created_at: data.created_at,
          message: 'Lead capturado com sucesso!'
        }
      }),
      { 
        status: 201, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Function error:', error);
    
    // Return error response
    const errorResponse = {
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Erro interno do servidor',
        details: error.message
      }
    };

    return new Response(
      JSON.stringify(errorResponse),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});