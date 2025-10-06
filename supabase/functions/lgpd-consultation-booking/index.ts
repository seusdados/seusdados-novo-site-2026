import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

interface ConsultationData {
  nome: string;
  email: string;
  empresa?: string;
  telefone?: string;
  data_preferida?: string;
  hora_preferida?: string;
  urgencia?: string;
  observacoes?: string;
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
    const consultationData: ConsultationData = await req.json();
    console.log('Received consultation data:', consultationData);

    // Validate required fields
    if (!consultationData.nome || !consultationData.email) {
      return new Response(
        JSON.stringify({ 
          error: { 
            code: 'VALIDATION_ERROR', 
            message: 'Campos obrigatórios: nome, email' 
          } 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(consultationData.email)) {
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
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // First, create a lead entry
    const leadData = {
      nome: consultationData.nome.trim(),
      email: consultationData.email.toLowerCase().trim(),
      empresa: consultationData.empresa?.trim() || null,
      telefone: consultationData.telefone?.trim() || null,
      tipo_interesse: 'consulta_gratuita',
      origem: 'implementacao_lgpd_consultation',
      ip_address: '127.0.0.1',
      user_agent: req.headers.get('user-agent') || 'unknown'
    };

    console.log('Creating lead:', leadData);

    const { data: leadResult, error: leadError } = await supabase
      .from('lgpd_leads')
      .insert([leadData])
      .select('id')
      .single();

    if (leadError) {
      console.error('Lead creation error:', leadError);
      return new Response(
        JSON.stringify({ 
          error: { 
            code: 'LEAD_CREATION_ERROR', 
            message: 'Erro ao criar registro de lead',
            details: leadError.message
          } 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Lead created:', leadResult);

    // Prepare consultation data
    const insertData = {
      nome: consultationData.nome.trim(),
      email: consultationData.email.toLowerCase().trim(),
      empresa: consultationData.empresa?.trim() || null,
      telefone: consultationData.telefone?.trim() || null,
      data_preferida: consultationData.data_preferida || null,
      hora_preferida: consultationData.hora_preferida || null,
      urgencia: consultationData.urgencia || 'normal',
      observacoes: consultationData.observacoes?.trim() || null,
      status: 'agendada',
      lead_id: leadResult.id
    };

    console.log('Creating consultation:', insertData);

    // Insert consultation into database
    const { data, error } = await supabase
      .from('lgpd_consultations')
      .insert([insertData])
      .select('id, nome, email, data_preferida, hora_preferida, created_at')
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ 
          error: { 
            code: 'DATABASE_ERROR', 
            message: 'Erro ao agendar consulta',
            details: error.message
          } 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Consultation created:', data);

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true,
        data: {
          id: data.id,
          nome: data.nome,
          email: data.email,
          data_preferida: data.data_preferida,
          hora_preferida: data.hora_preferida,
          created_at: data.created_at,
          message: 'Consulta agendada com sucesso! Entraremos em contato em breve.'
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