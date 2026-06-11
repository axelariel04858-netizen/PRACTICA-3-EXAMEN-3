const urlMas = "/mascota/api";

function listar() {
    $.ajax({
        method: "GET",
        url: urlMas,
        data: {},
        success: function (listaMascotas) {
            // Recuperamos o inicializamos correctamente la instancia de DataTable
            let tabla = $.fn.dataTable.isDataTable('#example1')
                ? $('#example1').DataTable()
                : $('#example1').DataTable({ responsive: true, autoWidth: false });

            tabla.clear();

            listaMascotas.forEach(m => {
                let botones = '<button class="btn btn-outline-secondary btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#modal-update" onclick="identificaActualizar(' + m.id + ')"> Editar </button>';
                botones = botones + ' <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modal-delete" onclick="identificaEliminar(' + m.id + ')">Eliminar</button>';

                tabla.row
                    .add([m.id, m.nombre, m.edad, m.raza, botones])
                    .draw(false)
                    .node().id = 'renglon_' + m.id;
            });
        },
        error: function(xhr) {
            console.error("Error al listar mascotas:", xhr);
        }
    });
}

function guardar() {
    let nombreMascota = document.getElementById('nombre').value;
    let edadMascota = document.getElementById('edad').value;
    let razaMascota = document.getElementById('raza').value;
    let observacionesMascota = document.getElementById('observaciones').value;

    $.ajax({
        method: 'POST',
        url: urlMas,
        contentType: "application/json",
        data: JSON.stringify({
            nombre: nombreMascota,
            edad: edadMascota,
            raza: razaMascota,
            observaciones: observacionesMascota
        }),
        success: function (mascota) {
            let botones = '<button class="btn btn-outline-secondary btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#modal-update" onclick="identificaActualizar(' + mascota.id + ')"> Editar </button>';
            botones = botones + ' <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modal-delete" onclick="identificaEliminar(' + mascota.id + ')">Eliminar</button>';

            let tabla = $('#example1').DataTable();

            tabla.row
                .add([mascota.id, mascota.nombre, mascota.edad, mascota.raza, botones])
                .draw(false)
                .node().id = 'renglon_' + mascota.id;

            alert("Mascota Guardada Correctamente");

            const modalAgregar = bootstrap.Modal.getInstance(document.getElementById('modal-lg'));
            if(modalAgregar) modalAgregar.hide();

            limpiarFormulario();
        },
        error: function(xhr) {
            alert("Error al guardar la mascota. Verifica los datos o la consola.");
            console.error(xhr);
        }
    });
}

function limpiarFormulario() {
    document.getElementById('nombre').value = "";
    document.getElementById('edad').value = "";
    document.getElementById('raza').value = "1";
    document.getElementById('observaciones').value = "";
}

function identificaActualizar(id) {
    $.ajax({
        method: 'GET',
        url: urlMas + "/" + id,
        data: {},
        success: function(mascota) {
            document.getElementById('id-update').value = mascota.id;
            document.getElementById('nombre-update').value = mascota.nombre;
            document.getElementById('edad-update').value = mascota.edad;
            document.getElementById('raza-update').value = mascota.raza;
            document.getElementById('observaciones-update').value = mascota.observaciones;
        }
    });
}

function actualizar() {
    let idMascota = document.getElementById('id-update').value;
    let nombreMascota = document.getElementById('nombre-update').value;
    let edadMascota = document.getElementById('edad-update').value;
    let razaMascota = document.getElementById('raza-update').value;
    let observacionesMascota = document.getElementById('observaciones-update').value;

    $.ajax({
        method: 'PATCH',
        contentType: 'application/json',
        url: urlMas + "/" + idMascota,
        data: JSON.stringify({
            nombre: nombreMascota,
            edad: edadMascota,
            raza: razaMascota,
            observaciones: observacionesMascota
        }),
        success: function(mascota) {
            let tabla = $('#example1').DataTable();
            let datos = tabla.row("#renglon_" + idMascota).data();

            razaMascota = mascota.raza || datos[3];

            datos[1] = nombreMascota;
            datos[2] = edadMascota;
            datos[3] = razaMascota;

            tabla.row("#renglon_" + idMascota).data(datos).draw(false);

            alert('Mascota actualizada con éxito');

            const modalEditar = bootstrap.Modal.getInstance(document.getElementById('modal-update'));
            if(modalEditar) modalEditar.hide();
        }
    });
}

function identificaEliminar(id) {
    $.ajax({
        method: 'GET',
        url: urlMas + "/" + id,
        data: {},
        success: function(mascota) {
            document.getElementById('id-eliminar').value = mascota.id;
            document.getElementById('nombre-eliminar').value = mascota.nombre;
            document.getElementById('edad-eliminar').value = mascota.edad;
            document.getElementById('raza-eliminar').value = mascota.raza;
            document.getElementById('observaciones-eliminar').value = mascota.observaciones;
        }
    });
}

function eliminar() {
    const idEliminar = document.getElementById('id-eliminar').value;
    $.ajax({
        method: 'DELETE',
        url: urlMas + "/" + idEliminar,
        data: {},
        success: function(mascota) {
            alert('Mascota Eliminada');

            let tabla = $('#example1').DataTable();
            tabla.row('#renglon_' + idEliminar).remove().draw(false);

            const modalEliminar = bootstrap.Modal.getInstance(document.getElementById('modal-delete'));
            if(modalEliminar) modalEliminar.hide();
        }
    });
}