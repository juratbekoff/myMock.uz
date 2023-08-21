export default {
  secret_access: String(process.env.JWT_SECRET_ACCESS!),
  secret_refresh: String(process.env.JWT_SECRET_REFRESH!),
  expiresIn: +process.env.EXPIRES_IN!,
};
