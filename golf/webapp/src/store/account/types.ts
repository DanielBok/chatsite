export type AccountReducer = {
  user?: User
  loading: boolean
}

export type User = {
  id: number
  username: string
  name: string
  isAdmin: boolean
  imagePath: string
}


