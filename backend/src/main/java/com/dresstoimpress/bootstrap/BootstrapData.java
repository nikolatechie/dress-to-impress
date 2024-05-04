package com.dresstoimpress.bootstrap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Component
@Profile("!test")
public class BootstrapData implements CommandLineRunner {

    private final ScheduledExecutorService resetLimitExecutor = Executors.newScheduledThreadPool(1);

    @Autowired
    public BootstrapData(
        final PasswordEncoder passwordEncoder
    ) {

    }

    @Override
    public void run(String... args) throws Exception {

    }
}
