import { Component, OnInit } from '@angular/core';
import { TicketModel } from 'app/core/ticket.model';
import { CreateTicketService } from 'app/core/create-ticket/CreateTicket.service';
import { ProductModuleService } from 'app/core/create-ticket/ProductModule.service';
import { TicketAssignModule } from 'app/core/TicketAssign.module';
import { NbToastrService } from '@nebular/theme';
import { User } from 'app/core';

@Component({
    selector: 'ngx-epic-new-dev-accept-ticket',
    templateUrl: './epic-new-dev-accept-ticket.component.html',
    styleUrls: ['./epic-new-dev-accept-ticket.component.scss']
})
export class EpicNewDevAcceptTicketComponent implements OnInit {
    elements: any = [
        // {id: 1, first: 'Mark', last: 'Otto', handle: '@mdo'},
        // {id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat'},
        // {id: 3, first: 'Larry', last: 'the Bird', handle: '@twitter'},
    ];

    //headElements = ['ID', 'First', 'Last', 'Handle'];
    ticketAssignListByUser: TicketAssignModule[] = [];
    newTicketAssign: TicketAssignModule = new TicketAssignModule();
    ticketRejectedReason: string;
    currentLoggedUser: User = new User();
    private index: number = 0;
    reason: string;
    constructor(
        private ticketService: CreateTicketService,
        private productModuleService: ProductModuleService,
        private toastrService: NbToastrService
    ) {}

    ngOnInit() {
        // this.ticketService.getListOfTicketsByUser().subscribe((ticket: TicketModel[]) => {
        //     this.ticketListByUser = ticket;
        // });
        this.ticketService.getListOfTicketAssignsByUserId().subscribe((ticket: TicketAssignModule[]) => {
            console.log('This is assign ticketsssssssssssssssssssss');
            console.log(ticket);

            this.ticketAssignListByUser = ticket;
        });

        this.ticketService.getListOfTicketAssignsByUser().subscribe((ticket: TicketAssignModule[]) => {
            console.log('This is assign ticketsssssssssssssssssssss');
            console.log(ticket);
            for (const list of ticket) {
                this.ticketAssignListByUser.push(list);
            }
        });

        this.productModuleService.getCurrentLoggedUser().subscribe((user: User) => {
            this.currentLoggedUser = user;
        });
    }

    acceptTicket(ticketAssign: TicketAssignModule) {
        // ticketAssign.accepted = "accepted";
        this.newTicketAssign = ticketAssign;
        this.newTicketAssign.id = ticketAssign.id;
    }
    acceptTicketModel() {
        this.newTicketAssign.accepted = 'accepted';
        this.newTicketAssign.ticket.teamStatus = 'ACCEPTED';
        this.ticketService.postNewTicket(this.newTicketAssign.ticket).subscribe((ticket: TicketModel) => {
            console.log('post upddate ticket');
            console.log(ticket);
        });
        this.productModuleService.saveTicketassignToTeamPut(this.newTicketAssign).subscribe((ticketAssign: TicketAssignModule) => {});
    }
    acceptTicketModelQA() {
        if (this.currentLoggedUser.department.id === 6) {
            this.newTicketAssign.accepted = 'QA ACCEPTED';
            this.newTicketAssign.ticket.teamStatus = 'QA ACCEPTED';
        } else if (this.currentLoggedUser.department.id === 7) {
            this.newTicketAssign.accepted = 'DEV ACCEPTED';
            this.newTicketAssign.ticket.teamStatus = 'DEV ACCEPTED';
        }

        this.ticketService.postNewTicket(this.newTicketAssign.ticket).subscribe((ticket: TicketModel) => {
            console.log('post upddate ticket');
            console.log(ticket);
        });
        this.productModuleService.saveTicketassignToTeamPut(this.newTicketAssign).subscribe((ticketAssign: TicketAssignModule) => {});
    }

    rejectTicket(ticketAssign: TicketAssignModule) {
        // ticketAssign.accepted = "rejected";
        // ticketAssign.reason = this.ticketRejectedReason;
        this.newTicketAssign = ticketAssign;
        this.newTicketAssign.id = ticketAssign.id;
    }
    rejectTicketModel() {
        this.newTicketAssign.accepted = 'rejected';
        this.newTicketAssign.reason = this.ticketRejectedReason;
        this.newTicketAssign.ticket.teamStatus = 'REJECTED';
        this.ticketService.postNewTicket(this.newTicketAssign.ticket).subscribe((ticket: TicketModel) => {
            console.log('post upddate ticket');
            console.log(ticket);
        });
        this.productModuleService.saveTicketassignToTeamPut(this.newTicketAssign).subscribe((ticketAssign: TicketAssignModule) => {
            console.log('This is ticket Rejected ');
            console.log(ticketAssign);
        });
    }
    rejectTicketModelQA() {
        this.newTicketAssign.accepted = 'QA REJECTED';
        this.newTicketAssign.reason = this.ticketRejectedReason;
        this.newTicketAssign.ticket.teamStatus = 'QA REJECTED';
        this.ticketService.postNewTicket(this.newTicketAssign.ticket).subscribe((ticket: TicketModel) => {
            console.log('post upddate ticket');
            console.log(ticket);
        });
        this.productModuleService.saveTicketassignToTeamPut(this.newTicketAssign).subscribe((ticketAssign: TicketAssignModule) => {
            console.log('This is ticket Rejected ');
            console.log(ticketAssign);
        });
    }

    showToast(duration) {
        const config = {
            duration: duration
        };
        this.toastrService.show('This is super toast message', `This is toast number: ${++this.index}`, config);
    }
}
