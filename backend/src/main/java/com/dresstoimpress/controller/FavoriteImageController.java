package com.dresstoimpress.controller;

import com.dresstoimpress.model.FavoriteImage;
import com.dresstoimpress.service.FavoriteImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/favorites")
public class FavoriteImageController {

    private final FavoriteImageService favoriteImageService;

    @Autowired
    public FavoriteImageController(FavoriteImageService favoriteImageService) {
        this.favoriteImageService = favoriteImageService;
    }

    @PostMapping
    public ResponseEntity<FavoriteImage> addFavorite(@RequestBody FavoriteImage favoriteImage) {
        FavoriteImage newFavorite = favoriteImageService.addFavorite(favoriteImage);
        return new ResponseEntity<>(newFavorite, HttpStatus.CREATED);
    }

    @DeleteMapping("/{favoriteId}")
    public ResponseEntity<Void> deleteFavorite(@PathVariable Long favoriteId) {
        favoriteImageService.deleteFavorite(favoriteId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<FavoriteImage>> getFavoritesByUserId(@PathVariable Long userId) {
        List<FavoriteImage> favorites = favoriteImageService.getFavoritesByUserId(userId);
        return new ResponseEntity<>(favorites, HttpStatus.OK);
    }
}

