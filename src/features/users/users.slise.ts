import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../common/utils/CreateAppAsyncThink";
import { PositionTypePositions, ResponceUsers, usersApi, UsersPayload } from "../users/users.api";
import { RootState } from "../../app/store";


const users = createAppAsyncThunk<any, any>
("users/get", async (arg: number, thunkAPI) => {
  const res = await usersApi.users(arg);
  return res.data;
});

const postUsers = createAppAsyncThunk<any, any>
("users/post", async (arg: UsersPayload[], thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.users.token;
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    await usersApi.postUsers(arg, token);
  } catch (e: any) {
    const err = e.response.data;
    dispatch(userAction.setAppError({ error: err }));
    return thunkAPI.rejectWithValue(null);

  }

});


const token = createAppAsyncThunk<any, any>
("users/token", async (thunkAPI) => {
  const res = await usersApi.token();
  return res.data;
});


const position = createAppAsyncThunk<any, any>
("users/positions", async (arg: number, thunkAPI) => {
  const res = await usersApi.positions();
  return res.data;
});


const slice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    users: <ResponceUsers[]>[],
    totalUsers: 6,
    flagForGetUsers: false,
    position: <PositionTypePositions[]>[],
    token: "",
    error: <ErrorResponce>{},
    successFlag: false,
    rejectFlag: false
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: ErrorResponce }>) => {
      state.error = action.payload.error;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.successFlag = action.payload;
    }

  },
  extraReducers: builder => {
    builder
      .addCase(users.fulfilled, (state, action) => {
        state.totalUsers = action.payload.total_users;
        state.users = action.payload.users;
        state.users.sort((a, b) => a.registration_timestamp - b.registration_timestamp);
        state.flagForGetUsers = true;
      })
      .addCase(users.pending, (state, action) => {
        state.flagForGetUsers = false;
      })
      .addCase(position.fulfilled, (state, action) => {
        state.position = action.payload.positions;
      })
      .addCase(token.fulfilled, (state, action) => {
        state.token = action.payload.token;
      })
      .addCase(postUsers.pending, (state, action) => {
        state.isLoading = true;
        state.successFlag = false;
        state.rejectFlag = false;
      })
      .addCase(postUsers.fulfilled, (state, action) => {
        state.successFlag = true;
        state.isLoading = false;
      })
      .addCase(postUsers.rejected, (state, action) => {
        state.rejectFlag = true;
        state.isLoading = false;
      });
  }
});

export const userReducer = slice.reducer;
export const userAction = slice.actions;
export const userThunks = { users, position, token, postUsers };


export const usersResp = (state: RootState) => state.users.users;
export const userCount = (state: RootState) => state.users.totalUsers;
export const usersLoadingFlag = (state: RootState) => state.users.flagForGetUsers;
export const positions = (state: RootState) => state.users.position;
export const responseError = (state: RootState) => state.users.error;

export const forSuccessFlag = (state: RootState) => state.users.successFlag;
export const rejected = (state: RootState) => state.users.rejectFlag;
export const isLoadingLinear = (state: RootState) => state.users.isLoading;


export type ErrorResponce = {
  success: boolean;
  message: string;
  fails: {
    name: string[];
    email: string[];
    phone: string[];
    position_id: string[];
    photo: string[];
  };
}
export type ErrorResponceFails = {
  name: string[];
  email: string[];
  phone: string[];
  position_id: string[];
  photo: string[];
}