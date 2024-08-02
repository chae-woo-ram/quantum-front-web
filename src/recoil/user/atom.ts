import { atom } from 'recoil';

interface UserType {
  user: any;
}
export const userState = atom<any>({
  key: 'userState',
  default: {},
});
