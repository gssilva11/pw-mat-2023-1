import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import TopBar from './components/ui/TopBar'
import theme from './utils/theme'
import {ThemeProvider} from '@mui/material/styles'
import Box from '@mui/material/Box';
import FooterBar from './components/ui/FooterBar'
import CssBaseline from '@mui/material/CssBaseline';

import Homepage from './pages/Homepage';
import CustomersList from './pages/CustomersList';
import CustomersForm from './pages/CustomersForm'

// Foi realizada a importação de CarsList e de CarsForm
import CarsList from './pages/CarsList';
import CarsForm from './pages/CarsForm'

// Autor
import Author from './pages/Author';

function App() {

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{ 
            width:'100vw',
            minHeight:'100vh',
            backgroundColor: 'background.default'
          }}>
            <TopBar/>
            <Box sx={{
              margin: '25px 25px 55px 25px',
            }}>
              <Routes>
                <Route path='/' element={<Homepage/>} />
                <Route path='/customers' element={<CustomersList/>} />
                <Route path='/customers/new' element={<CustomersForm/>} />
                <Route path='/customers/:id' element={<CustomersForm/>} />

                {/* Foram criadas três novas rotas para que as novas funcionalidades
                sejam atribuidas ao site */}
                <Route path='/cars' element={<CarsList/>} />
                <Route path='/cars/new' element={<CarsForm/>} />
                <Route path='/cars/:id' element={<CarsForm/>} />

                // Autor
                <Route path='/author' element={<Author/>} />

              </Routes>
            </Box>
            <FooterBar/>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
