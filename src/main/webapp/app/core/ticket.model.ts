import { ProductModuleModel } from 'app/core/ProductModule.model';
import { TicketAssignModule } from 'app/core/TicketAssign.module';

export class TicketModel {
    id: number;
    ticketNo: string;
    type: string;
    status: string;
    priority: string;
    subject: string;
    currentStatusAge: string;
    ticketAge: string;
    description: string;
    ticketDate: string;
    ticketTime: string;
    teamStatus: string;
    productModule: ProductModuleModel;
    ticketAssign: TicketAssignModule;

    constructor() {}
}
