// Material Module example.
// All other Angular Material component imports here
// but the important ones are...
import { NgModule } from '@angular/core';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';

@NgModule({
    declarations: [],
    imports: [
    // Other material imports removed for brevity,
    MatIconModule],
    exports: [
    // Other material exports removed for brevity,
    ],
    entryComponents: [],
    providers: [MatIconRegistry]
})
export  class  MaterialModule  {}
