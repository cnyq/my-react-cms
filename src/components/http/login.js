import HTTP from '@/utils/request'
export const Login = (data) => {
  return HTTP.post("/login", data)
}