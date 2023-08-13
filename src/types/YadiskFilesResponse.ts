import type { YadiskFile } from "./YadiskFile"

export interface YadiskFilesResponse {
  items: YadiskFile[]
  limit: number
  offset: number
}