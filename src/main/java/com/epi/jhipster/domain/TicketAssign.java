package com.epi.jhipster.domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table( name = "ticket_Assign")
public class TicketAssign {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String accepted;
    private String reason;


    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name = "ticket_id")
    private Ticket ticket ;

    @ManyToOne(fetch = FetchType.EAGER )
    private UserProduct userProduct;

    @ManyToOne(fetch = FetchType.EAGER )
    private User user;

    @OneToMany(mappedBy = "ticketAssign", cascade = CascadeType.ALL)
    private Set<TicketUserTracker> ticketUserTracker = new HashSet<>();


    public Set<TicketUserTracker> getTicketUserTracker() {
        return ticketUserTracker;
    }

    public void setTicketUserTracker(Set<TicketUserTracker> ticketUserTracker) {
        this.ticketUserTracker = ticketUserTracker;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAccepted() {
        return accepted;
    }

    public void setAccepted(String accepted) {
        this.accepted = accepted;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    public UserProduct getUserProduct() {
        return userProduct;
    }

    public void setUserProduct(UserProduct userProduct) {
        this.userProduct = userProduct;
    }
}
