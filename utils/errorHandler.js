export const errorHandler = (a) => (req, res, next) => {
  Promise.resolve(a(req, res, next)).catch(next);
};
