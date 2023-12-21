'use client'

import { NextPage } from 'next'
import { FormEvent, useEffect, useRef, useState } from 'react'

import SandboxTable from '@/components/sandbox/SandboxTable'
import { useFirebase } from '@/hooks/useFirebase'
import { FirebaseUtil } from '@/libs/sandbox/firebase_utils'
import { Button, Input } from '@nextui-org/react'

const Page: NextPage = () => {
  const { realtimeDatabase } = useFirebase()
  const [firebase, setFirebase] = useState<FirebaseUtil | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [text, setText] = useState('')

  useEffect(() => {
    if (!realtimeDatabase) {
      return
    }
    setFirebase(new FirebaseUtil(realtimeDatabase))
  }, [realtimeDatabase])

  const eventHandler = {
    submit: (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault()
      evt.stopPropagation()

      if (!text) {
        return
      }

      firebase?.sandboxPush(text)
      setText('')
      inputRef?.current?.focus()
    },
  }

  return (
    <main>
      <SandboxTable />
      <form onSubmit={eventHandler.submit}>
        <Input
          ref={inputRef}
          type="text"
          variant="bordered"
          label="任意の文字列"
          labelPlacement="outside"
          placeholder="任意の文字列を入力してください"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" color="primary">
          登録する
        </Button>
      </form>
    </main>
  )
}

export default Page
