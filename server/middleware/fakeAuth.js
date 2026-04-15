// Middleware untuk fake authentication
// supaya bisa crud tanpa harus beres auth

module.exports = (req, res, next) => {
  req.user = {
    id: '67fd5e34-cf6a-4e33-90bd-89f71b4842a3' //UUID user dummy dari DB
  };
  next();
};