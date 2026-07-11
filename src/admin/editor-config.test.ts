import { describe, expect, it } from 'vitest'
import { fieldsForTable } from './editor-config'
describe('fieldsForTable', () => { it('exposes editable category fields', () => expect(fieldsForTable('categories').map(x => x.key)).toEqual(['name','slug','icon','sort_order'])); it('exposes project publishing controls', () => expect(fieldsForTable('projects').map(x => x.key)).toContain('is_published')); it('keeps inquiry details read-only except workflow fields', () => expect(fieldsForTable('contact_inquiries').map(x => x.key)).toEqual(['status','internal_notes'])) })
