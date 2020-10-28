import { State } from './state';
import { PlaceFull } from './place';
import { GroupInstrument } from 'src/app/assistant/interfaces';
import { Inspection } from './inspection';

export class Instrument {
  id: number;
  nazwa: string;
  typ?: string;
  idGrupa?: number | null;
  idLokalizacja?: number | null;
  aktStatus: number;
  wzorzec: boolean;
  sprawdzeniaPlanowe?: Inspection[] | null;
}
export class InstrumentMin {
  id: number;
  nazwa: string;
  typ?: string;
  idGrupa?: number | null;
  idLokalizacja?: number | null;
  aktStatus: number;
  wzorzec: boolean;
}
export class InstrumentFull {
  id: number | 0;
  nazwa: string | '';
  typ?: string | null;
  idGrupa?: GroupInstrument | null;
  idLokalizacja?: PlaceFull | null;
  aktStatus: State | null;
  wzorzec: boolean | false;
  sprawdzeniaPlanowe?: Inspection[] | null;
}
