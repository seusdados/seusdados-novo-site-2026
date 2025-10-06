import React from 'react';
import { CheckCircle, Clock, Users, FileText, Target, TrendingUp, Shield, Award, Briefcase } from 'lucide-react';

const DpoFases: React.FC = () => {
  const entregas = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Políticas e Documentos",
      description: "Políticas e avisos de privacidade e cláusulas padrão para contratos."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Análise de Contratos",
      description: "Análise individualizada de contratos (com revisão DPO) e monitoramento ativo."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "CSA e PAM",
      description: "CSA (vulnerabilidades de TI) e PAM (riscos de privacidade)."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "RIPD, ROT e LIA",
      description: "RIPD (Relatório de Impacto), ROT (Registro das Operações de Tratamento) e LIA (Teste de Legítimo Interesse)."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Treinamentos",
      description: "Treinamentos (Seusdados Educa) com gestão de participação."
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "MEResponda!",
      description: "Canal do titular de dados, integrado à plataforma meudpo."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Governança e Auditorias",
      description: "Gestão da governança em proteção de dados (CPPD), auditorias, avaliação de maturidade de fornecedores."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Atendimento ANPD",
      description: "Atendimento à ANPD e atuação em incidentes de segurança."
    }
  ];

  return (
    <div>
      {/* Entregas que acompanham o DPO+ */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-heading text-surface-on-surface mb-6">
              Entregas que acompanham o DPO+ (o que seu time recebe na prática)
            </h2>
            <p className="text-body-xl text-ink-300 max-w-3xl mx-auto">
              Nosso programa DPO+ entrega resultados concretos e mensuráveis para sua organização.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {entregas.map((entrega, index) => (
                <div key={index} className="card-glass p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center text-white">
                      {entrega.icon}
                    </div>
                    <div>
                      <h3 className="text-h4 font-heading text-surface-on-surface mb-2">
                        {entrega.title}
                      </h3>
                      <p className="text-body-m text-ink-300">
                        {entrega.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Como operamos ao longo do tempo */}
      <section className="py-12 bg-surface-elevated">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h2 font-heading text-surface-on-surface mb-6">
              Como operamos ao longo do tempo
            </h2>
            <p className="text-body-xl text-ink-300">
              Nosso cronograma contínuo cobre: estruturação de governança, mapeamentos e planos de ação, 
              relacionamento externo e monitoramento ativo, adequação de contratos caso a caso, canal de 
              atendimento aos titulares, privacy by design, gestão de evidências e documentação — sempre 
              com treinamentos contínuos para consolidar a cultura.
            </p>
          </div>
        </div>
      </section>

      {/* Diferenciais Seusdados */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 font-heading text-surface-on-surface mb-8 text-center">
              Diferenciais Seusdados
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-glass p-6">
                <div className="flex items-start space-x-4">
                  <Users className="w-8 h-8 text-brand-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-h4 font-heading text-surface-on-surface mb-2">
                      Time Multidisciplinar
                    </h3>
                    <p className="text-body-m text-ink-300">
                      Especialistas em TI, Segurança, Processos e Legal regulatório trabalhando de forma integrada.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="card-glass p-6">
                <div className="flex items-start space-x-4">
                  <Award className="w-8 h-8 text-brand-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-h4 font-heading text-surface-on-surface mb-2">
                      Histórico Comprovado
                    </h3>
                    <p className="text-body-m text-ink-300">
                      Mais de 9.000 atendimentos como DPO, demonstrando expertise e confiança do mercado.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="card-glass p-6">
                <div className="flex items-start space-x-4">
                  <Clock className="w-8 h-8 text-brand-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-h4 font-heading text-surface-on-surface mb-2">
                      SLA Garantido
                    </h3>
                    <p className="text-body-m text-ink-300">
                      Atendimento humanizado com SLA definido e gestão da privacidade sistematizada.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="card-glass p-6">
                <div className="flex items-start space-x-4">
                  <TrendingUp className="w-8 h-8 text-brand-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-h4 font-heading text-surface-on-surface mb-2">
                      Atualizações Contínuas
                    </h3>
                    <p className="text-body-m text-ink-300">
                      Atualizações periódicas do programa, documentos e avaliações regulatórias.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chamada para ação */}
      <section className="py-12 bg-gradient-to-r from-brand-primary to-brand-accent">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h2 font-heading text-white mb-6">
              Fale com um especialista
            </h2>
            <p className="text-body-xl text-white/90 mb-8">
              Vamos dimensionar o DPO+ para a realidade da sua organização e iniciar a operação 
              com governança e evidências desde o primeiro mês.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a 
                href="#contato" 
                className="inline-flex items-center px-8 py-4 bg-white text-brand-primary font-semibold rounded-lg hover:bg-white/90 transition-colors"
              >
                Solicitar Proposta
              </a>
              <a 
                href="#diagnostico" 
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-brand-primary transition-colors"
              >
                Fazer Diagnóstico
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DpoFases;