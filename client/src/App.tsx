
import { Box } from '@mui/material'
import './App.css'
import AppBarMenu from './components/shatters/AppBarMenu'
import Home from './pages/Home'

const App = () => {

  return (
    <>
      <Box className='h-screen'>
        <AppBarMenu />
        <Home />
      </Box>
    </>
  )
}

export default App
