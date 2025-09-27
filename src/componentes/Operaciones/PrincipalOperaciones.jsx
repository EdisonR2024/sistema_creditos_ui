import { useNavigate } from 'react-router-dom';
import FormularioOperaciones from './FormularioOperaciones'
import ListaOperaciones from './ListaOperaciones'
import { actualizarOperacion, crearOperacion, eliminarOperacion, obtenerOperaciones } from '../../servicios/OperacionesServices';
import { useEffect, useState } from 'react';
import MensajeInformacion from '../compartidos/MensajeInformacion';

function PrincipalOperaciones() {

  const navegacion = useNavigate();

  const [operaciones, setOperaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [esAccionCrear, setEsAccionCrear] = useState(true);
  const [operacionSeleccionadaActualizar, setOperacionSeleccionadaActualizar] = useState([]);

  const [presentarMensaje, setPresentarMensaje] = useState(false);
  const [tipoMensaje, setTipoMensaje] = useState("");

  // const textoMensaje = esAccionCrear ? "Operación creada exitosamente" : "Operación actualizada exitosamente";
  const [textoMensaje, setTextoMensaje] = useState("");

  useEffect(() => {

    var consultarOperaciones = async () => {
      var datosOperaciones = await obtenerOperaciones();
      setOperaciones(datosOperaciones);
      setLoading(false);
      return datosOperaciones;
    }
    consultarOperaciones();
  }, []);

  const onClickVolver = () => {
    navegacion("/");
  }

  const mostrarMensajeTemporal = (tipo, texto) => {
    setPresentarMensaje(true);
    setTipoMensaje(tipo);
    setTextoMensaje(texto);
    setTimeout(() => {
      setPresentarMensaje(false);
    }, 3000);
  }

  const onClickNuevaOperacion = async (operacionNueva) => {
    let nuevaOperacion = await crearOperacion(operacionNueva);
    mostrarMensajeTemporal("success", "Operación creada exitosamente");
    setOperaciones([...operaciones, nuevaOperacion]);
  };

  const onClickEditarOperacion = (operacion) => {
    // console.log('Editar operación:', operacion);
    setEsAccionCrear(false);
    setOperacionSeleccionadaActualizar(operacion);
  };

  const onClickActualizarOperacion = async (idOperacion, operacionActualizada) => {
    // console.log('Actualizar operación:', operacionActualizada);  
    await actualizarOperacion(idOperacion, operacionActualizada);
    mostrarMensajeTemporal("info", "Operación actualizada exitosamente");
    // Actualizar la lista de operaciones en el estado
    const listaOperaciones = operaciones.map(operacion =>
      operacion.operacionID === idOperacion ? { ...operacion, ...operacionActualizada } : operacion
    );

    setOperaciones(listaOperaciones);
    setEsAccionCrear(true);
    setOperacionSeleccionadaActualizar([]);
  }

  const onClickEliminarOperacion = async (id) => {
    // console.log('Eliminar operación:', id);
    await eliminarOperacion(id);
    mostrarMensajeTemporal("info", "Operación eliminada exitosamente");
    const listaOperaciones = operaciones.filter(operacion => operacion.operacionID !== id);
    setOperaciones(listaOperaciones);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cabecera */}
      <div className="bg-white shadow-sm border-b flex items-center justify-between px-6 h-16">
        <h1 className="text-2xl font-bold text-gray-900">
          Sistema de Créditos
        </h1>
        <button className="bg-gray-500 hover:bg-gray-600 text-white p-2.5 rounded-lg cursor-pointer"
          onClick={onClickVolver}>
          Volver
        </button>
      </div>

      {/* Contenido Principal */}
      <div className="p-7 max-w-7xl mx-auto">
        {/* Sección Formulario */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {esAccionCrear ? 'Nueva' : 'Actualizar'} Operación
            </h2>
            {presentarMensaje && <MensajeInformacion tipo={tipoMensaje} mensaje={textoMensaje} />}
          </div>
          <FormularioOperaciones
            esAccionCrear={esAccionCrear}
            setEsAccionCrear={setEsAccionCrear}
            onSubmit={onClickNuevaOperacion}
            onActualizar={onClickActualizarOperacion}
            operacionSeleccionadaActualizar={operacionSeleccionadaActualizar}
          />
        </div>

        {/* Sección Lista */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Lista de Operaciones
          </h2>
          <ListaOperaciones
            operaciones={operaciones}
            loading={loading}
            onEditar={onClickEditarOperacion}
            onEliminar={onClickEliminarOperacion}
          />
        </div>
      </div>
    </div>
  )
}

export default PrincipalOperaciones