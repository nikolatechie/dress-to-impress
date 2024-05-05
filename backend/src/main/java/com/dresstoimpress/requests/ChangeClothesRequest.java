package com.dresstoimpress.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChangeClothesRequest {
    private String imageUrl;
    private String clothingImageUrl;
    private String clothingType;
}