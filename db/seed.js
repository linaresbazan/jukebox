import db from "#db/client";
import { faker } from '@faker-js/faker';
import { addTrackToPlaylist, createPlaylist, createTrack } from "#db/queries/music";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const tracks = [];
  const playlists = [];

  for (let i = 0; i < 20; i++) {
    const trackName = faker.music.songName();
    const trackDuration = faker.number.int({min: 120000, max: 300000});
    const track = await createTrack({ name: trackName, duration_ms: trackDuration });
    tracks.push(track);
  }

  for (let i = 0; i < 10; i++) {
    const playlistName = faker.music.album();
    const playlistDescription = faker.lorem.sentence(2);
    const playlist = await createPlaylist({name: playlistName, description: playlistDescription});
    playlists.push(playlist);
  }

  for (let i = 0; i < 10; i++) {
    const trackCount = faker.number.int({min: 2, max: 20});
    for (let j = 0; j < trackCount; j++) {
      await addTrackToPlaylist({ playlist_id: playlists[i].id, track_id: tracks[j].id });
    }
  }

}
