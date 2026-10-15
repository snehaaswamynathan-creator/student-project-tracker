<<<<<<< HEAD
import express from 'express';
import { createApp } from './project-api.js';
import { db } from './database.js';
const app = express();
app.use(createApp(db));
export default app;
=======
import { createApp } from './app.js';
import { db } from './database.js';
const app = createApp(db);
const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`Open http://localhost:${port}`));
>>>>>>> origin/main
