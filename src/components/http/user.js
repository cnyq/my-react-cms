import HTTP from '@/utils/request'
export const User = (data) => {
  return HTTP.get("/userList", { params: data })
}

export const UserAdd = (data) => {
  return HTTP.post("/userAdd", data)
}
export const UserEdit = (data) => {
  return HTTP.post("/userEdit", data)
}
export const UserDel = (data) => {
  return HTTP.post("/userDel", data)
}

export const PostwordChange = (data) => {
  return HTTP.post("/postwordChange", data)
}