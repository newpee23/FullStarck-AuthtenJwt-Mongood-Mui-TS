import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Box, Switch } from '@mui/material';
import { getUserDataAll, updateStatusUser } from '../../store/slices/userSlices';
import { UserDataAll } from '../../types/updateDataType';
import { SERVER_APP_API } from '../../api/config';
import { formatCreatedAt } from '../function';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type Props = {};

export default function TableAdmin({ }: Props) {
    const dispatch = useAppDispatch();
    const DataAll = useAppSelector((state) => state?.user.userDataAll); // กำหนดค่าเริ่มต้นเป็น []
    const { loading } = useAppSelector((state) => state?.user);
    const [showData, setShowData] = useState(true); // เพิ่ม state เพื่อแสดง/ซ่อนข้อมูล
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    const fetchData = async (): Promise<void> => {
        await dispatch(getUserDataAll());
        await new Promise((resolve) => setTimeout(resolve, 2000)); // รอ 2 วินาที
        setShowData(false);
    };
    const handleSwitchChange = async (username: string, userId: string, newValue: boolean): Promise<void> => {
        setShowData(true);
        // ทำการ dispatch updateStatusUser และรอให้เสร็จสิ้น
        const actionResult = await dispatch(updateStatusUser({ username: username, _id: userId, status: newValue }));
        const message = actionResult.payload as string; // ดึง message จาก actionResult
    
        if (message) {
            let className: string = 'toast-error';
            let toastSu = toast.error;
    
            if (message === 'Document updated successfully') {
                className = 'toast-success';
                toastSu = toast.success;
            }
    
            toastSu(message, {
                delay: 0,
                autoClose: 4000,
                className: className,
            });
        }
    
        fetchData(); // ต้องทำการ fetchData หลังจากที่แสดง toast แล้ว
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <ToastContainer />
            <Box className='w-full custom-md'>
                <Box className='m-5 h-full'>
                    <Box sx={{ boxShadow: 2 }} className='rounded-md bg-slate-50 custom-md'>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            No
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Img
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Username
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Role
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            CreatedAt
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            updatedAt
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showData || loading ? (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td colSpan={8} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">Loading...</td>
                                        </tr>
                                    ) : (
                                        (DataAll as UserDataAll[]).map((user: any, index: number) => (
                                            <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="px-6 py-4 text-center">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="shrink-0 m-3 text-center">
                                                        {user?.img ? <img className="h-32 w-32 object-cover rounded-md box-shadow" src={SERVER_APP_API + '/getimg/' + user?.img} alt="Current profile" /> : '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {user.username}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {user.role}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {formatCreatedAt(user.createdAt)}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {formatCreatedAt(user.updatedAt)}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {user.status ? <button type="button" className="text-white border-0 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2 text-center  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 box-shadow">Active</button> : <button type="button" className="text-white border-0 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 box-shadow">InActive</button>}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <Switch {...label} defaultChecked={user.status} disabled={user.role === 'admin'}
                                                        onChange={(event) => {
                                                            if (user.role !== 'admin') {
                                                                const newValue = event.target.checked;
                                                                handleSwitchChange(user.username, user._id, newValue);
                                                            }
                                                        }} />
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Box>
                </Box>
            </Box>
        </>

    );
}
