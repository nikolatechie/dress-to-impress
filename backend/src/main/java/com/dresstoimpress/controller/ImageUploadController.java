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

@RestController
public class ImageUploadController {
    @Value("${file.upload.directory}")
    private String uploadDirectory; // Inject the directory path from application.properties

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return new ResponseEntity<>("Please select a file to upload", HttpStatus.BAD_REQUEST);
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
            return new ResponseEntity<>("File uploaded successfully", HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to upload file", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

