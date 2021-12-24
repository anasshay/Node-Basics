var fs = require('fs');
let jsonFile = '';
let tasksObj = [];


// fs.readFile('database.json', 'utf-8', (err, data) => {
//   if (err) {
//       throw err;
//   }
//   // tasksObj = JSON.parse(data.toString());
// });

/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
 function startApp(name){
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', onDataReceived);
    console.log(`Welcome to ${name}'s application!`)
    console.log("--------------------")
    if (process.argv[2] == undefined){
      load('default');
    }
    else {
      load(process.argv[2])
    }
    // console.log(process.argv[2]);
  }

  

  
  /**
   * Decides what to do depending on the data that was received
   * This function receives the input sent by the user.
   * 
   * For example, if the user entered 
   * ```
   * node tasks.js batata
   * ```
   * 
   * The text received would be "batata"
   * This function  then directs to other functions
   * 
   * @param  {string} text data typed by the user
   * @returns {void}
   */
  let cmdList = ['quit','exit', 'hello', 'help', 'add', 'remove', 'edit', 'check', 'uncheck', 'list'];
  
  function onDataReceived(text) {
    if (text === cmdList[0]+'\n' || text === cmdList[1] + '\n') {
      save(tasksObj);
    //   setTimeout(function(){
    //   quit();
    // }, 100); 
    quit();
    }
  
    else if(text.slice(0,5) === cmdList[2] || text === cmdList[2] + '\n'){
      hello(text.slice(5).trim());
    }
  
    else if (text === cmdList[3] + '\n') {
      help();
    }
  
    else if (text.slice(0, 3) === cmdList[4]) {
      if (text.slice(3).trim() == "") {
        console.log("No entry");
      } else {
        add(text.slice(3).trim());
        
      }
    }
  
    else if (text.trim() === "list") {
      printlist();
    } 

    else if (text.slice(0,4).trim() === "edit") {
      inpt_array = text.trim().split(' ');
      if (text.slice(4).trim() === "" || inpt_array[1] == '') {
        console.log('Please enter a valid edit command \'edit -task nb- -new value-\'');
      }
      else if (isNaN(inpt_array[1]) == true){
        edit(0, inpt_array.slice(1).join(' '))
      }
      else {
        if (inpt_array[1] <= tasksObj.length) {
          edit (inpt_array[1], inpt_array.slice(2).join(' '));
        }
        else {
          console.log('Please enter a valid edit command \'edit -task nb- -new value-\'');
        }
    } 
    }
    else if (text.slice(0, 6) === cmdList[5]) {
      if (text.slice(6).trim() === "") {
        remove("end");
      } else {
        let rm_num = parseInt(text.slice(6).trim());
        remove(rm_num);
      }
    } 
    else if (text.slice(0,5) == 'check') {
      inpt_array = text.trim().split(' ');
      if(text.slice(5).trim() === "" || isNaN(inpt_array[1]) == true){
       console.log ('Invalid input');
      }
      else {
        check(inpt_array[1])
      }
    }

    else if (text.slice(0,7) == 'uncheck') {
      if(text.slice(7).trim() === "" || isNaN(inpt_array[1]) == true){
       console.log ('Invalid input');
      }
      else {
        uncheck(inpt_array[1])
      }
    }
  
    else if (text.trim() == 'clear') {
      console.clear();
    }
    else{
      unknownCommand(text);
      }
  }
  
  
  /**
   * prints "unknown command"
   * This function is supposed to run when all other commands have failed
   *
   * @param  {string} c the text received
   * @returns {void}
   */
  function unknownCommand(c){
    console.log('unknown command: "'+c.trim()+'"')
  }
  
  
  /**
   * Says hello
   * @param  {string} inpt
   * @returns {void}
   */
  function hello(inpt){
      inpt = inpt.replace('\n', '').trim();
      if (inpt)
      {inpt = ' ' + inpt;}
      console.log('hello'+ inpt + '!');
    }
  
  
  /**
   * Exits the application
   *
   * @returns {void}
   */
  function quit(){
    console.log('Quitting now, goodbye!')
    process.exit();
  }
  
  /**
   * Help menu
   * This function show all the commands that are available
   * @returns {void}
   */
  function help(){
    console.log('Enter \'help\' for all commands.\nEnter \'list\' to print task list.\nEnter \'quit\' or \'exit\' to quit.\nEnter \'hello\' for greeting or \'hello X\' where X is your name.\nEnter \'add x\' for adding a task to the list.\nEnter \'remove\' or \'remove -task number-\' to remove a task.\nEnter \'check -task number-\' or \'uncheck -task number-\' to check or uncheck a task.');
  }
  
  
  // var uncheck = '☐';
  // var check = '☑';
  
  function add(value) {
      tasksObj.push({
        'task': value,
        'status' : false,
      })
  }
  
  function remove(value) {
    if (value > tasksObj.length || value <= 0){
      console.log('Please enter an existing value');
    }
    else{
      if (value == 'end') {
        tasksObj.pop()
      }
      else if (value > 0){
        tasksObj.splice(value-1,1);
      }
      }
}
  
  function edit(value, content) {
    if (value <= tasksObj.length && value > 0){
    value = parseInt(value.trim());
    tasksObj[value-1].task = content;
    }

    else if (value == 0) {
      tasksObj[tasksObj.length-1].task = content;
    }
  }

  function check(value) {
    if (value <= tasksObj.length){
    tasksObj[value-1].status = true;
    }
  }

  function uncheck(value) {
    if (value <= tasksObj.length){
      tasksObj[value-1].status = false;
      }
  }

  function printlist() {
    if(tasksObj.length != 0){
      tasksObj.map((task,index) => {
        if(task.status == true){
          console.log(`${index+1} - ☑ ${task.task}`)
        }
        else if(task.status == false){
          console.log(`${index+1} - ☐ ${task.task}`)
      }})
    }else {
      console.log ('task list is empty')
    }
    }
    
  // const data = JSON.stringify(tasksObj);

  function save(file) {
    try {
      fs.writeFileSync(`${jsonFile}`, JSON.stringify(file, null, 4));
      console.log(`data has been saved in ${jsonFile}.`);
  } catch (err) {
      console.error(err);
  }
  
  }
  
  function load(file) {
    if (file == 'default'){
    try {
      const json_data = fs.readFileSync('database.json', 'utf-8');
      tasksObj = JSON.parse(json_data.toString());
      console.log('task list loaded')
      jsonFile = 'database.json';
    } catch (err) {
      console.log(err);
    }
  }
  else {
    try {
      const json_data = fs.readFileSync(`${file}`, 'utf-8');
      tasksObj = JSON.parse(json_data.toString());
      console.log('task list loaded')
      jsonFile = `${file}`;
    } catch (err) {
      console.log(err);
    }
  }
  }

  // The following line starts the application
  startApp("Anass Haydar")
  