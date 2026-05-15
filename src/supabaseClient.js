import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  'https://snsghdjylsgghhcoyzpd.supabase.co';

const supabaseAnonKey =
  'sb_publishable_wAURLufqOjJYwVi2DkWDeg_ZTqX1Nqu';

export const supabase =
  createClient(
    supabaseUrl,
    supabaseAnonKey
  );