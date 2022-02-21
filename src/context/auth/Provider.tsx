import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {AuthContextAPI, AuthCredential, User} from "./types";
import authService from './services'
import {useLocation} from "react-router-dom";

const AuthContext = createContext<AuthContextAPI>({} as AuthContextAPI)

const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<User>()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true)
    const location = useLocation();

    useEffect(() => {
        authService
            .getCurrentUser()
            .then((newUser) => setUser(newUser))
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            .catch(() => {
            })
            .finally(() => setLoadingInitial(false))
    }, [location.pathname])

    function login(credential: AuthCredential) {
        setLoading(true)
        authService
            .login(credential)
            .then((newUser) => setUser(newUser))
            .catch((newError) => setError(newError))
            .finally(() => {
                setLoading(false)
                window.location.href = '/';
            })
    }

    function logout() {
        setLoading(true)
        authService
            .logout()
            .then(() => setUser(undefined))
            .catch((newError) => setError(newError))
            .finally(() => {
                setLoading(false)
                window.location.href = '/';
            })
    }

    const memoValue = useMemo(
        () => ({
            user,
            loading,
            login,
            logout,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [user, loading, error],
    )

    return <AuthContext.Provider value={memoValue}>{!loadingInitial && children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextAPI => useContext(AuthContext)

export default AuthProvider;