import db from "#db/client";

/** @returns the playlist created according to the provided details */
export async function createPlaylist({ name, description }) {
  const sql = `
    INSERT INTO playlists (name, description ) 
    VALUES ($1, $2) RETURNING *`;
  const values = [name, description];
  const { rows: playlist } = await db.query(sql, values);
  return playlist[0];
}

/** @returns the track created according to the provided details */
export async function createTrack({ name, duration_ms }) {
  const sql = `
    INSERT INTO tracks (name, duration_ms) 
    VALUES ($1, $2) RETURNING *`;
  const values = [name, duration_ms];
  const { rows: track } = await db.query(sql, values);
  return track[0];
}

/** @returns the playlist_track created according to the provided details */
export async function addTrackToPlaylist({ playlist_id, track_id }) {
  const sql = `
    INSERT INTO playlists_tracks (playlist_id, track_id) 
    VALUES ($1, $2) RETURNING *`;
  const values = [playlist_id, track_id];
  const { rows: playlist_track } = await db.query(sql, values);
  return playlist_track[0];
}

/** @returns all tracks */
export async function getTracks() {
  const sql = `SELECT * FROM tracks`;
  const { rows: tracks } = await db.query(sql);
  return tracks;
}
/** @returns a specific track*/
export async function getTrack({ id }) {
  const sql = `
    SELECT * 
    FROM tracks
    WHERE id = $1`;
  const values = [id];
  const { rows: tracks } = await db.query(sql, values);
  if (!tracks) return undefined;
  return tracks[0];
}

/** @returns all playlists */
export async function getPlaylists() {
  const sql = `SELECT * FROM playlists`;
  const { rows: playlists } = await db.query(sql);
  return playlists;
}

/** @returns a specific playlist*/
export async function getPlaylist({ id }) {
  const sql = `
    SELECT * 
    FROM playlists
    WHERE id = $1`;
  const values = [id];
  const { rows: playlists } = await db.query(sql, values);
  if (!playlists) return undefined;
  return playlists[0];
}

export async function getPlaylistTracksByPlaylistId({ playlist_id }) {
  const sql = `
  SELECT t.*
  FROM playlists_tracks AS pt 
  JOIN tracks AS t ON pt.track_id = t.id
  WHERE pt.playlist_id = $1`;
  const values = [playlist_id];
  const { rows: playlist_tracks } = await db.query(sql, values);
  return playlist_tracks;
}