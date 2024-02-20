const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function () {
  
  let commands = [

    // new Command('MOVE', 4321),
    // new Command('STATUS_CHECK'),
    // new Command('MODE_CHANGE', 'LOW_POWER'),
    // new Command('MOVE', 3579),
    // new Command('STATUS_CHECK')
  
  
    // new Command('MODE_CHANGE', 'LOW_POWER'),
    // new Command('MOVE', 3579),
    // new Command('STATUS_CHECK')
  
    
    // new Command('MODE_CHANGE', 'LOW_POWER'), new Command("STATUS_CHECK")
    // new Command("STATUS_CHECK")
    // new Command("MOVE", 3579)
    // new Command("MOVE", 3579), new Command("STATUS_CHECK")
    // new Command("STATUS_CHECK")
    // new Command("MODE_CHANGE", "LOW_POWER")
    // new Command("MODE_CHANGE", "LOW_POWER"), (new Command("MOVE",4321))
    // new Command("STATUS_CHECK"),
    // [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    // new Command('STATUS_CHECK'), new Command("MODE_CHANGE", "LOW_POWER"), new Command('MOVE', 4931), new Command('STATUS_CHECK')

    // let rover = new Rover(98382);
    
  ];
  // // let message = new Message("STATUS_CHECK_TEST", commands);
  // let roverTest = rover.receiveMessage(message);
  let rover = new Rover(100)
  // message = new Message("Graded Assignment 3-Mars-Rover-Starter", commands);
  message = new Message("TA power", commands);
  let response = rover.receiveMessage(message)
  // let response = rover.receiveMessage(message)
  
  // 7 ------- WORKS WITH "STATUS_CHECK"
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let defaultValue = new Rover(100)
    expect(defaultValue.generatorWatts).toEqual(110)
    expect(defaultValue.position).toEqual(100)
    expect(defaultValue.mode).toBe('NORMAL')
  });
  
// 8 ------- WORKS WITH ANY RETURN FILE FROM ANY COMMAND
  it("response returned by receiveMessage contains the name of the message", function () {
      // expect(message.name).toEqual("TA power")
      expect(response[0].message).toEqual("TA power")
  });

// 9 -------
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    expect(response).toHaveLength(6)
  });

// 10 ------- WORKS WITH "MODE", "MOVE", "STATUS_CHECK"
    it("responds correctly to the status check command", function () {

        expect(response[0].message).toEqual('TA power')
        // expect(message.name).toEqual("TA power")
        expect(response[1].completed).toBeTruthy
        // expect(response[2][0].roverStatus.position).toBe(4321)
        // expect(response[3].completed).toBeTruthy
        // expect(response[4].completed).toBeFalsy
        // expect(response[5][0].roverStatus.position).toEqual(4321)
        // expect(response[5][0].roverStatus.mode).toEqual("LOW_POWER")
        // expect(response[5][0].roverStatus.generatorWatts).toEqual(110)
      });

//11 ------- WORKING WITH MODE TO LOW_POWER AND STATUS_CHECK
  it("responds correctly to the mode change command", function () {
    expect(response[3].completed).toBeTruthy
    expect(response[5][0].roverStatus.mode).toEqual("LOW_POWER")
});

// 12 ------- WORKING WITH MODE CHANGE TO LOW POWER AND A FALSE MOVE
    it("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
      expect(response[4].completed).toBeFalsy
});
  
// 13 -------   WORKING---STATUS CHECK, LOW POWER, STATUS CHECK
  it("responds with the position for the move command--MOVE command will update the rover's position with the position value in the command", function () {  
      expect(response[1].completed).toBeTruthy
      expect(response[2][0].roverStatus.position).toEqual(4321)
    });
});
