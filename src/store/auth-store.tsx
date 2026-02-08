import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthUser ={
    id: string;
    name: string;
    email: string;
}

type AuthState ={
    user: AuthUser | null;
    apikey: string | null;
    isAuthenticated: boolean;
    login: (payload: {apikey: string; user: AuthUser}) => void;
    logout: () => void;
    setUser: (user: AuthUser | null) => void
}



export const useAuthStore = create<AuthState>()(
    persist((set,get) => ({
        user: null,
        apikey: null,
        isAuthenticated: false,
        login: ({apikey, user}) => {
            set({
                apikey,
                user,
                isAuthenticated: !!apikey,
            });
        },
    logout:() => {
        set({
            apikey: null,
            user: null,
            isAuthenticated: false
        })
    },
    setUser: (user: AuthUser | null) => {
        set({
            user,
            isAuthenticated: !!get().apikey, // buat ambil data, getnya dipanggil di persist, !! tuh baut not null, klo ada jdi true koo gada jadi false 
        })
    },

    }),{
        name: "taskly-auth",
        partialize: (state) => ({
            user: state.user,
            apikey: state.apikey,
            isAuthenticated: state.isAuthenticated
        })
    }
)
);