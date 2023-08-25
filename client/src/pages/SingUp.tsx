import { Box, Card, Container, CssBaseline, Divider } from '@mui/material'
import RememberMeIcon from '@mui/icons-material/RememberMe';
import FormSingUp from '../components/form/FormSingUp';

type Props = {}

const SingUp = ({ }: Props) => {
  return (
    <>
      <Container component="main" maxWidth="md" className='grid place-items-center min-h-screen'>
        <CssBaseline />
        <Card sx={{ maxWidth: 450 }} className='shadow-custom-md w-full'>
          <Box className='text-white text-center p-5 flex justify-center'><Box className='bg-blue-700 p-2 w-fit rounded-full'><RememberMeIcon fontSize="large" /></Box></Box>
          <Divider />
          <FormSingUp/>
        </Card>
      </Container>
    </>
  )
}

export default SingUp