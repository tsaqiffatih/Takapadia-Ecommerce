'use server'
import { cookies } from "next/headers"

export const setCookies = (data: {message:string,accessToken:string }) => {
    cookies().set("Authorization", `Bearer ${data.accessToken}`)
}