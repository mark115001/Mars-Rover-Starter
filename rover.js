const Message = require("./message");
const Command = require("./command");

class Rover {
  constructor(position) {
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  } //end constructor

  // message methodW follows
  receiveMessage(message) {

    // return currentStatus //For Testing
    
    // let currentStatus = {"message": message.name, "results":[]}
    let results = [{"message": message.name},]

  
    // return message.name //For Testing

 
    for (let i = 0; i < message.commands.length; i++) {
      if (message.commands[i].commandType === "MOVE") {
        if (this.mode === "LOW_POWER") {
          results.push({"completed": false})
        } else {
          this.position = message.commands[i].value;
          results.push({"completed": true})
        } //end if power check
      } //end MOVE message

      if (message.commands[i].commandType === "MODE_CHANGE") {
        if (this.mode !== message.commands[i].value) {
          this.mode = message.commands[i].value;
          results.push({"completed": true})
        } else {
          results.push({"completed": false})
        }
      } //end MODE message

      if (message.commands[i].commandType === "STATUS_CHECK") {

        results.push([{"roverStatus": {"mode": this.mode, "generatorWatts": this.generatorWatts, "position": this.position}}])
        // results.push([{"roverStatus": {"mode": this.mode, "generatorWatts": this.generatorWatts, "position": this.position}}])
        // currentStatus.results.push([{"completed": true, "roverStatus": {"mode": this.mode, "generatorWatts": this.generatorWatts, "position": this.position}}])
      }
    } // end For Loop
    // return currentStatus
    return results
    // return this.receiveMessage.results
  } // end method receiveMessage
} //end Class Rover

// let commands = [

    // new Command('MOVE', 4321),
    // new Command('STATUS_CHECK'),
    // new Command('MODE_CHANGE', 'LOW_POWER'),
    // new Command('MOVE', 3579),
    // new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')

  // new Command("STATUS_CHECK"),
  // new Command("MOVE", 42688721), new Command("STATUS_CHECK")
  // new Command("MOVE", 42688721)
  // new Command("MODE_CHANGE", "LOW_POWER"), (new Command("MOVE", 4321))
  // new Command("STATUS_CHECK"),
// ];

// let message = new Message("STATUS_CHECK_TEST", commands);

// let message = new Message("DEBUG TESTING", commands);
// let rover = new Rover(100);
// let msgResponse = rover.receiveMessage(message);

// console.log("message:",msgResponse.message,"results:", msgResponse.results);
// console.log(`message: '${msgResponse.message}',`)
// console.log(`results: ['${msgResponse.results.completed[0]}'],`);
// console.log(`${msgResponse.results[1]}`)
module.exports = Rover;
