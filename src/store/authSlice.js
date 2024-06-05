// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUp: (state, action) => {
      const { username, password } = action.payload;
      const newUser = { username, password };

      // Store user in AsyncStorage
      AsyncStorage.setItem('user', JSON.stringify(newUser));

      state.user = newUser;
      state.isAuthenticated = true;
    },
    logIn: (state, action) => {
      const { username, password } = action.payload;

      // Retrieve user from AsyncStorage
      AsyncStorage.getItem('user').then((storedUser) => {
        const user = JSON.parse(storedUser);
        if (user && user.username === username && user.password === password) {
          state.user = user;
          state.isAuthenticated = true;
        }
      });
    },
    logOut: (state) => {
      AsyncStorage.removeItem('user');

      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { signUp, logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
