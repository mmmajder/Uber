package com.example.ubernet.utils;

import com.example.ubernet.dto.*;
import com.example.ubernet.model.Car;
import com.example.ubernet.model.Driver;
import com.example.ubernet.model.User;
import com.example.ubernet.service.UserService;

public class DTOMapper {
    private static UserService userService;

    public static User getUser(CreateUserDTO userDTO) {
        User user = new User();
        user.setName(userDTO.getName());
        user.setCity(userDTO.getCity());
        user.setEmail(userDTO.getEmail());
        user.setSurname(userDTO.getSurname());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setPassword(userDTO.getPassword());
        user.setRole(userDTO.getUserRole());
        return user;
    }

    public static UserVerificationResponseDTO getUserVerificationResponseDTO(User user) {
        UserVerificationResponseDTO userVerificationResponseDTO = new UserVerificationResponseDTO();
        userVerificationResponseDTO.setCity(user.getCity());
        userVerificationResponseDTO.setPassword(user.getPassword());
        userVerificationResponseDTO.setEmail(user.getEmail());
        userVerificationResponseDTO.setSurname(user.getSurname());
        userVerificationResponseDTO.setPhoneNumber(user.getPhoneNumber());
        userVerificationResponseDTO.setName(user.getName());
        return userVerificationResponseDTO;
    }

    public static UserEditDTO getUserEditDTO(User user) {
        UserEditDTO userEditDTO = new UserEditDTO();
        userEditDTO.setCity(user.getCity());
        userEditDTO.setName(user.getName());
        userEditDTO.setSurname(user.getSurname());
        userEditDTO.setPhoneNumber(user.getPhoneNumber());
        return userEditDTO;
    }

    public static UserResponse getUserResponse(User user) {
        UserResponse userResponse = new UserResponse();
        userResponse.setCity(user.getCity());
        userResponse.setEmail(user.getEmail());
        userResponse.setName(user.getName());
        userResponse.setRole(user.getRole());
        userResponse.setSurname(user.getSurname());
        userResponse.setPhoneNumber(user.getPhoneNumber());
        return userResponse;
    }

    public static CarResponse getCarResponse(Car car) {
        CarResponse carResponse = new CarResponse();
        carResponse.setCarType(car.getCarType());
        carResponse.setDriver(car.getDriver());
        return carResponse;
    }

    public static DriverResponse getDriverResponse(Driver driver) {
        DriverResponse driverResponse = new DriverResponse();
        driverResponse.setDriverDailyActivity(driver.getDriverDailyActivity());
        driverResponse.setCity(driver.getCity());
        driverResponse.setEmail(driver.getEmail());
        driverResponse.setPassword(driver.getPassword());
        driverResponse.setName(driver.getName());
        driverResponse.setSurname(driver.getSurname());
        driverResponse.setPhoneNumber(driver.getPhoneNumber());
        return driverResponse;
    }
}