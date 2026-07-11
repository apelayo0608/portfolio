import DOMPurify from 'dompurify'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
export function Markdown({ children }: { children?: string | null }) { const safe = DOMPurify.sanitize(children ?? ''); return <ReactMarkdown remarkPlugins={[remarkGfm]}>{safe}</ReactMarkdown> }
