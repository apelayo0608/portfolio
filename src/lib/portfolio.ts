import { z } from 'zod'

export type ProjectSearchRecord = {
  title: string
  short_description: string
  technologies?: string[]
  categories?: string[]
}

export const slugify = (value: string) => value
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[’']/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '')

export const filterProjects = <T extends ProjectSearchRecord>(projects: T[], category: string, query: string) => {
  const normalized = query.trim().toLowerCase()
  return projects.filter((project) => {
    const inCategory = category === 'All Projects' || (project.categories ?? []).includes(category)
    const searchable = [project.title, project.short_description, ...(project.technologies ?? [])].join(' ').toLowerCase()
    return inCategory && (!normalized || searchable.includes(normalized))
  })
}

export const contactInquirySchema = z.object({
  full_name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  subject: z.string().trim().min(3, 'Please add a subject.').max(160),
  project_type: z.string().trim().max(80).optional().or(z.literal('')),
  estimated_budget: z.string().trim().max(80).optional().or(z.literal('')),
  message: z.string().trim().min(20, 'Please provide at least 20 characters.').max(5000),
  privacy_consent: z.boolean().refine(Boolean, 'Privacy consent is required.'),
  website: z.string().max(0).optional(),
})

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>
