package com.dresstoimpress.controller;

import com.dresstoimpress.dto.ReplicateWebhookDto;
import com.dresstoimpress.service.WebhookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/webhooks")
@RequiredArgsConstructor
public class WebhookController {

    private final WebhookService webhookService;

    @PostMapping("/replicate")
    public ResponseEntity<?> handleReplicateWebhook(@RequestBody ReplicateWebhookDto body) {
        if(!body.getStatus().equalsIgnoreCase("succeeded"))
            return ResponseEntity.badRequest().build();
        webhookService.processReplicateWebhook(body.getId(), body.getOutput().get(body.getOutput().size() - 1));
        return ResponseEntity.ok().build();
    }
}
