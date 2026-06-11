package com.upiiz.practica3.services;

import com.upiiz.practica3.entities.PracticaEntity;

import java.util.List;
import java.util.Optional;

public interface PracticaService {

    List<PracticaEntity> listado();
    Optional<PracticaEntity> listadoPorID(Long id);
    PracticaEntity agregarListado(PracticaEntity mascota);
    PracticaEntity actualizarListado(Long id, PracticaEntity listado);
    void eliminarListado(Long id);

}
