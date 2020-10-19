import React, { useState } from 'react'
import RUG from 'react-upload-gallery'
import 'react-upload-gallery/dist/style.css' // or scss
import apiUrl from './apiConfig'

type Props = {

}

const Uploader: React.FC<Props> = props => {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false)
  if (isLoading) {
    
    return <div>loading</div>
  }

  return (
    <div className="col-md-6 m-auto py-3">
      <h1>aqsdsad</h1>
      <RUG
        action="/api/upload" // upload route
        source={response => response.source} // response image source
      />
    </div>
  )
}
export default Uploader
