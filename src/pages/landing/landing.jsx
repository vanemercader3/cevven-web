import { Link } from 'react-router-dom'
import './landing.css'

const opciones = [
  {
    href: '/fitness',
    img: '/landing/fitness.png',
    label: 'FITNESS Y ALTO RENDIMIENTO',
    color: 'var(--purple)',
    position: 'center top',
  },
  {
    href: '/deportes',
    img: '/landing/deportes.png',
    label: 'DEPORTES',
    color: 'var(--blue)',
    position: 'center 20%',
  },

]

export default function Landing() {
  return (
    <div className="inicio">
      <div className="inicio__confeti" aria-hidden="true">
        <span className="c c--1" />
        <span className="c c--2" />
        <span className="c c--3" />
        <span className="c c--4" />
        <span className="c c--5" />
        <span className="c c--6" />
        <span className="c c--7" />
        <span className="c c--8" />
        <span className="c c--9" />
        <span className="c c--10" />
        <span className="c c--11" />
        <span className="c c--12" />
      </div>

      <header className="inicio__header">
        <span className="inicio__kicker">Bienvenido a</span>
        <h1 className="inicio__title">CEVVEN</h1>
        <span className="inicio__subtitle">Elegí tu disciplina</span>
      </header>

      <div className="inicio__panels">
        {opciones.map((op) => (
          <Link
            key={op.href}
            to={op.href}
            className="inicio__panel"
            style={{ '--panel-color': op.color }}
          >
            <img
              className="inicio__panel-img"
              src={op.img}
              alt={op.label}
              style={{ objectPosition: op.position || 'center' }}
            />
            <div className="inicio__panel-scrim" />
            <div className="inicio__panel-content">
              <span className="inicio__panel-label">{op.label}</span>
              <span className="inicio__panel-cta">Entrar →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}