export const createAdminDraft = (table: string): Record<string, unknown> => {
  switch (table) {
    case 'projects': return { title: 'Untitled project', slug: `untitled-project-${Date.now()}`, short_description: 'Add a short description.', project_status: 'Draft', is_published: false, is_archived: false, is_featured: false, sort_order: 0 }
    case 'categories': return { name: `New category ${Date.now()}`, slug: `new-category-${Date.now()}`, sort_order: 0 }
    case 'technologies': return { name: `New technology ${Date.now()}`, slug: `new-technology-${Date.now()}` }
    case 'skills': return { name: 'New skill', category: 'Other', proficiency_level: 3, is_published: false, sort_order: 0 }
    case 'experiences': return { job_title: 'New role', organization: 'Organization', start_date: new Date().toISOString().slice(0, 10), is_current: false, is_published: false, sort_order: 0 }
    case 'services': return { title: 'New service', description: 'Add a service description.', is_published: false, sort_order: 0 }
    case 'profiles': return { full_name: 'Your name', professional_title: 'Your professional title', biography: '', email: '' }
    default: throw new Error(`New ${table} records must be created through their dedicated workflow.`)
  }
}
