import { dbConnect } from './init'

export function startApp() {
  dbConnect().then(async () => {
    // await createUser(1, 'Alex', 'Ivanov')
  })
}
