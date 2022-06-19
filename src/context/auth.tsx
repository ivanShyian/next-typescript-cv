import {createContext, ReactChild, useContext } from 'react'
import {useState} from 'react'
import { setCookies, removeCookies } from 'cookies-next';
import Api from '../api/Api'
import {useRouter} from 'next/router'
const api = new Api()

interface Props {
  children: ReactChild
}

export interface LoginInterface {
  email: string
  password: string
}

export const AppContext = createContext({
  isAdmin: false,
  login: (data: LoginInterface) => {},
  autoLogin: (cookies: any) => {},
  logout: () => {}
})

export function AuthWrapper({ children }: Props) {
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  const autoLogin = (cookies: any) => {
    const {token, expiryDate, userId} = cookies
    if (!token || !expiryDate) {
      return
    }
    if (new Date(expiryDate) <= new Date()) {
      return logout()
    }
    // Request login with userId to check that id exists
    setIsAdmin(true)
  }

  const login = async(data: LoginInterface) => {
    const response = await api.postLogin(data)
    if (response?.token) {
      const remainingMilliseconds = 60 * 60 * 1000
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds)
      setCookies('auth', {
        token: response.token,
        userId: response.userId,
        expiryDate
      }, {
        path: '/',
        maxAge: remainingMilliseconds,
        sameSite: true,
      })
      setIsAdmin(true)
      return router.push('/')
    }
  }

  const logout = () => {
    removeCookies('auth')
  }

  return (
    <AppContext.Provider value={{isAdmin, login, logout, autoLogin}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AppContext);
}
