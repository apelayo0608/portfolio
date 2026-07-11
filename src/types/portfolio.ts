export type Project = {
  id: string; title: string; slug: string; short_description: string; full_description?: string | null
  cover_image_url?: string | null; live_url?: string | null; github_url?: string | null; completion_date?: string | null
  project_status: string; is_featured: boolean; is_published: boolean; is_archived: boolean; sort_order: number
  technologies?: string[]; categories?: string[]; project_features?: { feature: string }[]
}
export type Profile = { full_name: string; professional_title: string; biography: string; email: string; phone?: string | null; location?: string | null; github_url?: string | null; linkedin_url?: string | null; resume_url?: string | null; availability_status?: string | null; profile_image_url?: string | null }
export type Skill = { id: string; name: string; category: string; proficiency_level: number; icon?: string | null }
export type Experience = { id: string; job_title: string; organization: string; location?: string | null; start_date: string; end_date?: string | null; is_current: boolean; description?: string | null; technologies?: string[] | null }
export type Service = { id: string; title: string; description: string; icon?: string | null; pricing_text?: string | null }
export type ContactInquiry = { id: string; full_name: string; email: string; subject: string; message: string; status: 'New' | 'Read' | 'Replied' | 'Archived'; created_at: string }
