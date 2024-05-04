package com.dresstoimpress.service;

import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service
public class SeasonService {

    public String getSeason(LocalDate date) {
        int month = date.getMonthValue();
        int day = date.getDayOfMonth();

        if ((month == 12 && day >= 21) || (month == 1) || (month == 2) || (month == 3 && day < 20)) {
            return "Winter";
        } else if ((month == 3 && day >= 20) || (month == 4) || (month == 5) || (month == 6 && day < 21)) {
            return "Spring";
        } else if ((month == 6 && day >= 21) || (month == 7) || (month == 8) || (month == 9 && day < 22)) {
            return "Summer";
        } else if ((month == 9 && day >= 22) || (month == 10) || (month == 11) || (month == 12 && day < 21)) {
            return "Autumn";
        }
        return "Invalid Date";
    }
}
