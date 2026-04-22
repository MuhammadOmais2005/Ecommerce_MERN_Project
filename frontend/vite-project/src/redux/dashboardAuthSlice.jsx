import { createSlice, current } from "@reduxjs/toolkit";


const adminCurrentAccount = JSON.parse(localStorage.getItem("adminCurrentAccount")) || []
const adminAccountList = JSON.parse(localStorage.getItem("adminAccountList")) || []


const dashboardAuthSlice = createSlice({
    name: "dashboardAuthSlice",
    initialState: {
        adminCurrentAccount,
        adminAccountList,
    },
    reducers: {
        addNewAccount: (state, action) => {
            const { email, username, token } = action.payload
            const newAccountList = state.adminAccountList.filter((account) => {
                return account.email != email
            });
            const updatedAccountList = [...newAccountList, action.payload]
            localStorage.setItem("adminAccountList", JSON.stringify(updatedAccountList))
            localStorage.setItem("adminCurrentAccount", JSON.stringify([action.payload]))
            state.adminCurrentAccount = [action.payload]
            state.adminAccountList = updatedAccountList
        },
        logOut: (state, action) => {
            const updatedAccountList = state.adminAccountList.filter((item) => {
                return item.email != state.adminCurrentAccount[0].email
            })
            state.adminAccountList = [...updatedAccountList]
            state.adminCurrentAccount = []
            localStorage.setItem("adminAccountList", JSON.stringify([...updatedAccountList]))
            localStorage.removeItem("adminCurrentAccount")
        },
        setAdminCurrentAccount: (state, action) => {
            state.adminCurrentAccount = action.payload;
        },

        setAdminAccountList: (state, action) => {
            state.adminAccountList = action.payload;
        },
    }
})

export default dashboardAuthSlice.reducer
export const { addNewAccount, logOut, setAdminCurrentAccount, setAdminAccountList } = dashboardAuthSlice.actions