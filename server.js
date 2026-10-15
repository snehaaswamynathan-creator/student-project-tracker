
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the existing frontend files from the public folder.
app.use(express.static(path.join(__dirname, "public")));

// Parse incoming JSON request bodies, up to 10 KB.
app.use(express.json({ limit: "10kb" }));

// Health-check route.
app.get("/api/health", (req, res) => {
    res.json({ ok: true });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
