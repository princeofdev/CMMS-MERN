const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const WorkOrderCompletionSchema = new Schema({
    strCompletionNote: {
        type: String
    },
    strProblem: {
        type: String
    },
    strRootCause: {
        type: String
    },
    strSolution: {
        type: String
    },
    intWorkOrderID:{
        type: Number
    }
}); 
WorkOrderCompletionSchema.plugin(autoIncrement.plugin, 'WorkOrderCompletion');
WorkOrderCompletionSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
module.exports = mongoose.model('WorkOrderCompletion', WorkOrderCompletionSchema)