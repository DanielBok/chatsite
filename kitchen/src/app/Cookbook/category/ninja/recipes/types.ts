import React from "react";

export type ScalarRange = number | { min: number, max: number }


export type Timings = {
  prep: ScalarRange
  cook: ScalarRange
  pressureBuild: ScalarRange
  pressureCook: ScalarRange
  pressureRelease: ScalarRange | "quick"
  airCrisp: ScalarRange
  bakeRoast: ScalarRange
  total: ScalarRange
}

export type Recipe = {
  id: number
  name: string
  difficulty: number
  servings: ScalarRange
  ingredients: {
    searchKey: string
    description: string
  }[]
  directions: React.ReactNode[]
  timing: Timings
  tips?: React.ReactNode[]
  image?: string
}
