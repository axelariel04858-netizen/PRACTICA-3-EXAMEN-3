package com.upiiz.practica3.repositories;

import com.upiiz.practica3.entities.PracticaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PracticaRepository extends JpaRepository<PracticaEntity, Long> {
}
