package com.epi.jhipster.web.websocket;

import static com.epi.jhipster.config.WebsocketConfiguration.IP_ADDRESS;

import com.epi.jhipster.domain.TicketComment;
import com.epi.jhipster.domain.User;
import com.epi.jhipster.repository.UserRepository;
import com.epi.jhipster.security.SecurityUtils;
import com.epi.jhipster.web.websocket.dto.ActivityDTO;

import java.security.Principal;
import java.time.Instant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Controller
public class ActivityService implements ApplicationListener<SessionDisconnectEvent> {

    private static final Logger log = LoggerFactory.getLogger(ActivityService.class);

    private final SimpMessageSendingOperations messagingTemplate;

    @Autowired
    private UserRepository userRepository;

    public ActivityService(SimpMessageSendingOperations messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/topic/activity")
    @SendTo("/topic/tracker")
    public ActivityDTO sendActivity(@Payload ActivityDTO activityDTO, StompHeaderAccessor stompHeaderAccessor, Principal principal) {
        activityDTO.setUserLogin(principal.getName());
        activityDTO.setSessionId(stompHeaderAccessor.getSessionId());
        activityDTO.setIpAddress(stompHeaderAccessor.getSessionAttributes().get(IP_ADDRESS).toString());
        activityDTO.setTime(Instant.now());
        log.debug("Sending user tracking data {}", activityDTO);
        return activityDTO;
    }

    @MessageMapping("/topic/messages")
    @SendTo("/topic/comment")
    public TicketComment sendMessges(@RequestBody TicketComment ticketComment)  {
        TicketComment t1 = new TicketComment();
        User user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get()).get();
        t1.setUser(user);
        t1.setTicket(ticketComment.getTicket());
        t1.setComment(ticketComment.getComment());
        return t1;
    }

    @Override
    public void onApplicationEvent(SessionDisconnectEvent event) {
        ActivityDTO activityDTO = new ActivityDTO();
        activityDTO.setSessionId(event.getSessionId());
        activityDTO.setPage("logout");
        messagingTemplate.convertAndSend("/topic/tracker", activityDTO);
    }
}
