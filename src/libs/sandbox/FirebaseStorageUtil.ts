import { FirebaseStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export class FirebaseStorageUtil {
  constructor(private readonly storage: FirebaseStorage) {}

  async upload(file: File, fileName: string = file.name) {
    const imageRef = ref(this.storage, `images/${fileName}`)
    const { ref: resultRef } = await uploadBytes(imageRef, file)
    return await getDownloadURL(resultRef)
  }
}
