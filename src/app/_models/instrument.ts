import { Certificate } from './certificate';
import { State } from './state';
import { PlaceFull } from './place';
import { GroupInstrument } from './group';
import { Inspection } from './inspection';

export class Instrument {
  id: number;
  nr: number;
  nazwa: string;
  typ?: string;
  nrFabryczny?: string;
  zakres?: string;
  idGrupa?: number | null;
  idLokalizacja?: number | null;
  aktStatus: number;
  wzorzec: boolean;
  sprawdzeniaPlanowe?: Inspection[] | null;
  dataOstatniejKontroli?: Date | null;
  dataNastepnejKontroli?: Date | null;
  nrAktualnegoSwiadectwa?: string | null;
}
export class InstrumentMin {
  id: number;
  nr: number;
  nazwa: string;
  typ?: string;
  nrFabryczny?: string;
  zakres?: string;
  idGrupa?: number | null;
  idLokalizacja?: number | null;
  aktStatus: number;
  wzorzec: boolean;
  dataOstatniejKontroli?: Date | null;
  dataNastepnejKontroli?: Date | null;
  nrAktualnegoSwiadectwa?: string | null;
}
export class InstrumentFull {
  id: number | 0;
  nr: number | 0;
  nazwa: string | '';
  typ?: string | null;
  nrFabryczny?: string;
  zakres?: string;
  idGrupa?: GroupInstrument | null;
  idLokalizacja?: PlaceFull | null;
  aktStatus: State | null;
  wzorzec: boolean | false;
  sprawdzeniaPlanowe?: Inspection[] | null;
  swiadectwa?: Certificate[] | null;
  dataOstatniejKontroli?: Date | null;
  dataNastepnejKontroli?: Date | null;
  nrAktualnegoSwiadectwa?: string | null;
}
