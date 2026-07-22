import { createClient } from '@supabase/supabase-js';

// Shared browser client used only for authentication and session management.
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export default supabase;
