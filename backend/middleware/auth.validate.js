export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    return next();
  } catch (e) {
    return res.status(400).json({
      error: e.issues.map((e) => ({
        field: e.path[0],
        message: e.message,
      })),
    });
  }
};
