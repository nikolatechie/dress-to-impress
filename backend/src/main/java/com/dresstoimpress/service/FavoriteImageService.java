package com.dresstoimpress.service;

import com.dresstoimpress.model.FavoriteImage;
import com.dresstoimpress.model.User;
import com.dresstoimpress.repository.FavoriteImageRepository;
import com.dresstoimpress.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FavoriteImageService {

    private final FavoriteImageRepository favoriteImageRepository;
    private final UserRepository userRepository;

    @Autowired
    public FavoriteImageService(FavoriteImageRepository favoriteImageRepository,
                                UserRepository userRepository) {
        this.favoriteImageRepository = favoriteImageRepository;
        this.userRepository = userRepository;
    }

    public FavoriteImage addFavorite(FavoriteImage favoriteImage) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();
        User loggedUser = userRepository.findByEmail(email);
        favoriteImage.setUser(loggedUser);
        return favoriteImageRepository.save(favoriteImage);
    }

    public void deleteFavorite(Long favoriteId) {
        favoriteImageRepository.deleteById(favoriteId);
    }

    public List<FavoriteImage> getFavoritesByUserEmail(String email) {
        return favoriteImageRepository.findByUserEmail(email);
    }

    public List<FavoriteImage> getAllFavorites() {
        return favoriteImageRepository.findAll();
    }
}

