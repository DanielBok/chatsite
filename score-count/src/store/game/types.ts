export type GameReducer = {
  room: CreateRoomResponse | null
  scores: {
    uuid: string  // player's UUID
    player: string  // player's name
    score: number
  }[]
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
