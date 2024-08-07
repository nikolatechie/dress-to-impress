package com.dresstoimpress.controller;

import com.dresstoimpress.model.ClothesImage;
import com.dresstoimpress.responses.ErrorResponse;
import com.dresstoimpress.service.ClothesImageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/clothes-images")
public class ClothesImageController {
    private final ClothesImageService clothesImageService;
    private static final Logger LOGGER = LoggerFactory.getLogger(RegistrationController.class);

    @Autowired
    public ClothesImageController(ClothesImageService clothesImageService) {
        this.clothesImageService = clothesImageService;
    }

    @GetMapping
    public ResponseEntity<?> getClothesImages(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "12") int size
    ) {
        try {
            LOGGER.info("Retrieving a list of images (page = {})", page);
            Pageable pageable = PageRequest.of(page, size);
            Page<ClothesImage> imgUrls = clothesImageService.getImages(pageable);
            return ResponseEntity.ok().body(imgUrls);
        } catch (Exception e) {
            LOGGER.error("Couldn't retrieve image URLs: {}", e.getMessage());
            return ResponseEntity.status(500).body(
                new ErrorResponse(e.getMessage())
            );
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getClothesImageById(@PathVariable Long id) {
        try {
            LOGGER.info("Retrieving image with ID: {}", id);
            Optional<ClothesImage> image = clothesImageService.getImageById(id);
            if (image.isPresent()) {
                return ResponseEntity.ok().body(image.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            LOGGER.error("Couldn't retrieve image with ID {}: {}", id, e.getMessage());
            return ResponseEntity.status(500).body(
                    new ErrorResponse("Failed to retrieve image with ID: " + id)
            );
        }
    }
}