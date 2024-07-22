import { createClient as SupabaseCreateClient } from '@supabase/supabase-js';

export function createClient() {
  return SupabaseCreateClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}
