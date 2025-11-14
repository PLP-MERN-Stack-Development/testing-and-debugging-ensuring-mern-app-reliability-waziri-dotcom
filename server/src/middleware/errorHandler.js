module.exports = (err, req, res, next) => {
  console.error('ErrorHandler:', err);
  if (res.headersSent) return next(err);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
};
