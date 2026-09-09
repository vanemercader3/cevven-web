import { useState } from 'react'
import { MapPin, Phone, Mail, Send, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import NavbarFitness from '../../../components/navbarFitness/navbarFitness'
import './contacto.css'

// WhatsApp del club (formato internacional, sin + ni espacios)
const WHATSAPP = '59897328903'
const DIRECCION = 'Daniel Fernández Crespo 1950, 11800 Montevideo'
const TELEFONO = '2924 3827'
const INSTAGRAM = 'https://www.instagram.com/cevven_fitness/'
// const MAIL_CEVVEN = ''  // cuando lo pasen, lo sumamos acá

// Mapa embebido de la dirección
const MAPA_SRC = `https://www.google.com/maps?q=${encodeURIComponent(DIRECCION)}&output=embed`

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', mail: '', telefono: '', mensaje: '' })
  const [error, setError] = useState('')

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const enviar = () => {
    if (!form.nombre.trim() || !form.mensaje.trim()) {
      setError('Completá al menos tu nombre y el mensaje.')
      return
    }
    setError('')
    const texto =
      `Hola CEVVEN Fitness! 👋%0A%0A` +
      `*Nombre:* ${form.nombre}%0A` +
      (form.mail ? `*Mail:* ${form.mail}%0A` : '') +
      (form.telefono ? `*Teléfono:* ${form.telefono}%0A` : '') +
      `%0A*Mensaje:* ${form.mensaje}`
    window.open(`https://wa.me/${WHATSAPP}?text=${texto}`, '_blank')
  }

  return (
    <div className="fit">
      <NavbarFitness />

      {/* HEADER */}
      <div className="cont-header">
        <Link to="/fitness" className="cont-volver"><ArrowLeft size={18} /> Inicio</Link>
        <h1 className="cont-titulo">CONTACTO</h1>
      </div>

      {/* CONTENIDO */}
      <section className="fit-sec cont-grid">
        {/* Columna info + mapa */}
        <div className="cont-info">
          <h2 className="cont-info__titulo">DÓNDE ESTAMOS</h2>

          <a className="cont-dato" href={`https://www.google.com/maps?q=${encodeURIComponent(DIRECCION)}`} target="_blank" rel="noopener noreferrer">
            <span className="cont-dato__ic" style={{ background: 'var(--blue)' }}><MapPin size={18} /></span>
            {DIRECCION}
          </a>
          <a className="cont-dato" href={`tel:${TELEFONO.replace(/\s/g, '')}`}>
            <span className="cont-dato__ic" style={{ background: 'var(--green)' }}><Phone size={18} /></span>
            {TELEFONO}
          </a>
          <a className="cont-dato" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">
            <span className="cont-dato__ic" style={{ background: '#25D366' }}><Send size={18} /></span>
            097 328 903 (WhatsApp)
          </a>
          <a className="cont-dato" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
            <span className="cont-dato__ic" style={{ background: 'var(--pink)' }}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1.0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24c3.3 0 3.7 0 4.9-.1 4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9 0-3.3 0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/></svg>
            </span>
            @cevven_fitness
          </a>

          <div className="cont-mapa">
            <iframe
              src={MAPA_SRC}
              title="Ubicación CEVVEN"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        {/* Columna formulario */}
        <div className="cont-form">
          <h2 className="cont-form__titulo">MANDANOS UN MENSAJE</h2>
          <p className="cont-form__sub">Completá y te abrimos WhatsApp con todo listo para enviar.</p>

          <input
            className="cont-input" type="text" name="nombre"
            placeholder="Tu nombre *" value={form.nombre} onChange={cambiar}
          />
          <input
            className="cont-input" type="email" name="mail"
            placeholder="Tu mail" value={form.mail} onChange={cambiar}
          />
          <input
            className="cont-input" type="tel" name="telefono"
            placeholder="Tu teléfono" value={form.telefono} onChange={cambiar}
          />
          <textarea
            className="cont-input cont-textarea" name="mensaje" rows="5"
            placeholder="Tu mensaje *" value={form.mensaje} onChange={cambiar}
          />

          {error && <p className="cont-error">{error}</p>}

          <button className="cont-btn" onClick={enviar}>
            <Send size={20} /> ENVIAR POR WHATSAPP
          </button>
        </div>
      </section>
    </div>
  )
}