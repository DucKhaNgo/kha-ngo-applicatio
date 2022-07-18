function validateRequestData({
  paramSchema,
  querySchema,
  bodySchema,
  validateOptions = { allowUnknown: true, abortEarly: false },
}) {
  return (req, res, next) => {
    try {
      if (paramSchema) {
        const { error } = paramSchema.validate(
          req.params || {},
          validateOptions,
        );
        if (error) {
          return res.status(400).json({
            error: error.message,
          });
        }
      }
      if (querySchema) {
        const { error } = querySchema.validate(
          req.query || {},
          validateOptions,
        );
        if (error) {
          return res.status(400).json({
            error: error.message,
          });
        }
      }
      if (bodySchema) {
        const { error } = bodySchema.validate(req.body || {}, validateOptions);
        if (error) {
          return res.status(400).json({
            error: error.message,
          });
        }
      }
      next();
    } catch (error) {
      res.sendStatus(500);
    }
  };
}

module.exports = {
  validateRequestData,
};
