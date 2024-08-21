const {ObjectId}= require('mongoose').Types;
const User=require('../models/user.js');

module.exports = {

    async getUsers(req,res){
        try{
            const users = await User.find().select('-__v');
            return res.json(users);
        }catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    } 
}