import { sStorage } from './storage';
// 解密
export const Decrypt = (token: any) => {
  return token;
};

// 加密
export const Encrypt = (token: any) => {
  return token;
};

// 重置Token
export const resetToken = (header: any) => {
  const userInfor = JSON.parse(Decrypt(sStorage.getItem('userInfor')));
  Reflect.deleteProperty(userInfor, 'token');
  userInfor['token'] = header.token;
  sStorage.setItem('userInfor', Encrypt(userInfor));
};