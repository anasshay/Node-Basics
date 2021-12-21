
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
  let cmdList = ['quit','exit', 'hello', 'help', 'add', 'remove'];
  
  function onDataReceived(text) {
    if (text === cmdList[0]+'\n' || text === cmdList[1] + '\n') {
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
  
    else if (text.trim() === "p") {
      printlist();
    } 
  
    else if (text.slice(0, 6) === cmdList[5]) {
      if (text.slice(6).trim() === "") {
        remove("end");
      } else {
        let rm_num = parseInt(text.slice(6).trim());
        remove(rm_num);
      }
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
    console.log('Enter \'help\' for all commands.\nEnter \'quit\' or \'exit\' to quit.\nEnter \'hello\' for greeting or \'hello X\' where X is your name.\nEnter \'add x\' for adding a task to the list.\nEnter \'remove\' or \'remove (task number)\' to remove a task.');
  }
  
  
  let tasks_list = []
  let tasks_obj = {}
  var stats = '[ ]';
  // ✓
  
  function add(value) {
      tasks_list.push(value);
      updateObj(tasks_obj,tasks_list);
  }
  
  function remove(value) {
    // console.log(value);
    if (value == 'end') {
      tasks_list.pop();
    }
    else if (value > 0){
      tasks_list.splice(value-1,1);
    }
  updateObj(tasks_obj,tasks_list);
  }
  
  function printlist() { //temporary
    // console.log(tasks_obj)
    for (let i = 0; i < tasks_list.length; i++) {
      console.log(Object.keys(tasks_obj)[i] + ' - ' + stats + ' ' + tasks_obj[i+1]) 
    }
  }
  
  function updateObj(obj,list) {
    for (let val = 1; val <= list.length; val++) {
      obj[val] = list[val-1];
    }
  }
  
  // The following line starts the application
  startApp("Anass Haydar")
  