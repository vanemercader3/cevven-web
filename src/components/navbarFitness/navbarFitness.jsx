import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import '../navbar/navbar.css'

const links = [
  { nombre: 'Nosotros',    url: '/fitness/nosotros' },
  { nombre: 'Noticias',    url: '/fitness/noticias' },
  { nombre: 'Actividades', url: '/fitness/actividades' },
  { nombre: 'Tienda',      url: '/fitness/tienda' },
  { nombre: 'Unite',       url: '/fitness/unite' },
  { nombre: 'Contacto',    url: '/fitness/contacto' },
]

export default function NavbarFitness() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/"><img src="/cevven-fitydep.png" alt="CEVVEN Fitness" /></Link>
      </div>

      <button className="navbar__burger" onClick={() => setOpen(!open)}>
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <ul className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
        {links.map((l, i) => (
          <li key={i}>
            <Link to={l.url} onClick={() => setOpen(false)}>{l.nombre}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}