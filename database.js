
import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";

mkdirSync("data", { recursive: true });

const connection = new DatabaseSync("data/projects.db");

connection.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    status TEXT NOT NULL
  )
`);

export const db = {
  async list() {
    return connection
      .prepare("SELECT id, name, status FROM projects")
      .all();
  },

  async create(project) {
    const result = connection
      .prepare("INSERT INTO projects (name, status) VALUES (?, ?)")
      .run(project.name, project.status);

    return connection
      .prepare("SELECT id, name, status FROM projects WHERE id = ?")
      .get(Number(result.lastInsertRowid));
  },

  async update(id, project) {
    const result = connection
      .prepare("UPDATE projects SET name = ?, status = ? WHERE id = ?")
      .run(project.name, project.status, id);

    if (Number(result.changes) === 0) return null;

    return connection
      .prepare("SELECT id, name, status FROM projects WHERE id = ?")
      .get(id);
  },

  async remove(id) {
    const result = connection
      .prepare("DELETE FROM projects WHERE id = ?")
      .run(id);

    return Number(result.changes) > 0;
  }
};
