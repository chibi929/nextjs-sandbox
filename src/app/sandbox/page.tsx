import { NextPage } from 'next'

import QRCode from '@/components/sandbox/QRCode'
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react'

const Page: NextPage = () => {
  return (
    <main className="flex flex-wrap gap-4">
      <div className="flex flex-wrap gap-4 items-center">
        <Card>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">nextui</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Button color="default">Default</Button>
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button color="success">Success</Button>
            <Button color="warning">Warning</Button>
            <Button color="danger">Danger</Button>
          </CardBody>
        </Card>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <Card>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">react.qrcode</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <QRCode src="https://chibi929.github.io" />
          </CardBody>
        </Card>
      </div>
    </main>
  )
}

export default Page
