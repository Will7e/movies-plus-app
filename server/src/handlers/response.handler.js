const responseWithData = (res, statusCode, data) =>
  res.status(statusCode).json(data);

  const err = (res) =>
  responseWithData(res, 500, {
    status: 500,
    message: "Something went wrong",
  });

const badRequest = (res, message) =>
  responseWithData(res, 400, {
    status: 400,
    message,
  });

const ok = (res, data) => responseWithData(res, 200, data);
const created = (res, data) => responseWithData(res, 201, data);

const unAuthorized = (res) =>
  responseWithData(res, 401, {
    status: 401,
    message: "You are not authorized to access this resource",
  });

const notFound = (res) =>
  responseWithData(res, 404, {
    status: 404,
    message: "Resource not found",
  });

  export default {
    ok,
    created,
    badRequest,
    unAuthorized,
    notFound,
    err,
};