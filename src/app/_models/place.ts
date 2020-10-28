import { Area, AreaMin } from './area';

export class Place {
  id: number;
  nazwa: string;
  idObszar?: number;
}
export class PlaceFull {
  id: number;
  nazwa: string;
  idObszar?: AreaMin;
}

