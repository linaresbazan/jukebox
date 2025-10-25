import express from "express";
import trackRouter from "#api/tracks";
import playlistRouter from "#api/playlists";
const app = express();
export default app;


// ### Pre-routing middleware

// Parse JSON request bodies
app.use(express.json());

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// ### Routing middleware
app.use('/tracks', trackRouter);
app.use('/playlists', playlistRouter);


// ### Error-handling middleware
// Catch-all error-handling middleware
app.use((err, req, res, next) => {
  if (err.code === "22P02") return res.status(400).send("Invalid data type sent in request");
  if (err.code === "23503") return res.status(404).send("Record does not exist");
  if (err.code === "23505") return res.status(400).send("Record already exists");
  return res.status(500).send("Sorry! Something went wrong :(: ", err);
});