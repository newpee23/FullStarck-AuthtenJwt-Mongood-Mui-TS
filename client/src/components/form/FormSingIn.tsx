import { Box, Button, CardActions, CardContent, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { dataLogin } from "../../types/authType";
import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { cleanState, login } from "../../store/slices/authSlices";

import "react-toastify/dist/ReactToastify.css";

const FormSingIn = () => {

    const dispatch = useAppDispatch();
    const [statusCleanState, setStatusCleanState] = useState<boolean>(false);
    const { message } = useAppSelector((state) => state?.auth);
    const [dataLogin, setDataLogin] = useState<dataLogin>({
        username: '',
        password: ''
    })

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value }: { name: string, value: string } = e.target;
        setDataLogin(prevData => ({
            ...prevData,
            [name]: value.trim(),  // ใช้ .trim() เพื่อตัดช่องว่างหน้าและหลังข้อความ,
        }));
    };

    const onSubmitForm = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        // Check Value Not NUll
        if (dataLogin.username === '' || dataLogin.username === null || dataLogin.password === '' || dataLogin.password === null) {
            toast.error("Username or password is empty or null.", {
                delay: 0, // เริ่มแสดงทันที
                autoClose: 4000,
                className: "toast-error",
            });
        } else {
            dispatch(login(dataLogin));
        }
    }

    useEffect(() => {
        setStatusCleanState(true);
        dispatch(cleanState());
    }, []);

    useEffect(() => {

        if (message !== '' && statusCleanState) {
            let className: string = 'toast-error';
            let toastSu = toast.error;
            if (message === 'Login Success!!') {
                className = 'toast-success';
                toastSu = toast.success;
            }
            toastSu(message, {
                delay: 0,
                autoClose: 4000,
                className: className,
            });
        }
    }, [message]);

    return (
        <>
            <ToastContainer />
            <form onSubmit={onSubmitForm}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className='text-center'>
                        Sing In
                    </Typography>
                    <Box className='my-5'>
                        <TextField required id="username" name="username" label="Username" variant="outlined" className='w-full' size='small' value={dataLogin.username} onChange={(e) => onChangeValue(e)} />
                    </Box>
                    <Box>
                        <TextField required id="password" name="password" label="Password" variant="outlined" className='w-full' size='small' type='password' value={dataLogin.password} onChange={(e) => onChangeValue(e)} />
                    </Box>
                </CardContent>
                <CardActions className='justify-center p-4 pt-0 flex-col'>
                    <Button variant="contained" className='w-full bg-blue-700' type="submit">Sing In</Button>
                    <Link to="SingUp"><p className="text-center mt-2 mb-0 text-sm cursor-pointer hover:text-sky-700">Create New Account</p></Link>
                </CardActions>
            </form>
        </>
    )
}

export default FormSingIn;