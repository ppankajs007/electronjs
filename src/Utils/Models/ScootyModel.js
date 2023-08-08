import React from 'react'

/* import { ipcRenderer } from 'electron' */


const date = new Date();

const insert = (fields) => {
    let query = `INSERT INTO scooty (name,created_date) VALUES ('${fields.name}','${date}')`;
    return new Promise((resolve) => {
      ipcRenderer.once('db-execute', (_, arg) => {
        resolve(arg);
      });
      ipcRenderer.send('db-query', query);
    });
}

const select = () => {
  let query = `SELECT * FROM scooty ORDER BY id desc`;
  return new Promise((resolve) => {
    ipcRenderer.once('db-execute', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('db-query', query);
  });
}

const message = () => {
  let query = `Hello`;
  return new Promise((resolve) => {
    ipcRenderer.send('notify', query);
  });
}

export {
    insert,
    select,
    message
}