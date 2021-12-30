const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = ( files, extensionAllowed = ['png', 'jpg', 'jpeg', 'gif'], folder = '' ) => {

    return new Promise( (resolve, reject ) => {

        const { file } = files;
        const shortName = file.name.split('.');
        const extension = shortName[ shortName.length -1 ];
        
        if ( !extensionAllowed.includes(extension) ) {
            return reject(`La extensión ${ extension } no es permitida`)
        }
        
        const temporalName = uuidv4() + '.'+ extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, temporalName);
    
        file.mv(uploadPath, (err) => {
            if (err) {
                return reject( err );
            }
        
            resolve(temporalName);
        });
    });
}

module.exports = {
    uploadFile,
}