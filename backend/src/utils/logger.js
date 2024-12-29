const { createLogger, format, transports } = require('winston');

// Crear un logger personalizado
const logger = createLogger({
  level: 'info', // Nivel por defecto
  format: format.combine(
    format.timestamp(), // Agregar marca de tiempo
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // Mostrar logs en la consola
    new transports.File({ filename: 'logs/app.log' }) // Guardar logs en un archivo
  ]
});

module.exports = logger;
