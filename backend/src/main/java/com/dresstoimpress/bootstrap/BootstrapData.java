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
    public void run(String... args) throws Exception {
        // Check if the database is empty
        if (clothesImageRepository.count() == 0) {
            // Populate the table with links from the CSV file
            populateClothesImageTable();
        }
    }

    private void populateClothesImageTable() {
        // Read the CSV file and extract URLs
        List<String> imgUrls = readImageLinksFromCSV();

        // Create and save ClothesImage entities for each URL
        for (String url : imgUrls) {
            ClothesImage clothesImage = new ClothesImage();
            clothesImage.setUrl(url);
            clothesImageRepository.save(clothesImage);
        }

        LOGGER.info("ClothesImage table populated with URLs from CSV file.");
    }

    private List<String> readImageLinksFromCSV() {
        List<String> imgUrls = new ArrayList<>();

        try (CSVReader csvReader = new CSVReader(new FileReader("../Data/Metadata.csv"))) {
            String[] values;
            while ((values = csvReader.readNext()) != null) {
                if (values[0].startsWith("http")) {
                    imgUrls.add(values[0]);
                }
            }
        } catch (Exception e) {
            LOGGER.warn(e.getMessage());
        }

        return imgUrls;
    }
}