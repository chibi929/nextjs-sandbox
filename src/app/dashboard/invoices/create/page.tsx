import { Metadata } from 'next'

import { fetchCustomers } from '@/app/lib/data'
import Breadcrumbs from '@/components/invoices/breadcrumbs'
import Form from '@/components/invoices/create-form'

export const metadata: Metadata = {
  title: '請求書の作成',
}

export default async function Page() {
  const customers = await fetchCustomers()

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  )
}
