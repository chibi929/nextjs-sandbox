import { Inter, Lusitana } from 'next/font/google'
import localFont from 'next/font/local'

export const inter = Inter({ subsets: ['latin'] })
export const lusitana = Lusitana({ weight: '400', subsets: ['latin'] })

export const pixelFont = localFont({ src: '../styles/misaki_gothic.ttf' })
