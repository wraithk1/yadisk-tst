import React, { useEffect, useState } from 'react'
import yadisk from '../../yadisk.config.json'
import FileUpload from '../FileUpload'
import headers from '../../utils/headers'
import type { YadiskFile } from '../../types/YadiskFile'
import type { YadiskFilesResponse } from '../../types/YadiskFilesResponse'

function FileTable() {
  const [files, setFiles] = React.useState<YadiskFile[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getYadiskFiles = async () => {
    try {
      const response = await fetch(yadisk.API.ALL_FILES, { headers })
      const result: YadiskFilesResponse = await response.json()
      setFiles(result.items)
    } catch (e) {
      alert((e as Error).message)
    }
  }

  useEffect(() => {
    getYadiskFiles()
  }, [isLoading])

  return (
    <div className='main'>
      <p className='file-length'>files length: {files.length}</p>
      <hr />
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className='lds-hourglass'></div>
        </div>
      ) : (
        <div className='container'>
          <table>
            <tr style={{ textAlign: 'left' }}>
              <th>Name</th>
              <th>Created</th>
              <th>Path</th>
              <th>Size</th>
            </tr>
            {files.length > 0 ? (
              files.map((file) => (
                <tr key={file.name}>
                  <td>{file.name}</td>
                  <td>{file.created as string}</td>
                  <td>{file.path}</td>
                  <td>{file.size}</td>
                </tr>
              ))
            ) : (
              <tr>No files</tr>
            )}
          </table>
          <FileUpload setIsLoading={setIsLoading} />
        </div>
      )}
    </div>
  )
}

export default FileTable
