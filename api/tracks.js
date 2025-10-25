import express from "express";
import { getTracks, getTrack } from "#db/queries/music";

const router = express.Router();
export default router;

const getTrackById = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const track = await getTrack({ id: id });
  if (!track) return res.status(404).send("Not Found");
  req.track = track;
  next();
};

router.get('/', async (req, res) => {
  const tracks = await getTracks();

  return res.status(200).send(tracks);
});

router.get('/:id', getTrackById, (req, res) => {
  return res.status(200).send(req.track);
});
