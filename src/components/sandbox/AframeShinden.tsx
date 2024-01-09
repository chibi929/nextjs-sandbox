'use client'

import { useEffect, useState } from 'react'

type Props = {
  embedded?: boolean
}

const AframeHalloWorld: React.FC<Props> = (props) => {
  const [rendered, setRendered] = useState(false)
  useEffect(() => {
    require('aframe')
    setRendered(true)
  }, [])

  if (!rendered) {
    return <div>Loading...</div>
  }

  const { embedded } = props
  return (
    // @ts-ignore: たぶん、Boolean 型が正解
    <a-scene embedded={embedded}>
      <a-sky color="#ccffff"></a-sky>
      <a-entity
        position="0 0.5 -1"
        rotation="0 0 0"
        gltf-model="/models/kamisama_no_shinden.glb"
        scale="1 1 1"
      ></a-entity>
    </a-scene>
  )
}

export default AframeHalloWorld
