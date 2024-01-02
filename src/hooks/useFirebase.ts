import { initializeApp } from 'firebase/app'
import { Database, getDatabase } from 'firebase/database'
import { FirebaseStorage, getStorage } from 'firebase/storage'
import { useEffect, useState } from 'react'

export const useFirebase = () => {
  const [realtimeDatabase, setRealtimeDatabase] = useState<Database | null>(null)
  const [firebaseStorage, setFirebaseStorage] = useState<FirebaseStorage | null>(null)

  useEffect(() => {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_Domain,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    }

    const firebaseApp = initializeApp(firebaseConfig)
    setRealtimeDatabase(getDatabase(firebaseApp))
    setFirebaseStorage(getStorage(firebaseApp))
  }, [])

  return { realtimeDatabase, firebaseStorage }
}
