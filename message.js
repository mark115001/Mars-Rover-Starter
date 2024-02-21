class Message {
   constructor(name, commands = []) {   //commands = []
      this.name = name
      if (!name) {
         throw Error('Name required.');
       }
        this.commands = commands
   }
}

module.exports = Message;