const { ObjectId } = require('mongoose').Types;
const Thought = require('../models/thought');
const User = require('../models/user.js')
module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().select('-__v');
            return res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v').populate('reactions');
            if (!thought) {
                return res.status(404).json({ message: 'thought with that id does not exist in database' });

            }            
            return res.status(200).json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }

    },
    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate({username:req.body.username},{$addToSet:{thoughts:newThought}});
            if(!user){
                return res.status(404).json({message: "user not found"});
            }
            res.status(200).json(newThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req,res){
        try{
        const thought= await Thought.findOneAndUpdate({_id:req.params.thoughtId},{$set:req.body},{new:true});
        if(!thought){
            return res.status(404).json({message:'thought not found'});
        }
        return res.status(200).json(thought);
    
       } catch(err){
        return res.status(500).json(err);
       }
    },
    async deleteThought(req,res){
        try{
            
            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});
            if(!thought){
                return res.status(404).json({message:"there is no thought to destroy"});
            }
            const removeThoughtFromUser= await User.findOneAndUpdate({username: thought.username},{$pull:{thoughts:req.params.thoughtId}});
            if(!removeThoughtFromUser){
                return res.status(404).json({message:"no association between user and thought does not exist"});
            }
            res.status(200).json(thought);
        }catch(err){
            return res.status(500).json(err);
        }
    },
    async addReaction(req,res){
        try{
            const thought = await Thought.findOneAndUpdate(
                {_id:req.params.thoughtId},
                {$addToSet:{reactions: req.body}},
                {runValidators: true,new:true});

            if(!thought){
                return res.status(404).json({message: 'this thought does not exist'});
            }
            res.status(200).json(thought);

        } catch(err){
            return res.status(500).json(err);
    }

},
async removeReaction(req,res){
    try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId} } },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res
            .status(404)
            .json({ message: 'No thought found with that ID :(' });
        }
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
}
