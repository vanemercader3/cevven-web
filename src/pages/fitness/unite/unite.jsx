import { useState } from 'react'
import { ArrowLeft, Send, Briefcase } from 'lucide-react'
import { Link } from 'react-router-dom'
import NavbarFitness from '../../../components/navbarFitness/navbarFitness'
import './unite.css'

const WHATSAPP = '59897328903'

export default function Unite() {
  const [form, setForm] = useState({ nombre: '', area: '', telefono: '', mensaje: '' })
  const [error, setError] = useState('')

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // Sumate al club
  const sumarme = () => {
    const texto =
      `Hola CEVVEN Fitness! 👋%0A%0A` +
      `Quiero sumarme al club. ¿Me pasan info para arrancar?`
    window.open(`https://wa.me/${WHATSAPP}?text=${texto}`, '_blank')
  }

  // Bolsa de trabajo
  const enviarCV = () => {
    if (!form.nombre.trim()) {
      setError('Completá al menos tu nombre.')
      return
    }
    setError('')
    const texto =
      `Hola CEVVEN Fitness! %0A%0A` +
      `Quiero postularme para trabajar con ustedes.%0A%0A` +
      `*Nombre:* ${form.nombre}%0A` +
      (form.area ? `*Área/Puesto:* ${form.area}%0A` : '') +
      (form.telefono ? `*Teléfono:* ${form.telefono}%0A` : '') +
      (form.mensaje ? `*Mensaje:* ${form.mensaje}%0A` : '') +
      `%0A📎 Adjunto mi CV a continuación.`
    window.open(`https://wa.me/${WHATSAPP}?text=${texto}`, '_blank')
  }

  return (
    <div className="fit">
      <NavbarFitness />

      {/* HEADER */}
      <div className="unite-header">
        <Link to="/fitness" className="unite-volver"><ArrowLeft size={18} /> Inicio</Link>
        <h1 className="unite-titulo">UNITE</h1>
      </div>

      {/* SUMATE AL CLUB */}
      <section className="unite-hero">
        <span className="unite-hero__blob b1" />
        <span className="unite-hero__blob b2" />
        <div className="unite-hero__inner">
          <h2>SUMATE A CEVVEN FITNESS</h2>
          <p>Entrená con nosotros, elegí tu actividad y formá parte del club. ¡Te esperamos!</p>
          <button className="unite-hero__btn" onClick={sumarme}>
            <Send size={20} /> QUIERO SUMARME
          </button>
        </div>
      </section>

      {/* BOLSA DE TRABAJO */}
      <section className="fit-sec unite-trabajo">
        <div className="unite-trabajo__intro">
          <span className="unite-trabajo__ic"><Briefcase size={26} /></span>
          <h2 className="unite-trabajo__titulo">¿QUERÉS TRABAJAR CON NOSOTROS?</h2>
          <p className="unite-trabajo__sub">
            Dejanos tus datos y envianos tu CV. Al tocar el botón se abre WhatsApp con el mensaje listo —
            solo tenés que <strong>adjuntar tu CV</strong> en el chat.
          </p>
        </div>

        <div className="unite-form">
          <input
            className="unite-input" type="text" name="nombre"
            placeholder="Tu nombre *" value={form.nombre} onChange={cambiar}
          />
          <input
            className="unite-input" type="text" name="area"
            placeholder="Área o puesto de interés (ej: profe de funcional)" value={form.area} onChange={cambiar}
          />
          <input
            className="unite-input" type="tel" name="telefono"
            placeholder="Tu teléfono" value={form.telefono} onChange={cambiar}
          />
          <textarea
            className="unite-input unite-textarea" name="mensaje" rows="4"
            placeholder="Contanos brevemente sobre vos" value={form.mensaje} onChange={cambiar}
          />

          {error && <p className="unite-error">{error}</p>}

          <button className="unite-btn" onClick={enviarCV}>
            <Send size={20} /> ENVIAR POSTULACIÓN
          </button>
        </div>
      </section>
    </div>
  )
}