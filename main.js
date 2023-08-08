const { BrowserWindow, app, ipcMain,remote, Notification } = require('electron');
const path = require('path');
const isDevTool = !app.isPackaged;
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./database.db"
  }
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 650,
    minHeight:600,
    minWidth:1000,
    frame: false,
    webPreferences: {
      nodeIntegration: true, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js") // use a preload script
    }
  })
  
  ipcMain.handle('minimize', () => {
    win.minimize();
  })
  
  ipcMain.handle('maximize',() => {
    if( win.isMaximized() ) { win.restore() } else { win.maximize() };
    return ( win.isMaximized() )? true : false;
  })
  
  

  ipcMain.handle('closeApp', () => {
    win.close();
  })
  
  win.loadFile('index.html');
}

if (isDevTool) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  })
}

ipcMain.on('notify', (_, message) => {
  new Notification({title: 'Notifiation', body: __dirname + '/database.db'}).show();
})

app.whenReady().then(createWindow)

ipcMain.handle("createTable", async (event) => {
  try {
    
    knex.schema.hasTable('scooty').then(function(exists) {
      if (!exists) {
        return knex.schema.createTable('scooty', function(t) {
          t.increments('id').primary().nullable();
            t.string('name', 100);
            t.integer('delete_at', 100).defaultTo(0);
            t.string('created_date').nullable();
          });
      }

    });

    knex.schema.hasTable('inventory').then(function(exists) {
      if (!exists) {
        return knex.schema.createTable('inventory', function(t) {
          t.increments('id').primary().nullable();
            t.integer('scooty_id', 100);
            t.foreign('scooty_id').references('id').inTable('scooty');
            t.integer('quantity');
            t.integer('total_amount');
            t.longtext('purchase_date');
            t.timestamps(true, true);
          });
        }
    })

  } catch (error) {
    return error;
  }

  try {
    knex.schema.hasTable('customers').then(function(exists) {
        if (!exists) {
          return knex.schema.createTable('customers', function(t) {
            t.increments('id').primary().nullable();
              t.string('name', 100);
              t.integer('mobile');
              t.text('address','longtext');
              t.timestamps(true, true);
            });
          }
      })
      
  } catch (error) {
    return error;
  }

  try {
    knex.schema.hasTable('sale_orders').then(function(exists) {
        if (!exists) {
          return knex.schema.createTable('sale_orders', function(t) {
            t.increments('id').primary().nullable();
              t.integer('scooty_id', 100);
              t.foreign('scooty_id').references('id').inTable('scooty');
              t.integer('quantity');
              t.integer('customer_id', 100);
              t.foreign('customer_id').references('id').inTable('customers');
              t.integer('sale_price');
              t.longtext('sale_date');
              t.timestamps(true, true);
            });
          }
      })
      
  } catch (error) {
    return error;
  }

  try {
    knex.schema.hasTable('scooty_batteries').then(function(exists) {
        if (!exists) {
          return knex.schema.createTable('scooty_batteries', function(t) {
            t.increments('id').primary().nullable();
              t.integer('scooty_id', 100);
              t.foreign('scooty_id').references('id').inTable('scooty');
              t.integer('sale_order_id', 100);
              t.foreign('sale_order_id').references('id').inTable('sale_orders');
              t.longtext('battery_sr_number');
              t.timestamps(true, true);
            });
          }
      })
      
  } catch (error) {
    return error;
  }


});



ipcMain.handle("select", async (event, select, table,where = "") => {
  try {

      let query = knex(table).clone();
      if( where !== '' && typeof where === 'object' ){
          query = query.where(where);
      }
      let result = await query.select(select).orderBy('id','desc');
      return {status:true,type:'success',data: result,message:''}; 
  } catch (error) {
      return {status:false,type:'error',data: "",message:error};
  }
});

ipcMain.handle("pagination", async (event, select, table,paginate,where) => {
  try {
      let offsetData = paginate.rows * paginate.page
      let orderType = ( paginate.sortOrder === 1 )?'desc':'asc';
      let query = knex(table).clone();
      if( where !== ''  ){
          query = query.where(where);
      }
      if( paginate.search !== '' ){   
          for (let i in paginate.searchColumn) {
            if( !i ){
                query = query.whereLike(paginate.searchColumn[i],`${paginate.search}%`);
            }else{
              query = query.orWhereLike(paginate.searchColumn[i],`${paginate.search}%`);
            }
          }
      }
      let totalQuery = query.clone();
      let data = await query.select(select).orderBy(paginate.sortField,orderType).limit(paginate.rows)
              .offset(offsetData).then( async ( result ) => {
                    let total = await totalQuery.count('id as totalRecord').then((count) => {
                                return count[0].totalRecord
                              });
                    return {status:true,type:'success',data: result,message:"",total:total}
              }).catch( (error) => {
                    return {status:false,type:'error',data: "",message:error,total:0}
              });
      return data
  } catch (error) {
      return {status:false,type:'error',data: "",message:error};
  }
});

ipcMain.handle("leftJoin", async (event,args) => {
  try {
    
      let query = knex(args.table).clone();
      query = query.leftJoin(args.leftjoin[0], args.leftjoin[1], args.leftjoin[2])
      if( typeof args.where !== 'undefined' && args.where !== '' && typeof args.where !== 'object' ){
          query = query.where(args.where);
      }

      if( typeof args?.sqlQuery !== 'undefined' ){
          args.select.push(knex.raw(args?.sqlQuery))
      }

      let data = query.select(args.select).orderBy(`${args.table}.id`, 'desc').then( async (result) => {
              return {status:true,type:'success',data: result,message:""}
          }).catch( (error) => {
            return {status:false,type:'error',data: "",message:error}
        });
      return data;
  } catch (error) {
      return {status:false,type:'error',data: "",message:error};
  }
});



ipcMain.handle("insertData", async (event, table, data) => {
    try {

        let query = knex(table).returning('id').insert(data).then( async (result) => {
            return {status:true,type:'success',data: result[0].id,message:""}
        }).catch( (error) => {
            return {status:false,type:'error',data: "",message:error}
        });
        return query;
    } catch (error) {
        return {status:false,type:'error',data: "",message:error};
    }
});

ipcMain.handle("updateData", async (event, table, where,data) => {
    try {
        let query = knex(table).where(where).update(data).then( async (result) => {
            return {status:true,type:'success',data: result,message:""}
        }).catch( (error) => {
            return {status:false,type:'error',data: "",message:error}
        });
        return query;
    } catch (error) {
        return {status:false,type:'error',data: "",message:error};
    }
});

ipcMain.handle("deleteData", async (event, table, where) => {
    try {
        
        let query = knex(table).where(where[0],where[1]).del().then( async (result) => {
            return {status:true,type:'success',data: result.id,message:""}
        }).catch( (error) => {
            return {status:false,type:'error',data: "",message:error}
        });;
        return query;
    } catch (error) {
        return {status:false,type:'error',data: "",message:error};
    }
});

ipcMain.handle("deleteMultipleData", async (event, table,column, where) => {
    try {
        
        let query = knex(table).whereIn(column,where).del().then( async (result) => {
            return {status:true,type:'success',data: result.id,message:""}
        }).catch( (error) => {
            return {status:false,type:'error',data: "",message:error}
        });;
        return query;
    } catch (error) {
        return {status:false,type:'error',data: "",message:error};
    }
});

ipcMain.handle('dayNight', (event, seen) => {
    return seen;
})



