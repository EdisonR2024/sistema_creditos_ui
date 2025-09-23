import { useEffect, useState } from 'react'
import estilos from "./FormularioOperaciones.module.css";

function FormularioOperaciones({ esAccionCrear, setEsAccionCrear, onSubmit,
  onActualizar, operacionSeleccionadaActualizar }) {

  const [DatosFormulario, setDatosFormulario] = useState({
    identificacion: '',
    nombre: '',
    tipoCredito: '',
    monto: '',
    fechaInicio: '',
    plazoMeses: '',
    aprobado: false
  });

  useEffect(() => {
    if (!esAccionCrear) {
      setDatosFormulario({
        identificacion: operacionSeleccionadaActualizar.identificacion,
        nombre: operacionSeleccionadaActualizar.nombre,
        tipoCredito: operacionSeleccionadaActualizar.tipoCredito,
        monto: operacionSeleccionadaActualizar.monto,
        fechaInicio: operacionSeleccionadaActualizar.fechaInicio.substring(0, 10),
        plazoMeses: operacionSeleccionadaActualizar.plazoMeses,
        aprobado: operacionSeleccionadaActualizar.aprobado
      });
    }
  }, [esAccionCrear, operacionSeleccionadaActualizar]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatosFormulario(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const onClickSubmit = (e) => {
    e.preventDefault();
    // console.log('Datos del formulario:', DatosFormulario);
    esAccionCrear ? onSubmit(DatosFormulario) : onActualizar(operacionSeleccionadaActualizar.operacionID, DatosFormulario);
    // onSubmit(DatosFormulario);
    limpiarFormulario();
  };

  const limpiarFormulario = () => {
    setDatosFormulario({
      identificacion: '',
      nombre: '',
      tipoCredito: '',
      monto: '',
      fechaInicio: '',
      plazoMeses: '',
      aprobado: false
    });
  }

  const cancelarActualizacion = () => {
    limpiarFormulario();
    setEsAccionCrear(true);
    // Aquí puedes agregar lógica adicional para manejar la cancelación de la actualización
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={onClickSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Identificación */}
          <div>
            <label className={estilos.labelFormulario}>
              Identificación
            </label>
            <input
              type="text"
              name="identificacion"
              value={DatosFormulario.identificacion}
              onChange={onChange}
              className={estilos.inputFormulario}
              placeholder="Ingrese identificación"
              required
            />
          </div>

          {/* Nombre */}
          <div>
            <label className={estilos.labelFormulario}>
              Nombre Completo
            </label>
            <input
              type="text"
              name="nombre"
              value={DatosFormulario.nombre}
              onChange={onChange}
              className={estilos.inputFormulario}
              placeholder="Ingrese nombre completo"
              required
            />
          </div>

          {/* Tipo de Crédito */}
          <div>
            <label className={estilos.labelFormulario}>
              Tipo de Crédito
            </label>
            <select
              name="tipoCredito"
              value={DatosFormulario.tipoCredito}
              onChange={onChange}
              className={estilos.inputFormulario}
              required
            >
              <option value="">Seleccione tipo</option>
              <option value="001">Crédito Corporativo</option>
              <option value="002">Crédito de Consumo</option>
              <option value="003">Micro Crédito</option>
            </select>
          </div>

          {/* Monto */}
          <div>
            <label className={estilos.labelFormulario}>
              Monto
            </label>
            <input
              type="number"
              name="monto"
              value={DatosFormulario.monto}
              onChange={onChange}
              step="0.01"
              min="0"
              className={estilos.inputFormulario}
              placeholder="0.00"
              required
            />
          </div>

          {/* Fecha Inicio */}
          <div>
            <label className={estilos.labelFormulario}>
              Fecha de Inicio
            </label>
            <input
              type="date"
              name="fechaInicio"
              value={DatosFormulario.fechaInicio}
              onChange={onChange}
              className={estilos.inputFormulario}
              required
            />
          </div>

          {/* Plazo en Meses */}
          <div>
            <label className={estilos.labelFormulario}>
              Plazo (Meses)
            </label>
            <input
              type="number"
              name="plazoMeses"
              value={DatosFormulario.plazoMeses}
              onChange={onChange}
              min="1"
              max="600"
              className={estilos.inputFormulario}
              placeholder="Ej: 24"
              required
            />
          </div>
        </div>

        {/* Checkbox Aprobado */}
        <div className="mt-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="aprobado"
              checked={DatosFormulario.aprobado}
              onChange={onChange}
              className={estilos.checkboxFormulario}
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              Operación Aprobada
            </span>
          </label>
        </div>

        {/* Botones */}
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className={estilos.botonGuardarFormulario}
          >
            {esAccionCrear ? 'Guardar' : 'Actualizar'} Operación
          </button>
          {esAccionCrear ?
            <button
              type="button"
              className={estilos.botonLimpiarFormulario}
              onClick={limpiarFormulario}
            >
              Limpiar
            </button>
            :
            <button
              type="button"
              className={estilos.botonLimpiarFormulario}
              onClick={cancelarActualizacion}
            >
              Cancelar
            </button>
          }
        </div>
      </form>
    </div>
  )
}

export default FormularioOperaciones