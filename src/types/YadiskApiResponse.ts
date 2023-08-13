import type { HTTPMethod } from "./HTTPMethod"

export interface YadiskApiResponse {
  href: string
  method: HTTPMethod
  templated: boolean
}