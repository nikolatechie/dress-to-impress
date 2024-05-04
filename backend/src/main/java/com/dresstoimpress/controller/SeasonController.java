package com.dresstoimpress.controller;

import com.dresstoimpress.service.SeasonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDate;

@RestController
public class SeasonController {

    @Autowired
    private SeasonService seasonService;

    @GetMapping("/get-season")
    public String getSeason(@RequestParam String date) {
        // Parse date string to LocalDate (You may need to handle date format parsing here)
        LocalDate localDate = LocalDate.parse(date);
        // Call the service method to get the season
        return seasonService.getSeason(localDate);
    }
}
