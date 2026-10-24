import { Link } from "react-router-dom";
import { Logo } from "../brand/Logo.tsx";
import { legalLinks, navigation, site } from "../../data/site.ts";
import { pricingPlans } from "../../data/pricing.ts";
import { Container } from "./Container.tsx";

const channels = [
  { label: "E-mel", value: site.contact.email },
  { label: "Telefon", value: site.contact.phone },
  { label: "Alamat", value: site.contact.address },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-6 text-[#c5d0e0]">{site.footerDescription}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Pautan pantas</h2>
          <ul className="mt-4 space-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="text-sm text-[#c5d0e0] hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Pakej</h2>
          <ul className="mt-4 space-y-2">
            {pricingPlans.map((plan) => (
              <li key={plan.id}>
                <Link to={`/pricing#${plan.id}`} className="text-sm text-[#c5d0e0] hover:text-white">
                  {plan.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Hubungi</h2>
          <dl className="mt-4 space-y-3">
            {channels.map((channel) => (
              <div key={channel.label}>
                <dt className="text-xs font-semibold tracking-wide text-[#9aabc2] uppercase">{channel.label}</dt>
                <dd className="mt-1 text-sm text-[#c5d0e0]">
                  {channel.value || "Belum disahkan"}
                  {!channel.value ? <span className="sr-only"> — pemegang tempat</span> : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-sm text-[#c5d0e0] sm:flex-row sm:items-center sm:justify-between">
          <p>© {site.year} vividworks.my. Hak cipta terpelihara.</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
