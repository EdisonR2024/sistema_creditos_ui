function MensajeInformacion({tipo, mensaje}) {
    return (
        <div>
            <div className="alert alert-success">
                <span>{mensaje}</span>
            </div>
        </div>
    );
}

export default MensajeInformacion;