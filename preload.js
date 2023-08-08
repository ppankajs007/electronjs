const { ipcRenderer, contextBridge } = require('electron');

window.addEventListener('DOMContentLoaded', async () => {
    await ipcRenderer.invoke('createTable');
})

const date = new Date();

contextBridge.exposeInMainWorld('database', {
  select: async (select, table,where = "") => {
    let response = await ipcRenderer.invoke('select',select,table,where);
    return response;
  },
  whereIn: async (args) => {
    let response = await ipcRenderer.invoke('whereIn',args);
    return response;
  },
  pagination: async (select, table,pagenate,where) => {
    let response = await ipcRenderer.invoke('pagination',select, table,pagenate,where);
    return response;
  },
  leftJoin: async (args) => {
    let response = await ipcRenderer.invoke('leftJoin',args);
    return response;
  },
  insert: async (table,data) => {
    let response = await ipcRenderer.invoke('insertData',table,data);
    return response;
  },
  update: async (table,where,data) => {
    let response = await ipcRenderer.invoke('updateData',table,where,data);
    return response;
  },
  delete: async (table,where) => {
    let keyObj = Object.keys(where);
    let response = await ipcRenderer.invoke('deleteData',table,[keyObj[0],where[keyObj[0]]]);
    return response;
  },
  multipleDelete: async (table,column,where) => {
    let response = await ipcRenderer.invoke('deleteMultipleData',table,column,where);
    return response;
  },

})

contextBridge.exposeInMainWorld('control', {
  
  minimize: () => {
    ipcRenderer.invoke('minimize');
  },

  closeApp: () => {
    ipcRenderer.invoke('closeApp');
  },

  maximize: async () => {
    return await ipcRenderer.invoke('maximize');
  },

  dayNight: async (seen) => {
    return await ipcRenderer.invoke('dayNight',seen);
  }

})


