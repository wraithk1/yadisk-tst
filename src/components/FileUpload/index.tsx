import React, { useState } from 'react'
import yadisk from '../../yadisk.config.json'
import headers from '../../utils/headers'
import type { YadiskApiResponse } from '../../types/YadiskApiResponse'
import type { HTTPMethod } from '../../types/HTTPMethod'

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

function FileUpload({ setIsLoading }: Props) {
  const [files, setFiles] = useState<FileList | null>(null)

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (files == null || (files as FileList).length === 0) throw new Error('Min of 1 file can be uploaded')
      else if ((files as FileList).length > 100) throw new Error('Max of 100 files can be uploaded')

      setIsLoading(true)

      for (let i = 0; i < files.length; i++) {
        const fileName = files[i].name
        const FOLDER_URL = yadisk.API.UPLOAD + 'disk:/Temp/' + fileName + '&overwrite=true'

        const response = await fetch(FOLDER_URL, { headers })
        const result: YadiskApiResponse = await response.json()

        const formData = new FormData()
        formData.set('file', files[i])
        await uploadFile(result.href, result.method, formData)
      }

      setFiles(null)
      setIsLoading(false)
    } catch (e) {
      alert((e as Error).message)
    }
  }

  const uploadFile = async (url: string, method: HTTPMethod, body: FormData) => {
    try {
      const response = await fetch(url, {
        method,
        body,
      })
      console.log('file upload status', `${response.status} ${response.statusText}`)
    } catch (e) {
      alert((e as Error).message)
    }
  }

  const inputChangeHandler = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setFiles(target.files)
  }

  return (
    <div className='file-upload'>
      <form onSubmit={submitHandler} className='file-upload__form'>
        <label htmlFor='fileinput' className='btn'>
          Select files
        </label>
        <input type='file' id='fileinput' name='fileInput' onChange={inputChangeHandler} multiple hidden />
        <button type='submit' className='btn'>
          Upload
        </button>
      </form>
      <ul className='file-upload__list'>
        {files && Array.from(files).map((file, idx) => <li key={idx}>{file.name}</li>)}
      </ul>
    </div>
  )
}

export default FileUpload
