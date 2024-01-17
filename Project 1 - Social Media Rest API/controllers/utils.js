const handleErrors = (res, statusCode, message, error) => {
  console.error(error);
  return res.status(statusCode).json({ success: false, message });
};

module.exports = { handleErrors };
