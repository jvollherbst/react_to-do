const express     = require('express');
const tasks       = express.Router();
const db          = require('../db/pg');

var myTasks = {taskA:{
      name   : 'Jason',
      completed : true,
      desc   : "blurgTest"
      }
  };

tasks.route('/')
  .get(db.getTasks, (req,res)=>res.json(res.rows))
  .post(db.addTasks, (req,res)=>res.json(res.rows))

// /tasks/task-12345/time
tasks.route('/:taskID/time')
  .put(db.updateTime, (req,res)=>{
    //update a task time if it exits, if not do nothing
    res.send(req.params.task_id)
  })

// /tasks/task-12345/
tasks.route('/:taskID')
  .put(db.toggleTask, (req,res)=>{
    // update a specific task
    res.send(req.params.task_id)
  })
  .delete((req,res)=>{
    // delete a specific task
  })


module.exports = tasks;
