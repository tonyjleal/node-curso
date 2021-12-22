const { response } = require("express");
const { uploadFile } = require("../helpers");


const loadFile = async( req, res = response) => {
  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      res.status(400).json({
          msg: 'No hay ficheros para subir.',
      });
      return;
    }
  
    const fileName = await uploadFile(req.files);

    res.json({
        fileName,
    })

}


module.exports = {
    loadFile,
}