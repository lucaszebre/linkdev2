import { createClient } from "@supabase/supabase-js";
import { Provider } from "@supabase/gotrue-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);


export default supabase
  