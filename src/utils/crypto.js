/*
 * @Author       : yanqun
 * @Date         : 2020-12-25 15:57:37
 * @LastEditTime : 2020-12-25 16:15:19
 * @Description  : 
 */
import crypto from 'crypto'

const autograph = "cnyanquncms"

export function md5(pass) {
  const md5 = crypto.createHash("md5");
  md5.update(pass + autograph);
  const result = md5.digest("hex");
  return result;
}
