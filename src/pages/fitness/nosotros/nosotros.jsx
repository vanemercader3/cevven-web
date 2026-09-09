import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import NavbarFitness from '../../../components/navbarFitness/navbarFitness'
import './nosotros.css'

const BASE = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT1tEq2qpgh_C4jddy8sz3cJbtzP5HijZsIHcIT9Xz2cP5mxy3JvQaOLQAs39WqJrlq6-gZF8XAC-XJ/pub?output=csv'
const URL_NOSOTROS = `${BASE}&gid=702602810`

const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()

// Convierte cualquier link de Google Drive en uno que se pueda mostrar como imagen
function urlImagen(url) {
  if (!url) return ''
  const m = url.match(/\/d\/([\w-]+)/) || url.match(/[?&]id=([\w-]+)/)
  if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1600`
  return url
}

// Parser CSV que respeta comas dentro de comillas
function parseSheet(text) {
  const filas = []
  let fila = []
  let campo = ''
  let enComillas = false
  text = text.replace(/\r/g, '')

  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (enComillas) {
      if (c === '"' && text[i + 1] === '"') { campo += '"'; i++ }
      else if (c === '"') { enComillas = false }
      else { campo += c }
    } else {
      if (c === '"') { enComillas = true }
      else if (c === ',') { fila.push(campo); campo = '' }
      else if (c === '\n') { fila.push(campo); filas.push(fila); fila = []; campo = '' }
      else { campo += c }
    }
  }
  if (campo !== '' || fila.length) { fila.push(campo); filas.push(fila) }

  const headers = filas.shift().map(h => norm(h))
  return filas
    .filter(cols => cols.some(c => c && c.trim() !== ''))
    .map(cols => Object.fromEntries(headers.map((h, idx) => [h, (cols[idx] || '').trim()])))
}

async function traer(url) {
  try {
    const r = await fetch(url)
    return parseSheet(await r.text())
  } catch (e) {
    console.error('Error leyendo hoja:', e)
    return []
  }
}

export default function Nosotros() {
  const [filas, setFilas] = useState([])

  useEffect(() => {
    traer(URL_NOSOTROS).then(setFilas)
  }, [])

  const banner = filas[0]
  const bloques = filas.slice(1)

  return (
    <div className="fit">
      <NavbarFitness />

      {/* BANNER */}
      {banner && (
        <section
          className="nos-banner"
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.55)), url(${urlImagen(banner.imagen)})` }}
        >
          <Link to="/fitness" className="nos-volver"><ArrowLeft size={18} /> Inicio</Link>
          <h1>{banner.titulo}</h1>
        </section>
      )}

      {/* TEXTO */}
      <section className="fit-sec nos-texto">
        {bloques.length === 0 ? (
          <p className="fit-vacio">Cargá el contenido en la hoja "nosotros".</p>
        ) : (
          bloques.map((b, i) => (
            <div key={i} className="nos-bloque">
              {b.titulo && <h2>{b.titulo}</h2>}
              {b.texto && <p>{b.texto}</p>}
            </div>
          ))
        )}
      </section>
    </div>
  )
}