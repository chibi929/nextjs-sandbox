import { Unsubscribe } from 'firebase/app-check'
import { Database, onChildAdded, push, ref, remove } from 'firebase/database'

export interface ISandboxData {
  key: string
  text: string
}

export class FirebaseUtil {
  private readonly PREFIX = 'sandbox'

  constructor(private readonly db: Database) {}

  sandboxPush(value: string): void {
    const sandboxRef = ref(this.db, this.PREFIX)
    push(sandboxRef, value)
  }

  async deleteSandboxData(key: string): Promise<void> {
    const sandboxRef = ref(this.db, `${this.PREFIX}/${key}`)
    return await remove(sandboxRef)
  }

  addSandboxListener(callback: (data: ISandboxData) => void): Unsubscribe {
    const sandboxRef = ref(this.db, `${this.PREFIX}`)
    return onChildAdded(sandboxRef, (snapshot) => {
      console.log('onChildAdded')
      const data = snapshot.val()
      callback({ key: snapshot.key || '', text: data })
    })
  }
}
