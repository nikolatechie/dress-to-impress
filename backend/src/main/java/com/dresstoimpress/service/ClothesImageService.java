package com.dresstoimpress.service;

import com.dresstoimpress.model.ClothesImage;
import com.dresstoimpress.repository.ClothesImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClothesImageService {
    private final ClothesImageRepository clothesImageRepository;

    @Autowired
    public ClothesImageService(ClothesImageRepository clothesImageRepository) {
        this.clothesImageRepository = clothesImageRepository;
    }

    public Page<ClothesImage> getImages(Pageable pageable) {
        return clothesImageRepository.findAll(pageable);
    }

    public Optional<ClothesImage> getImageById(Long id) {
        return clothesImageRepository.findById(id);
    }
}