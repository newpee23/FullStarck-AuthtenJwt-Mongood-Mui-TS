import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authType, dataLogin } from "../../types/authType";
import axios, { AxiosResponse, CancelTokenSource } from "axios";
import { BASEURL, SERVER_APP_API } from "../../api/config";
import { setLocalTokenUser, setLocalUser } from "../../components/localStorage";

interface initialStateType extends authType {
  loading: boolean;
  error: string;
}

const initialState: initialStateType = {
  user: null,
  loading: false,
  token: undefined,
  message: "",
  error: "",
};
// สร้างตัวแปรเพื่อใช้ในการยกเลิก
const cancelSource: CancelTokenSource = axios.CancelToken.source();


// Login function
// authType ชนิดข้อมูลที่คาดหวังจากการเรียก API
// dataLogin ชนิดข้อมูลที่ส่งให้กับการเรียก API
export const login = createAsyncThunk<authType, dataLogin>(
  "login/loadAsync",
  async (dataLogin): Promise<authType> => {
    try {
      const response: AxiosResponse = await axios.post(
        SERVER_APP_API + "/loginUser",
        dataLogin,
        {
          headers: {
            "Content-Type": "application/json",
          },
          cancelToken: cancelSource.token,
        }
      );

      const dataResponse: authType = response.data;

      return dataResponse;
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

// Register function
export const register = createAsyncThunk<string, dataLogin>(
  "register/loadAsync",
  async (dataRegister): Promise<string> => {
    try {
      const response: AxiosResponse = await axios.post(
        SERVER_APP_API + "/registerUser",
        dataRegister,
        {
          headers: {
            "Content-Type": "application/json",
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

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // cleanState function
    cleanState: (): initialStateType => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    // login/loadAsync function
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.message = "";
      state.token = "";
      state.error = "";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const dataResponse: authType = action.payload;
      state.loading = false;
      state.user = null;
      state.error = "";
      state.message = dataResponse.message;
      state.token = dataResponse.token;

      if (dataResponse.user && dataResponse.token) {
        cancelSource.cancel();
        setLocalUser({
          _id: dataResponse.user._id,
          username: dataResponse.user.username,
          role: dataResponse.user.role,
        });
        setLocalTokenUser(dataResponse.token);
        //Check roleUser
        switch (dataResponse.user.role) {
          case "admin":
            setTimeout(() => {
              // 👇️ redirects to an external URL
              window.location.replace(BASEURL+"dashboard");
            }, 1000);
            break;
          case "user":
            setTimeout(() => {
              // 👇️ redirects to an external URL
              window.location.replace(BASEURL);
            }, 1000);
            break;
          default:
            setTimeout(() => {
              // 👇️ redirects to an external URL
              window.location.replace(BASEURL);
            }, 1000);
            break;
        }
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message || "";
      state.message = "";
      state.token = "";
    });
    // Register/loadAsync function
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.message = "";
    });
    builder.addCase(register.fulfilled, (state, action) => {
      const dataResponse: string = action.payload;
      state.loading = false;
      state.message = dataResponse;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });
  },
});

// Action creators
export const { cleanState } = authSlice.actions;
export default authSlice.reducer;
