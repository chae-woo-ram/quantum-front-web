import { atom } from 'recoil';

export const isSubMenuVisibleState = atom<boolean>({
  key: 'isSubMenuVisibleState',
  default: false,
});
