const connection = require('../config/connection.js');
const User = require('../models/user.js');
connection.on('error',(err)=> err);
connection.once('open', async ()=>{
    console.log('connected');
    let userCheck = await connection.db.listCollections({name: 'users'}).toArray();
    if(userCheck.length){
        await connection.dropCollection('users');
    }
    const newUser =await User.create({
        username: 'S1nTaax',
        email:"somedude@someemail.com",    
    });
    console.table(newUser);
    console.info('seeding success');
    process.exit(0);
});
