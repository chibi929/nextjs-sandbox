'use client'

import { useEffect, useState } from 'react'

import { useFirebase } from '@/hooks/useFirebase'
import { FirebaseStorageUtil } from '@/libs/sandbox/FirebaseStorageUtil'
import { Button, Image } from '@nextui-org/react'

import DroppableBox from './DroppableBox'

type Props = {}

const UploadFileList: React.FC<Props> = (props) => {
  const { firebaseStorage } = useFirebase()
  const [firebaseStorageUtil, setFirebaseStorageUtil] = useState<FirebaseStorageUtil | null>(null)
  const [files, setFiles] = useState<{ key: string; src: string }[]>([])

  useEffect(() => {
    if (!firebaseStorage) {
      return
    }

    setFirebaseStorageUtil(new FirebaseStorageUtil(firebaseStorage))
  }, [firebaseStorage])

  const eventHandlers = {
    doGetUploadFileList: async () => {
      if (!firebaseStorageUtil) {
        return
      }

      const res = await firebaseStorageUtil.listAll()
      setFiles((await firebaseStorageUtil.listDownloadUrl(res.items)).reverse())
    },
    handleUploaded: (src: string) => {
      setFiles((prevValue) => [{ key: `${Math.random().toString(36)}`, src }, ...prevValue])
    },
  }

  if (!firebaseStorage) {
    return <div>Loading...</div>
  }

  return (
    <>
      <DroppableBox onUploaded={eventHandlers.handleUploaded} />

      <div className="text-right">
        <Button color="primary" onClick={eventHandlers.doGetUploadFileList}>
          {!files.length ? 'アップロードファイル一覧を取得する' : '最新状態を取得する'}
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 mx-auto">
        {files.map((row) => {
          return <Image shadow="md" key={row.key} width={128} alt={row.key} src={row.src} />
        })}
      </div>
    </>
  )
}

export default UploadFileList
