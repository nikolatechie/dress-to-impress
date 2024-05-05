package com.dresstoimpress.repository;

import com.dresstoimpress.model.ClothesChange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ClothesChangeRepository extends JpaRepository<ClothesChange, Long> {
    ClothesChange findAllByReplicateId(String replicateId);

    @Transactional
    @Modifying
    @Query("update ClothesChange c set c.resultImageUrl = ?1, c.status = 'DONE' where c.replicateId = ?2")
    void updateResultImageUrlByReplicateId(String resultImageUrl, String replicateId);
}
