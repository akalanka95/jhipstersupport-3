import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateTicketService } from 'app/core/create-ticket/CreateTicket.service';
import { TicketModel } from 'app/core/ticket.model';
import { TicketCommentModel } from 'app/core/TicketComment.model';
import { JhiTrackerService, User } from '../core';
import { ProductModuleService } from 'app/core/create-ticket/ProductModule.service';
import { TicketAssignModule } from 'app/core/TicketAssign.module';

@Component({
    selector: 'ngx-epic-new-dev-process-ticket',
    templateUrl: './epic-new-dev-process-ticket.component.html',
    styleUrls: ['./epic-new-dev-process-ticket.component.scss']
})
export class EpicNewDevProcessTicketComponent implements OnInit {
    vietTicketInfo = true;
    ticket: TicketModel = new TicketModel();
    ticketId: number;
    assignId: number;
    newTicketComment: TicketCommentModel = new TicketCommentModel();
    ticketCommentArrya: TicketCommentModel[] = [];
    currentLoggedUser: User = new User();
    assignStatusArray: string[] = [];
    assignStatusUserArray: User[] = [];
    activities: any;
    ticketCommentWebSocket: TicketCommentModel = new TicketCommentModel();
    index: number;
    ticketAssign: TicketAssignModule[] = [];
    openTicketStatus: boolean = true;
    openTicketStatusButton: boolean = false;
    newTicketAssign: TicketAssignModule = new TicketAssignModule();
    constructor(
        private route: ActivatedRoute,
        private ticketService: CreateTicketService,
        private trackerService: JhiTrackerService,
        private productService: ProductModuleService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.ticketId = +params.id;
            this.assignId = +params.assignId;
            this.ticketService.getTicketById(this.ticketId).subscribe((ticket: TicketModel) => {
                this.ticket = ticket;
                if (this.ticket.teamStatus === 'SUPPORT INPROGRESS') {
                    this.openTicketStatus = false;
                    this.openTicketStatusButton = true;
                }
                if (this.ticket.teamStatus === 'QA INPROGRESS') {
                    this.openTicketStatus = false;
                    this.openTicketStatusButton = true;
                }
                if (this.ticket.teamStatus === 'DEV INPROGRESS') {
                    this.openTicketStatus = false;
                    this.openTicketStatusButton = true;
                }
            });
        });

        this.ticketService.getTicketCommentByTicketId(this.ticketId).subscribe((ticketComment: TicketCommentModel[]) => {
            this.ticketCommentArrya = ticketComment;
        });

        this.productService.getCurrentLoggedUser().subscribe((user: User) => {
            this.currentLoggedUser = user;
            if (this.currentLoggedUser.department.id === 5) {
                this.assignStatusArray = [];
                this.assignStatusArray.push('SUPPORT ASSIGNED TO QA');
            }
            if (this.currentLoggedUser.department.id === 6) {
                this.productService.getListOfUsers(6).subscribe((lists: User[]) => {
                    this.assignStatusUserArray = [];
                    this.assignStatusUserArray = lists;
                });
                this.assignStatusArray = [];
                this.assignStatusArray.push('QA ASSIGNED TO DEVELOPMENT');
            }

            if (this.currentLoggedUser.department.id === 7) {
                this.productService.getListOfUsers(7).subscribe((lists: User[]) => {
                    this.assignStatusUserArray = [];
                    this.assignStatusUserArray = lists;
                });
                this.assignStatusArray = [];
                this.assignStatusArray.push('DEVELOPMENT DONE');
            }
        });

        this.trackerService.subscribe2();
        this.trackerService.receive().subscribe(activity => {
            this.ticketCommentWebSocket = activity;
            console.log('Ticket comment 2 testing 111111111');
            console.log(this.ticketCommentWebSocket);
            this.ticketCommentArrya.push(this.ticketCommentWebSocket);
            this.index = 1;
        });
    }

    viewTicketInfo() {
        if (this.vietTicketInfo) {
            this.vietTicketInfo = false;
        } else {
            this.vietTicketInfo = true;
        }
    }

    saveTicketComment() {
        this.index = 0;
        this.newTicketComment.ticket = this.ticket;
        this.ticketService.postNewTicketComment(this.newTicketComment).subscribe((ticketComment: TicketCommentModel) => {
            console.log('this is new ticket commentssssssssdssdsdsdsd');
            console.log(ticketComment);
            //this.ticketCommentArrya.push()
            // this.ticketService.getTicketCommentByTicketId(this.ticketId).subscribe((ticketComment: TicketCommentModel[]) => {
            //     this.ticketCommentArrya = ticketComment;
            // });
        });

        this.trackerService.sendActivity2(this.newTicketComment);

        this.newTicketComment.comment = null;
    }

    selectStatus(list: string) {
        this.ticket.teamStatus = list;
    }

    selectTeamMember(list: User) {
        this.newTicketAssign.user = list;
    }

    assignTicket() {
        this.ticketService.postNewTicket(this.ticket).subscribe((ticket: TicketModel) => {
            //console.log("Successfully Ticket Assigned to QA");
        });

        this.ticketService.getTicketAssignById(this.assignId).subscribe((ticketAssign: TicketAssignModule) => {
            //ticketAssign.accepted = "SUPPORT ASSIGNED TO QA";
            ticketAssign.accepted = this.ticket.teamStatus;
            this.productService.saveTicketassignToTeamPut(ticketAssign).subscribe((ticketAssign: TicketAssignModule) => {});
        });
    }

    openTicket() {
        this.openTicketStatus = false;
        this.openTicketStatusButton = true;

        if (this.currentLoggedUser.department.departmentName === 'Support') {
            this.ticket.teamStatus = 'SUPPORT INPROGRESS';
        } else if (this.currentLoggedUser.department.departmentName === 'QA') {
            this.ticket.teamStatus = 'QA INPROGRESS';
        } else if (this.currentLoggedUser.department.departmentName === 'Dev') {
            this.ticket.teamStatus = 'DEV INPROGRESS';
        }

        this.ticketService.postNewTicket(this.ticket).subscribe((ticket: TicketModel) => {
            console.log('Successfully Ticket Assigned to QA');
        });

        this.ticketService.getTicketAssignById(this.assignId).subscribe((ticketAssign: TicketAssignModule) => {
            if (this.currentLoggedUser.department.departmentName === 'Support') {
                ticketAssign.accepted = 'SUPPORT INPROGRESS';
            } else if (this.currentLoggedUser.department.departmentName === 'QA') {
                ticketAssign.accepted = 'QA INPROGRESS';
            } else if (this.currentLoggedUser.department.departmentName === 'Dev') {
                this.ticket.teamStatus = 'DEV INPROGRESS';
            }

            this.productService.saveTicketassignToTeamPut(ticketAssign).subscribe((ticketAssign: TicketAssignModule) => {});
        });
    }

    assignTicketByQAManager() {
        this.newTicketAssign.ticket = this.ticket;

        if (this.currentLoggedUser.department.id === 6) {
            this.ticket.teamStatus = 'QA ASSIGNED BY MANAGER';
            this.newTicketAssign.accepted = 'QA ASSIGNED BY MANAGER';
        } else if (this.currentLoggedUser.department.id === 7) {
            this.ticket.teamStatus = 'DEV ASSIGNED BY MANAGER';
            this.newTicketAssign.accepted = 'DEV ASSIGNED BY MANAGER';
        }

        this.ticketService.postNewTicket(this.ticket).subscribe((ticket: TicketModel) => {
            console.log('Successfully Ticket Assigned to QA');
        });

        this.productService.saveTicketassignToTeamPut(this.newTicketAssign).subscribe((ticketAssign: TicketAssignModule) => {});
    }
}
