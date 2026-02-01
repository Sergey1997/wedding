import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase Client Configuration
 * 
 * ⚠️ ВАЖНО: Используем anon key на фронтенде - это НОРМАЛЬНО и БЕЗОПАСНО!
 * 
 * Почему это безопасно:
 * 1. Anon key - публичный ключ, предназначен для клиентских приложений
 * 2. Безопасность обеспечивается через Row Level Security (RLS) политики
 * 3. Anon key имеет ограниченные права и может делать только то, что разрешено через RLS
 * 
 * ❌ НИКОГДА не используйте service_role key на фронтенде!
 * Service role key обходит RLS и имеет полный доступ - только для серверных приложений!
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client if credentials are missing (for development without Supabase)
const createSupabaseClient = (): SupabaseClient => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      'Supabase credentials not found. Form submissions will be logged to console only. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
    );
    // Return a placeholder client that won't crash
    return createClient('https://placeholder.supabase.co', 'placeholder-key');
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createSupabaseClient();
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Type for RSVP submission
export interface RSVPSubmission {
  id?: string;
  name: string;
  attendance: string;
  transfer: string;
  additional_info?: string | null;
  created_at?: string;
}
