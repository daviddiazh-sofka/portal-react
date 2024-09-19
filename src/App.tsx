import { Route, Routes } from 'react-router-dom'
import { Chat } from './pages/Chat'
import { Home } from './pages/Home'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PrivatePage } from './pages/PrivatePage'
import './App.css'
import { useAuth } from './context/auth/AuthProvider'
import { Header } from './components/Header'

function App() {

  const { status } = useAuth();

  return (
    <div className='general-container'>
      <Header />
      <Routes>
        <Route path='/' element={ status === 'authenticated' ? <PrivatePage /> : <Home /> } />

        <Route 
          path='/chat' 
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          } 
        />

        <Route path='/*' element={ status === 'authenticated' ? <PrivatePage /> : <Home /> } />
      </Routes>
    </div>
  )
}

export default App
