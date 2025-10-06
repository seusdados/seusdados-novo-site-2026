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
            company_name,
            responses,
            lead_id 
        } = await req.json();

        // Validação dos campos obrigatórios
        if (!company_name || !responses) {
            throw new Error('Nome da empresa e respostas são obrigatórios');
        }

        if (typeof responses !== 'object') {
            throw new Error('Respostas devem ser um objeto válido');
        }

        // Obter credenciais do Supabase
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');

        if (!serviceRoleKey || !supabaseUrl) {
            throw new Error('Configuração do Supabase não encontrada');
        }

        // Calcular score baseado nas respostas
        function calculateScore(responses: any): { score: number, level: string, recommendations: string[] } {
            let totalScore = 0;
            
            // Pontuação para cada resposta
            const scoreMap: Record<string, number> = {
                'Sim': 6,
                'Parcial': 3,
                'Não': 0,
                'Em andamento': 3,
                'Mensal': 6,
                'Trimestral': 3,
                'Ad-hoc/Não': 0
            };

            // Calcular score total
            Object.values(responses).forEach((answer: any) => {
                if (typeof answer === 'string' && scoreMap[answer] !== undefined) {
                    totalScore += scoreMap[answer];
                }
            });

            // Determinar nível de maturidade
            let level: string;
            let recommendations: string[];
            
            if (totalScore < 40) {
                level = 'Inicial';
                recommendations = [
                    'Comece pelo Programa de Implementação (exemplo inicial em 12 semanas)',
                    'Ative o DPO as a Service sob demanda',
                    'Avance para o Sistema de Governança após as bases'
                ];
            } else if (totalScore < 70) {
                level = 'Emergente';
                recommendations = [
                    'Consolidar políticas, fluxos do titular e gestão de terceiros',
                    'Ativar o Sistema de Governança (comitê, RACI, rituais e KPIs)'
                ];
            } else {
                level = 'Avançado';
                recommendations = [
                    'Aprimorar métricas, auditorias e testes de incidentes',
                    'Evoluir o Sistema de Governança com dashboards executivos',
                    'Implementar plano anual de auditorias'
                ];
            }

            return { score: totalScore, level, recommendations };
        }

        const { score, level, recommendations } = calculateScore(responses);

        // Preparar dados do diagnóstico
        const diagnosticData = {
            lead_id: lead_id || null,
            company_name: company_name.trim(),
            responses: responses,
            score: score,
            maturity_level: level,
            recommendations: recommendations,
            created_at: new Date().toISOString(),
            completed_at: new Date().toISOString()
        };

        console.log('Inserindo diagnóstico:', diagnosticData);

        // Inserir diagnóstico no banco de dados
        const diagnosticResponse = await fetch(`${supabaseUrl}/rest/v1/diagnosticos`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(diagnosticData)
        });

        if (!diagnosticResponse.ok) {
            const errorText = await diagnosticResponse.text();
            console.error('Erro ao inserir diagnóstico:', errorText);
            throw new Error(`Falha ao salvar diagnóstico: ${errorText}`);
        }

        const diagnosticResult = await diagnosticResponse.json();
        const diagnosticId = diagnosticResult[0].id;

        console.log('Diagnóstico salvo com sucesso:', diagnosticId);

        // Resposta de sucesso
        const result = {
            data: {
                diagnosticId: diagnosticId,
                score: score,
                maturityLevel: level,
                recommendations: recommendations,
                message: 'Diagnóstico concluído com sucesso!',
                status: 'success'
            }
        };

        return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Erro na submissão do diagnóstico:', error);

        const errorResponse = {
            error: {
                code: 'DIAGNOSTIC_SUBMISSION_FAILED',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});