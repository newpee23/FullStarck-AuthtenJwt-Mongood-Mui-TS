import { Box, Card, Container, CssBaseline, Divider } from '@mui/material'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FormSingIn from '../components/form/FormSingIn';

type Props = {}

const SingIn = ({ }: Props) => {

    return (
        <>
            <Container component="main" maxWidth="md" className='grid place-items-center min-h-screen'>
                <CssBaseline />
                <Card sx={{ maxWidth: 450 }} className='shadow-custom-md w-full'>
                    <Box className='text-white text-center p-5 flex justify-center'><Box className='bg-blue-700 p-2 w-fit rounded-full'><LockOpenIcon fontSize="large" /></Box></Box>
                    <Divider />
                    <FormSingIn/>
                </Card>
            </Container>
        </>
    )
}

export default SingIn;
