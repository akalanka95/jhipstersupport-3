package com.epi.jhipster.domain;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table( name = "ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String ticketNo;
    private String ticketTime = null;
    private LocalDate ticketDate = null;
    private String type;
    private String status;
    private String priority;
    private String subject;
    private String currentStatusAge;
    private String ticketAge;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String teamStatus = "PENDING";

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user1;

    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL)
    private Set<TicketAssign> ticketAssign = new HashSet<>();

    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL)
    private Set<TicketComment> ticketComment = new HashSet<>();

    public Set<TicketComment> getTicketComment() {
        return ticketComment;
    }

    public void setTicketComment(Set<TicketComment> ticketComment) {
        this.ticketComment = ticketComment;
    }

    public Set<TicketAssign> getTicketAssign() {
        return ticketAssign;
    }

    public void setTicketAssign(Set<TicketAssign> ticketAssign) {
        this.ticketAssign = ticketAssign;
    }

    public String getTeamStatus() {
        return teamStatus;
    }

    public void setTeamStatus(String teamStatus) {
        this.teamStatus = teamStatus;
    }

    //    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "user_id")
//    private User  user;
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser1() {
        return user1;
    }

    public void setUser1(User user1) {
        this.user1 = user1;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTicketNo() {
        return ticketNo;
    }

    public void setTicketNo(String ticketNo) {
        this.ticketNo = ticketNo;
    }

    public String getTicketTime() {
        return ticketTime;
    }

    public void setTicketTime(String ticketTime) {
        this.ticketTime = ticketTime;
    }

    public LocalDate getTicketDate() {
        return ticketDate;
    }

    public void setTicketDate(LocalDate ticketDate) {
        this.ticketDate = ticketDate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getCurrentStatusAge() {
        return currentStatusAge;
    }

    public void setCurrentStatusAge(String currentStatusAge) {
        this.currentStatusAge = currentStatusAge;
    }

    public String getTicketAge() {
        return ticketAge;
    }

    public void setTicketAge(String ticketAge) {
        this.ticketAge = ticketAge;
    }
}
