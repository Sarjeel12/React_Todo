import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kwibdsncszfgqcuchayg.supabase.co";

const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3aWJkc25jc3pmZ3FjdWNoYXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTA1NTYsImV4cCI6MjA5Mzg2NjU1Nn0.T6coJzTPBue50FQEnlVeVyw2XD-I3pw3W3c8cNQreeA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);