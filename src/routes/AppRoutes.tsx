import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootLayout } from "../components/layout/RootLayout.tsx";
import { HomePage } from "../pages/HomePage.tsx";

const PricingPage = lazy(() => import("../pages/PricingPage.tsx"));
const TemplatesPage = lazy(() => import("../pages/TemplatesPage.tsx"));
const HowItWorksPage = lazy(() => import("../pages/HowItWorksPage.tsx"));
const FaqPage = lazy(() => import("../pages/FaqPage.tsx"));
const ContactPage = lazy(() => import("../pages/ContactPage.tsx"));
const PrivacyPage = lazy(() => import("../pages/PrivacyPage.tsx"));
const TermsPage = lazy(() => import("../pages/TermsPage.tsx"));
const ComingSoonPage = lazy(() => import("../pages/ComingSoonPage.tsx"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage.tsx"));
const WizardPage = lazy(() => import("../pages/WizardPage.tsx"));
const DashboardPage = lazy(() => import("../stitch/studio/DashboardPage.tsx").then((module) => ({ default: module.DashboardPage })));
const SitesPage = lazy(() => import("../stitch/studio/SitesPage.tsx").then((module) => ({ default: module.SitesPage })));
const EditorPage = lazy(() => import("../stitch/studio/EditorPage.tsx").then((module) => ({ default: module.EditorPage })));
const AiPage = lazy(() => import("../stitch/studio/AiPage.tsx").then((module) => ({ default: module.AiPage })));
const AnalyticsPage = lazy(() => import("../stitch/studio/AnalyticsPage.tsx").then((module) => ({ default: module.AnalyticsPage })));
const WhatsAppPage = lazy(() => import("../stitch/studio/WhatsAppPage.tsx").then((module) => ({ default: module.WhatsAppPage })));
const BillingPage = lazy(() => import("../stitch/studio/BillingPage.tsx").then((module) => ({ default: module.BillingPage })));
const SettingsPage = lazy(() => import("../stitch/studio/SettingsPage.tsx").then((module) => ({ default: module.SettingsPage })));

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="templates" element={<TemplatesPage />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="akan-datang" element={<ComingSoonPage />} />
          <Route path="wizard" element={<WizardPage />} />
          <Route path="studio" element={<DashboardPage />} />
          <Route path="studio/laman" element={<SitesPage />} />
          <Route path="studio/editor" element={<EditorPage />} />
          <Route path="studio/ai" element={<AiPage />} />
          <Route path="studio/analitik" element={<AnalyticsPage />} />
          <Route path="studio/whatsapp" element={<WhatsAppPage />} />
          <Route path="studio/langganan" element={<BillingPage />} />
          <Route path="studio/tetapan" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
