package com.dresstoimpress.controller;

import com.dresstoimpress.constants.Constants;
import com.dresstoimpress.model.User;
import com.dresstoimpress.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
public class RegistrationController {
    private final UserService userService;
    private static final Logger LOGGER = LoggerFactory.getLogger(RegistrationController.class);

    @Autowired
    public RegistrationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(path = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerNewUser(@Valid @RequestBody User user) {
        LOGGER.info("Registering new user: {}", user.getEmail());
        userService.registerNewUser(user);
        return ResponseEntity.status(201).build(); // Created
    }

    @GetMapping(Constants.VERIFY_EMAIL_PATH)
    public ResponseEntity<?> verifyUserEmail(@RequestParam String token) {
        LOGGER.info("Verifying user with token: {}", token);
        userService.verifyUser(token);
        return ResponseEntity.ok().build();
    }
}