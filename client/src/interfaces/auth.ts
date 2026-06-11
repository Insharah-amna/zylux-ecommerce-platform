export interface LoginProps {
  type: string;
  label: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  password: string;
  confirmPassword: string;
}

export interface ResetPageProps {
  params: Promise<{token: string | null}>;
}

export interface TokenProps {
  token?: string | null;
  email?: string | null;
}

export interface ResetTokenParam {
  password: string;
  token: string | null;
}
