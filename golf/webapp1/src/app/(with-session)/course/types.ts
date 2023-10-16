export type Tee = "Green" | "Red" | "Yellow" | "White" | "Blue" | "Black" | "Silver" | "Gold"

export type DistanceMetric = "meter" | "yard"

export type TeeInfo = {
  id: number;
  tee: Tee
  distance: number[]
  distance_metric: DistanceMetric
}

export type Course = {
  id: number;
  country: string
  location: string
  course: string
  google_map_url: string
  website: string
  active: boolean
  par: number[]
  index: number[]
  tee_info: TeeInfo[]
}
