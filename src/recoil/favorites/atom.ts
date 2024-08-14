import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { ArtObjectType } from '@/types/favorites';

// 클라이언트에서만 실행되도록 하는 조건 확인
const isClient = typeof window !== 'undefined';

// 클라이언트 측에서만 `sessionStorage`를 사용
const { persistAtom } = isClient
  ? recoilPersist({
      key: 'favoritesStorage',
      storage: sessionStorage,
    })
  : { persistAtom: () => {} };

export const favoritesState = atom<ArtObjectType[]>({
  key: 'favoritesState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
