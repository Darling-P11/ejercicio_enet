"use strict";
exports.__esModule = true;
exports.isValidTextoLargo = exports.isValidTelefono = exports.isValidIdentificacion = exports.isValidPassword = exports.isValidUsername = void 0;
// validaciones para username y contraseña
exports.isValidUsername = function (username) {
    var usernameRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
    return usernameRegex.test(username);
};
exports.isValidPassword = function (password) {
    var passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,30}$/;
    return passwordRegex.test(password);
};
exports.isValidIdentificacion = function (id) {
    return /^\d{10,13}$/.test(id);
};
exports.isValidTelefono = function (telefono) {
    return /^09\d{8}$/.test(telefono);
};
exports.isValidTextoLargo = function (texto) {
    return texto.length >= 20 && texto.length <= 100;
};
