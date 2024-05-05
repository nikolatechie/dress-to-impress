package com.dresstoimpress.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@RestController
public class ImageUploadController {
    @Value("${file.upload.directory}")
    private String uploadDirectory; // Inject the directory path from application.properties

    @Value("${static.file.base.url}")
    private String staticFileBaseUrl; // Inject the base URL for static files from application.properties

    // List of allowed file extensions
    private static final List<String> allowedExtensions = Arrays.asList("jpg", "jpeg", "png", "gif", "bmp", "tiff");

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return new ResponseEntity<>("Please select a file to upload", HttpStatus.BAD_REQUEST);
        }

        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1).toLowerCase();
        if (!allowedExtensions.contains(fileExtension)) {
            return new ResponseEntity<>("Only JPG, JPEG, PNG, GIF, BMP, and TIFF files are allowed", HttpStatus.BAD_REQUEST);
        }

        try {
            // Ensure upload directory exists
            File directory = new File(uploadDirectory);
            if (!directory.exists()) {
                directory.mkdirs(); // Create directory and any necessary parent directories
            }

            // Get the file and save it to the server
            String fileName = file.getOriginalFilename();
            String filePath = uploadDirectory + File.separator + fileName;
            File dest = new File(filePath);
            file.transferTo(dest);

            // Generate static link
            String staticLink = staticFileBaseUrl + "/" + fileName;
            return new ResponseEntity<>(staticLink, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to upload file", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

