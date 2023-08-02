import { createClient } from "@supabase/supabase-js";
import { Provider } from "@supabase/gotrue-js";

const supabase = createClient('https://rrqmpgpvlhaxsozwlntq.supabase.co', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);


export default supabase
  