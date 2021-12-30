

const validateFileUpload = ( req, res, next ) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json({
            msg: 'No hay ficheros para subir.',
        });
        return;
    }

    next();
}

module.exports = {
    validateFileUpload
}