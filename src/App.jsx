import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import Home from './pages/deportes/indoor/home/home'
import Nosotros from './pages/deportes/indoor/nosotros/nosotros'
import Noticias from './pages/deportes/indoor/noticias/noticias'
import Indumentaria from './pages/deportes/indoor/indumentaria/indumentaria'
import Contacto from './pages/deportes/indoor/contacto/contacto'
import Partidos from './pages/deportes/indoor/partidos/partidos'
import Pedidos from './pages/deportes/indoor/pedidos/pedidos'
import Categoria from './pages/deportes/indoor/categoria/categoria'
import Landing from './pages/landing/landing'
import Documentos from './pages/deportes/indoor/documentos/documentos'
import Construccion from './pages/construccion/construccion'
import NoticiaDetalle from './pages/deportes/indoor/noticias/noticiaDetalle'
import Deportes from './pages/deportes/deportes'
import FitnessHome from './pages/fitness/home/home'
import FitnessPlaceholder from './pages/fitness/placeholder/placeholder'
import Actividades from './pages/fitness/actividades/actividades'
import ContactoFitness from './pages/fitness/contacto/contacto'
import UniteFitness from './pages/fitness/unite/unite'
import NosotrosFitness from './pages/fitness/nosotros/nosotros'

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/deportes" element={<Deportes />} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/nosotros" element={<Layout><Nosotros /></Layout>} />
        <Route path="/noticias" element={<Layout><Noticias /></Layout>} />
        <Route path="/indumentaria" element={<Layout><Indumentaria /></Layout>} />
        <Route path="/contacto" element={<Layout><Contacto /></Layout>} />
        <Route path="/partidos" element={<Layout><Partidos /></Layout>} />
        <Route path="/pedidos" element={<Layout><Pedidos /></Layout>} />
        <Route path="/categoria/:cat" element={<Layout><Categoria /></Layout>} />
        <Route path="/documentos/:cat/:nombre" element={<Layout><Documentos /></Layout>} />
        <Route path="/construccion" element={<Construccion />} />
        <Route path="/noticias/:id" element={<Layout><NoticiaDetalle /></Layout>} />

        {/* FITNESS */}
        <Route path="/fitness" element={<FitnessHome />} />
        <Route path="/fitness/nosotros" element={<NosotrosFitness />} />
        <Route path="/fitness/noticias" element={<FitnessPlaceholder titulo="Noticias" />} />
        <Route path="/fitness/actividades" element={<Actividades />} />
        <Route path="/fitness/tienda" element={<FitnessPlaceholder titulo="Tienda" />} />
        <Route path="/fitness/unite" element={<UniteFitness />} />
        <Route path="/fitness/contacto" element={<ContactoFitness />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App 