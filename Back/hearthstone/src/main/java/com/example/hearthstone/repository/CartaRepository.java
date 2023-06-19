package com.example.hearthstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.hearthstone.entity.Carta;

public interface CartaRepository extends JpaRepository<Carta, Long> {
    // Métodos personalizados si es necesario
}
