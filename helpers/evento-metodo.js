const res = require('express/lib/response');
const Evento = require('../models/evento');

const generarNombre = (nombre = '') => {

    let splitted = nombre.split('-');

    let sub = splitted[splitted.length - 1];

    let parse = parseInt(sub);

    let charted = "";

    if (isNaN(parse)) {

        for (var i = 0; i < splitted.length; i++) {
            charted = charted + splitted[i] + '-';
        }
        let finalName = charted + 2
        return finalName;
    } else {

        for (var i = 0; i < splitted.length - 1; i++) {
            charted = charted + splitted[i] + '-';
        }

        let finalName = charted + (parse + 1);
        return finalName;
    }

}



module.exports = {
    generarNombre,

}