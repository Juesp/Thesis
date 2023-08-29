const {Schema, model} = require('mongoose');

const ExamSchema = new Schema ({

    date_of_exam: {
        type: String
    },
    hour_of_exam: {
        type: String
    },
    result_of_exam: {
        type: String
    },
    observation_of_exam: {
        type: String
    },
    description_of_exam: {
        type: String
    },
    state_of_exam: {
        type: String
    },
    value_of_exam: {
        type: String
    },
    //Se relaciona con la tabla users.
    user: {
        type: String,
        required: true
    },
    identification_typeRel: {
        type: String,
        required: true
    },
    identificationRel: {
        type: String,
        required: true
    },
    nameRel: {
        type: String,
        required: true
    },
    lastnameRel: {
        type: String,
        required: true
    },
    sec_lastnameRel: {
        type: String
    },
    emailRel: {
        type: String
    }

    //////////////////////////////////////
    /*last_login_date: {
        type: Date,
        default: Date.now()
    }         */
},{
        timestamps: true
});

module.exports = model('Exams', ExamSchema);