import { useEffect, useState } from 'react';
import { MapPin, User, CalendarDays, Check, CreditCard, Clock } from 'lucide-react';
import NavbarFitness from '../../../components/navbarFitness/navbarFitness'
import './home.css';

// === CSV publicados (mismo documento, distinta pestaña vía gid) ===
const BASE = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT1tEq2qpgh_C4jddy8sz3cJbtzP5HijZsIHcIT9Xz2cP5mxy3JvQaOLQAs39WqJrlq6-gZF8XAC-XJ/pub?output=csv';
const URL_MES      = `${BASE}&gid=799695537`;   // hoja "mes" (actividades puntuales del mes)
const URL_HORARIOS = `${BASE}&gid=1373249144`;  // hoja "horarios"
const URL_PRECIOS  = `${BASE}&gid=779743656`;   // hoja "precios"

// Imágenes del hero (en public/fitness/home)
const imagenes = [
  { src: '/fitness/home/club.png',          position: 'center center' },
  { src: '/fitness/home/gimnasio.png',      position: 'center center' },
  { src: '/fitness/home/cama-elastica.png', position: 'center center' },
];

const ACENTOS = ['var(--blue)', 'var(--purple)', 'var(--orange)', 'var(--green)', 'var(--pink)'];

// Sin domingo (el club está cerrado)
const DIAS = ['lunes','martes','miércoles','jueves','viernes','sábado'];
const DIAS_JS = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

