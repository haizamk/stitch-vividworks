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
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
