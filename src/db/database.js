// src/db/database.js
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

// Open / create database file
export async function getDBConnection() {
  const db = await SQLite.openDatabase({ name: 'app.db', location: 'default' });
  return db;
}

export async function createItemsTable(db) {
  const query = `
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT
    );
  `;
  await db.executeSql(query);
}

export async function getItems(db) {
  const results = await db.executeSql('SELECT * FROM items');
  const items = [];

  results.forEach(result => {
    for (let i = 0; i < result.rows.length; i++) {
      items.push(result.rows.item(i));
    }
  });

  return items;
}

export async function insertItem(db, title, description) {
  const insertQuery =
    'INSERT INTO items (title, description) VALUES (?, ?);';
  await db.executeSql(insertQuery, [title, description]);
}

export async function clearItems(db) {
  const deleteQuery = 'DELETE FROM items';
  await db.executeSql(deleteQuery);
}

export async function deleteItem(db, id) {
  const deleteQuery = 'DELETE FROM items WHERE id = ?';
  await db.executeSql(deleteQuery, [id]);
}