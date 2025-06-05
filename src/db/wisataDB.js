import { openDB } from 'idb';

export async function saveWisataToDB(responseData) {
  const db = await openDB('wisata-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('wisata')) {
        db.createObjectStore('wisata');
      }
    },
  });

  await db.put('wisata', responseData, 'list');
}
