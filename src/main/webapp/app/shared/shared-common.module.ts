import { NgModule } from '@angular/core';

import { Jhipstersupport3SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [Jhipstersupport3SharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [Jhipstersupport3SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class Jhipstersupport3SharedCommonModule {}
