export { default } from "next-auth/middleware"

export const config = { matcher: ["/me", "/data", "/client"] }