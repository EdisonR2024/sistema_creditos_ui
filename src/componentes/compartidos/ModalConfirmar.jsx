function ModalConfirmar({ abrirModal, onClickAceptar, onClickCancelar }) {

    return (<dialog open={abrirModal} id='modalConfirmar'
        className="modal">
        <div className="modal-box">
            <p>¿Estás seguro de eliminar el registro?</p>
            <button className="btn btn-primary" onClick={onClickAceptar}>Aceptar</button>
            <button className="btn btn-secondary" onClick={onClickCancelar}>Cancelar</button>
        </div>

    </dialog>);
}

export default ModalConfirmar;