import { useState, useEffect, createContext } from 'react'

const AudioContext = createContext<any>({
  audioFiles: [],
  isGranted: false
})

export const AudioProvider = () => {
  const [audioFiles, setAudioFiles] = useState<any[]>([]);
  const [isGranted, setIsGranted] = useState(false);
  
  return (
    
  )
}