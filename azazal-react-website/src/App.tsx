import styles from './App.module.css'

import { Navbar } from './components/Navbar/Navbar'
import { Hero } from './components/Hero/Hero'
import { About } from './components/About/About'
import { Releases } from './components/Releases/Releases'

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <Hero />
      <About />
      <Releases />
    </div>
  )
}

export default App
