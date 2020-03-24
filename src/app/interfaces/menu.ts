interface MenuItems {
    name: string;
    alias: string;
    access: number;
  }
  
  export interface Menu {
    id: number;
    catName: string;
    item?: MenuItems[] | null;
  }