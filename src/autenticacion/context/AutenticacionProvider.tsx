import { ReactNode, useEffect, useState } from 'react'
import { AutenticacionContext } from './AutenticacionContext'
import Cookies from 'js-cookie';

export const AutenticacionProvider = ({ children }: { children: ReactNode }) => {
    const token = Cookies.get('token')
    const [isAutenticacion, SetIsAutenticacion] = useState<boolean>(!!token)


    const setToken = (token: string) => {
        if (token) {
            Cookies.set('token', token, {
            })
            SetIsAutenticacion(true)
        }
    }
    useEffect(() => {


        if (token) {
            SetIsAutenticacion(true)
        } else {
            SetIsAutenticacion(false)

        }

    }, [token])

    const cerrarSession = () => {
        Cookies.remove('token')
        SetIsAutenticacion(false)
    }
    return (
        <AutenticacionContext.Provider value={{ cerrarSession, setToken, isAutenticacion: isAutenticacion, token: token }} >
            {children}
        </AutenticacionContext.Provider>
    )
}
