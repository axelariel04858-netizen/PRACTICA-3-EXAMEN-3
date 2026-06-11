package com.upiiz.practica3.services;

import com.upiiz.practica3.entities.PracticaEntity;
import com.upiiz.practica3.repositories.PracticaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PracticaServiceImpl implements PracticaService{

    @Autowired
    private PracticaRepository practicaRepository;

    @Override
    public List<PracticaEntity> listado(){return practicaRepository.findAll();}

    @Override
    public Optional<PracticaEntity> listadoPorID(Long id) {
        return practicaRepository.findById(id);
    }

    @Override
    public PracticaEntity agregarListado(PracticaEntity mascota) {
        return practicaRepository.save(mascota);
    }

    @Override
    public PracticaEntity actualizarListado(Long Id, PracticaEntity mascota) {
        mascota.setId(Id);
        return practicaRepository.save(mascota);
    }

    @Override
    public void eliminarListado(Long id) {
        practicaRepository.deleteById(id);
    }


}
