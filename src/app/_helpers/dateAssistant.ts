import { GroupInstrument } from './../_models/group';
import { add, subtract } from 'add-subtract-date';

export class DateAssistant {
  constructor(){}

  public static makeNextDate(group: GroupInstrument, dataStart?: Date): Date{
    dataStart = dataStart ? dataStart : new Date();
    const nextDate = new Date(dataStart.getTime());
    // console.log('Data start: ' + dataStart);
    switch (group.interwalJednostka.skrot){
      case 'd':
        add(nextDate, group.interwalWartosc, 'days');
        break;
      case 'm':
        add(nextDate, group.interwalWartosc, 'month');
        break;
      case 'r':
        add(nextDate, group.interwalWartosc, 'year');
        break;
    }
    // console.log('Data nast: ' + nextDate);
    return nextDate;
  }
}
