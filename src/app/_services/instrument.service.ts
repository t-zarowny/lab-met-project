import { CustomFonts } from './../_helpers/custom.fonts';
import { Instrument, InstrumentFull } from './../_models/instrument';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

// import 'jspdf-autotable';
// declare const require: any;
// const jsPDF = require('jspdf');
// require('jspdf-autotable');

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {

  constructor(private http: HttpClient) { }

  get(id: number){
    return this.http.get<InstrumentFull>(`${environment.apiUrl}przyrzady-full/${id}/`);
  }
  getAllPattern(){
    return this.http.get<InstrumentFull[]>(`${environment.apiUrl}przyrzady-wzorce/`);
  }
  getAll(param: string = '') {
    return this.http.get<InstrumentFull[]>(`${environment.apiUrl}przyrzady-full/${param}`);
  }
  getAllNr() {
    return this.http.get<any[]>(`${environment.apiUrl}przyrzady-nr/`);
  }
  getAllTimetab(param: string = '') {
    return this.http.get<Instrument[]>(`${environment.apiUrl}przyrzady-harmonogram/${param}`);
  }
  add(data: FormData) {
    return this.http.post(`${environment.apiUrl}przyrzady/`, data);
  }
  edit(id: number, data: FormData) {
    return this.http.put(`${environment.apiUrl}przyrzady/${id}/`, data);
  }
  updateDate(id: number, data: FormData) {
    return this.http.put(`${environment.apiUrl}przyrzady-daty/${id}/`, data);
  }
  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}przyrzady/${id}/`);
  }

downloadTimetable(ins: Instrument[], year: string): void{
    const doc = new jsPDF({
      orientation: 'landscape',
      format: 'a4',
      unit: 'mm'
    });

    doc.setProperties({
      title: 'Harmonogram_roczny_' + year + '.pdf'
    });
    // doc.addImage('/src/assets/zehnder_logo.png', 'PNG', 20, 10, 23, 14);
    doc.addImage(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKIAAABkCAYAAAAFQ+uyAAAAAXNSR0IA
                  rs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABYBSURBVHhe7Z0JkB3Fec
                  eXOLZjAhLa93rm7UoxiQMmKMEBBDGH4yO2oco5qBhjF6kYYyfhiPERAjZFCCauCggbO0DAGAjGSbkS
                  EFAQA7r3Xq0kWKMIhDCQIDsQGyFxCSEQ6Mj/1/pmM2+2Z/atpFVA2/+qr96+6f66Z7v/8x09PfPaIi
                  IiIiIiIiIiIiIiIiLeFOip1Y66L0ku7kuSi0IypLKBJDlje1vbPqYSEbH70efceWs6O7evbDSCQpkI
                  OdeqR0RMDPrq9S+vEOFEtqBQ1p8k/2TVIyImBr3OnTI8BhF7k+T7Vj0iYmIwWKt1iowvD6VpkIjLdV
                  xEfHxOW9tbTCUiYmLQW69fvbqjI0hEZFhk7HHus1Y9ImJi0DN16gHKjPtXyQ0PBoiItVySJC+qzh+b
                  SkTExIGlmmVp+nMRromIcs3bl4qMiLLsIR27XMe+pETn/QP1+iyWgIrSn6bv7XLu163piIhq9LS1/a
                  LI9ZllSXImn4oXb5RV3FQkI6Lsefv9IiMJzH9IIKYsZVAeVHm/c3dZNxER1RiaMeMdIuDzjyhGhGCQ
                  CwtYJGFIICaEDQlEFanvtG4iIqrRc+CBvyTCPCGXHCTbzsoDIqI+77BuIiKqEYkY8YZAJGLEGwKRiB
                  FvCEQiRrwhYER8mp0294mMu0vIwkXEe62biIhqzD3ooLf3JsmCoSR5WIRctbvk/jRd3efcldZNRMTY
                  +Fpb2y+wqWG7PhG+FyUra1VoDz3rIiIiIuJNhqH29umDzp2s2G62XPVN+ryJz8EkuXTAuY+rLN47jp
                  g4KJY7TmS7dUmSPP+AEg1uzxXlRzouMr6i2K+3J0lONdWIiF3H9R0d+8rKXSGr58lWtjk2EzYzPKZs
                  uCdNv2BNRETsGhakaSIruPwhETC0BzEkrDUqw/6ZdH+ZRKQ/Ta/saTSOsiYjIsYH2/q1jK1aIcKVCW
                  uN+rycNpY0GkfbRtp1Pc41fMMREeNBl3NXjZeEWM2BJNnaU6v9Bm3IMn7H70vcYSXnbY/PPUeMB/3O
                  HY+LLXPH7DFEisd/JNIpSVlAG0MzZrT3OvfMUh2nLrfzuuv1T/kOIiJagcg01x4RHSEZf7MhNtsYS9
                  KSL0dW6Jh0/4I2lD2fQnY9UrajPU/SiIgxIbIcC9HYQZ2RCMLxlJ4s288ll+r7R0W42dTLLCN/K6Zc
                  PzRlSjvtYBnzRLTydT0dHXXfUUREFUSya4qxIRsU5KaH5W6nWzWIdhVWLqvj40DnbqSst9E4dEmSvJ
                  Z37RCbpZ2hev1I30BERBmGZ816q4j4nzwwnyeQ4rwtiu9mWbU2MmCVvcjaYlYHVy1yHkO5CHkd2TOW
                  NN8OMujc4b6RiIgydNVqh4gsWyBMRiCsoYi3Kp/x9qbp5/LWkKf2RMJhK8aq3laMMSMRI1pGb73+MY
                  iXz4iNUE3vtRHp+okZszrccdHnmVbc1tVoHMitQFxxVgcS8p1nnK1aREQYSibOswXpEfHvtclZRJH1
                  CMV+W7L4z5PNuZcX1mqdvhGDrOgwljJrh3r9qhc3RUxSLN9//9ryJDmL/X92qBQhIiI+Y3bubOqIlN
                  /O18Ea6tgPfAMGkXA/HVvLGmJWz1z86jmnnBJf1DQZIRLcuqajAyLdYodKIaKczg6avGtGMrcqct0o
                  sq7xSzH6Tj0s5kCaftCa8FA759jzKCPiXbxz/2pVIiYTFNvdjPWCMCtFGJHp1h9WrOP11etHYsXyyU
                  omHIOkuOQsCcH16u8BU/cQ2U5ZliSbvcvOiV9TdO4zVi1iskBW6Tz/bpkcGfg+lKYri/FchoF3vnOa
                  LOfTmcUbS3C3Ildvt3MnioAf17GbRNit6OczZu+inVu/OElS6ypiMkDE+EusVX5BGYEcxHQ6vnq+c7
                  9t1ZugOt8PxYkhoT3WD+mLOBL3m7eYWR1bIL/JuoiYDOhRvMaGhaJVyhMDFysrtaG7Xv+AqY1AlusE
                  v9O6oFclxZgyL7jooSR5VRY6rh9OFijG+30IZptTg8RAKMOtypptwKWa+ghEmluwYlVttCLoP0w79f
                  ql1nTEZIBI9RVcr89wc4QICeUQluxWf/+1NeEhQnfIyj1FgrGzZEQPFz/g3HJea2dNR0wWdCfJmcRr
                  9oL1IEnyAmlt4dnvqs6wuNGYqbIn7a7JuIUtYXLJT8Q3wk5iyBV+UiRYb8srQaJkQjnxIFv6Zb2aFq
                  YXtrcfuixJhnHTWM+QflFoC0soEj86r1Y7xJqKmKzgHdWKF9cXNx+UiV9rVF0R+O788s7ctra3L3Hu
                  q5l1xF2TCJEdo4NgVSEq+n6BO0n+7Z6pU6dZExGTHYvr9SNFopXjca/2xN5DSliaHnaaP2NG+5Bzp6
                  nsDlnOp1X3dSyu3zLm3CYR8icqv15l7zOViIj/w/wpU9oHnVtqa3ljCtYTKyprukrx3XHWTBN4HqUn
                  TX+rP03/QCQ8URbyV0Xc/aw4IqIcQ2l6pazXFlxpiIB5gYy21rhRyc+HrYmIiJ3Donr93UvS9ALFbL
                  eLYPdKXmuFiAhkxO0uT5JN3c593pqMiBgf5DLPV+KxkZiPBMOWaMYlkJHExHbSfNmajohoDfxuHgSE
                  REVyjVcgY7bWqETkuvg+w4iW0JMksyFh2b1iXDPxH5k0SQmbFkL18gIZaY/bdSJj3FMYUQ1lru9jPQ
                  8LFiIUa3+2devfJVf0OneD5FnugkA0CBfSywQS2x2TruLyTkTECESkeVi6EKEgkZHwfKvu0dPePkME
                  vZbERAQbk4yIX2tM0wcXJcm7rJmIiB3gxUeyaq9j9ULkwR3L+pU+LiALdzZkLNPPC2TlfvayJHkeK2
                  xNRET4BOVjJBSh5ZnMGuqzck1Q8eXfEjcW9YsCEf02siTZoJgxuME2YpJCBLmo7FYeRMSCySKeZtXL
                  sI9c90rvwgttZAIJiUNlPbd2J8lJphcRsQPZXsQQeRDIpTorx1p+EREvqGqHLFtEfD2+Yi4iCBHohD
                  LXnAluVzHdBaYSxEC9/qU8EWkv2wJGZk2iMlYbEZMYihEPVqLxqrLZERIVxbZr8W6bM0xtFOR6B3Hj
                  1PdLOs5t1N+PZWuPIuG3rGrEZMH1bW1v7W80PqCk4CyR4XsixuWDzp3e19n5K1ZlBPyKU55EISG+g4
                  zc8luSpjfy+Kipe6j8YktqfH3q6tgGke8g9X2zrG63VY2YDLh1xox3yLqdKyI8zG06LBFuNZOlSfJc
                  v3NXiHxvMxUPkeaMVh4FhWi0ozae0PfZkrN0bD4kxgpm9TwRndvMj/zQPj8O6TuK2HPgrfr62OMvH1
                  /g3OEi2gPsH8Q65YmRCQkD5SLpkoFp095pqm2Lpk2bqvLHfIYc0CsKsR8bGhB0ivEla4oi4pb+ev3d
                  1kXE7gQk48kyFoHl+mbK5ZysST1dn5fIDd68xLm7NAEPyyXt0dtY6u9w9b+2KmvNC/d+RZ4ufj3Umu
                  DhqQ9DKrneoM54xCcpzv1ksFbb35qP2J3wMY9zD+mKf10DvpVsM3N7kOBBfcei7Eki2iOca/0dkAIh
                  qsSy2Kafmu2p1/2aYtHCjUc4B9rW5zXWbMTuBtvnNdgv4fpwP8UJwx0uS5ItykR/11QmCiOvaNOEX9
                  bqdv68cP5Yrt5a7WhrykMWfc5qtRdy7WMJJLSloHWLLT6MmAD4WEoux7uewiQgEBPLNJF3DggHVqTp
                  sBKGT/DuQn1fp9gweD5jid1HXpZ/B+KwMm5Z/RuI/0h4WrWy1GNcdJFu0/d452Si0ZMkC5jA4kRkwh
                  KHXJ5/OeXuBFZW2egAcRwWSwQcUgz2IWK6nbFeiL9wdljTUcQRsc7l2RPCjlbaZ0xExNe6kuRPrImI
                  iYQmaH4VEX3CUK9fbdV3Gb2NxtFyo3Mk2yB5LhzYKjI+UgwPsGJZ3OpvzxXKi+LrOPdjfozRuhyBdA
                  9Tv/Ookz17jEuHmAjLNIwFoYH+Hlb9Y001YqKhwb6USQ5NKkKZJva7Vj0ITeK7ZMkS+xoE+/1Eqm9r
                  4l+H3BAgTyoIWAwRfNabJP+jehfLcv+5iHp/1blm4tcQKx504s2uso5X67whvv/1AM5H8oJi4p6ljc
                  bZPFBv1SP2BJjkqmUSgnXiLqvuwRvxh5JkNlZDdR5WG69p4p9d4tyDg87dqQn9I6s6AsWAx5N9Ev/l
                  CVgmWCa1c3f+F5ruqtX217GeKguOYOnU3xqFFJXPGHMXRuHAITqfw/T/HHa/MnYrimgF/Y2GY3FVVu
                  Ijy5z7NIE+v3KEZbIqLUMW4dSqTQKUiWT3WfU2EeGbmrRtuC/KMvfG4jIuD4sFUVTn7uKyj873KqzV
                  WESkPZF6I793YqojINPX//lMWYKVCeenJOsbprb3oS9Nf02DdIMmB7l+V4Rszv/dwpVIHU32F0S6hZ
                  K1Is5mJp9s0JOFtUDnNmmSVqjdb+kcg28nKIIXWnoLEphMRITCIq7FMqn9G1g8JpYK1c2Etvw2+iR5
                  gLchWFdtsj6dOreNnHdILxNI1i2LhsUy1SYo0bmQ9kO6mdCHxuLl7LbcXofMxXBlc/XvinDV8rlQbs
                  GaHwX2zfFwuFzaWvr01kaC1SC2YdCZeG9FJFkgTpCvenfOt98MLsOiev0I6b2KfnEyEX9cRNTfd5CR
                  lhE2JLxZS1axaVu+js+uCgUQ+pS8JtIGdz3jcnUej/C/hvQRrC796PM7prZ3oT9N38uEZyTYFbHJ38
                  Y7+Kz5JvBQjgi1GOKP5YqKwvlBSP88hf1kawisJcriPQNxQ+0gmsxtWMbxkBAxQm3L/9wXJFLZk1jh
                  Yv28cIHqvK4ztVFQ2WmtEFoX47aeRuMoU9t7sKeISAyoyf/vsQa7SrAKEJhJVbzU9DbUDMva26fI4j
                  1VRURkvCRE6N9iwsusOw+R8TwuLspDeohfT1SoUfaEHFmt2rmPzDqkn4n977eZ2t6DPUFE1sA0Ccts
                  EkfpcYxzYJAhKlLmpqiLK6ec5Ma6aIKsy6KxMtFMOGcmn9h0LKuGFJMdwOYBlf3YYttS4f9XrFhuFd
                  P0Q7RRNReUKazZwn5GU9s7oMk8hiWIjIwhadV6MKnU70rT37TmPTRxl/iXf+fqZsIxCCC9TSQPmowv
                  yjKcLzL5NTbaC+nYhD0lko9a75P+wrGImPWrPjerfre+3y4Zk0y4dNV/TtKUQavsJMhcNVbsslZo8Y
                  qSkyNMbRQ4F4sFg21w3O7crJ4zc2bTvsU3NTSZx+DuGGCIVBQ/AM69UhyQkGSE7p0+/WBrnoFtaHKe
                  L3OV9K1+nlIW3fTD09xf1fELKQ9NLhNCcqRJbXKTQOWzIXFRJy9G5BX97e0j1nu4o2Nf9XVvlXvMLg
                  y2mZnaCHRRD3MBVJEIkmlMukxlFNT/ezQXrzKORV0uHKyqxuVR9XWq7a3cO6BB2Q/3jPSl6e/khaC4
                  S5meMuvusdwWA8ctLg3Yufmb9IoNvwhhQjoIVkRk+pxVHwWd3w+oE9LlnGQ5nyjuq1PZRUxYsX4mkE
                  m6W3SuHzWVEfCiSv0vWzPCheT+RmObLs6TTWUE3G8mmajStb65uE8wtVGQ+74xC2MQQhHGUOe1RiQ8
                  l4TMqk4eiEiXauC2VbmcjIQiTdNrL4AGfLHduA/q6XMDroo1ObYm5UUWNoWkWK9Q/xzzrtS5E607D6
                  wFVq3snOlXE7zhnn33HbUvESujskeqLjysrf7XT5tKE3T8rrGsMeemC+ghdtKYWhNY+BbhNmWJmYi4
                  QW79ykWdnTWrMrmgibyGK7HsCudq9SRUHQ3sV0xtBNzCUr0nGdCiLgJR1AaWiR+oeVmEKspGf7yglx
                  dcnSz2161LD17NW+bSEbsAXpJlGdmOn4f6vKWKTL7Mub+z6k0g5sYqikhBXYTz8lY+TUufIVZmfBmZ
                  uNz0nEn9W8iajO8yEGWTiTChWDsR6VxTa8LS9vZDVW9r1aQgtFMmY+laODDPuvTQ92MVk26tIiLkv7
                  vkLoXi1e9VEdHcZtOvv+ehsbshc60hfcQs+WpCI1NrArc9u+r199vXyQkNYGuWcMdgnmdqo8ANeNUv
                  fYHQ7hAmVOcznHdzK6ZOPUBkWF+WIHE++t9e6T3ggOAdIP1Pny+LSxHzAHda9VHgwSe1/yoJYEg/E7
                  /2GPAkEYKsyD9yNZeREIGEWIyxBrEVImK1iJnINndGfCKkTyyIdbtjXY+d0Tpe1edA4PfqgKzUOVUW
                  kfhRLvgxqx6EXOs3qxImhPPTOL/QN23aqOeZJzU0KNe2aglbuZJ7d7jmLWVEpB+1s1HEuEff79Xkzh
                  2vqO15Oq85c9vbp1i3fjuU2ustW4aBiH75Jk0/aSpN6OZHGHeQJKhviczjPChvKqPAIr4uhp+Gkh7G
                  EWvJWCshW68LIr4CDjCJGvR7szeMFgcuEwiFFRIB/spUK8G6nIj207JkhckQKV4YKLyZYHdAkz3Phw
                  6FPjPxSU7JtiqR4z2QteoC0ueWrs7Oyp8C0zk0vW8m02WcdUG/pL+vLkuYJh2Gp02bqgHpHysxYQCX
                  7/h93nNMtSXIKiysireYFLmxYLIDsG6rOztrLF2ERG270JsK1Pa1Ve7VE6TkfS+99frBKnsZ6x/SNS
                  I2LdyHQNyqeg9kS0lcGFyUZML0YdUi/EA553fD5Ac6JAy+rNsm/T1Xwi2x3pCIWL0a9AutC2LOP60i
                  BC5QE/OMCB78AWrpL7gvTV9Q26NEFusFndf6kGUidKiK0bzb1kVi1ZswPGsWBHq8bC0RUnkrX1i/DE
                  Gx6ye4JccYiNg/jG44AJYOmNCyoL4oTAATWCWPd3QQA91uXbStog/n1lZtYqBMpFo/WK9fSFy5XJZu
                  oFb7oCatmzZx4dxdyAvWymedSdKXv5OTQQQ9gzAi1CdiyydNjwxkWDVz5ttUp3JR21x76Xa0DCyQK5
                  T55/40/awdiiiCgFoT+bNWidiKmPX7F+vCo69e/xSkyFxaUSAj54CuSLtZ8gxEg4Sh+gjxGwRmx4p1
                  0wSR7DgIW9anWbQ1bBszlSaobE5lSEFZ4E5SxE5gTxER6Ni1q2Uty4iRCQTjfKrqUcZu6W7n/sGaH4
                  VFSXLsYMV9X4guj7C5Z/r0GabSBF0Mt2D1MguMBeXCgJwc/6/OTiziiOWP2AXsSSLyQiGR4mbKy7Lo
                  VgR3aX1Ubpkf4vUjzj1d/N8ILxDcPaRnk4OpNEG6l/jY2blnJes0Tkuk36u/eS7n75VZ/42OlT4SET
                  EO2FrXumENeHbl76qsktVTm6W/YqTJPEskWM8aml/LExnyRAkJhMEaoSMiPt2Xpn9mzZXikVptfxHl
                  OXTQxYqRvNAnLt27fpUPpOkfmkoTWGRWbPcRnm/OL5ZHTAD8Ol+SPCoCvajP3SKyVi+KiNdbF0Gwdi
                  Yyfk0kXAEhsHCQpCiQBxKJiK/IzS5d6txX72nxTV5KYN6i2PQ2EW9A59MtK/iNQee+zkYDkev35NaP
                  h2T5V79F/D9Bk7UPGSprcVz1u0Noq7g/sApD9fqRvLYXosj68ZbTTC5nV40+TxJhd+qXkPaqjaN7Bd
                  ra/hc4jx+w6HVJIAAAAABJRU5ErkJggg==`, 'PNG', 20, 10, 23, 14);

    // const callAddFont = function() {
    //   this.addFileToVFS('arial-normal.ttf', CustomFonts.arialNormal);
    //   this.addFont('arial-normal.ttf', 'arial', 'normal');
    //   };
    // jsPDF.API.events.push(['addFonts', callAddFont]);

    // console.log('Font:');
    // console.log(CustomFonts.ddd);
    console.log(doc.getFontList());
    doc.addFileToVFS('arial-normal.ttf', CustomFonts.arialNormal);
    doc.addFont('arial-normal.ttf', 'arial', 'normal');




    // doc.addFileToVFS('DejaVuSans-Bold.ttf', '../assets/fonts/DejaVuSans-normal.js');
    // // doc.addFont('../../src/assets/fonts/DejaVuSans-Bold.ttf', 'DejaVuSans-Bold', 'normal');

    // doc.addFont('DejaVuSans-Bold.ttf', 'DejaVuSans-Bold', 'normal');
    console.log(doc.getFontList());
    // /home/tomasz/Projekty/Angular/Lab-met/lab-met-project/src/assets/fonts/DejaVuSans-Bold.ttf
    // doc.addFont('../assets/fonts/DejaVuSans.ttf', 'DejaVuSans', 'normal');
    // doc.addFont('../assets/fonts/arial.ttf', 'arial', 'normal');
    // doc.setFont('DejaVuSans-Bold');
    // doc.setFontSize(12);
    // doc.text('HARMONOGRAM KONTROLI NA ROK ' + year, 125, 25, { align: 'center'});
    // doc.setFont('DejaVuSans');
    // doc.setFontSize(12);
    // doc.text('Data wydruku: ' + new Date().toLocaleDateString() + 'r.', 277, 25, { align: 'right'});
    // doc.setLineWidth(0.25);
    // doc.line(20, 27, 277, 27);






    doc.save('Harmonogram_roczny_' + year + '.pdf');
  }
}
