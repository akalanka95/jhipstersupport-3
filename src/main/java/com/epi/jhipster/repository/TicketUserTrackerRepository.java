package com.epi.jhipster.repository;

import com.epi.jhipster.domain.TicketAssign;
import com.epi.jhipster.domain.TicketUserTracker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface  TicketUserTrackerRepository extends JpaRepository<TicketUserTracker, Long> {

    List<TicketUserTracker> findByTicketAssignId(Long id);

    List<TicketUserTracker> findByUserId(Long id);

}
