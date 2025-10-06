import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const DpoFAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqItems = [
    {
      question: "Qual a vantagem de contratar um DPO externo?",
      answer: "A Resolução 18/2024 destaca a importância de independência e ausência de conflito de interesses — condições mais difíceis em estruturas internas (ex.: jurídico/TI). O DPO+ entrega imparcialidade e foco regulatório."
    },
    {
      question: "O DPO atende titulares e a ANPD?",
      answer: "Sim. É responsável por receber e responder solicitações de titulares e demandas da autoridade, com registros e evidências."
    },
    {
      question: "Quais documentos e relatórios o DPO+ mantém?",
      answer: "RIPD, ROT, LIA, políticas e avisos, além de relatórios de auditoria e evidências alinhadas ao princípio de accountability."
    },
    {
      question: "Há acompanhamento de fornecedores?",
      answer: "Sim, realizamos avaliação de maturidade e orientamos adequações contratuais e operacionais."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-16 bg-surface-elevated">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-heading text-surface-on-surface mb-6">
              FAQ (DPO+)
            </h2>
            <p className="text-body-xl text-ink-300">
              Respostas para as dúvidas mais frequentes sobre nosso serviço de DPO.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="card-glass">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <h3 className="text-h4 font-heading text-surface-on-surface pr-4">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openItems.includes(index) ? (
                      <ChevronUp className="w-6 h-6 text-brand-primary" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-brand-primary" />
                    )}
                  </div>
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <p className="text-body-l text-ink-300">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DpoFAQ;