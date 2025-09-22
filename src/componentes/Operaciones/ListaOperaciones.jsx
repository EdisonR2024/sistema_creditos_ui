// import { useState, useEffect } from 'react'

import estilos from "./ListaOperaciones.module.css";
// import { obtenerOperaciones } from '../../servicios/OperacionesServices';

function ListaOperaciones({ operaciones, loading, onEditar, onEliminar }) {

  // const [operaciones, setOperaciones] = useState([]);
  // const [loading, setLoading] = useState(true);

  // Datos de ejemplo - se debe reemplazar con la llamada a la API
  /*   
    const operacionesEjemplo = [
      {
        operacionID: 1,
        identificacion: '1718564883',
        nombre: 'JOSE RODRIGUEZ',
        tipoCredito: '002',
        tipoCreditoNombre: 'Crédito de Consumo',
        monto: 55660.00,
        fechaInicio: '2023-06-23',
        plazoMeses: 208,
        aprobado: true
      },
      {
        operacionID: 2,
        identificacion: '1040735005',
        nombre: 'GONZALO MARTINEZ',
        tipoCredito: '002',
        tipoCreditoNombre: 'Crédito de Consumo',
        monto: 855205.33,
        fechaInicio: '2022-10-31',
        plazoMeses: 360,
        aprobado: false
      },
      {
        operacionID: 3,
        identificacion: '411520204',
        nombre: 'DONATILA GARCIA',
        tipoCredito: '002',
        tipoCreditoNombre: 'Crédito de Consumo',
        monto: 72800.00,
        fechaInicio: '2023-04-25',
        plazoMeses: 263,
        aprobado: true
      }
    ];
  
   */

  /*
  useEffect(() => {
    // Simular carga de datos
         
        // setTimeout(() => {
        //   setOperaciones(operacionesEjemplo);
        //   setLoading(false);
        // }, 1000);
     
    var consultarOperaciones = async () => {
      var datosOperaciones = await obtenerOperaciones();
      setOperaciones(datosOperaciones);
      setLoading(false);
      return datosOperaciones;
    }
    consultarOperaciones();
    

  }, []);
*/

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
    fecha.setMonth(fecha.getMonth() + plazoMeses);
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
                      onClick={() => onEliminar(operacion.operacionID)}
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
      </div>


    </div>
  )
}

export default ListaOperaciones