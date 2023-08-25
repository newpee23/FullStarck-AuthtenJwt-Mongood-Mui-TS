export interface dataLogin {
  username: string;
  password: string;
}

export interface authType {
  user: { _id: string | null;
          username: string | null;
          role: string | null;
        } | null;
  message: string;
  token: string | undefined;
}

export interface dataRegister extends dataLogin {
  confirm: string;
}

export type localStorageType = {
  _id: string | null;
  username: string | null;
  role: string | null;
};
