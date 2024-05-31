import { compareSync, hashSync } from 'bcryptjs'

export const hashPassword = async (password: string) => {
  return hashSync(password)
}

export const comparePassword = async (inputPassword: string, passwordDb: string) => {
  return compareSync(inputPassword, passwordDb)
}