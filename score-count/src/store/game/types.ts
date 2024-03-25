export type GameReducer = {
  room: CreateRoomResponse | null
  loading: {
    room: LoadingState
  },
  error: string | null,
};

export type CreateRoomResponse = {
  id: number
  name: string
  maxPlayers: number
}
