import { Breadcrumb } from "../common/Breadcrumb.tsx";
import { Container } from "./Container.tsx";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="border-b border-line bg-surface">
      <Container className="py-14 sm:py-16">
        <Breadcrumb items={[{ label: "Utama", href: "/" }, { label: title }]} />
        <p className="mt-6 text-sm font-semibold text-brand">{eyebrow}</p>
        <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">{description}</p>
      </Container>
    </header>
  );
}
