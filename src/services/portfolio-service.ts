import { supabase } from '../lib/supabase'
import type { Experience, Profile, Project, Service, Skill } from '../types/portfolio'

const unavailable = (): never => { throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to continue.') }
const unwrap = <T>(result: { data: T | null; error: { message: string } | null }) => { if (result.error) throw new Error(result.error.message); return result.data }

export const portfolioService = {
  async profile(): Promise<Profile | null> { if (!supabase) return null; return unwrap(await supabase.from('profiles').select('*').limit(1).maybeSingle()) },
  async projects(): Promise<Project[]> { if (!supabase) return []; const rows = unwrap(await supabase.from('projects').select('*, project_categories(categories(name)), project_technologies(technologies(name)), project_features(feature)').eq('is_published', true).eq('is_archived', false).order('sort_order')); return (rows ?? []).map((p: Record<string, unknown>) => ({ ...p, categories: ((p.project_categories as { categories: { name: string } | null }[]) ?? []).flatMap((x) => x.categories?.name ?? []), technologies: ((p.project_technologies as { technologies: { name: string } | null }[]) ?? []).flatMap((x) => x.technologies?.name ?? []) }) as Project) },
  async skills(): Promise<Skill[]> { if (!supabase) return []; return unwrap(await supabase.from('skills').select('*').eq('is_published', true).order('sort_order')) ?? [] },
  async experiences(): Promise<Experience[]> { if (!supabase) return []; return unwrap(await supabase.from('experiences').select('*').eq('is_published', true).order('sort_order')) ?? [] },
  async services(): Promise<Service[]> { if (!supabase) return []; return unwrap(await supabase.from('services').select('*').eq('is_published', true).order('sort_order')) ?? [] },
  async submitInquiry(input: Record<string, unknown>) { const client = supabase; if (!client) return unavailable(); return unwrap(await client.from('contact_inquiries').insert(input).select('id').single()) },
  async adminRows(table: string) { const client = supabase; if (!client) return unavailable(); return unwrap(await client.from(table).select('*').order('updated_at', { ascending: false }).limit(100)) ?? [] },
  async saveAdminRow(table: string, row: Record<string, unknown>) { const client = supabase; if (!client) return unavailable(); const result = row.id ? await client.from(table).update(row).eq('id', row.id).select().single() : await client.from(table).insert(row).select().single(); return unwrap(result) },
  async deleteAdminRow(table: string, id: string) { const client = supabase; if (!client) return unavailable(); return unwrap(await client.from(table).delete().eq('id', id)) },
}
