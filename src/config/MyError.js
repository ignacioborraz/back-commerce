export default class {
  static newError(message, code) {
    let error = new Error(message);
    error.message = message;
    error.statusCode = code || 500;
    error.status = `${code}`.startsWith("4") ? "fail" : "error";
    console.log('entró a MyError');
    throw error;
  }
}
