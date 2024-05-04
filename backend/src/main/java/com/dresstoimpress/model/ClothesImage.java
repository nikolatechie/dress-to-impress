package com.dresstoimpress.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Entity
@Table(name = "clothes_image")
public class ClothesImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotBlank
    private String url;

    @NotNull
    private int year;

    @NotNull
    @NotBlank
    private String season;

    @NotNull
    private int productType;

    @NotNull
    private int section;

    @NotNull
    @NotBlank
    private String imageName;
}