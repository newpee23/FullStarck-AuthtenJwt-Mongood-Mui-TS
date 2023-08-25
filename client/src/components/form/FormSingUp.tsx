import { useState, useEffect } from 'react'
import { Box, Button, CardActions, CardContent, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { dataRegister } from '../../types/authType';
import { cleanState, register } from '../../store/slices/authSlices';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
type Props = {}

const FormSingUp = ({ }: Props) => {

    const navigate = useNavigate();
    const [statusCleanState, setStatusCleanState] = useState<boolean>(false);
    const registerStatus = useAppSelector((state) => state?.auth);
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<dataRegister>({
        username: '',
        password: '',
        confirm: ''
    })

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value }: { name: string, value: string } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value.trim(),  // ใช้ .trim() เพื่อตัดช่องว่างหน้าและหลังข้อความ,
        }));
    };

    const onSubmitForm = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        // Check Password isMate
        if (formData.password === formData.confirm) {
            dispatch(register({ username: formData.username, password: formData.password }))
        } else {
            toast.error("Password Not Match Confirm", {
                delay: 0, // เริ่มแสดงทันที
                autoClose: 4000,
                className: "toast-error",
            });
        }
    }

    useEffect(() => {
        setStatusCleanState(true);
        dispatch(cleanState());
    }, []);

    useEffect(() => {
        if (registerStatus.message !== '' && statusCleanState) {
            let className: string = 'toast-error';
            let toastSu = toast.error;

            if (registerStatus.message === 'Register Success') {
                className = 'toast-success';
                toastSu = toast.success;
            }

            toastSu(registerStatus.message, {
                delay: 0,
                autoClose: 4000,
                className: className,
            });

            if (registerStatus.message === 'Register Success') {
                setTimeout(() => {
                    dispatch(cleanState());
                    navigate("/");
                  }, 2000); // หน่วงเวลา 2 วินาที (2000 มิลลิวินาที)
            }
            
        }
    }, [registerStatus.message]);


    return (
        <>
            <ToastContainer />
            <form onSubmit={onSubmitForm}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className='text-center'>
                        Sing In
                    </Typography>
                    <Box className='my-5'>
                        <TextField required id="username" name="username" label="Username" variant="outlined" className='w-full' size='small' value={formData.username} onChange={(e) => onChangeValue(e)} />
                    </Box>
                    <Box className='mb-5'>
                        <TextField required id="password" name="password" label="Password" variant="outlined" className='w-full' size='small' type='password' value={formData.password} onChange={(e) => onChangeValue(e)} />
                    </Box>
                    <Box>
                        <TextField required id="confirm" name="confirm" label="ConfirmPassword" variant="outlined" className='w-full' size='small' type='password' value={formData.confirm} onChange={(e) => onChangeValue(e)} />
                    </Box>
                </CardContent>
                <CardActions className='justify-center p-4 pt-0 flex-col'>
                    <Button variant="contained" className='w-full bg-blue-700' type="submit">Sing Up</Button>
                    <Link to="/"><p className="text-center mt-2 mb-0 text-sm cursor-pointer hover:text-sky-700">Back</p></Link>
                </CardActions>
            </form>
        </>
    )
}

export default FormSingUp