const User = require('../../models/user');

module.exports = {
    users : ()=>{
        return User.find();
      },
    createUser : (args) =>{
      return User.findOne({email:args.userInput.email}).then(user =>{                  
          if(user){                     
              //throw new Error('User already exists');
              //console.log(user);
              return user;
          }else{
            const user = new User({
              name : args.userInput.name,
              email : args.userInput.email                        
          });
          return user.save();
          }
          //return args.userInput.name;
      })
      .then(result => {   
        //console.log(result);                
              return {...result._doc, _id: result._doc.id}                   
      })
      .catch(err => {
          throw err;
      });                

  }
}