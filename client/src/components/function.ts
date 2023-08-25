import { BASEURL } from "../api/config";
import { localStorageType } from "../types/authType";
import { setLocalTokenUser, setLocalUser } from "./localStorage";

export const getUserToken = (): string | null => {
  const user: string | null = localStorage.getItem("user");
  if (user) {
    try {
      const parsedData: localStorageType = JSON.parse(user);
      if (parsedData.username) {
        return parsedData.username as string;
      }
      return "";
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }
  return "Please login";
};

export const handleLogOut = (): void => {
  setLocalUser({ _id: null, username: null, role: null });
  setLocalTokenUser("");
  window.location.replace(BASEURL);
};

export const formatCreatedAt = (isoDateString: string): string => {
  const date = new Date(isoDateString); // สร้างวัตถุ Date จาก ISO 8601 ของ CREATEDAT
  const day = date.getDate().toString().padStart(2, "0"); // รับวันที่และเพิ่ม 0 ด้านหน้าถ้าเป็นเลขเดียว
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // เดือนเริ่มจาก 0 เพิ่มเป็น 1 และเพิ่ม 0 ด้านหน้าถ้าเป็นเลขเดียว
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};
