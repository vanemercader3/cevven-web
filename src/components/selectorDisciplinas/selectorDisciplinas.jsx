import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './selectorDisciplinas.css'

export default function SelectorDisciplinas({ opciones, titulo }) {
  return (
    <div className="selector">
      <Link to="/" className="selector__volver" aria-label="Volver al inicio">
        <ArrowLeft size={22} />
        <span>Inicio</span>
      </Link>

      {titulo && (
        <div className="selector__header">
          <p className="selector__bienvenido">BIENVENIDO A</p>
          <h1 className="selector__titulo">{titulo}</h1>
          <p className="selector__subtitulo">ELEGÍ TU DISCIPLINA</p>
        </div>
      )}
      <div className="selector__btns">
        {opciones.map((op, i) => (
          <a key={i} href={op.href} className="selector__btn">
            <img src={op.img} alt={op.label} className="selector__btn-img" style={{ objectPosition: op.position || 'center' }} />
            <span className="selector__btn-label" style={{ background: `linear-gradient(to top, ${op.color}, transparent)` }}>
              {op.label}
            </span>
          </a>
        ))}
      </div>
      <div className="selector__deco1" />
      <div className="selector__deco2" />
      <div className="selector__deco3" />
      <div className="selector__deco4" />
    </div>
  )
}