import HTTP from '@/utils/request'
export const Login = (data) => {
  return HTTP.post("/login", data)
}
export const Register = (data) => {
  return HTTP.post("/register", data)
}