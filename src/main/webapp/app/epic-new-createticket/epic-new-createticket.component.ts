import { Component, OnInit } from '@angular/core';
import { ProductModuleService } from 'app/core/create-ticket/ProductModule.service';
import { ProductModuleModel } from 'app/core/ProductModule.model';
import { CreateTicketService } from 'app/core/create-ticket/CreateTicket.service';
import { TicketModel } from 'app/core/ticket.model';
import { User, UserService } from 'app/core';
import { CompanyProductDetailModel } from 'app/core/CompanyProductDetail.module';
import { TicketAssignModule } from 'app/core/TicketAssign.module';
import { CompanyProductModuleModel } from 'app/core/companyProductModule.model.st';
import { UserProductDetailsModule } from 'app/core/userProductDetails.module';
import { ProductModel } from 'app/core/product.model';
import { UserProductModule } from 'app/core/UserProduct.model';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
    selector: 'ngx-epic-new-createticket',
    templateUrl: './epic-new-createticket.component.html',
    styleUrls: ['./epic-new-createticket.component.scss']
})
export class EpicNewCreateticketComponent implements OnInit {
    html = ``;
    productModuleList: ProductModuleModel[] = [];
    newTicket: TicketModel = new TicketModel();
    companyProductDetailsList: CompanyProductDetailModel[] = [];
    companyProductDetail: CompanyProductDetailModel[] = [];
    newTicketAssign: TicketAssignModule = new TicketAssignModule();

    companyProductDetailsInfoList: CompanyProductDetailModel[] = [];
    nameArrayList: Array<string> = [];
    assignUserList: User[] = [];
    productType: ProductModel = new ProductModel();
    // productArraySort: ProductModel[]= [];
    bProductInfo: boolean = true;

    ticketPriorityArray: string[] = ['HIGHEST', 'HIGH', 'MEDIUM', 'LOW'];
    ticketTypeArray: string[] = ['BUG', 'OTHER'];

    private index: number = 0;

    ticketId: number = 50;

    constructor(
        private productModuleService: ProductModuleService,
        private createTicketService: CreateTicketService,
        private userService: UserService,
        private toastrService: NbToastrService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.productModuleService.getListOfProductModulesForCompany().subscribe((companyProductDetails: CompanyProductDetailModel[]) => {
            this.companyProductDetailsList = [];
            this.companyProductDetailsInfoList = companyProductDetails;

            this.nameArrayList = [];
            for (const list of companyProductDetails) {
                const name = list.companyProductModule.product_module.product.productName;

                if (!this.nameArrayList.includes(name)) {
                    this.nameArrayList.push(name);
                    this.companyProductDetailsList.push(list);
                }
            }
        });
    }

    selectProduct(product: ProductModuleModel) {
        this.newTicket.productModule = product;
        this.productType = product.product;
        console.log('this is product type id');
        console.log(this.productType.id);
    }

    ticketPriority(list: string) {
        this.newTicket.priority = list;
    }
    selectType(list: string) {
        this.newTicket.type = list;
    }
    createNewTicket(duration) {
        this.createTicketService.postNewTicket(this.newTicket).subscribe((ticket: TicketModel) => {
            this.newTicketAssign.ticket = ticket;
            this.ticketId = ticket.id;
            console.log('thi is ticket idddddddd');
            console.log(this.ticketId);
            this.productModuleService.getListOfUserProductByProductID(this.productType.id).subscribe((userProduct: UserProductModule[]) => {
                console.log('thi is user products liststttttttttttttt');
                console.log(userProduct);
                for (const list of userProduct) {
                    this.newTicketAssign.userProduct = list;
                    this.newTicketAssign.accepted = 'null';

                    this.productModuleService.saveTicketassignToTeam(this.newTicketAssign).subscribe((ticketAssign: TicketAssignModule) => {
                        console.log(ticketAssign);
                    });
                }
            });

            this.productModuleService.sendMessages().subscribe(response => {
                console.log(response);
            });

            // for ( const list of this.companyProductDetail) {
            //     this.productModuleService.getListOfUserProductDetailsById(list.companyProductModule.id).subscribe(
            //         (userProductDetailList: UserProductDetailsModule[]) => {
            //             this.assignUserList = userProductDetailList;
            //
            //             for ( const list of userProductDetailList) {
            //
            //                 this.newTicketAssign.userProductDetails = list;
            //
            //                 this.productModuleService.saveTicketassignToTeam(this.newTicketAssign).subscribe(
            //                     (ticketAssign: TicketAssignModule) => {
            //                         console.log(ticketAssign);
            //                     });
            //             }
            //
            //         });
            // }
            this.router.navigate(['../ticket/process/' + this.ticketId], { relativeTo: this.route });
        });

        const config = {
            duration: duration,
            position: NbGlobalPhysicalPosition.BOTTOM_LEFT,
            status: NbToastStatus.SUCCESS
        };
        this.toastrService.show('Successfully Created the Ticket', `Ticket Created: ${++this.index}`, config);
    }

    selectCompanyProduct(list: CompanyProductDetailModel) {
        // this.productModuleService.getListOfCompanyProductModuleById(list.companyProductModule.id).subscribe(
        //     (cpm : CompanyProductModuleModel) => {
        //
        //         console.log("this is the companyproductmodulesingle id");
        //         console.log(cpm);
        //
        //         this.productModuleService.getListOfCompanyProductsModulesByProductId(cpm.product_module.id).subscribe(
        //             (li : CompanyProductModuleModel) => {
        //                 this.companyProductDetail.push(li);
        //                 console.log("this is the companyproductmodulesingle listsss");
        //                 console.log(li);
        //             });
        //     });

        this.bProductInfo = false;
        const productname = list;
        this.companyProductDetail = [];

        for (const li of this.companyProductDetailsInfoList) {
            if (
                li.companyProductModule.product_module.product.productName === list.companyProductModule.product_module.product.productName
            ) {
                this.companyProductDetail.push(li);
            }
        }

        this.newTicket.productModule = list.companyProductModule.product_module;
        this.productType = list.companyProductModule.product_module.product;
        console.log('this is product type id descriptionnnnnnnnnnn');
        console.log(this.productType.id);
        console.log(this.newTicket.description);
    }
}
