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
    }, 
    async getSingleUser(req,res){
        try{
        const user = await User.findOne({_id: req.params.userId}).select('-__v');
        if(!user){
            return res.status(404).json({message:'user with that id does not exist in database'});

        }
        return res.status(200).json(user);
    } catch (err){
        console.log(err);
        return res.status(500).json(err);
    }

    }
}