import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { VERSION } from 'app/app.constants';
import { AccountService, LoginModalService, LoginService, User } from 'app/core';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { ProductModuleService } from 'app/core/create-ticket/ProductModule.service';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.scss']
})
export class NavbarComponent implements OnInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    currentUser: User = new User();

    constructor(
        private loginService: LoginService,
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private productService: ProductModuleService,
        private router: Router
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngOnInit() {
        console.log('This is the current Logged user11111111');
        console.log('This is the current Logged user11111');
        console.log('This is the current Logged user111');
        console.log('This is the current Logged user111');
        console.log('This is the current Logged user111');
        this.profileService.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
        this.productService.getCurrentLoggedUser().subscribe((user: User) => {
            this.currentUser = user;
            console.log('This is the current Logged user');
            console.log('This is the current Logged user');
            console.log('This is the current Logged user');
            console.log('This is the current Logged user');
            console.log('This is the current Logged user');
            console.log(this.currentUser);
        });
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.accountService.getImageUrl() : null;
    }
}
