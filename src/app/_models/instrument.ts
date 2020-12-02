import { Certificate } from './certificate';
import { State } from './state';
import { PlaceFull } from './place';
import { GroupInstrument } from './group';
import { Inspection } from './inspection';

export class Instrument {
  id: number;
  nr: number;
  nrString?: string | null;
  nazwa: string;
  typ?: string;
  nrFabryczny?: string;
  zakres?: string;
  idGrupa?: number | null;
  idLokalizacja?: number | null;
  idLokalizacjaString?: string | null;
  aktStatus: number;
  aktStatusString?: string | null;
  wzorzec?: boolean;
  dataOstatniejKontroli?: Date | null;
  dataNastepnejKontroli?: Date | null;
  nrAktualnegoSwiadectwa?: string | null;
  sprawdzeniaPlanowe?: Inspection[];
  sprawdzeniaPlanoweSty?: string | null;
  sprawdzeniaPlanoweLut?: string | null;
  sprawdzeniaPlanoweMar?: string | null;
  sprawdzeniaPlanoweKwi?: string | null;
  sprawdzeniaPlanoweMaj?: string | null;
  sprawdzeniaPlanoweCze?: string | null;
  sprawdzeniaPlanoweLip?: string | null;
  sprawdzeniaPlanoweSie?: string | null;
  sprawdzeniaPlanoweWrz?: string | null;
  sprawdzeniaPlanowePaz?: string | null;
  sprawdzeniaPlanoweLis?: string | null;
  sprawdzeniaPlanoweGru?: string | null;
}
export class InstrumentMin {
  id: number;
  nr: number;
  nrString?: string | null;
  nazwa: string;
  typ?: string;
  nrFabryczny?: string;
  zakres?: string;
  idGrupa?: number | null;
  idLokalizacja?: number | null;
  idLokalizacjaString?: string | null;
  aktStatus: number;
  aktStatusString?: string | null;
  wzorzec: boolean;
  dataOstatniejKontroli?: Date | null;
  dataNastepnejKontroli?: Date | null;
  nrAktualnegoSwiadectwa?: string | null;
}
export class InstrumentFull {
  id: number | 0;
  nr: number | 0;
  nrString?: string | null;
  nazwa?: string | '';
  typ?: string | null;
  nrFabryczny?: string;
  zakres?: string;
  idGrupa?: GroupInstrument | null;
  idLokalizacja?: PlaceFull | null;
  idLokalizacjaString?: string | null;
  aktStatus: State | null;
  aktStatusString: string | null;
  wzorzec?: boolean | false;
  sprawdzeniaPlanowe?: Inspection[] | null;
  swiadectwa?: Certificate[] | null;
  dataOstatniejKontroli?: Date | null;
  dataNastepnejKontroli?: Date | null;
  nrAktualnegoSwiadectwa?: string | null;
}
