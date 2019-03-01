import { Observable } from 'rxjs';
import { ProductModuleModel } from 'app/core/ProductModule.model';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IUser } from 'app/core';
import { CompanyProductModuleModel } from 'app/core/companyProductModule.model.st';
import { CompanyProductDetailModel } from 'app/core/CompanyProductDetail.module';
import { UserProductDetailsModule } from 'app/core/userProductDetails.module';
import { TicketAssignModule } from 'app/core/TicketAssign.module';
import { UserProductModule } from 'app/core/UserProduct.model';

@Injectable({ providedIn: 'root' })
export class ProductModuleService {
    public resourceUrl = SERVER_API_URL + 'api/test';

    constructor(private http: HttpClient) {}

    create(user: IUser): Observable<HttpResponse<IUser>> {
        return this.http.post<IUser>(this.resourceUrl, user, { observe: 'response' });
    }

    update(user: IUser): Observable<HttpResponse<IUser>> {
        return this.http.put<IUser>(this.resourceUrl, user, { observe: 'response' });
    }

    getListOfProductModules() {
        const url = this.resourceUrl + '/getList';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }
    getListOfProductModulesForCompany() {
        const url = this.resourceUrl + '/getListOfCompanyProductDetailForCompany';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getListOfProductModulesByCompanyId(id: number) {
        const url = this.resourceUrl + '/getListOfCompanyProductDetailByCompanyId/' + id;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getListOfProductsOnly() {
        const url = this.resourceUrl + '/getListOfProducts';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }
    getListOfProductsModulesByProductId(id: number) {
        const url = this.resourceUrl + '/getListOfProductsModulesByProductId/' + id;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    saveCompanyProductModule(companyModule: CompanyProductModuleModel) {
        const url = this.resourceUrl + '/saveCompanyProductModule';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.post(url, companyModule);
    }

    getListOfCompanyProductModules() {
        const url = this.resourceUrl + '/listOfCompanyProductModule';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getListOfCompanies() {
        const url = this.resourceUrl + '/getListOfCompany';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getListOfCompanyProductsModulesByProductId(id: number) {
        const url = this.resourceUrl + '/getListOfCompanyProductsModulesByProductModuleId/' + id;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    saveProductsAssignToCompany(companyProductList: CompanyProductDetailModel) {
        const url = this.resourceUrl + '/saveProductsAssignToCompany';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.post(url, companyProductList);
    }

    getListOfDepartments() {
        const url = this.resourceUrl + '/getListOfDepartments';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getListOfUsers(id: number) {
        const url = this.resourceUrl + '/getListOfUsersByDepartmentId/' + id;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    saveProductsAssignToUser(userProductList: UserProductDetailsModule) {
        const url = this.resourceUrl + '/saveProductToUser';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.post(url, userProductList);
    }

    saveTicketassignToTeam(ticketAssign: TicketAssignModule) {
        const url = this.resourceUrl + '/ticketAssign';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.post(url, ticketAssign);
    }

    saveTicketassignToTeamPut(ticketAssign: TicketAssignModule) {
        const url = this.resourceUrl + '/ticketAssignPut';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.put(url, ticketAssign);
    }

    getListOfCompanyProductModuleById(id: number) {
        const url = this.resourceUrl + '/getListOfCompanyProductModuleByID/' + id;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getListOfUserProductDetailsById(id: number) {
        const url = this.resourceUrl + '/getListOfCompanyProductModuleId/' + id;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    saveUserProduct(userProduct: UserProductModule) {
        const url = this.resourceUrl + '/saveUserAssignProduct';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.post(url, userProduct);
    }

    getListOfUserProductByUserID(id: number) {
        const url = this.resourceUrl + '/getListOfUserProductsById//' + id;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getListOfUserProductByProductID(id: number) {
        const url = this.resourceUrl + '/getListOfUserProductsByProductId/' + id;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }
    sendMessages() {
        const url = this.resourceUrl + '/send';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }
    getCurrentLoggedUser() {
        const url = this.resourceUrl + '/getCurrentLoggedUser';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getAllTheTickets() {
        const url = this.resourceUrl + '/getListTickets';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }
}
