export const fakeContentBy = {
  pages: [
    {
      data: [{ id: 12, name: "example" }],
    },
  ],
  data: {
    total: 10,
    data: [
      {
        id: 1,
        name: "Content",
        content_stats: {
          rate: 1,
          downloads_cnt: 1,
        },
        info: {
          thumbnail: "",
        },
      },
      {
        id: 2,
        name: "Content B",
        content_stats: {
          rate: 2,
          downloads_cnt: 1200,
        },
        info: {
          thumbnail: "",
        },
      },
    ],
  },
};

export const fakeGetFile = {
  data: {
    id: 12,
    name: "Suzuki",
    tags: ["hello", "cool"],
    content_stats: {
      downloads_cnt: 9882,
    },
    info: {
      size: 1299,
      thumbnail: "",
      content_hash: "12312dasdasdD12312kj312j312j",
      file_name: "Download",
      public_hash: "12312dasdasdD12312kj312j312j",
      ext: "222",
      description: "Hello world",
      created_at: new Date(),
    },
    user: {
      id: 123123,
      wallet_id: "012399",
      avatar: "",
    },
  },
};

export const fakeSimilarContent = {
  data: [
    {
      id: 1,
      name: "File name",
      info: {
        thumbnail: "",
        public_hash: "asdas12312E2",
      },
    },
  ],
};

export const fakeCategories = {
  data: [
    { id: 1, name: "Porsche" },
    { id: 2, name: "Chevrolet" },
    { id: 3, name: "BMW" },
    { id: 4, name: "Mercedes-Benz" },
  ],
};

export const fakeSearchContent = {
  data: {
    data: fakeContentBy.data.data,
  },
};

export const fakeCurrentUser = {
  id: 12,
  name: "Otabek",
  avatar: "",
  wallet_id: "912391239129",
};
