import React from 'react'
import useStorage from '../hooks/useStorage';

function ProgressBar({image, setImage}) {
const {url, progress} = useStorage(image)

console.log(progress, url);

  return (
    <div className='progress-bar'>progressBar</div>
  )
}

export default ProgressBar