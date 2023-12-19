import { Database, push, ref } from 'firebase/database'

export class FirebaseUtil {
  private readonly PREFIX = 'sandbox'

  constructor(private readonly db: Database) {}

  sandboxPush(value: string): void {
    const sandboxRef = ref(this.db, this.PREFIX)
    push(sandboxRef, value)
  }
}
