'use client'
import { useEffect, useState } from 'react'

import { useFirebase } from '@/hooks/useFirebase'
import { FirebaseUtil, ISandboxData } from '@/libs/sandbox/firebase_utils'
import { TrashIcon } from '@heroicons/react/24/solid'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'

type Props = {}

const SandboxTable: React.FC<Props> = (props) => {
  const { realtimeDatabase } = useFirebase()
  const [firebaseUtil, setFirebaseUtil] = useState<FirebaseUtil | null>(null)
  const [rows, setRows] = useState<ISandboxData[]>([])

  useEffect(() => {
    if (!realtimeDatabase) {
      return
    }

    setFirebaseUtil(new FirebaseUtil(realtimeDatabase))
  }, [realtimeDatabase])

  useEffect(() => {
    if (!firebaseUtil) {
      return
    }

    const unscribes = firebaseUtil.addSandboxListener(
      ({ key, text }) => {
        setRows((prevValue) => [...prevValue, { key, text }])
      },
      ({ key }) => {
        setRows((prevValue) => prevValue.filter((value) => value.key !== key))
      }
    )

    return () => {
      unscribes.forEach((unscribe) => unscribe())
    }
  }, [firebaseUtil])

  const eventHandlers = {
    doDelete: async (key: string) => {
      await firebaseUtil?.deleteSandboxData(key)
    },
  }
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn width="24">DELETE</TableColumn>
      </TableHeader>
      <TableBody>
        {rows.map((row) => {
          return (
            <TableRow key={row.key}>
              <TableCell>{row.text}</TableCell>
              <TableCell className="flex justify-center cursor-pointer text-red-500">
                <TrashIcon className="w-6" onClick={() => eventHandlers.doDelete(row.key)} />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default SandboxTable
