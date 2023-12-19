import { Metadata } from 'next'

import Breadcrumbs from '@/components/invoices/breadcrumbs'
import Form from '@/components/invoices/create-form'
import { fetchCustomers } from '@/libs/learn/data'

export const metadata: Metadata = {
  title: '請求書の作成',
}

export default async function Page() {
  const customers = await fetchCustomers()

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/learn/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/learn/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  )
}
