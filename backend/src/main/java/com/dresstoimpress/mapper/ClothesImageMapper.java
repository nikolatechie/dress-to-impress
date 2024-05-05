package com.dresstoimpress.mapper;

import com.dresstoimpress.model.ClothesImage;
import com.dresstoimpress.model.FavoriteImage;

public class ClothesImageMapper {
    public static FavoriteImage mapToFavoriteImage(ClothesImage clothesImage) {
        FavoriteImage favoriteImage = new FavoriteImage();
        favoriteImage.setUrl(clothesImage.getUrl());
        // Assuming you have a method to get the logged-in user
        // favoriteImage.setUser(getLoggedInUser());
        return favoriteImage;
    }

    public static ClothesImage mapToClothesImage(FavoriteImage favoriteImage) {
        ClothesImage clothesImage = new ClothesImage();
        clothesImage.setUrl(favoriteImage.getUrl());
        // Map other fields as needed
        return clothesImage;
    }
}
