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

export interface GroupInstrument {
  id?: number;
  nazwa: string;
  metodaKontroli: string;
  kartaPomiarowNazwa?: string;
  kartaPomiarowPlik?: File;
}

export interface MeasurementCardTemplate {
  id: number;
  documentNo: string;
  title: string;
  template?: string;
}
