export type Type = {
  registration: {
    body: {
      email: string;
      password: string;
    };
  };
  logIn: {
    body: {
      email: string;
      password: string;
    };
  };
  auth: Record<string, never>;
};
