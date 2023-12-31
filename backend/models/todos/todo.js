/**
 * Created by Syed Afzal
 */
const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', {
    text : {
        type: String,
        trim: true,
        required: true
    },
    user : {
        type: String,
        required: true
    }
});

module.exports = {Todo};
