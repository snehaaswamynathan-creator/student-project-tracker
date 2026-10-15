
import { db } from './database.js';
import { createApp } from './project-api.js';

const app = createApp(db);

export default app;
