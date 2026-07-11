import { Code2, Github, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

export function AppShell() {
  const [open, setOpen] = useState(false)
  const links = [['/', 'Home'], ['/projects', 'Projects'], ['/contact', 'Contact']]
  return <><header className="nav"><Link to="/" className="brand"><Code2 size={22} /> AJ</Link><button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button><nav className={open ? 'open' : ''}>{links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>)}<NavLink to="/admin" onClick={() => setOpen(false)}>Admin</NavLink></nav></header><main><Outlet /></main><footer><span>© {new Date().getFullYear()} Portfolio. Built with care.</span><a href="https://github.com" aria-label="GitHub"><Github size={18}/></a></footer></>
}
