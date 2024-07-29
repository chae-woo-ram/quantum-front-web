export enum ModalType {
  ROOM_CREATE = 'roomCreate', // 새로운 방 생성
  ROOM_ENTRY = 'roomEntry', // 이미 있는 방 바로 입장
}

interface UserType {
  id: string;
  name: string;
  room: string;
}

// Type for rooms state
interface RoomsState {
  [key: string]: {
    users: UserType[];
  };
}

export type { RoomsState };
