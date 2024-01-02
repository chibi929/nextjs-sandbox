'use client'

import Image from 'next/image'
import { ChangeEvent, DragEvent, useState } from 'react'

import { useFirebase } from '@/hooks/useFirebase'
import { FirebaseStorageUtil } from '@/libs/sandbox/FirebaseStorageUtil'
import { TrashIcon } from '@heroicons/react/20/solid'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'

type Props = {}

const DroppableBox: React.FC<Props> = (props) => {
  const [fileUrl, setFileUrl] = useState('')
  const { firebaseStorage } = useFirebase()

  const eventHandlers = {
    handleFileInput: (evt: ChangeEvent<HTMLInputElement>) => {
      evt.preventDefault()
      evt.stopPropagation()
      handleFiles(evt.target.files)
    },
    handleDragOver: (evt: DragEvent<HTMLLabelElement>) => {
      evt.preventDefault()
      evt.stopPropagation()
    },

    handleDropInput: (evt: DragEvent<HTMLLabelElement>) => {
      evt.preventDefault()
      evt.stopPropagation()
      handleFiles(evt.dataTransfer.files)
    },
    text: () => {
      setFileUrl('')
    },
  }

  const handleFiles = async (files?: FileList | null) => {
    if (!firebaseStorage || !files || !files[0]) {
      return
    }

    const storageUtil = new FirebaseStorageUtil(firebaseStorage)
    const imageUrl = await storageUtil.upload(files[0])
    setFileUrl(imageUrl)
  }

  return (
    <div className="flex items-center justify-center w-full h-full max-h-64">
      {fileUrl ? (
        <div className="relative flex justify-center w-full h-full">
          <Image
            className="w-auto h-auto max-w-full max-h-full"
            src={fileUrl}
            width={320}
            height={240}
            alt="プレビュー"
          />
          <TrashIcon
            className="absolute bottom-0 right-0 cursor-pointer w-6 text-red-500"
            onClick={eventHandlers.text}
          />
        </div>
      ) : (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          onDragOver={eventHandlers.handleDragOver}
          onDrop={eventHandlers.handleDropInput}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <CloudArrowUpIcon className="w-8 h-8" />
            <p className="mb-2 text-sm">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" onChange={eventHandlers.handleFileInput} />
        </label>
      )}
    </div>
  )
}

export default DroppableBox
