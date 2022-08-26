/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_API_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_AUTH_GOOGLE_ENABLED: boolean
  readonly VITE_AUTH_SIGN_UP_ENABLED: boolean
  readonly VITE_IS_RECURRING_ENABLED: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}