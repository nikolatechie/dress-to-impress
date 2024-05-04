package com.dresstoimpress.controller;

import com.dresstoimpress.responses.ErrorResponse;
import com.dresstoimpress.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @DeleteMapping
    public ResponseEntity<?> deleteAccount() {
        try {
            userService.deleteAccount();
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            LOGGER.error("Failed to delete account: {}", e.getMessage());
            return ResponseEntity.status(500).body(
                    new ErrorResponse(e.getMessage())
            );
        }
    }
}