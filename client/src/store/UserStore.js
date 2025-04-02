import {create} from "zustand";

const UserStore = create((set) => ({
    loginUser: null,
    setUser: (user) => set((state) => ({loginUser: user}))
}))

export default UserStore