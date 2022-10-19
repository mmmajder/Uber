package com.example.ubernet.service;

import com.example.ubernet.model.Admin;
import com.example.ubernet.model.User;
import com.example.ubernet.repository.AdminRepository;
import com.example.ubernet.utils.UserMapper;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }


    public Admin save(User user) {
        return adminRepository.save(UserMapper.mapToAdmin(user));
    }
}