package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.MessagesRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface MessagesRepository extends JpaRepository<Messages, Integer> {

}   