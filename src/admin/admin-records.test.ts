import { describe, expect, it } from 'vitest'
import { createAdminDraft } from './admin-records'
describe('createAdminDraft', () => { it('does not send is_published to tables without that column', () => { for (const table of ['categories', 'technologies', 'profiles']) expect(createAdminDraft(table)).not.toHaveProperty('is_published') }); it('creates a valid project draft', () => expect(createAdminDraft('projects')).toMatchObject({ project_status: 'Draft', is_published: false, is_archived: false })) })
