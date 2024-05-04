package com.dresstoimpress.exception;

public class ClothesChangeNotFoundByReplicateIdException extends RuntimeException {
    public ClothesChangeNotFoundByReplicateIdException(String id) {
        super("ClothesChange not found by replicate id: " + id);
    }
}
