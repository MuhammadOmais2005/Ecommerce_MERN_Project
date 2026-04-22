import { createSlice } from "@reduxjs/toolkit";

const initialAccountList = JSON.parse(localStorage.getItem("myAccountList")) || []
const initialCurrentAccount = JSON.parse(localStorage.getItem("myCurrentAccount")) || []

const accountSlice = createSlice({
    name: "accountList",
    initialState: {
        accountList: initialAccountList,
        currentAccount: initialCurrentAccount
    },
    reducers: {
        addNewAccount: (state, action) => {
            const { email, username, token } = action.payload
            const newAccountList = state.accountList.filter((account) => {
                return account.email != email
            });
            const updatedAccountList = [...newAccountList, action.payload]
            localStorage.setItem("myAccountList", JSON.stringify(updatedAccountList))
            localStorage.setItem("myCurrentAccount", JSON.stringify([action.payload]))
            state.currentAccount = [action.payload]
            state.accountList = updatedAccountList
        },

        logOut: (state, action) => {
            const { email, username } = action.payload
            const updatedAccountList = state.accountList.filter((account) => {
                return account.email != email
            });
            state.accountList = updatedAccountList
            localStorage.setItem("myAccountList", JSON.stringify(updatedAccountList))
            state.currentAccount = []
            localStorage.removeItem("myCurrentAccount")
        },

        setCurrentAccount: (state, action) => {
            state.currentAccount = action.payload;
        },

        setAccountList: (state, action) => {
            state.accountList = action.payload;
        },
    }
})

export default accountSlice.reducer
export const { addNewAccount, logOut, setCurrentAccount, setAccountList } = accountSlice.actions