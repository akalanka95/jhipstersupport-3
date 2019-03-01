package com.epi.jhipster.repository;

import com.epi.jhipster.domain.Ticket;
import com.epi.jhipster.domain.TicketComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketCommentRepository extends JpaRepository<TicketComment, Long> {
    List<TicketComment> findByTicketId(Long id);
}
