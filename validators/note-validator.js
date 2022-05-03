const yup = require('yup');

const noteValidator = yup.object().shape({
    content: yup.string().trim().min(1).max(3)  // emoticones ou '+' ou '-' comment l ecrire ? 
});

module.exports = {
    noteValidator
};