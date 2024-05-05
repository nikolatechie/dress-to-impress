package com.dresstoimpress.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

import javax.annotation.PostConstruct;

@Configuration
@EnableWebMvc
public class StaticFileConfig implements WebMvcConfigurer {

    @Value("${file.upload.directory}")
    private String uploadDirectory;

    //Folder needs a trailing / for the static directory to work
    @PostConstruct
    public void postConstruct(){
        //OS safe
        if (uploadDirectory.charAt(uploadDirectory.length() - 1) != File.separatorChar) {
            uploadDirectory += File.separator;
        }
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadDirectory);
    }
}
