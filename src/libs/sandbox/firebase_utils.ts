import { Unsubscribe } from 'firebase/app-check'
import { Database, onChildAdded, onChildRemoved, push, ref, remove } from 'firebase/database'

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

  addSandboxListener(
    addedCallback: (data: ISandboxData) => void,
    removedCallback: (data: ISandboxData) => void
  ): Unsubscribe[] {
    const sandboxRef = ref(this.db, `${this.PREFIX}`)
    return [
      onChildAdded(sandboxRef, (snapshot) => {
        console.log('onChildAdded')
        const data = snapshot.val()
        addedCallback({ key: snapshot.key || '', text: data })
      }),
      onChildRemoved(sandboxRef, (snapshot) => {
        console.log('onChildRemoved:')
        const data = snapshot.val()
        removedCallback({ key: snapshot.key || '', text: data })
      }),
    ]
  }
}
