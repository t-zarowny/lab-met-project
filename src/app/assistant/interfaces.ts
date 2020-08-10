

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

export interface KartaPomiarow {
  id: number;
  nazwa?: string;
  link: string;
}

export interface GroupInstrument {
  id?: number;
  nazwa: string;
  metodaKontroli: string;
  karta?: KartaPomiarow[] | null;
}

export interface MeasurementCardTemplate {
  id: number;
  documentNo: string;
  title: string;
  template?: string;
}
