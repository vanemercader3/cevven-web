import SelectorDisciplinas from '../../components/selectorDisciplinas/selectorDisciplinas'

const opciones = [
  {
    href: '/construccion',
    img: '/landing/beach.png',
    label: 'BEACH',
    color: 'var(--green)',
  },
  {
    href: '/home',
    img: '/landing/indoor.png',
    label: 'INDOOR',
    color: 'var(--blue)',
  },
  {
    href: '/construccion',
    img: '/landing/paleta-vasca.png',
    label: 'PELOTA VASCA',
    color: 'var(--orange)',
    position: 'center 20%',
  },
  {
    href: '/construccion',
    img: '/landing/running.png',
    label: 'RUNNING',
    color: 'var(--purple)',
    position: 'center 20%',
  },
]

export default function Deportes() {
  return <SelectorDisciplinas opciones={opciones} titulo="DEPORTES" />
}