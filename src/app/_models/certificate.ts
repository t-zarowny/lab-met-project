import { InstrumentFull } from 'src/app/_models';

export class Certificate {
  id?: number;
  nrSwiadectwa: string;
  przedmiot: string;
  przedmiotId: InstrumentFull;
  metoda?: string;
  uzyteWzorce?: string;
  warunkiSrodowiskowe?: string;
  dataSprawdzenia: Date;
  dataNastepnejKontroli: Date;
  wynikSprawdzenia: boolean;
  uwagi?: string;
  sprawdzajacy?: string;
  sprawdzenieZewnetrzne?: boolean;
  plik?: CertificateFile | null;
}

export class CertificateTemplate {
  id?: number;
  uzyteWzorce: string;
  warunkiSrodowiskowe: string;
}

export class CertificateFile {
  id?: number;
  nazwa?: string;
  link: string;
}
