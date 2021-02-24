import HTTP from '@/utils/request'
export const User = (data) => {
  return HTTP.get("/userList",{ params: data })
}