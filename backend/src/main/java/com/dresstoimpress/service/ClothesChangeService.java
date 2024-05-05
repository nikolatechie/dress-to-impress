package com.dresstoimpress.service;

import com.dresstoimpress.model.ClothesChange;
import com.dresstoimpress.repository.ClothesChangeRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

@Service
public class ClothesChangeService {
    @Value("${REPLICATE_API_TOKEN}")
    private String replicateApiToken;

    @Value("${webhook.url}")
    private String WEBHOOK_URL;

    private final ClothesChangeRepository clothesChangeRepository;

    private static final String API_ENDPOINT = "https://api.replicate.com/v1/predictions";
    private static final String PROMPT_API_ENDPOINT = "http://localhost:8000/api/v1/describeImage";

    @Autowired
    public ClothesChangeService(ClothesChangeRepository clothesChangeRepository) {
        this.clothesChangeRepository = clothesChangeRepository;
    }

    private ResponseEntity<String> callApi(String requestBody, HttpMethod httpMethod) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(replicateApiToken);

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(API_ENDPOINT, httpMethod, request, String.class);

        if (response != null) System.out.println("Got response: " + response.getBody());
        return response;
    }

    public String changeClothes(String imageUrl, String prompt, String clothingType) {
        String requestBody = String.format("{\"version\": \"4e7916cc6ca0fe2e0e414c32033a378ff5d8879f209b1df30e824d6779403826\"," +
                "\"webhook\": \"%s\"," +
                "\"webhook_events_filter\": [\"completed\"]," +
                "\"input\": {" +
                "\"image\": \"%s\"," +
                "\"prompt\": \"%s\"," +
                "\"clothing\": \"%s\"" +
                "}}", WEBHOOK_URL, imageUrl, prompt, clothingType);

        ResponseEntity<String> responseEntity = callApi(requestBody, HttpMethod.POST);
        System.out.println(responseEntity);
        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                Map<String, Object> jsonResponse = objectMapper.readValue(responseEntity.getBody(), new TypeReference<Map<String, Object>>() {});

                String getUrl = ((Map<String, String>) jsonResponse.get("urls")).get("get");
                String replicateId = (String) jsonResponse.get("id");
                System.out.println("URL for GET request: " + getUrl);
                System.out.println(replicateId);
                ClothesChange clothesChange = new ClothesChange();
                clothesChange.setImageUrl(imageUrl);
                clothesChange.setPrompt(prompt);
                clothesChange.setClothingType(clothingType);
                clothesChange.setDate(LocalDate.now());
                clothesChange.setStatus("STARTING");
                clothesChangeRepository.save(clothesChange);
                clothesChange.setReplicateId(replicateId);
                clothesChangeRepository.save(clothesChange);

//                String result = null;
//                while (result == null) {
//                    // Make GET request to retrieve result
//                    ResponseEntity<String> responseEntity2 = callApi(getUrl, HttpMethod.GET);
//
//                    if (responseEntity2.getStatusCode().is2xxSuccessful()) {
//                        Map<String, Object> resultMap = objectMapper.readValue(responseEntity2.getBody(), new TypeReference<Map<String, Object>>() {});
//                        List<String> outputList = (List<String>) resultMap.get("output");
//                        result = outputList.get(outputList.size() - 1);
//
//                        // Update the status of the ClothesChange entity to FINISHED
//                        clothesChange.setStatus("FINISHED");
//                        clothesChange.setResultImageUrl(result);
//                        clothesChangeRepository.save(clothesChange);
//                    } else {
//                        // Handle error response from getResultResponse if needed
//                        clothesChange.setStatus("FAILED");
//                        clothesChangeRepository.save(clothesChange);
//                    }
//
//                    // Sleep for 2 seconds before checking again
//                    TimeUnit.SECONDS.sleep(2);
//                }

                return replicateId;
            } catch (Exception e) {
                // Handle JSON parsing error
                e.printStackTrace();
                // Update the status of the ClothesChange entity to FAILED
                ClothesChange clothesChange = new ClothesChange();
                clothesChange.setImageUrl(imageUrl);
                clothesChange.setPrompt(prompt);
                clothesChange.setClothingType(clothingType);
                clothesChange.setDate(LocalDate.now());
                clothesChange.setStatus("FAILED");
                clothesChangeRepository.save(clothesChange);
                return null;
            }
        } else {
            // Handle error response from initial call if needed
            // Update the status of the ClothesChange entity to FAILED
            ClothesChange clothesChange = new ClothesChange();
            clothesChange.setImageUrl(imageUrl);
            clothesChange.setPrompt(prompt);
            clothesChange.setClothingType(clothingType);
            clothesChange.setDate(LocalDate.now());
            clothesChange.setStatus("FAILED");
            clothesChangeRepository.save(clothesChange);
            return null;
        }
    }

