
import './App.css'
import { AutenticacionProvider } from './autenticacion/context/AutenticacionProvider'
import { PermisosProvider } from './autenticacion/context/PermisosProvider'
import { RouterIndex } from './core/router/RouterIndex'

function App() {

  return (
    <AutenticacionProvider>
      <PermisosProvider>
        <RouterIndex />
      </PermisosProvider>
    </AutenticacionProvider>
  )
}

export default App
