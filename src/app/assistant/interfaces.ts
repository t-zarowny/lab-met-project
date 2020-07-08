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
  name: string;
  controlMethod: string;
  measurementCardTemplateId?: number;
}

export interface MeasurementCardTemplate {
  id: number;
  documentNo: string;
  title: string;
  template?: string;
}
