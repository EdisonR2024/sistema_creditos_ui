import { useNavigate } from 'react-router-dom';
import FormularioOperaciones from './FormularioOperaciones'
import ListaOperaciones from './ListaOperaciones'
import { crearOperacion, obtenerOperaciones } from '../../servicios/OperacionesServices';
import { useEffect, useState } from 'react';

function PrincipalOperaciones() {

  const navegacion = useNavigate();

  const [operaciones, setOperaciones] = useState([]);
  const [loading, setLoading] = useState(true);


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

  const onClickNuevaOperacion = async (operacionNueva) => {
    console.log('Nueva operación:', operacionNueva);
    // Aquí debe ir la lógica de agregar la nueva operación

    let nuevaOperacion = await crearOperacion(operacionNueva);
    setOperaciones([...operaciones, nuevaOperacion]);

  };

  const onClickEditarOperacion = (operacion) => {
    console.log('Editar operación:', operacion);
    // Aquí debe ir la lógica de editar operación
  };

  const onClickEliminarOperacion = (id) => {
    console.log('Eliminar operación:', id);
    // Aquí debe ir la lógica de eliminar operación
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
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Nueva Operación
          </h2>
          <FormularioOperaciones onSubmit={onClickNuevaOperacion} />
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