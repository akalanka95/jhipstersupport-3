import { Component, OnInit } from '@angular/core';
import { ProductModuleService } from 'app/core/create-ticket/ProductModule.service';
import { ProductModel } from 'app/core/product.model';
import { ModuleModel } from 'app/core/module.model';
import { ProductModuleModel } from 'app/core/ProductModule.model';
import { CompanyProductModuleModel } from 'app/core/companyProductModule.model.st';

@Component({
    selector: 'ngx-epic-user-products',
    templateUrl: './epic-user-products.component.html',
    styleUrls: ['./epic-user-products.component.scss']
})
export class EpicUserProductsComponent implements OnInit {
    newProductForm: boolean = true;
    userProductAssign: boolean = true;
    test: boolean = true;
    type: boolean = true;
    hardType: boolean = true;
    softType: boolean = true;

    productList: ProductModel[] = [];
    moduleModelList: ProductModuleModel[] = [];

    companyProductModuleModel: CompanyProductModuleModel = new CompanyProductModuleModel();
    companyProductModuleList: CompanyProductModuleModel[] = [];

    //productModuleModel: ProductModuleModel = new ProductModuleModel();
    // newCompanyProductModel: CompanyProductModel = new CompanyProductModel();
    //
    // companyProductHardwareList: CompanyProductModel[] = [];
    // companyProductSoftwareList: CompanyProductModel[] = [];
    //
    // selectProduct: CompanyProductModel = new CompanyProductModel();
    //
    // clientCompanyList: ClientCompanyModel[] = [];

    constructor(private productModuleService: ProductModuleService) {}

    ngOnInit() {
        this.productModuleService.getListOfProductsOnly().subscribe(
            (list: ProductModel[]) => {
                this.productList = list;
            },
            error => console.log(error)
        );

        this.productModuleService.getListOfCompanyProductModules().subscribe(
            (list: CompanyProductModuleModel[]) => {
                console.log('This is Company product List');
                console.log(list);
                this.companyProductModuleList = list;
            },
            error => console.log(error)
        );
    }

    // openNewProduct() {
    //   this.test = false;
    //   if (this.newProductForm) {
    //     this.newProductForm = false;
    //   }else {
    //     this.newProductForm = true;
    //   }
    //   this.userProductAssign = true;
    // }

    productAssign() {
        this.newProductForm = true;
        this.test = true;
    }

    // assignProduct(selectProduct: CompanyProductModel) {
    //   if (this.test) {
    //     this.userProductAssign = false;
    //   }else {
    //     this.userProductAssign = true;
    //   }
    //   this.selectProduct = selectProduct;
    // }
    //
    // createProduct() {
    //   this.companyProductService.postNewCompanyProduc(this.newCompanyProductModel)
    //     .subscribe(
    //       (response) => {
    //         this.companyProductService.getListOfCompanyProduct()
    //           .subscribe(
    //             (list: CompanyProductModel[]) => {
    //               this.companyProductHardwareList = [];
    //               this.companyProductSoftwareList = [];
    //               for ( const li of list){
    //                 if ( li.productType === 'HARDWARE') {
    //                   this.companyProductHardwareList.push(li);
    //                 } else {
    //                   this.companyProductSoftwareList.push(li);
    //                 }
    //               }
    //             },
    //             (error) => console.log(error)
    //           );
    //       },
    //       (error) => console.log(error)
    //     );
    // }

    selectType(type: string) {
        if (type === 'Hardware') {
            this.type = false;
            this.hardType = false;
            this.softType = true;
        } else {
            this.type = false;
            this.hardType = true;
            this.softType = false;
        }
    }

    selectProductType(list: ProductModel) {
        console.log('This is product module list ssssssssssssssssssssssssssssssss');
        console.log(list.productName);
        this.productModuleService.getListOfProductsModulesByProductId(list.id).subscribe(
            (list: ProductModuleModel[]) => {
                console.log('This is product module list');
                console.log(list);
                this.moduleModelList = list;
            },
            error => console.log(error)
        );
    }

    selectProductModule(list: ProductModuleModel) {
        this.companyProductModuleModel.product_module = list;
    }

    createProductModule() {
        this.productModuleService.saveCompanyProductModule(this.companyProductModuleModel).subscribe(
            response => {
                console.log(response);
                this.productModuleService.getListOfCompanyProductModules().subscribe(
                    (list: CompanyProductModuleModel[]) => {
                        console.log('This is Company product List');
                        console.log(list);
                        this.companyProductModuleList = list;
                    },
                    error => console.log(error)
                );
            },
            error => console.log(error)
        );
    }
}
