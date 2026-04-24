import { Container } from "@/components/ui/Container";
import { SectionHeader } from "./SectionHeader";
import { StepItem } from "./StepItem";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const steps = [
  {
    number: "01",
    title: "Early Engagement",
    body: "We engage at the planning stage to understand constraints, identify risks, and propose practical approaches.",
  },
  {
    number: "02",
    title: "Efficient Mobilisation",
    body: "Structured mobilisation and setup to get productive on site as quickly as possible.",
  },
  {
    number: "03",
    title: "Reliable Execution",
    body: "Day-to-day operations backed by structured reporting, KPIs, and close coordination with client teams.",
  },
  {
    number: "04",
    title: "Transparent Communication",
    body: "Proactive issue resolution and clear reporting — no surprises, ever.",
  },
];

export function ProjectApproach() {
  return (
    <section className="py-32">
      <Container className="flex flex-col gap-16">
        <SectionHeader index="05" label="Our Approach" title="Hands-on, solution-driven delivery." />
        <Stagger className="grid gap-10 md:grid-cols-4">
          {steps.map((s) => (
            <StaggerItem key={s.number}>
              <StepItem {...s} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
