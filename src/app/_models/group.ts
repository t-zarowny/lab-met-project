import { Instrument } from './instrument';
import { AuditUnit } from './auditUnit';
import { IntervalUnit } from './intervalUnit';
import { MeasurementCard } from './measurementCard';

export class GroupInstrument {
  id?: number;
  nazwa?: string;
  nrGrupy?: number;
  metodaKontroli?: string;
  interwalWartosc?: number;
  interwalJednostka?: IntervalUnit;
  wielkoscBadana?: AuditUnit;
  karta?: MeasurementCard[] | null;
  przyrzad?: Instrument[] | null;
}
