import { datosConfiguracion } from "../config.js"

const urlAPI = datosConfiguracion.urlAPI + "/operaciones";

export async function obtenerOperaciones() {
    // console.log("Ingreso a obtenerOperaciones en services");
    let respuesta = await fetch(urlAPI);
    let operaciones = await respuesta.json();
    return operaciones;
}

export async function crearOperacion(operacion) {
    // console.log("datos recibidos para crear: ", operacion);
    let respuesta = await fetch(urlAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(operacion)
    });

    if (respuesta.ok) {
        // console.log("Se ha creado una nueva operación");
        let nuevaOperacion = await respuesta.json();
        return nuevaOperacion;
    }

}

export async function eliminarOperacion(idOperacion) {
    const respuesta = await fetch(urlAPI + "/" + idOperacion, {
        method: 'DELETE'
    })

    if (respuesta.ok) {
        // console.log("Se ha eliminado la operación");
    }
}

export async function actualizarOperacion(idOperacion, datosOperacion) {
    // console.log("ingreso a actualizarEmpleado en services")
    const respuesta = await fetch(urlAPI + "/" + idOperacion, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosOperacion)

    })

    if (respuesta.ok) {
        // console.log("Operación actualizada")
    }

}