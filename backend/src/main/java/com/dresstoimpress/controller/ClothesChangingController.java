package com.dresstoimpress.controller;

import com.dresstoimpress.requests.ChangeClothesRequest;
import com.dresstoimpress.service.ClothesChangingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClothesChangingController {

    private final ClothesChangingService clothesChangingService;

    @Autowired
    public ClothesChangingController(ClothesChangingService clothesChangingService) {
        this.clothesChangingService = clothesChangingService;
    }

    @PostMapping("/change-clothes")
    public ResponseEntity<String> changeClothes(@RequestBody ChangeClothesRequest request) {
        String imageUrl = request.getImageUrl();
        String prompt = request.getPrompt();
        String clothingType = request.getClothingType();

        // Call the service to change clothes
        String result = clothesChangingService.changeClothes(imageUrl, prompt, clothingType);

        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to change clothes.");
        }
    }
}