// Convierte cualquier link de Google Drive en uno que se pueda mostrar como imagen
function urlImagen(url) {
  if (!url) return '';
  const m = url.match(/\/d\/([\w-]+)/) || url.match(/[?&]id=([\w-]+)/);
  if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1000`;
  return url;
}

// Parser CSV que respeta comas dentro de comillas
function parseSheet(text) {
  const filas = [];
  let fila = [];
  let campo = '';
  let enComillas = false;
  text = text.replace(/\r/g, '');

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (enComillas) {
      if (c === '"' && text[i + 1] === '"') { campo += '"'; i++; }
      else if (c === '"') { enComillas = false; }
      else { campo += c; }
    } else {
      if (c === '"') { enComillas = true; }
      else if (c === ',') { fila.push(campo); campo = ''; }
      else if (c === '\n') { fila.push(campo); filas.push(fila); fila = []; campo = ''; }
      else { campo += c; }
    }
  }
  if (campo !== '' || fila.length) { fila.push(campo); filas.push(fila); }

  const headers = filas.shift().map(h => norm(h));
  return filas
    .filter(cols => cols.some(c => c && c.trim() !== ''))
    .map(cols => Object.fromEntries(headers.map((h, idx) => [h, (cols[idx] || '').trim()])));
}

async function traer(url) {
  try {
    const r = await fetch(url);
    return parseSheet(await r.text());
  } catch (e) {
    console.error('Error leyendo hoja:', e);
    return [];
  }
}

export default function FitnessHome() {
  const [actual, setActual] = useState(0);
  const [mes, setMes] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [precios, setPrecios] = useState([]);

  // Si hoy es domingo, arranca en lunes
  const hoy = DIAS_JS[new Date().getDay()];
  const [diaSel, setDiaSel] = useState(hoy === 'domingo' ? 'lunes' : hoy);

  useEffect(() => {
    traer(URL_MES).then(setMes);
    traer(URL_HORARIOS).then(setHorarios);
    traer(URL_PRECIOS).then(setPrecios);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActual(prev => (prev + 1) % imagenes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Agrupar las clases del día por hora
  const delDia = horarios.filter(h => norm(h.dia) === norm(diaSel));
  const porHora = {};
  delDia.forEach(h => {
    const k = h.hora || '';
    if (!porHora[k]) porHora[k] = [];
    porHora[k].push(h);
  });
  const franjas = Object.keys(porHora)
    .sort((a, b) => a.localeCompare(b))
    .map(hora => ({ hora, items: porHora[hora] }));

  // Precios activos, agrupados por "grupo" (preservando el orden del sheet)
  const preciosActivos = precios.filter(
    p => (p.plan || '').trim() !== '' && norm(p.activo) !== 'no'
  );
  const gruposPrecios = [];
  preciosActivos.forEach(p => {
    const nombre = (p.grupo || '').trim();
    let g = gruposPrecios.find(x => x.nombre === nombre);
    if (!g) { g = { nombre, items: [] }; gruposPrecios.push(g); }
    g.items.push(p);
  });

  return (
    <div className="fit">
      <NavbarFitness />

      {/* HERO / CARRUSEL */}
      <section className="hero">
        {imagenes.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={`Slide ${i + 1}`}
            className={`hero__img ${i === actual ? 'hero__img--active' : ''}`}
            style={{ objectPosition: img.position }}
          />
        ))}
        <div className="hero__dots">
          {imagenes.map((_, i) => (
            <button
              key={i}
              className={`hero__dot ${i === actual ? 'hero__dot--active' : ''}`}
              onClick={() => setActual(i)}
            />
          ))}
        </div>
      </section>

      {/* ACTIVIDADES DEL MES */}
      <section id="actividades" className="fit-sec">
        <h2 className="fit-h2">ACTIVIDADES DEL MES</h2>
        {mes.length === 0 ? (
          <p className="fit-vacio">No hay actividades cargadas para este mes.</p>
        ) : (
          <div className="fit-cards">
            {mes.map((a, i) => (
              <article key={i} className="fit-card" style={{ '--ac': ACENTOS[i % ACENTOS.length] }}>
                <div className="fit-card__bar" />
                {a.img && (
                  <img
                    src={urlImagen(a.img)}
                    alt={a.titulo}
                    style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
                  />
                )}
                <div className="fit-card__body">
                  <h3>{a.titulo}</h3>
                  {a.descripcion && <p>{a.descripcion}</p>}
                  {a.fecha && (
                    <div className="fit-card__meta">
                      <span><CalendarDays size={14} /> {a.fecha}</span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* PRECIOS */}
      <section id="precios" className="fit-sec fit-sec--alt">
        <h2 className="fit-h2">PRECIOS</h2>
        <p className="fit-precios__intro">
          El gimnasio funciona con <strong>pase libre</strong>: con tu mensualidad tenés acceso a todas las actividades del club.
        </p>

        {gruposPrecios.length === 0 ? (
          <p className="fit-vacio">No hay precios cargados.</p>
        ) : (
          gruposPrecios.map((g, gi) => (
            <div key={gi} className="fit-precios__grupo">
              {g.nombre && <h3 className="fit-precios__subtitulo">{g.nombre}</h3>}
              <div className="fit-precios-cards">
                {g.items.map((p, i) => {
                  const destacado = norm(p.destacado) === 'si';
                  return (
                    <article
                      key={i}
                      className={`fit-precio ${destacado ? 'fit-precio--top' : ''}`}
                      style={{ '--ac': ACENTOS[i % ACENTOS.length] }}
                    >
                      {destacado && <span className="fit-precio__badge">Recomendado</span>}
                      <h4 className="fit-precio__nombre">{p.plan}</h4>
                      <div className="fit-precio__valor">
                        <span>{p.precio}</span>
                        {p.unidad && <span className="fit-precio__unidad">{p.unidad}</span>}
                      </div>
                      {p.detalle && <p className="fit-precio__detalle">{p.detalle}</p>}
                    </article>
                  );
                })}
              </div>
            </div>
          ))
        )}

        <ul className="fit-beneficios">
          <li><Check size={18} /> Acceso a todas las actividades del club</li>
          <li><Check size={18} /> Médico gratis</li>
          <li><Check size={18} /> Duchas, lockers, vestuario y estacionamiento</li>
          <li><Check size={18} /> Profesores que arman tu rutina según tus objetivos</li>
          <li><Check size={18} /> Primera clase de prueba gratis</li>
        </ul>

        <div className="fit-precios__notas">
          <p><CreditCard size={16} /> Débito, crédito y efectivo. No aceptamos Mercado Pago.</p>
          <p><Clock size={16} /> Inscripción con cédula, de lunes a viernes de 7:30 a 19:30. Presentate con carnet de salud o aptitud física.</p>
        </div>
      </section>

      {/* NOTICIAS 
      <section id="noticias" className="fit-sec fit-sec--alt">
        <h2 className="fit-h2">NOTICIAS</h2>
        <p className="fit-vacio">Próximamente</p>
      </section>*/}

      {/* HORARIOS */}
      <section id="horarios" className="fit-sec">
        <h2 className="fit-h2">HORARIOS</h2>
        <div className="fit-dias">
          {DIAS.map(d => (
            <button key={d} className={norm(d) === norm(diaSel) ? 'on' : ''} onClick={() => setDiaSel(d)}>
              {d.slice(0, 3)}
            </button>
          ))}
        </div>
        {franjas.length === 0 ? (
          <p className="fit-vacio">No hay clases cargadas para {diaSel}.</p>
        ) : (
          <div className="fit-franjas">
            {franjas.map((f, i) => (
              <div key={f.hora} className="fit-franja" style={{ '--ac': ACENTOS[i % ACENTOS.length] }}>
                <div className="fit-franja__hora">{f.hora}</div>
                <ul className="fit-franja__lista">
                  {f.items.map((it, j) => (
                    <li key={j}>
                      {it.actividad}
                      {(it.profe || it.lugar) && (
                        <span className="fit-franja__extra">
                          {it.profe && <><User size={12} /> {it.profe} </>}
                          {it.lugar && <><MapPin size={12} /> {it.lugar}</>}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* TIENDA */}
      <section id="tienda" className="fit-sec fit-sec--alt">
        <h2 className="fit-h2">TIENDA</h2>
        <p className="fit-vacio">Próximamente.</p>
      </section>

      {/* CONTACTO / UNITE */}
      <section id="contacto" className="fit-cta">
        <span className="fit-cta__blob c1" />
        <span className="fit-cta__blob c2" />
        <div className="fit-cta__inner">
          <h2>SUMATE A CEVVEN FITNESS</h2>
          <p>Escribinos y arrancá cuando quieras.</p>
          <a href="https://wa.me/59899027944" className="fit-cta__btn" target="_blank" rel="noopener noreferrer">CONTACTANOS →</a>
        </div>
      </section>
    </div>
  );
}