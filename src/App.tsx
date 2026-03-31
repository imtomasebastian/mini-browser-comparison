import { MiniBrowser } from './components/MiniBrowser/MiniBrowser'
import { Agentation } from 'agentation'
import './App.css'

function App() {
  return (
    <main className="app-stage">
      <MiniBrowser />
      {import.meta.env.DEV && <Agentation endpoint="http://localhost:4747" />}
    </main>
  )
}

export default App
