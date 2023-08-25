import { useState, ChangeEvent, useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PasswordIcon from '@mui/icons-material/Password';
import './home.css';
import "react-toastify/dist/ReactToastify.css";
import { getUserToken } from "../components/function";
import { AccountCircle } from "@mui/icons-material";
import { updataDataType } from "../types/updateDataType";
import { deleteImg, getUserData, updateDataUser } from "../store/slices/userSlices";
import { useAppDispatch, useAppSelector } from "../store/store";
import { toast, ToastContainer } from 'react-toastify';
import { SERVER_APP_API } from "../api/config";
function YourComponent() {

  const dispatch = useAppDispatch();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | undefined>();
  const { message, userData } = useAppSelector((state) => state?.user);
  const [formData, setFormData] = useState<updataDataType>({
    username: getUserToken() || '',
    oldpassword: '',
    newpassword: '',
    confirmpassword: '',
    image: undefined
  })

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = event.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);

        // Update formData with the selected image data
        setFormData(prevData => ({
          ...prevData,
          image: file, // Store the image data in formData
        }));
      };
      reader.readAsDataURL(file);
    }
  };

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
    if (formData.oldpassword !== '') {
      if (formData.newpassword === formData.confirmpassword && formData.newpassword !== '' && formData.confirmpassword !== '') {
        dispatch(updateDataUser(formData));
      } else {
        toast.error("Password Not Match Confirm", {
          delay: 0, // เริ่มแสดงทันที
          autoClose: 4000,
          className: "toast-error",
        });
      }
    } else {
      dispatch(updateDataUser(formData));
    }

  }

  useEffect(() => {
    dispatch(getUserData(formData.username));
  }, []);

  useEffect(() => {
    if (message !== '') {
      let className: string = 'toast-error';
      let toastSu = toast.error;

      if (message === 'Document updated successfully') {
        className = 'toast-success';
        toastSu = toast.success;
        dispatch(getUserData(formData.username));
        setSelectedImage(null);
        setFormData({
          username: getUserToken() || '',
          oldpassword: '',
          newpassword: '',
          confirmpassword: '',
          image: undefined
        });
      }
      if (message === 'ลบไฟล์ภาพเรียบร้อยแล้ว') {
        className = 'toast-success';
        toastSu = toast.success;
        dispatch(getUserData(formData.username));
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
      <Box className='w-full custom-md'>
        <Box className='m-5 h-full'>
          <Box sx={{ boxShadow: 2 }} className='rounded-md bg-slate-50 custom-md'>
            <form className="flex justify-center items-center flex-col" onSubmit={onSubmitForm}>
              <div className="shrink-0 m-3">
                <img className="h-32 w-32 object-cover rounded-full box-shadow" src={selectedImage ? selectedImage : userData?.image ? SERVER_APP_API + '/getimg/' + userData?.image : "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"} alt="Current profile" />
              </div>
              <div className="m-3">
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
                </label>
              </div>
              <div className="m-3">
                <p className="m-0">Role : user </p>
              </div>
              <div className="m-3">
                <p className="m-0">Username : {getUserToken()}</p>
              </div>
              <div className="mb-0 w-full sm:w-80 sm:mb-3">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<EditIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>EditData</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box className="flex items-end mb-2">
                      <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField id="input-with-sx" className="w-full" value={formData.username} name="username" label="Username" variant="standard" inputProps={{ readOnly: true }} />
                    </Box>
                    <Box className="flex items-end mb-2">
                      <VpnKeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField type="password" id="input-with-sx"  value={formData.oldpassword} className="w-full" name="oldpassword" label="Old Password" variant="standard" onChange={(e) => onChangeValue(e)} />
                    </Box>
                    <Box className="flex items-end mb-2">
                      <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField type="password" className="w-full" value={formData.newpassword} id="input-with-sx" name="newpassword" label="New Password" variant="standard" onChange={(e) => onChangeValue(e)} />
                    </Box>
                    <Box className="flex items-end mb-2">
                      <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField type="password" className="w-full" value={formData.confirmpassword} id="input-with-sx" name="confirmpassword" label="Confirm Password" variant="standard" onChange={(e) => onChangeValue(e)} />
                    </Box>
                    <div className='mt-5 text-center'>
                      {selectedImage &&
                        <Button variant="contained" onClick={() => {
                          setSelectedImage(null);
                          setFormData((prevData) => ({
                            ...prevData,
                            image: undefined, // Update the image field to undefined
                          }));
                        }} className=' bg-orange-600 hover:bg-orange-700 mb-3' type="button">
                          Delete Image
                        </Button>
                      }
                      {userData?.image &&
                        <Button
                          variant="contained"
                          className='bg-red-700 hover:bg-red-900 mb-3'
                          type="button"
                          onClick={() => dispatch(deleteImg(formData.username))}
                        >
                          DELETE IMG PROFILE
                        </Button>
                      }

                    </div>
                    <div className='mt-5 text-center'>
                      <Button variant="contained" color="success" type="submit">
                        SAVE
                      </Button>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default YourComponent;


