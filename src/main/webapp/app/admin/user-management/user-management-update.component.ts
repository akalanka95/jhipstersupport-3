import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User, UserService } from 'app/core';
import { CompanyModule } from 'app/core/company.module';
import { ProductModuleService } from 'app/core/create-ticket/ProductModule.service';
import { DepartmentModule } from 'app/core/department.module';

@Component({
    selector: 'jhi-user-mgmt-update',
    templateUrl: './user-management-update.component.html'
})
export class UserMgmtUpdateComponent implements OnInit {
    user: User;
    languages: any[];
    authorities: any[];
    isSaving: boolean;
    companyList: CompanyModule[] = [];
    c1: CompanyModule = new CompanyModule();
    companyDetails: boolean = true;
    departmentList: DepartmentModule[] = [];

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private productModuleService: ProductModuleService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ user }) => {
            this.user = user.body ? user.body : user;
        });
        this.authorities = [];
        this.userService.authorities().subscribe(authorities => {
            this.authorities = authorities;
        });

        this.productModuleService.getListOfCompanies().subscribe(
            (list: CompanyModule[]) => {
                this.companyList = list;
            },
            error => console.log(error)
        );
        this.productModuleService.getListOfDepartments().subscribe(
            (list: DepartmentModule[]) => {
                this.departmentList = list;
            },
            error => console.log(error)
        );
    }

    selectCompany(list: CompanyModule) {
        if (list.companyName === 'EPIC_LANKA') {
            this.companyDetails = false;
        } else {
            this.companyDetails = true;
        }
        this.user.company = list;
    }

    selectDepartment(list: DepartmentModule) {
        this.user.department = list;
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.user.id !== null) {
            this.userService.update(this.user).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.user.langKey = 'en';
            this.userService.create(this.user).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
