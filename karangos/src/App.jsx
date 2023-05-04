import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrawserRouter, Routes, Route} from 'react-router-dom'
import TopBar from './components/ui/TopBar'

function App() {

  return (
    <>
      <BrawserRouter>
        <TopBar/>
      </BrawserRouter>
    </>
  )
}

export default App
