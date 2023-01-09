import {useState, useEffect} from 'react'
import {storage} from '../firebase/Firebase'

const useStorage = (image) => {
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const storageRef = storage.ref(image.name)
        storageRef.put(image).on('state_changed', (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
          setProgress(percentage)
        }, (err) => {
          setError(err)
        }, async () => {
          const url = await storageRef.getDownloadURL()
          setUrl(url)
        })
    }, [image])

    return {progress, url, error}
    
}

export default useStorage;