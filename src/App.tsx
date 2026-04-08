import { MiniBrowser } from './components/MiniBrowser/MiniBrowser'
import { Agentation } from 'agentation'
import { DialRoot } from 'dialkit'
import 'dialkit/styles.css'
import './App.css'

function App() {
  return (
    <main className="app-stage">
      <MiniBrowser />
      <DialRoot position="top-right" />
      {import.meta.env.DEV && <Agentation endpoint="http://localhost:4747" />}
    </main>
  )
}

export default App
