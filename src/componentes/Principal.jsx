import { useNavigate } from "react-router-dom";
import estilos from "./Principal.module.css";

function Principal() {

  const navegacion = useNavigate();

  const onClickIngresar = () => {
    navegacion('/operaciones');
  }

  return (
    <div className={estilos.contenedor}>
      <div className={estilos.contenedor_secundario}>
        <h1 className={estilos.titulo}>SISTEMA DE CRÉDITOS</h1>
        <p className={estilos.subtitulo}>Gestión de operaciones crediticias</p>
        <button className="btn btn-info btn-lg" onClick={onClickIngresar}>
          Ingresar
        </button>
      </div>
    </div>
  )
}

export default Principal