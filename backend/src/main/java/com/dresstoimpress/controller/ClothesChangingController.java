package com.dresstoimpress.controller;

import com.dresstoimpress.requests.ChangeClothesRequest;
import com.dresstoimpress.responses.ErrorResponse;
import com.dresstoimpress.service.ClothesChangeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClothesChangingController {

    private final ClothesChangeService clothesChangeService;

    @Autowired
    public ClothesChangingController(ClothesChangeService clothesChangeService) {
        this.clothesChangeService = clothesChangeService;
    }

    @PostMapping("/change-clothes")
    public ResponseEntity<?> changeClothes(@RequestBody ChangeClothesRequest request) {
        String imageUrl = request.getClothingImageUrl();
        //String prompt = request.getPrompt();
        String clothingType = request.getClothingType();

        // Get the prompt first
        String prompt = clothesChangeService.fetchPrompt(imageUrl);

        // Call the service to change clothes
        String replicateId = clothesChangeService.changeClothes(request.getImageUrl(), prompt, clothingType);

        if (replicateId != null) {
            return ResponseEntity.ok().body("{\"replicateId\":\"" + replicateId + "\"}");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(
                    new ErrorResponse("Failed to change clothes.")
                );
        }
    }
}
