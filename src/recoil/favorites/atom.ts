import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { ArtObjectType } from '@/types/favorites';

const { persistAtom } = recoilPersist({
  key: 'favoritesStorage',
  storage: sessionStorage,
});

export const favoritesState = atom<ArtObjectType[]>({
  key: 'favoritesState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
