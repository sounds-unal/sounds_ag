export const TypesDefInte = `
  type CategoryFavArtists {
      id: Int!
      id_artist: Int!
  }
  type CategoryFavSongs {
      id: Int!
      id_songs: Int!
  }  
  type CategoryPlaylist {
      id: Int!
      id_playlist: Int!
}
`;

export const categoryQueriesInte= `
      fav_artists(id_artist: Int!): [CategoryFavArtists]!
      fav_songs(id_songs: Int!): [CategoryFavSongs]!
      playlist(id_playlist: Int!): [CategoryPlaylist]!
  `;


  



