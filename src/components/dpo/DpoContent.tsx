import React, { useEffect } from 'react';
import { Shield, Users, FileText, CheckCircle, Star, Award, Clock, Target } from 'lucide-react';

const DpoContent: React.FC = () => {
  useEffect(() => {
    // Configurar meta tags SEO dinamicamente
    document.title = 'DPO as a Service (DPO+) — Seusdados';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'DPO profissional, independente e multidisciplinar: atendimento a titulares e ANPD, gestão do programa de privacidade, documentos, evidências e governança contínua.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'DPO profissional, independente e multidisciplinar: atendimento a titulares e ANPD, gestão do programa de privacidade, documentos, evidências e governança contínua.';
      document.head.appendChild(meta);
    }
  }, []);
  
  return (
    <div className="py-16 lg:py-24">
      {/* Hero Section */}
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-surface-on-surface mb-6">
            DPO as a Service (DPO+)
          </h1>
          <p className="text-xl md:text-2xl text-ink-300 mb-8 max-w-4xl mx-auto">
            Seu Encarregado(a) de Dados profissional, independente e multidisciplinar — com gestão recorrente do programa de privacidade.
          </p>
        </div>
      </div>

      {/* O que é o meudpo da Seusdados */}
      <section className="py-12 bg-surface-elevated">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h2 font-heading text-surface-on-surface mb-6">
              O que é o meudpo da Seusdados
            </h2>
            <p className="text-body-xl text-ink-300 mb-8">
              Atuamos como DPO da sua organização na modalidade de consultoria remota multidisciplinar, 
              com SLA de atendimento, gestão sistematizada e atualizações periódicas do programa, 
              documentos e assessments.
            </p>
          </div>
        </div>
      </section>

      {/* Responsabilidades do DPO */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-heading text-surface-on-surface mb-8 text-center">
              Responsabilidades do DPO (conforme LGPD e ANPD)
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-glass p-6">
                <div className="flex items-start space-x-4">
                  <Shield className="w-6 h-6 text-brand-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-h4 font-heading text-surface-on-surface mb-2">
                      Exercício Formal da Função
                    </h3>
                    <p className="text-body-m text-ink-300">
                      Cumprimento de todas as obrigações legais como Encarregado(a) de Dados.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="card-glass p-6">
                <div className="flex items-start space-x-4">
                  <Target className="w-6 h-6 text-brand-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-h4 font-heading text-surface-on-surface mb-2">
                      Gerenciamento do Programa
                    </h3>
                    <p className="text-body-m text-ink-300">
                      Gestão completa do programa de privacidade da organização.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="card-glass p-6">
                <div className="flex items-start space-x-4">
                  <Users className="w-6 h-6 text-brand-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-h4 font-heading text-surface-on-surface mb-2">
                      Treinamento Contínuo
                    </h3>
                    <p className="text-body-m text-ink-300">
                      Capacitação contínua de colaboradores em proteção de dados.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="card-glass p-6">
                <div className="flex items-start space-x-4">
                  <FileText className="w-6 h-6 text-brand-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-h4 font-heading text-surface-on-surface mb-2">
                      Atendimento a Titulares e ANPD
                    </h3>
                    <p className="text-body-m text-ink-300">
                      Recepção e tratamento das solicitações de titulares e da ANPD.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="card-glass p-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-brand-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-h4 font-heading text-surface-on-surface mb-2">
                      Orientação e Parecer
                    </h3>
                    <p className="text-body-m text-ink-300">
                      Orientação sobre processos de tratamento de dados.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="card-glass p-6">
                <div className="flex items-start space-x-4">
                  <Award className="w-6 h-6 text-brand-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-h4 font-heading text-surface-on-surface mb-2">
                      Monitoramento Ativo
                    </h3>
                    <p className="text-body-m text-ink-300">
                      Gestão de evidências e compliance (accountability).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conformidade ANPD */}
      <section className="py-12 bg-surface-elevated">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h2 font-heading text-surface-on-surface mb-6">
              Conformidade com a Resolução ANPD n. 18/2024
            </h2>
            <p className="text-body-xl text-ink-300">
              Nosso serviço observa os critérios da Resolução 18/2024: independência e transparência 
              do Encarregado, evitar conflitos de interesse e capacitação contínua — pontos essenciais 
              para legitimidade e efetividade do DPO.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DpoContent;