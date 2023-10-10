export default {
  failed: { message: "Failed", code: 400 },
  authenticated: { message: "Unauthenticated", code: 401 },
  authorized: { message: "Unauthorized", code: 403 },
  notFound: (payload) => {
    return { message: `${payload} not found`, code: 404 };
  },
};