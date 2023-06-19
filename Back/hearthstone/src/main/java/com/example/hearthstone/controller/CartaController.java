package com.example.hearthstone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.hearthstone.entity.Carta;
import com.example.hearthstone.repository.CartaRepository;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

/* @CrossOrigin(origins = "http://localhost:4200") */
@RestController
@RequestMapping("/api/cartas")
public class CartaController {

    private final CartaRepository cartaRepository;

    @Autowired
    public CartaController(CartaRepository cartaRepository) {
        this.cartaRepository = cartaRepository;
    }

    @GetMapping
    public List<Carta> obtenerTodasLasCartas() {
        return cartaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Carta> obtenerCarta(@PathVariable Long id) {
        Optional<Carta> carta = cartaRepository.findById(id);
        return carta.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Carta crearCarta(@RequestParam("imagen") MultipartFile imagen) throws IOException {
        // Procesar la imagen y la información de la carta aquí
        // Crea un objeto Carta y guarda los datos en la base de datos
        // Retorna la carta creada
        byte[] imagenBytes = imagen.getBytes();
        String imagenBase64 = java.util.Base64.getEncoder().encodeToString(imagenBytes);
        Carta carta = new Carta(imagenBase64);
        return cartaRepository.save(carta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Carta> actualizarCarta(@PathVariable Long id, @RequestBody Carta carta) {
        Optional<Carta> cartaExistente = cartaRepository.findById(id);
        if (cartaExistente.isPresent()) {
            carta.setId(id);
            cartaRepository.save(carta);
            return ResponseEntity.ok(carta);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCarta(@PathVariable Long id) {
        Optional<Carta> cartaExistente = cartaRepository.findById(id);
        if (cartaExistente.isPresent()) {
            cartaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
