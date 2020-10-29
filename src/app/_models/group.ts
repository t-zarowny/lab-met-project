import { MeasurementCard } from './measurementCard';

export interface GroupInstrument {
  id?: number;
  nazwa: string;
  metodaKontroli: string;
  karta?: MeasurementCard[] | null;
}
