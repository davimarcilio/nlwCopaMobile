import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
WebBrowser.maybeCompleteAuthSession();
interface UserProps {
    name: String,
    avatarUrl: String,
}
interface AuthProviderProps {
    children: ReactNode,
}
export interface AuthContextDataProps {
    user: UserProps,
    isUserLoading: boolean,
    signIn: () => Promise<void>;

}
export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({} as UserProps)
    const [isUserLoading, setIsUserLoading] = useState(false);
    const [req, res, promptAsync] = Google.useAuthRequest({
        clientId: '841451846318-v7tkbakjcvj5nke1nbu5416lqnu07hlt.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true, }),
        scopes: ['profile', 'email']
    })
    async function signInWithGoogle(access_token: string) {
        console.log('TOKEN DE AUTENTICAÇÃO =>', access_token);


    }
    async function signIn() {
        try {
            setIsUserLoading(true)
            await promptAsync();
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setIsUserLoading(false);
        }

    }
    useEffect(() => {
        if (res?.type === 'success' && res.authentication?.accessToken) {
            signInWithGoogle(res.authentication.accessToken);
        }
    }, [res])
    return (
        <AuthContext.Provider value={{
            signIn,
            isUserLoading,
            user,
        }}>
            {children}
        </AuthContext.Provider>
    )
}