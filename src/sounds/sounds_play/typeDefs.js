export const TypesDefPlay = `
  type CategoryPlay {
      id: Int!
      song_name: String!
      song_path: String!
      song_liryc: String!
      artist: String!
      createdAt: String!
      updatedAt: String!
  }
  type CategoryLiryc {
    song_liryc: String!
}
`;

export const categoryQueriesPlay= `
      update: [CategoryPlay]!
      songsbyname(name: String!): [CategoryPlay]!
      songsbyartist(artist: String!): [CategoryPlay]!
      getliryc(id: Int!): [CategoryLiryc]!
  `;
