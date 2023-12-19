'use client'

import { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { useFirebase } from '@/hooks/useFirebase'
import { FirebaseUtil } from '@/libs/sandbox/firebase_utils'
import { Button, Input } from '@nextui-org/react'

const Page: NextPage = () => {
  const { realtimeDatabase } = useFirebase()
  const [firebase, setFirebase] = useState<FirebaseUtil | null>(null)
  const [text, setText] = useState('')

  useEffect(() => {
    if (realtimeDatabase) {
      setFirebase(new FirebaseUtil(realtimeDatabase))
    }
  }, [realtimeDatabase])

  const eventHandler = {
    click: () => {
      if (!text) {
        return
      }

      firebase?.sandboxPush(text)
      setText('')
    },
  }

  return (
    <main>
      <Input
        type="text"
        variant="bordered"
        label="任意の文字列"
        labelPlacement="outside"
        placeholder="任意の文字列を入力してください"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button color="primary" onClick={eventHandler.click}>
        ボタン
      </Button>
    </main>
  )
}

export default Page
