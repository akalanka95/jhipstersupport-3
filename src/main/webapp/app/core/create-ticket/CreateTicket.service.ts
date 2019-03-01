import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IUser } from 'app/core';
import { Observable } from 'rxjs';
import { ProductModuleModel } from 'app/core/ProductModule.model';
import { TicketModel } from 'app/core/ticket.model';
import { TicketCommentModel } from 'app/core/TicketComment.model';

@Injectable({ providedIn: 'root' })
export class CreateTicketService {
    public resourceUrl = SERVER_API_URL + 'api/test';

    constructor(private http: HttpClient) {}

    create(user: IUser): Observable<HttpResponse<IUser>> {
        return this.http.post<IUser>(this.resourceUrl, user, { observe: 'response' });
    }

    update(user: IUser): Observable<HttpResponse<IUser>> {
        return this.http.put<IUser>(this.resourceUrl, user, { observe: 'response' });
    }

    postNewTicket(ticket: TicketModel) {
        const url = '/api/test/ticket/save';
        return this.http.post(url, ticket);
    }
    getListOfTicketsByUser() {
        const url = '/api/test/ticket/getListTicketsByUser';
        return this.http.get(url);
    }

    getListOfTicketAssignsByUserId() {
        const url = '/api/test/ticket/getListOfAssignTicketsByUserId';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }
    getListOfTicketAssignsByUser() {
        const url = '/api/test/ticket/getListOfAssignTicketsByUser';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getListOfTicketAssignsByUserAndTicket(ticketId: number) {
        const url = '/api/test/ticket/getListOfAssignTicketsByUserAndTicket/' + ticketId;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getTicketById(id: number) {
        const url = '/api/test/ticket/getTicketById/' + id;
        return this.http.get(url);
    }

    getTicketAssignById(id: number) {
        const url = '/api/test/ticket/getAssignTicketById/' + id;
        return this.http.get(url);
    }

    postNewTicketComment(ticketComment: TicketCommentModel) {
        const url = '/api/ticket/comment/save';
        return this.http.post(url, ticketComment);
    }

    getTicketCommentByTicketId(id: number) {
        const url = '/api/ticket/comment/getListOfTicketsByTicketId/' + id;
        return this.http.get(url);
    }
}
