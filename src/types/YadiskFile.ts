type YadiskResource = 'dir' | 'file'

export interface YadiskFile {
  public_key: string
  public_url: string
  preview: string
  name: string
  custom_properties: object
  created: string | Date
  modified: string | Date
  path: string
  origin_path: string
  md5: string
  type: YadiskResource
  mime_type: string
  size: number
}