package com.dresstoimpress.service;

import com.dresstoimpress.model.ClothesChange;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class WebhookService {

    private final ClothesChangeService clothesChangeService;
    public void processReplicateWebhook(String id, String image) {
        clothesChangeService.updateResultImageUrlByReplicateId(id, image);
    }
}
