import { MeasurementCard } from './measurementCard';

export interface GroupInstrument {
  id?: number;
  nazwa: string;
  nrGrupy?: number;
  metodaKontroli: string;
  interwalWartosc?: number;
  interwalJednostka?: string;
  jednostkaNazwa: string;
  jednostkaSkrot: string;
  karta?: MeasurementCard[] | null;
}
