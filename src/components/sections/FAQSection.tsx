import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does Zapzive move money globally?",
    answer: "Zapzive lets a business fund treasury, create payout or escrow instructions, settle value through stablecoin rails, and route local cash-out through supported payout partners.",
  },
  {
    question: "Do users need to understand crypto?",
    answer: "No. Operators can work with batches, approvals, recipients, currencies, and statuses while Zapzive abstracts wallet, network, and settlement details.",
  },
  {
    question: "What currencies are supported?",
    answer: "The platform is designed around USD and stablecoin settlement with local payout corridors such as KES and NGN. Supported corridors depend on compliance and payout availability.",
  },
  {
    question: "How does escrow work?",
    answer: "Funds can be locked against milestones and released only after approval, verification, or delivery confirmation, with an audit record for each action.",
  },
  {
    question: "How fast are payouts?",
    answer: "Stablecoin settlement can complete quickly, while local cash-out timing depends on corridor, payout rail, compliance checks, and partner availability.",
  },
  {
    question: "How are fees calculated?",
    answer: "Fees are based on corridor, payout rail, FX conversion, and platform usage. Zapzive prioritizes transparent platform fees over hidden bank markups.",
  },
  {
    question: "Is Zapzive custodial or non-custodial?",
    answer: "Zapzive is presented as an operating layer with non-custodial treasury controls and configurable approvals. Specific custody setup depends on customer configuration.",
  },
  {
    question: "How does compliance work?",
    answer: "Teams can manage KYC and AML workflows, transaction monitoring, risk review, approval logs, and audit-ready records around every movement.",
  },
  {
    question: "Can developers integrate Zapzive?",
    answer: "Yes. Developers can create payouts, escrow releases, recipient verification flows, transaction tracking, and webhook-driven status updates.",
  },
  {
    question: "Is there a sandbox environment?",
    answer: "Yes. Teams can launch in sandbox, test payout and escrow flows, inspect API logs, and move to production when ready.",
  },
];

export function FAQSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#050606]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.28em] text-brand-400">FAQ</span>
            <h2 className="mt-5 text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Answers for finance, product, and compliance teams.
            </h2>
          </div>
          <Accordion type="single" collapsible className="rounded-[20px] border border-white/10 bg-[#0c0e0e] px-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`} className="border-white/10">
                <AccordionTrigger className="text-left text-white hover:text-brand-400 text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-400 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
