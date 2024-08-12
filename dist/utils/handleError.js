"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (res, req, error) => {
    // Enviar respuesta al cliente en caso de error
    res.status(500).json({ status: 500, message: 'Internal server error' });
};
exports.handleError = handleError;
