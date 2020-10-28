import { User } from 'src/app/_models';
import { Place } from './place';
export class Area {
  id: number;
  idUser?: number | null;
  nazwa: string;
  lokalizacja?: number | null;
}
export class AreaFull{
  id: number;
  idUser?: User | null;
  nazwa: string;
  lokalizacja?: Place[] | null;
}
export class AreaMin {
  id: number;
  idUser?: User | null;
  nazwa: string;
}

