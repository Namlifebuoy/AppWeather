import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'slice',
  initialState: {
    infoUser: null,
    change: 1,
    uid: '',
  },
  reducers: {
    setUid: (state, action) => {
      console.log('action.payload', action.payload);
      state.uid = action.payload;
    },
    setInfoUser: (state, action) => {
      state.infoUser = action.payload;
    },
    changeAvatar: (state, action) => {
      state.infoUser.avatar = `data:image/png;base64,${action.payload}`;
    },
    changeName: (state, action) => {
      state.infoUser.displayName = action.payload;
    },
    changeAccount: (state, action) => {
      state.change += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setInfoUser, changeAvatar, changeName, changeAccount, setUid} =
  slice.actions;

export default slice.reducer;
