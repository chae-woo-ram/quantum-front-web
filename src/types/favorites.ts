// TODO: calendarDate type 추후 변경 예정
interface ArtObjectType {
  webImageUrl: string;
  longTitle: string;
  subTitle: string;
  physicalMedium: string;
  objectNumber: string;
}

interface FavoritesType {
  id: string;
  user_id: boolean;
  object_number: string;
  art_object: ArtObjectType;
  created_at: string;
}

export type { ArtObjectType, FavoritesType };
