export type Type = {
  createDir: {
    body: {
      name: string;
      type?: string;
      parent?: string;
    };
  };
  getFiles: {
    query: {
      parent?: string;
    };
  };
  saveFile: {
    body: {
      parent?: string;
      // file: File;
    };
  };
};
