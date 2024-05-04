package com.dresstoimpress.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ReplicateWebhookDto {
    private Date completed_at;
    private Date created_at;
    private Object error;
    private String id;
    private ReplicateInputDto input;
    private String logs;
    private ReplicateMetricsDto metrics;
    private String model;
    private ArrayList<String> output;
    private Date started_at;
    private String status;
    private ReplicateUrlsDto urls;
    private String version;
    private String webhook;
}
