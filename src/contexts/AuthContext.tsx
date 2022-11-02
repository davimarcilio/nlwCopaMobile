import { createContext, ReactNode } from "react";
interface UserProps {
    name: String,
    avatarUrl: String,
}
interface AuthProviderProps {
    children: ReactNode,
}
export interface AuthContextDataProps {
    user: UserProps,
    signIn: () => Promise<void>;

}
export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
    async function signIn() {
        console.log('Vamos Logar!');

    }
    return (
        <AuthContext.Provider value={{
            signIn,
            user: {
                name: 'Henrique',
                avatarUrl: 'https://github.com/RickFernandess.png'
            }
        }}>
            {children}
        </AuthContext.Provider>
    )
}