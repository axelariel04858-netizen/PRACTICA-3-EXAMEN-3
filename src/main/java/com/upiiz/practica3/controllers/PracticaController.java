    package com.upiiz.practica3.controllers;

    import com.upiiz.practica3.entities.PracticaEntity;
    import com.upiiz.practica3.services.PracticaService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.ResponseEntity;
    import org.springframework.stereotype.Controller;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @Controller
    public class PracticaController {

        @Autowired
        private PracticaService practicaService;

        @GetMapping
        public String Principal() {
            return "principal";
        }

        //USANDO AJAX
        //C - CREATE - CREAR MASCOTA USANDO AJAX
        @PostMapping("/mascota/api")
        @ResponseBody
        public ResponseEntity<PracticaEntity> crearMascotaAJAX(@RequestBody PracticaEntity mascota){
            return ResponseEntity.ok(practicaService.agregarListado(mascota));
        }


        //R - READ - LISTADO PRODUCTOS USANDO AJAX
        @GetMapping("/mascota/api")
        @ResponseBody
        public ResponseEntity<List<PracticaEntity>> listadoMascotaAJAX(){return ResponseEntity.ok(practicaService.listado());}


        // R - LEER UNA SOLA MASCOTA USANDO AJAX
        @GetMapping("/mascota/api/{id}")
        @ResponseBody
        public ResponseEntity<PracticaEntity> mascotaByIdAJAX(@PathVariable Long id) {
            // CORREGIDO: Llama al servicio para obtener la mascota real de la base de datos
            return ResponseEntity.ok(practicaService.listadoPorID(id).orElse(null));
        }


        //U - UPDATE - ACTUALIZAR PRODUCTO USANDO AJAX
        @PatchMapping("/mascota/api/{id}")
        @ResponseBody
        public ResponseEntity<PracticaEntity> actualizarMascotaAJAX(@PathVariable Long id, @RequestBody PracticaEntity mascota){return ResponseEntity.ok(practicaService.actualizarListado(id, mascota));}


        //D - DELETE - ELIMINAR UN PRODUCTO USANDO AJAX
        @DeleteMapping("/mascota/api/{id}")
        @ResponseBody
        public void eliminarProductosAJAX(@PathVariable Long id){practicaService.eliminarListado(id);}


    }
