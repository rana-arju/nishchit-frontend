import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiError } from "@/lib/api-client";
import {
  fetchCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  setShop,
  type LoginPayload,
  type RegisterPayload,
} from "@/features/auth/api/auth";
import type { AuthUser } from "@/features/auth/schemas/api";

export type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

interface AuthState {
  user: AuthUser | null;
  status: AuthStatus;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

function extractErrorMessage(error: unknown, fallback: string): string {
  return error instanceof ApiError ? error.message : fallback;
}

export const register = createAsyncThunk<AuthUser, RegisterPayload, { rejectValue: string }>(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      return await registerUser(payload);
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(error, "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।"),
      );
    }
  },
);

export const login = createAsyncThunk<AuthUser, LoginPayload, { rejectValue: string }>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      return await loginUser(payload);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "লগইন করা যায়নি। আবার চেষ্টা করুন।"));
    }
  },
);

export const fetchMe = createAsyncThunk<AuthUser, void, { rejectValue: string }>(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCurrentUser();
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "You are not logged in."));
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutUser();
});

export const saveShop = createAsyncThunk<AuthUser, string, { rejectValue: string }>(
  "auth/saveShop",
  async (shopName, { rejectWithValue }) => {
    try {
      return await setShop(shopName);
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(error, "শপ সংরক্ষণ করা যায়নি। আবার চেষ্টা করুন।"),
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "unauthenticated";
        state.error = action.payload ?? "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।";
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "unauthenticated";
        state.error = action.payload ?? "লগইন করা যায়নি। আবার চেষ্টা করুন।";
      })
      .addCase(fetchMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.status = "unauthenticated";
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "unauthenticated";
        state.user = null;
      })
      .addCase(saveShop.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;

export function selectCurrentUser(state: { auth: AuthState }): AuthUser | null {
  return state.auth.user;
}

export function selectAuthStatus(state: { auth: AuthState }): AuthStatus {
  return state.auth.status;
}
