package com.dresstoimpress.constants;

import org.springframework.stereotype.Component;

@Component
public class Constants {
    // Paths
    public static final String VERIFY_EMAIL_PATH = "/verify-email";
    public static final String CLOTHES_IMAGES_PATH = "/clothes-images";

    // Tokens
    public static final int EMAIL_TOKEN_EXPIRATION_MINUTES = 30;
    public static final int JWT_EXPIRATION_DAYS = 10;
}