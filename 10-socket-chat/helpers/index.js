const dbValidators = require('./db-validators');
const encrypPassword = require('./encrypt-password');
const generateJWT = require('./generate-jwt');
const googleVerify = require('./google-verify');
const uploadFile = require('./upload-file');


module.exports = {
    ...dbValidators,
    ...encrypPassword,
    ...generateJWT,
    ...googleVerify,
    ...uploadFile,
}