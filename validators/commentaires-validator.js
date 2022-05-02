const yup = require('yup');

const commentairesValidator = yup.object().shape({
    member_Id: yup.string().trim().required().min(1).max(1000),
    project_Id: yup.string().trim().min(1).max(100),
    commentaires_Id: yup.string().trim().required().min(1).max(1000),
    content: yup.string().trim().min(5).max(1000)


});

module.exports = { commentairesValidator };