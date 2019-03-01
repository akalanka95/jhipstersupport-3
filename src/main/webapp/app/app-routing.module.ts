import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { EpicNewCreateticketComponent } from 'app/epic-new-createticket/epic-new-createticket.component';
import { EpicNewDevProcessTicketComponent } from 'app/epic-new-dev-process-ticket/epic-new-dev-process-ticket.component';
import { EpicNewDevAcceptTicketComponent } from 'app/epic-new-dev-accept-ticket/epic-new-dev-accept-ticket.component';
import { EpicNewViewTicketComponent } from 'app/epic-new-view-ticket/epic-new-view-ticket.component';
import { EpicUserProductsComponent } from 'app/epic-user-products/epic-user-products.component';
import { EpicNewAssignProductComponent } from 'app/epic-new-assign-product/epic-new-assign-product.component';
import { EpicNewManagerTicketsComponent } from 'app/epic-new-manager-tickets/epic-new-manager-tickets.component';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'admin',
                    loadChildren: './admin/admin.module#Jhipstersupport3AdminModule'
                },
                {
                    path: 'user/createTicket',
                    component: EpicNewCreateticketComponent
                },
                {
                    path: 'user/viewTicket',
                    component: EpicNewViewTicketComponent
                },
                {
                    path: 'team/processTicket',
                    component: EpicNewDevProcessTicketComponent
                },
                {
                    path: 'team/ticketAction',
                    component: EpicNewDevAcceptTicketComponent
                },
                {
                    path: 'user/ticket/process',
                    component: EpicNewDevProcessTicketComponent
                },
                {
                    path: 'user/ticket/process/:id',
                    component: EpicNewDevProcessTicketComponent
                },
                {
                    path: 'user/ticket/process/:id/:assignId',
                    component: EpicNewDevProcessTicketComponent
                },
                {
                    path: 'admin/addProducts',
                    component: EpicUserProductsComponent
                },
                {
                    path: 'manager/ticketDetails',
                    component: EpicNewManagerTicketsComponent
                },
                {
                    path: 'admin/assignProducts',
                    component: EpicNewAssignProductComponent
                },
                ...LAYOUT_ROUTES
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
        )
    ],
    exports: [RouterModule]
})
export class Jhipstersupport3AppRoutingModule {}
