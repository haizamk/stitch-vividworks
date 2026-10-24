interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_SAAS_LOGIN_URL?: string;
  readonly VITE_SAAS_REGISTER_URL?: string;
  readonly VITE_SAAS_EDITOR_URL?: string;
  readonly VITE_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
