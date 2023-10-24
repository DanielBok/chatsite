type NextPageParams<P extends Record<string, string | string[]> = {}, T extends Record<string, string | string[]> = {}> = {
  params: P
  searchParams: T
}
