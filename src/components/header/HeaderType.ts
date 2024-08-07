// 서브메뉴 항목 데이터 타입 정의
interface SubMenuItem {
  label: string;
  href: string;
}

// 메뉴 항목 데이터 타입 정의
interface MenuItem {
  id: number;
  label: string;
  href: string;
  submenu?: {
    [key: string]: SubMenuItem[];
  }[];
}

export type { MenuItem };
