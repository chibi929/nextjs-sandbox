import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import Breadcrumbs from '@/components/invoices/breadcrumbs'
import Form from '@/components/invoices/edit-form'
import { fetchCustomers, fetchInvoiceById } from '@/libs/learn/data'

export const metadata: Metadata = {
  title: '請求書の編集',
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()])

  if (!invoice) {
    notFound()
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/learn/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/learn/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  )
}
