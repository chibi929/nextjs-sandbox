import { FirebaseStorage, getDownloadURL, listAll, ref, StorageReference, uploadBytes } from 'firebase/storage'

export class FirebaseStorageUtil {
  constructor(private readonly storage: FirebaseStorage) {}

  async upload(file: File, fileName: string = file.name) {
    const imageRef = ref(this.storage, `images/${fileName}`)
    const { ref: resultRef } = await uploadBytes(imageRef, file)
    return await getDownloadURL(resultRef)
  }

  async listAll() {
    const imagesRef = ref(this.storage, 'images')
    return await listAll(imagesRef)
  }

  async listDownloadUrl(listRefs: StorageReference[]) {
    return Promise.all(
      listRefs.map(async (ref) => {
        return {
          key: ref.fullPath,
          src: await getDownloadURL(ref),
        }
      })
    )
  }
}
