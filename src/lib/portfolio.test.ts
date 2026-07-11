import { describe, expect, it } from 'vitest'
import { contactInquirySchema, filterProjects, slugify } from './portfolio'

describe('portfolio helpers', () => {
  it('creates a stable URL slug from a project title', () => {
    expect(slugify("Chantelle's First Birthday Website")).toBe('chantelles-first-birthday-website')
  })

  it('filters projects by category and matching technology', () => {
    const projects = [
      { title: 'Spark LMS', short_description: 'Learning platform', technologies: ['React', 'PHP'], categories: ['Learning Management System'] },
      { title: 'Birthday site', short_description: 'Event information', technologies: ['Vite'], categories: ['Event Website'] },
    ]
    expect(filterProjects(projects, 'Learning Management System', 'react')).toHaveLength(1)
  })

  it('rejects contact messages without privacy consent', () => {
    expect(() => contactInquirySchema.parse({ full_name: 'A Person', email: 'person@example.com', subject: 'Hello', message: 'A sufficiently detailed project message.', privacy_consent: false })).toThrow()
  })
})
