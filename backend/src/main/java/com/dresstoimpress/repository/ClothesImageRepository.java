package com.dresstoimpress.repository;

import com.dresstoimpress.model.ClothesImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClothesImageRepository extends JpaRepository<ClothesImage, Long> {
}