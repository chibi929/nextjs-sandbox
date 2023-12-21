import { NextPage } from 'next'

import SandboxRegisterForm from '@/components/sandbox/SandboxRegisterForm'
import SandboxTable from '@/components/sandbox/SandboxTable'

const Page: NextPage = () => {
  return (
    <main>
      <SandboxTable />
      <SandboxRegisterForm />
    </main>
  )
}

export default Page
