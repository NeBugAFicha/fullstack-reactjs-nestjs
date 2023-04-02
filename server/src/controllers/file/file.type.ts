export type Type = {
  createDir: {
    body: {
      name: string;
      type?: string;
      parent?: string;
    };
  };
};
