import { dbConnect, User, Leaderboard } from './init'
import { UserType } from './models/User'
import { LeaderboardType } from './models/Leaderboard'

export async function createUser(id: number, firstName: string, lastName: string) {
  return User.create({ id, firstName, lastName })
}

export async function updateUserById(id: number, data: UserType) {
  return User.update(data, { where: { id } })
}

export async function deleteUserById(id: number) {
  return User.destroy({ where: { id } })
}

export async function getUserById(id: number) {
  return User.findOne({ where: { id } });
}

export async function getUsersByFirstName(firstName: string) {
  return User.findAll({ where: { firstName } });
}

export async function createLeaderboard(UserId: number, date: string, accuracy: string, destroyed: string) {
  return Leaderboard.create({
    UserId, date, accuracy, destroyed
  })
}

export async function updateLeaderboardById(id: number, data: LeaderboardType) {
  return Leaderboard.update(data, { where: { id } })
}

export async function deleteLeaderboardById(id: number) {
  return Leaderboard.destroy({ where: { id } })
}

export async function getLeaderboardById(id: number) {
  return Leaderboard.findOne({ where: { id } });
}

export function startApp() {
  dbConnect().then(async () => {
    // await createUser(1, 'Alex', 'Ivanov')
  })
}
