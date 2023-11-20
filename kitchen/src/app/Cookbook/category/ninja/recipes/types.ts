import React from "react";

export type ScalarRange = number | { min: number, max: number }


export type Timings = {
  prep: ScalarRange
  chill: ScalarRange
  cook: ScalarRange
  pressureBuild: ScalarRange
  pressureCook: ScalarRange
  pressureRelease: ScalarRange | "quick"
  airCrisp: ScalarRange
  bakeRoast: ScalarRange
  broil: ScalarRange
  total: ScalarRange
}

export type Recipe = {
  id: string
  name: string
  difficulty: number
  servings: ScalarRange
  ingredients: {
    searchKey: string
    description: string
  }[]
  directions: React.ReactNode[]
  timing: Timings
  extra?: Record<string, string[]>
  tips?: React.ReactNode[]
  image?: string
}
