import { AuditUnit } from './auditUnit';
import { IntervalUnit } from './intervalUnit';
import { MeasurementCard } from './measurementCard';

export interface GroupInstrument {
  id?: number;
  nazwa: string;
  nrGrupy?: number;
  metodaKontroli?: string;
  interwalWartosc?: number;
  interwalJednostka?: IntervalUnit;
  wielkoscBadana?: AuditUnit;
  karta?: MeasurementCard[] | null;
}
