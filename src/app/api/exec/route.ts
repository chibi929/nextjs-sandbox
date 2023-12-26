import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { unstable_noStore as noStore } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

import { FirebaseUtil } from '@/libs/sandbox/firebase_utils'

export async function GET(request: NextRequest) {
  noStore()
  const text = request.nextUrl.searchParams.get('text')

  const firebaseApp = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_Domain,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  })
  const firebaseUtil = new FirebaseUtil(getDatabase(firebaseApp))
  await firebaseUtil.sandboxPush(text || String(Date.now()))

  return NextResponse.json({ message: 'Hello World!', value: text })
}
