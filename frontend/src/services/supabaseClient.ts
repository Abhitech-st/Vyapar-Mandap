/**
 * Native Zero-Dependency Supabase REST API Client
 * Connects directly to Supabase PostgreSQL REST endpoints (/rest/v1/)
 * with seamless fallback to client device storage (localStorage).
 */

const getSupabaseUrl = () => import.meta.env.VITE_SUPABASE_URL || '';
const getSupabaseAnonKey = () => import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
};

export interface SupabaseProfileRecord {
  full_name: string;
  email: string;
  role: string;
  ca_membership_number: string;
}

export interface SupabaseOrgRecord {
  name: string;
  gstin: string;
  pan: string;
  address: string;
  financial_year_start?: string;
}

export async function saveProfileToSupabase(profile: SupabaseProfileRecord) {
  if (!isSupabaseConfigured()) {
    console.log('[Supabase Storage] Unconfigured — using Client Device Storage (localStorage).');
    return { success: true, mode: 'local' };
  }

  const baseUrl = getSupabaseUrl().replace(/\/$/, '');
  const anonKey = getSupabaseAnonKey();

  try {
    const res = await fetch(`${baseUrl}/rest/v1/profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(profile)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Supabase HTTP ${res.status}: ${errText}`);
    }

    return { success: true, mode: 'supabase' };
  } catch (err) {
    console.warn('[Supabase Sync Warning]', err);
    return { success: false, error: err, mode: 'local_fallback' };
  }
}

export async function saveOrganizationToSupabase(org: SupabaseOrgRecord) {
  if (!isSupabaseConfigured()) {
    return { success: true, mode: 'local' };
  }

  const baseUrl = getSupabaseUrl().replace(/\/$/, '');
  const anonKey = getSupabaseAnonKey();

  try {
    const res = await fetch(`${baseUrl}/rest/v1/organizations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(org)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Supabase HTTP ${res.status}: ${errText}`);
    }

    return { success: true, mode: 'supabase' };
  } catch (err) {
    console.warn('[Supabase Org Sync Warning]', err);
    return { success: false, error: err, mode: 'local_fallback' };
  }
}