//    public CompletableFuture<String> waitForResultAsync(String getUrl) {
//        return CompletableFuture.supplyAsync(() -> {
//            String result = null;
//            try {
//                ObjectMapper objectMapper = new ObjectMapper();
//
//                // Polling loop to wait for the result
//                while (result == null) {
//                    // Make GET request to retrieve result
//                    ResponseEntity<String> responseEntity2 = callApi(getUrl, HttpMethod.GET);
//
//                    if (responseEntity2.getStatusCode().is2xxSuccessful()) {
//                        Map<String, Object> resultMap = objectMapper.readValue(responseEntity2.getBody(), new TypeReference<Map<String, Object>>() {});
//                        List<String> outputList = (List<String>) resultMap.get("output");
//                        result = outputList.get(outputList.size() - 1);
//                    } else {
//                        // Handle error response if needed
//                        // For simplicity, we're just logging the error here
//                        System.err.println("Error fetching result: " + responseEntity2.getStatusCodeValue());
//                    }
//
//                    // Sleep for 2 seconds before checking again
//                    TimeUnit.SECONDS.sleep(2);
//                }
//            } catch (Exception e) {
//                // Handle any exceptions that occur during the polling process
//                e.printStackTrace();
//            }
//
//            return result;
//        });
//    }

//    public CompletableFuture<String> changeClothesAsync(String imageUrl, String prompt, String clothingType) {
//        return CompletableFuture.supplyAsync(() -> {
//            // Create a new ClothesChange entity and set its status to STARTING
//            ClothesChange clothesChange = new ClothesChange();
//            clothesChange.setImageUrl(imageUrl);
//            clothesChange.setPrompt(prompt);
//            clothesChange.setClothingType(clothingType);
//            clothesChange.setDate(LocalDate.now());
//            clothesChange.setStatus("STARTING");
//            clothesChangeRepository.save(clothesChange);
//
//            String requestBody = String.format("{\"version\": \"4e7916cc6ca0fe2e0e414c32033a378ff5d8879f209b1df30e824d6779403826\"," +
//                    "\"input\": {" +
//                    "\"image\": \"%s\"," +
//                    "\"prompt\": \"%s\"," +
//                    "\"clothing\": \"%s\"" +
//                    "}}", imageUrl, prompt, clothingType);
//
//            ResponseEntity<String> responseEntity = callApi(requestBody, HttpMethod.POST);
//
//            if (responseEntity.getStatusCode().is2xxSuccessful()) {
//                try {
//                    ObjectMapper objectMapper = new ObjectMapper();
//                    Map<String, Object> jsonResponse = objectMapper.readValue(responseEntity.getBody(), new TypeReference<Map<String, Object>>() {});
//
//                    String getUrl = ((Map<String, String>) jsonResponse.get("urls")).get("get");
//                    System.out.println("URL for GET request: " + getUrl);
//
//                    // Call the waitForResultAsync method asynchronously to wait for the result
//                    return waitForResultAsync(getUrl).thenApply(result -> {
//                        // Update the status of the ClothesChange entity based on the result
//                        if (result != null) {
//                            clothesChange.setStatus("FINISHED");
//                            clothesChange.setResultImageUrl(result);
//                        } else {
//                            clothesChange.setStatus("FAILED");
//                        }
//                        clothesChangeRepository.save(clothesChange);
//                        return result;
//                    }).join();
//                } catch (Exception e) {
//                    // Handle JSON parsing error
//                    e.printStackTrace();
//                    // Update the status of the ClothesChange entity to FAILED
//                    clothesChange.setStatus("FAILED");
//                    clothesChangeRepository.save(clothesChange);
//                    return null;
//                }
//            } else {
//                // Handle error response from initial call if needed
//                // Update the status of the ClothesChange entity to FAILED
//                clothesChange.setStatus("FAILED");
//                clothesChangeRepository.save(clothesChange);
//                return null;
//            }
//        });
//    }



    // Create a new ClothesChange
    public ClothesChange createClothesChange(ClothesChange clothesChange) {
        return clothesChangeRepository.save(clothesChange);
    }

    public void updateResultImageUrlByReplicateId(String id, String imageUrl) {
        clothesChangeRepository.updateResultImageUrlByReplicateId(imageUrl, id);
    }

    // Retrieve all ClothesChanges
    public List<ClothesChange> getAllClothesChanges() {
        return clothesChangeRepository.findAll();
    }

    public String fetchPrompt(String imageUrl) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Construct URL with query parameter
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(PROMPT_API_ENDPOINT)
                .queryParam("ImageUrl", imageUrl);

        HttpEntity<?> requestEntity = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();

        // Send POST request and directly parse response body to a Map
        ResponseEntity<Map> responseEntity = restTemplate.exchange(
            builder.toUriString(),
            HttpMethod.POST,
            requestEntity,
            Map.class
        );

        // Check if response is successful and has a body
        if (responseEntity.getStatusCode() == HttpStatus.OK && responseEntity.hasBody()) {
            Map<String, String> responseBody = responseEntity.getBody();
            if (responseBody != null && responseBody.containsKey("description")) {
                return responseBody.get("description");
            }
        }

        // Return empty string if response is not successful or description is not found
        return "";
    }

    public ClothesChange getAllByReplicateId(String replicateId) {
        return clothesChangeRepository.findAllByReplicateId(replicateId);
    }
}
