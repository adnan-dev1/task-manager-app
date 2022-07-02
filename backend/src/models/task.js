const Joi = require('joi');
const mongoose = require('mongoose');

const Task = mongoose.model('Task', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    desc: {
        type: String,
        maxlength: 50
    },
    isDone: {
        type: Boolean,
        default: false
    }
}));

function validateTask(task) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required().messages({
            'string.base': `The task name should be 'text'`,
            'string.empty': `The task name cannot be an empty field`,
            'string.min': `The task name should be at least 3 characters`,
            'string.max': `The task name should be at most 20 characters`,
            'any.required': `The task name is a required field`
        }),
        desc: Joi.string().max(50).messages({
            'string.base': `The task description should be 'text'`,
            'string.empty': `The task description cannot be an empty field`,
            'string.max': `The task description should be at most 50 characters`,
            'any.required': `The task description is a required field`
        }),
        isDone: Joi.boolean()
    });

    return schema.validate(task);
};

exports.Task = Task;
exports.validate = validateTask;