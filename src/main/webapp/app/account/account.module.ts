import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Jhipstersupport3SharedModule } from 'app/shared';

import {
    PasswordStrengthBarComponent,
    RegisterComponent,
    ActivateComponent,
    PasswordComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent,
    accountState
} from './';
import { NbCardModule } from '@nebular/theme';

@NgModule({
    imports: [Jhipstersupport3SharedModule, NbCardModule, RouterModule.forChild(accountState)],
    declarations: [
        ActivateComponent,
        RegisterComponent,
        PasswordComponent,
        PasswordStrengthBarComponent,
        PasswordResetInitComponent,
        PasswordResetFinishComponent,
        SettingsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Jhipstersupport3AccountModule {}
