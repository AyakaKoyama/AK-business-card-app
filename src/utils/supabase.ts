import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ debug: true });
const supabaseUrl = process.env.VITE_SUPABASE_URL as string;
const supabaseKey = process.env.VITE_SUPABASE_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);
