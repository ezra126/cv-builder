const errorHandler = (message: String, statusCode: any) => {
  return Response.json({
    message: message,
    statusCode: statusCode,
  });
};

export default errorHandler;
