export enum Action {
  API = "api/",

  Token = "jwt",
  RefreshToken = "jwt/refresh",
  ClearToken = "jwt/clear",

  Activation = "user/activation",
  ResendActivation = "user/resend_activation",
  ResetPassword = "user/reset_password",
  ResetPasswordConfirm = "user/reset_password_confirm",
  SetPassword = "user/set_password",

  district = "api/district",
}