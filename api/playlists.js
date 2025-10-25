import express from "express";
import {
  addTrackToPlaylist,
  createPlaylist,
  getPlaylist,
  getPlaylists,
  getPlaylistTracksByPlaylistId, getTrack
} from "#db/queries/music";
import requireBody from "#middleware/requireBody";

const router = express.Router();
export default router;

const getPlaylistById = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const playlist = await getPlaylist({ id: id });
  if (!playlist) return res.status(404).send("Not Found");
  req.playlist = playlist;
  next();
};

const checkTrackExists = async (req, res, next) => {
  const { trackId } = req.body;

  const track = await getTrack({ id: trackId });
  if (!track) return res.status(400).send("Track does not exist");
  req.track = track;
  next();
};

router.get('/', async (req, res) => {
  const playlists = await getPlaylists();

  return res.status(200).send(playlists);
});

router.post('/', requireBody(["name", "description"]), async (req, res) => {
  const { name, description } = req.body;

  const playlist = await createPlaylist({ name: name, description: description });
  return res.status(201).send(playlist);
});

router.get('/:id', getPlaylistById, async (req, res) => {
  return res.status(200).send(req.playlist);
});

router.get('/:id/tracks', getPlaylistById, async (req, res) => {
  const { id } = req.params;
  const playlistTracks = await getPlaylistTracksByPlaylistId({ playlist_id: id });
  return res.status(200).send(playlistTracks);
});

router.post('/:id/tracks', requireBody(["trackId"]), getPlaylistById, checkTrackExists, async (req, res) => {
  const { id: playlistId } = req.params;
  const { trackId } = req.body;

  const playlistTrack = await addTrackToPlaylist({ playlist_id: playlistId, track_id: trackId });
  return res.status(201).send(playlistTrack);
})