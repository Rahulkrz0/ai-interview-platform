const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  console.error('\x1b[31m%s\x1b[0m', `[Error ${req.method} ${req.originalUrl}] ${err.message}`);
  if (err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    status,
    message: err.message || 'An unexpected error occurred.',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler;
