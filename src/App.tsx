
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import './App.css'
import { TransactionProvider } from './context/TransactionContext'
import { Home } from './pages/Home'
import { Transacciones } from './pages/Transacciones'
import { Categorias } from './pages/Categorias'
import { Estadisticas } from './pages/Estadisticas'
import { Layout } from './components/Layout'


function App() {

return (
    <>
        <TransactionProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout><Home /></Layout>} />
                    <Route path="/transactions" element={<Layout><Transacciones /></Layout>} />
                    <Route path="/categories" element={<Layout><Categorias /></Layout>} />
                    <Route path="/statistics" element={<Layout><Estadisticas /></Layout>} />
                </Routes>
            </BrowserRouter>
        </TransactionProvider>
    </>
    )
}

export default App
