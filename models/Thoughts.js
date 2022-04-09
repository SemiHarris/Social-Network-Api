const {Schema, model} = require('mongoose');

const ThoughtsSchema = new Schema({

    thoughtText: {
        type: String
    },

    createAt: {
        type: Date,
        default: Date.now
    },

    username: {
        type: String
    },

    reactions: []
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts