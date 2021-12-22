const { response } = require("express");


const loadFile = ( req, res = response) => {

    res.json({
        msg: 'Load File',
    });

}


module.exports = {
    loadFile,
}