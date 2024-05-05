package com.dresstoimpress.bootstrap;

import com.dresstoimpress.model.ClothesImage;
import com.dresstoimpress.repository.ClothesImageRepository;
import com.opencsv.CSVReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

@Component
@Profile("!test")
@Async
public class BootstrapData implements CommandLineRunner {
    private final ClothesImageRepository clothesImageRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(BootstrapData.class);

    @Autowired
    public BootstrapData(ClothesImageRepository clothesImageRepository) {
        this.clothesImageRepository = clothesImageRepository;
    }

    @Override
    public void run(String... args) {
        // Check if the database is empty
        if (clothesImageRepository.count() == 0) {
            // Populate the table with links from the CSV file
            populateClothesImageTable();
        }
        fetchFavoriteImageClothes();
    }

    private void populateClothesImageTable() {
        // Read the CSV file and extract images
        List<ClothesImage> images = extractImagesFromCsv();
        clothesImageRepository.saveAll(images);
        LOGGER.info("ClothesImage table populated with URLs from CSV file.");
    }

    private List<ClothesImage> extractImagesFromCsv() {
        List<ClothesImage> images = new ArrayList<>();

        try (CSVReader csvReader = new CSVReader(new FileReader("../Data/Metadata.csv"))) {
            String[] values;
            String[] headers = csvReader.readNext();
            while ((values = csvReader.readNext()) != null) {
                ClothesImage currImg = new ClothesImage();
                currImg.setUrl(values[0]);
                currImg.setYear(Integer.parseInt(values[3]));
                currImg.setSeason(values[4]);
                currImg.setProductType(Integer.parseInt(values[5]));
                currImg.setSection(Integer.parseInt(values[6]));
                currImg.setImageName(values[7]);
                images.add(currImg);
            }
        } catch (Exception e) {
            LOGGER.warn(e.getMessage());
        }

        return images;
    }

    private void fetchFavoriteImageClothes() {

    }
}