import NavbarFitness from '../../../components/navbarFitness/navbarFitness'
import './placeholder.css'

export default function FitnessPlaceholder({ titulo }) {
  return (
    <>
      <NavbarFitness />
      <section className="fitph">
        <h1 className="fitph__titulo">{titulo}</h1>
        <p className="fitph__sub">Próximamente 💪</p>
      </section>
    </>
  )
}