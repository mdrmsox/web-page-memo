/*********
 * IDBWrapper
 * indexedDBを扱うモジュール
 * 
 * データベースの内容
 * {
 *    title: string -----webページのタイトル
 *    url:   string -----webページのurl
 *    date:  number   -----メモした日時
 * }
 *********/

const dbName: string = 'webMemo';
const dbVersion: number = 1;
const storeName : string = 'wmStore';

function dbInit (): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, dbVersion);
    request.onerror = (event: Event) => {
      console.log(event);
      const target = event.target as IDBRequest;
      reject(target.error);
    }
    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBRequest).result as IDBDatabase;
      db.createObjectStore(storeName, { keyPath: 'date' });
    }
    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBRequest).result as IDBDatabase;
      resolve(db);
    }
  });
}

export function getData(): Promise<any[]> {
  return new Promise ((resolve, reject) => {
    dbInit().then(
      (db) => {
        const transaction = db.transaction(storeName,'readonly');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.getAll();
        request.onsuccess = (event: Event) => {
            resolve((event.target as IDBRequest).result);
          };
        request.onerror = (event: Event) => {
      const target = event.target as IDBRequest;
      reject(target.error);
        }
      }).catch((error) =>{
          reject(error);
        });
    });
}

export function setData (data: object): Promise<void> {
  return new Promise((resolve, reject) => {
      dbInit().then(
        (db) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const objectStore = transaction.objectStore(storeName);
            objectStore.add(data);
            transaction.oncomplete = () => {resolve()};
            transaction.onerror = () => {
              reject(`トランザクションエラー： ${transaction.error}`);
              };
          }
      );
  });
}

export function deleteData (date: number): Promise<void> {
  return new Promise((resolve, reject) => {
      dbInit().then(
        (db) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const objectStore = transaction.objectStore(storeName);
            objectStore.delete(date);
            transaction.oncomplete = () => {resolve()};
            transaction.onerror = () => {
              reject(`トランザクションエラー： ${transaction.error}`);
              };
          }
      );
  });
}
