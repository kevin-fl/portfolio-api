const yup = require('yup');

const noteValidator = yup.object().shape({
    content: yup.boolean().required()  // emoticones ou '+' ou '-' comment l ecrire ? 
});

module.exports = {
    noteValidator
};