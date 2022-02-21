export interface User {
  username: string
  role?: number
}

export interface AuthProviderState {
  user?: User
  loading: boolean
}

export interface AuthCredential extends User{
  password: string
}

export interface AuthContextAPI extends AuthProviderState {
  login: (credential: AuthCredential) => void
  logout: (redirectTo?: string) => void
}
