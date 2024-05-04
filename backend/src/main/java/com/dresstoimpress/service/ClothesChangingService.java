package com.dresstoimpress.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ClothesChangingService {
    @Value("${REPLICATE_API_TOKEN}")
    private String replicateApiToken;

    private static final String API_ENDPOINT = "https://api.replicate.com/v1/predictions";

    public String changeClothes(String imageUrl, String prompt, String clothingType) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(replicateApiToken);

        String requestBody = String.format("{\"version\": \"4e7916cc6ca0fe2e0e414c32033a378ff5d8879f209b1df30e824d6779403826\"," +
                "\"input\": {" +
                "\"image\": \"%s\"," +
                "\"prompt\": \"%s\"," +
                "\"clothing\": \"%s\"" +
                "}}", imageUrl, prompt, clothingType);

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(API_ENDPOINT, HttpMethod.POST, request, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            // Handle error response
            return null;
        }
    }
}
