const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { response } = require("express");


const loadFile = ( req, res = response) => {
  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      res.status(400).json({
          msg: 'No hay ficheros para subir.',
      });
      return;
    }
  
 
    const { file } = req.files;
    const shortName = file.name.split('.');
    const extension = shortName[ shortName.length -1 ];
    
    const extensionAllowed = ['png', 'jpg', 'jpeg', 'gif'];
    
    if ( !extensionAllowed.includes(extension) ) {
        return res.status(400).json({
            msg: `La extensión ${ extension } no es permitida`,
        });
    }
    
    const temporalName = uuidv4() + '.'+ extension;
    const uploadPath = path.join(__dirname, '../uploads/', temporalName);
  
    file.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).json({ err });
      }
  
      res.json({
          msg: 'File uploaded to ' + uploadPath });
    });
}


module.exports = {
    loadFile,
}