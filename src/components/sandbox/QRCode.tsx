import { QRCodeSVG } from 'qrcode.react'

type Props = {
  src: string
}

const QRCode: React.FC<Props> = ({ src }) => {
  return <QRCodeSVG value={src} />
}

export default QRCode
