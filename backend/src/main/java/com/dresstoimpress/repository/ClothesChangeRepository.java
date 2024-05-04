package com.dresstoimpress.repository;

import com.dresstoimpress.model.ClothesChange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClothesChangeRepository extends JpaRepository<ClothesChange, Long> {

}
