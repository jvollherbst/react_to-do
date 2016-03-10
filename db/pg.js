var pgp = require('pg-promise')();
var cn  = 'postgres://jasminecardoza:' + process.env.DB_PASSWORD + '@localhost/tasks_db';
var db  = pgp(cn);

// function query(query, values, qrm);
function getTasks(req, res, next){
db.any("select task_name, task_desc from tasks")
    .then(function (data){
      console.log(data)
      res.rows = data;
      next();
        // success;
    })
    .catch(function (error) {
        // error;
    });
}

function addTasks(req, res, next){
  console.log(req.body);
db.one(`insert into tasks (task_name, task_desc) values ($1, $2) returning task_id;`,
[req.body.task_name, req.body.task_desc] )
    .then(function (data){
      console.log('task added successfully')
      res.rows = data;
      next();
        // success;
    })
    .catch(function (error) {
        // error;
        console.log('error adding task', error);

    });
}

function toggleTask(req, res, next){
  console.log(req.body);
db.none(`UPDATE tasks SET completed = false, WHERE task_id = ($1);`,
[req.params.task_id])
    .then(function (data){
      console.log('where udpate task successful')
      res.rows = data;
      next();
        // success;
    })
    .catch(function (error) {
        // error;
    });
}

function updateTime(req, res, next){
  console.log(req.body);
db.none(`UPDATE tasks SET task_time_start = ($1), task_time_end = ($2) WHERE task_id = ($3);`,
[req.body.task_time_start, req.body.task_time_end, req.params.task_id])
    .then(function (data){
      console.log('where udpate task successful')
      res.rows = data;
      next();
        // success;
    })
    .catch(function (error) {
        // error;
    });
}

module.exports.db = db;
module.exports.pgp = pgp;

module.exports.getTasks = getTasks;
module.exports.addTasks = addTasks;
module.exports.toggleTask = toggleTask;
module.exports.updateTime = updateTime;
