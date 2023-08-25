import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, CancelTokenSource } from "axios";
import {
  UserData,
  UserDataAll,
  responseStatusUser,
  updataDataType,
  updateDataType,
} from "../../types/updateDataType";
import { SERVER_APP_API } from "../../api/config";

const initialState: updateDataType = {
  userData: { username: "", role: "", image: null },
  userDataAll: [], // ให้ userDataAll เป็นอาร์เรย์ว่าง
  message: "",
  error: "",
  loading: false,
};

// สร้างตัวแปรเพื่อใช้ในการยกเลิก
const cancelSource: CancelTokenSource = axios.CancelToken.source();

const token: string | null = localStorage.getItem("tokenAuth");

// GetUserDataAll function
export const getUserDataAll = createAsyncThunk<UserDataAll>(
  "GetUserDataAll/loadAsync",
  async (): Promise<UserDataAll> => {
    try {
      const response: AxiosResponse = await axios.get(
        `${SERVER_APP_API}/getUserAll/`,
        {
          headers: {
            "token-request": token,
          },
          cancelToken: cancelSource.token,
        }
      );

      if (response) {
        const responseData: UserDataAll = response.data; // Extract data from Axios response
        return responseData;
      } else {
        throw new Error("Empty response"); // Ensure there's a return statement for all code paths
      }
    } catch (error: any) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error);
      } else {
        console.log("Error:", error);
      }
      throw error; // Rethrow the error to be handled by the caller
    }
  }
);

// GetUserData function
export const getUserData = createAsyncThunk<UserData, string>(
  "GetUserData/loadAsync",
  async (username): Promise<UserData> => {
    try {
      const response: AxiosResponse = await axios.get(
        `${SERVER_APP_API}/getUser/${username}`,
        {
          headers: {
            "token-request": token,
          },
          cancelToken: cancelSource.token,
        }
      );

      if (response) {
        const responseData: UserData = response.data; // Extract data from Axios response
        return responseData;
      } else {
        throw new Error("Empty response"); // Ensure there's a return statement for all code paths
      }
    } catch (error: any) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error);
      } else {
        console.log("Error:", error);
      }
      throw error; // Rethrow the error to be handled by the caller
    }
  }
);

// DeleteImg function
export const deleteImg = createAsyncThunk<string, string>(
  "DeleteImg/loadAsync",
  async (username): Promise<string> => {
    try {
      const response: AxiosResponse = await axios.get(
        `${SERVER_APP_API}/deleteimg/${username}`,
        {
          headers: {
            "token-request": token,
          },
          cancelToken: cancelSource.token,
        }
      );

      if (response) {
        return response.data;
      } else {
        throw new Error("Empty response"); // Ensure there's a return statement for all code paths
      }
    } catch (error: any) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error);
      } else {
        console.log("Error:", error);
      }
      throw error; // Rethrow the error to be handled by the caller
    }
  }
);

// UpdateData function
export const updateDataUser = createAsyncThunk<string, updataDataType>(
  "updateDataUser/loadAsync",
  async (updateData): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("username", updateData.username);
      formData.append("oldpassword", updateData.oldpassword);
      formData.append("newpassword", updateData.newpassword);
      formData.append("confirmpassword", updateData.confirmpassword);
      if (updateData.image) {
        formData.append("image", updateData.image); // ตรงนี้เพื่อเพิ่มข้อมูลไฟล์รูปภาพ
      }

      const response: AxiosResponse = await axios.put(
        SERVER_APP_API + "/updateDataUser",
        formData,
        {
          headers: {
            "token-request": token,
          },
          cancelToken: cancelSource.token,
        }
      );

      return response.data;
    } catch (error: any) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        console.log("Error:", error.message);
      }
      throw error;
    }
  }
);

// UpdateStatusUser function
export const updateStatusUser = createAsyncThunk<string, responseStatusUser>(
  "updateStatusUser/loadAsync",
  async (data): Promise<string> => {
    try {
      const response: AxiosResponse = await axios.put(
        SERVER_APP_API + "/updateStatusUser",
        data,
        {
          headers: {
            "token-request": token,
          },
          cancelToken: cancelSource.token,
        }
      );
  
      return response.data;
    } catch (error: any) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        console.log("Error:", error.message);
      }
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GetUserDataAll/loadAsync function
    builder.addCase(getUserDataAll.pending, (state) => {
      state.loading = true;
      state.userDataAll = [];
    });
    builder.addCase(getUserDataAll.fulfilled, (state, action) => {
      state.loading = false;
      state.userDataAll = action.payload;
    });
    builder.addCase(getUserDataAll.rejected, (state, action) => {
      state.loading = false;
      state.userDataAll = [];
      state.error = action.error.message || "";
    });
    // GetUserData/loadAsync function
    builder.addCase(getUserData.pending, (state) => {
      state.loading = true;
      state.message = "";
      state.userData = { username: "", role: "", image: null };
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      const dataResponse: UserData = action.payload;
      state.loading = false;
      if (dataResponse) {
        state.userData = dataResponse;
      }
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.loading = false;
      state.userData = { username: "", role: "", image: null };
      state.message = "";
      state.error = action.error.message || "";
    });
    // DeleteImg/loadAsync function
    builder.addCase(deleteImg.pending, (state) => {
      state.loading = true;
      state.message = "";
    });
    builder.addCase(deleteImg.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase(deleteImg.rejected, (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = action.error.message || "";
    });
    // Register/loadAsync function
    builder.addCase(updateDataUser.pending, (state) => {
      state.loading = true;
      state.message = "";
    });
    builder.addCase(updateDataUser.fulfilled, (state, action) => {
      const dataResponse: string = action.payload;
      state.loading = false;
      state.message = dataResponse;
    });
    builder.addCase(updateDataUser.rejected, (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = action.error.message || "";
    });
     // UpdateStatusUser/loadAsync function
     builder.addCase(updateStatusUser.pending, (state) => {
      state.loading = true;
      state.message = "";
    });
    builder.addCase(updateStatusUser.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase(updateStatusUser.rejected, (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = action.error.message || "";
    });
  },
});

export default userSlice.reducer;
