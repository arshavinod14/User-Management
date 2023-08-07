import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    editedUser: false,
    deletedUser: false
}

const UsersUpdateSlice = createSlice({
    name: 'users/update',
    initialState,
    reducers:{
        edit_user: (state) =>{ state.editedUser = !state.editedUser},
        delete_user: (state) => {state.deletedUser = !state.deletedUser}

    }
})


export const {delete_user, edit_user} = UsersUpdateSlice.actions

export default UsersUpdateSlice.reducer