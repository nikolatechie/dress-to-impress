package com.dresstoimpress.repository;

import com.dresstoimpress.model.FavoriteImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteImageRepository extends JpaRepository<FavoriteImage, Long> {
    List<FavoriteImage> findByUserId(Long userId);
}
