package com.dresstoimpress.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangeClothesRequest {
    private String imageUrl;
    private String prompt;
    private String clothingType;

    public ChangeClothesRequest(String clothingType, String prompt, String imageUrl) {
        this.clothingType = clothingType;
        this.prompt = prompt;
        this.imageUrl = imageUrl;
    }
}