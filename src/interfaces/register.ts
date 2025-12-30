
export interface RegisterSuccess {
  message: string
  user: User
  token: string
}

export interface User {
  name: string
  email: string
  role: string
}
export interface RegisterFaild {
  statusMsg: string
  message: string
}
