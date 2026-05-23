import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ycyidjzundegqfmtslwt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljeWlkanp1bmRlZ3FmbXRzbHd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MjU0MDQsImV4cCI6MjA5NTEwMTQwNH0.xXhWmBxlKI8_J4goh5tYZlTCdh5edVJkTaiHCyHyE9s";

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);