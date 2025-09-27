import { useState } from "react";
import ModalConfirmar from "../compartidos/ModalConfirmar";
import estilos from "./ListaOperaciones.module.css";

function ListaOperaciones({ operaciones, loading, onEditar, onEliminar }) {

  const [abrirModal, setAbrirModal] = useState(false);
  const [idRegistroEliminar, setIdRegistroEliminar] = useState();

  const cancelarEliminar = () => {
    setAbrirModal(false);
  }

  const aceptarEliminar = async () => {
    // await eliminarRegistro(idRegistroEliminar);
    await onEliminar(idRegistroEliminar);
    setAbrirModal(false);
  }

  const confirmarEliminacion = (idRegistro) => {
    setAbrirModal(true);
    setIdRegistroEliminar(idRegistro);
  }


  const formatoDinero = (cantidad) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(cantidad);
  };

  const formatoFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-EC');
  };

  const calcularFechaFin = (fechaInicio, plazoMeses) => {
    const fecha = new Date(fechaInicio);
    fecha.setMonth(fecha.getMonth() + Number(plazoMeses));
    // fecha.setMonth(fecha.getMonth() + plazoMeses);
    return fecha.toLocaleDateString('es-EC');
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="loading loading-spinner text-info loading-lg"></div>
        <p className="text-gray-600">Cargando operaciones...</p>
      </div>
    );
  }

  if (operaciones.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-600">No hay operaciones registradas</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Lista */}
      <div>
        <table className="w-full">
          {/* Cabecera */}
          <thead className="bg-gray-200">
            <tr>
              <th className={estilos.cabeceraTabla}>
                Cliente
              </th>
              <th className={estilos.cabeceraTabla}>
                Tipo
              </th>
              <th className={estilos.cabeceraTabla}>
                Monto
              </th>
              <th className={estilos.cabeceraTabla}>
                Fecha Inicio
              </th>
              <th className={estilos.cabeceraTabla}>
                Fecha Fin
              </th>
              <th className={estilos.cabeceraTabla}>
                Estado
              </th>
              <th className={estilos.cabeceraTabla}>
                Acciones
              </th>
            </tr>
          </thead>
          {/* Datos */}
          <tbody>
            {operaciones.map(operacion => (
              <tr key={operacion.operacionID}>
                <td className="p-5">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {operacion.nombre}
                    </div>
                    <div className="text-sm text-gray-500">
                      {operacion.identificacion}
                    </div>
                  </div>
                </td>
                <td className={estilos.celdaTabla}>
                  {operacion.tipoCreditoNombre}
                </td>
                <td className={estilos.celdaTabla}>
                  {formatoDinero(operacion.monto)}
                </td>
                <td className={estilos.celdaTabla}>
                  {formatoFecha(operacion.fechaInicio)}
                </td>
                <td className={estilos.celdaTabla}>
                  {calcularFechaFin(operacion.fechaInicio, operacion.plazoMeses)}
                </td>
                {/* Columna Estado */}
                <td className="px-6 py-4 text-center">
                  {operacion.aprobado ? 'Aprobado' : 'Rechazado'}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => onEditar(operacion)}
                      className="btn btn-active btn-accent"
                    >
                      Editar
                    </button>
                    <button
                      // onClick={() => onEliminar(operacion.operacionID)}
                      onClick={() => confirmarEliminacion(operacion.operacionID)}
                      className="btn btn-active btn-secondary"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ModalConfirmar
          abrirModal={abrirModal}
          onClickAceptar={aceptarEliminar}
          onClickCancelar={cancelarEliminar}
        />

      </div>


    </div>
  )
}

export default ListaOperaciones