const examsCtrl = {};

const Exams = require('../models/Exams')
const User = require('../models/User')
const passport = require('passport');

examsCtrl.seeAllUsersExam = async (req, res)=>{       
    const pList = await User.find();    
    var Medico = null;
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('exams/seeAllUsersExam', {pList, Medico, name, lastname, sec_lastname, rol});
};

//Crea un examen de àcido valproico.
examsCtrl.seeUsersForm = (req, res)=>{
    var Medico = null;
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('exams/seeUsersForm', {Medico, name, lastname, sec_lastname, rol});
};

examsCtrl.createExamForm = async (req, res)=>{
    //const user1 = await User.findById(req.params.id);
    //const exam = String(user1._id);
    var Empleado = null;
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('exams/createExamForm', {hours, Empleado, name, lastname, sec_lastname, rol});
};

examsCtrl.obtainDate = async (req, res)=>{
    const { date } = req.body;
    console.log(date)
    const date2 = date.replace('/', '-');
    const date3 = date2.replace('/', '-');
    console.log(date3)

    /* const info = await User.findById(req.params.id); */

    const info = await Exams.findById(req.params.id);
    const exam = await Exams.find({$and: [{date_of_exam: date3}, {state_of_exam: "activo"}]});
    console.log(exam)
    const hours = [];
    for (i=0; i<exam.length; i++){
        hours.push(String(exam[i].hour_of_exam));
    }
    console.log(hours)
    var Empleado = null;
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('exams/createExamForm', {date3, hours, info, Empleado, name, lastname, sec_lastname, rol});
};

examsCtrl.createExamHour = async (req, res)=>{
    /* const { identification } = req.body;
    const pList = await User.find({identification}); */
    var  Empleado = null;
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;

    const errors = []; 

    const { hour_of_exam, date_of_exam } = req.body;

    if(date_of_exam === '') {
        errors.push({ text: 'Debe ingresar la fecha de examen.'})
    }
    if(hour_of_exam === '--- Seleccione una hora ---') {
        errors.push({ text: 'Debe ingresar la hora de examen.'})
    }

    if (errors.length > 0) {
        req.flash('error_msg', 'Debe agregar todos los datos del examen.');
        res.redirect('/exams/seeAllOrderExams')
    }else {
        await Exams.findByIdAndUpdate(req.params.id, {hour_of_exam, date_of_exam})  
                const admin = true
                req.flash('success_msg', 'Examen agendado satisfactoriamente.');
                res.redirect('/users/started')
            }
};

examsCtrl.seeUser = async (req, res)=>{
    const { identification } = req.body;
    console.log({identification})
    const pList = await User.find({identification});
    var Medico = null;
    if(req.user.role == 'Medico'){
        Medico = true;       
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('exams/seeAllUsersExam', {pList, Medico, name, lastname, sec_lastname, rol});
};

examsCtrl.createExam = async (req, res)=>{
    //console.log(req.body)    //revisar por si hay error    
    var Medico = null;
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    const name_of_doctor = req.user.name;
    const lastname_of_doctor = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;

    const errors = []; 

    const {state_of_exam, user, observation_of_exam, identification_typeRel, identificationRel, nameRel, lastnameRel, sec_lastnameRel, genderRel, birthayRel, emailRel} = req.body;

    /* if(date_of_exam === '') {
        errors.push({ text: 'Debe ingresar la fecha de examen.'})
    } */

    if (errors.length > 0) {
        res.render('exams/seeUsersForm', { errors, Medico, name_of_doctor, lastname_of_doctor, sec_lastname, rol});
    }else {
        const data = {state_of_exam, user, observation_of_exam, name_of_doctor, lastname_of_doctor, identification_typeRel, identificationRel, nameRel, lastnameRel, sec_lastnameRel, genderRel, birthayRel, emailRel };
        const newExam = new Exams(data);
        console.log(newExam)
        await newExam.save();
        req.flash('success_msg', 'Examen ordenado satisfactoriamente.');
        res.redirect('/exams/seeUsersForm');
    }     

    /* const data = { date_of_exam, hour_of_exam};
    const newExam = new Exams(data);
    console.log(newExam)
    await newExam.save();
    req.flash('success_msg', 'Examen ordenado satisfactoriamente.');
    res.redirect('/exams/seeUsersForm'); */
};

examsCtrl.seeAllUsersResult = async (req, res)=>{       
    const pList = await User.find();    
    var Admin = Empleado = Medico = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('exams/seeAllUsersResult', {pList, Admin, Empleado, Medico, name, lastname, sec_lastname, rol});
};

examsCtrl.addResultForm = async (req, res)=>{
    const exam1 = await Exams.findById(req.params.id);
    var Empleado = null;
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('exams/addResultForm', {exam1, Empleado, name, lastname, sec_lastname, rol});
};

examsCtrl.addResult = async (req, res)=>{
    /* const { identification } = req.body;
    const pList = await User.find({identification}); */
    const exam1 = await Exams.findById(req.params.id);
    var Empleado = null;
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;

    const errors = []; 

    const { result_of_exam, description_of_exam} = req.body;

    if(result_of_exam === '') {
        errors.push({ text: 'Debe ingresar el resultado del examen.'})
    }
    if(description_of_exam === '') {
        errors.push({ text: 'Debe ingresar una descripción para el examen.' });
    }

    if (errors.length > 0) {
        res.render('exams/addResultForm', {exam1, errors, Empleado, name, lastname, sec_lastname, rol});
    }else {
        await Exams.findByIdAndUpdate(req.params.id, {result_of_exam, description_of_exam})  
                const admin = true
                req.flash('success_msg', 'Resultado agregado satisfactoriamente.');
                res.redirect('/users/started')
    }
};

//Ver todos los examenes pendientes
examsCtrl.seeAllExams = async (req, res)=>{       
    const date = new Date();
    const currentDate = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' +String(date.getDate()).padStart(2, '0');
    const pList = await Exams.find({$and: [{date_of_exam: {$gte: currentDate}}, {hour_of_exam : {$ne : null}}, {state_of_exam: "activo"}]}).sort({date_of_exam: 1});
    //const pList = await Exams.find();
    var Admin = Empleado = Medico = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('exams/seeAllExams', {pList, Admin, Empleado, Medico, name, lastname, sec_lastname, rol});
};

examsCtrl.seeAllOrderExams = async (req, res)=>{       
    
    const fullExam = await Exams.aggregate([{$match: {state_of_exam: "activo"}},{ $group: {_id: "$date_of_exam", count: { $sum: 1} } }, { $match: {count: {"$gte": 6}}}]);
    console.log(fullExam)
    const fechasFull = [];
    const fechasCorrect = [];
    for (i=0; i<fullExam.length; i++){
        fechasFull.push(Date.parse(fullExam[i]._id));
    }
    for (i=0; i<fechasFull.length; i++){
        fechasCorrect.push(new Date(fechasFull[i]).toLocaleDateString());
    }
    console.log(fechasFull)
    console.log(fechasCorrect)
    const pList = await Exams.find({$and: [{date_of_exam : null}, {hour_of_exam : null}, {state_of_exam: "activo"}]}).sort({date_of_exam: 1});
    //const pList = await Exams.find();
    var Admin = Empleado = Medico = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('exams/seeAllOrderExams', {fechasCorrect, pList, Admin, Empleado, Medico, name, lastname, sec_lastname, rol});
};

examsCtrl.seeAllCancelExams = async (req, res)=>{       
    const pList = await Exams.find({state_of_exam:  "cancelado"}).sort({date_of_exam: 1});
    //const pList = await Exams.find();
    var Admin = Empleado = Medico = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('exams/seeAllCancelExams', {pList, Admin, Empleado, Medico, name, lastname, sec_lastname, rol});
};

//Ver todos los examenes pendientes
examsCtrl.addResultExam = async (req, res)=>{       
    const date = new Date();
    const currentDate = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' +String(date.getDate()).padStart(2, '0');
    const pList = await Exams.find({$and: [{result_of_exam : null}, {value_of_exam: null}, {date_of_exam: {$lt: currentDate}}, {state_of_exam: "activo"}]}).sort({date_of_exam: -1});
    //const pList = await Exams.find();
    var Admin = Empleado = Medico = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('exams/addResultExam', {pList, Admin, Empleado, Medico, name, lastname, sec_lastname, rol});
};

//Ver todos los examenes a los que los pacientes no asistieron
examsCtrl.addResultExamValue = async (req, res)=>{       
    const pList = await Exams.find({$and: [{value_of_exam: "notAssist"}]}).sort({date_of_exam: -1});
    //const pList = await Exams.find();
    var Admin = Empleado = Medico = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('exams/addResultExamValue', {pList, Admin, Empleado, Medico, name, lastname, sec_lastname, rol});
};

//Ver todos los examenes a los que los pacientes si asistieron
examsCtrl.addResultExamValueYes = async (req, res)=>{       
    //const pList = await Exams.find({$and: [{result_of_exam :  null},{value_of_exam: "yesAssist"}]}).sort({date_of_exam: -1});
    const date = new Date();
    const currentDate = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' +String(date.getDate()).padStart(2, '0');
    const pList = await Exams.find({$and: [{$or: [{value_of_exam: "yesAssist"}, {value_of_exam: null}]},{result_of_exam : null}, {date_of_exam: {$lt: currentDate}}, {state_of_exam: "activo"}]}).sort({date_of_exam: -1});
    var Admin = Empleado = Medico = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('exams/addResultExamValueYes', {pList, Admin, Empleado, Medico, name, lastname, sec_lastname, rol});
};

examsCtrl.resultExam = async (req, res)=>{       
    const date = new Date();
    const currentDate = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' +String(date.getDate()).padStart(2, '0');
    const pList = await Exams.find({$and: [{result_of_exam : {$ne : null}}, {date_of_exam: {$lt: currentDate}}]}).sort({date_of_exam: -1});
    //const pList = await Exams.find();
    var Admin = Empleado = Medico = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('exams/resultExam', {pList, Admin, Empleado, Medico, name, lastname, sec_lastname, rol});
};

//Ver todos los examenes pendientes para el rol de paciente
examsCtrl.seeAllExamsByUser = async (req, res)=>{       
    const exam1 = await User.findById(req.params.id);
    const date = new Date();
    const currentDate = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' +String(date.getDate()).padStart(2, '0');
    console.log(currentDate)
    //const pList = await Exams.find({date_of_exam: {$gte: currentDate}});
    const pList = await Exams.find({$and: [{user : req.user.id}, {date_of_exam: {$gte: currentDate}}, {hour_of_exam : {$ne : null}}, {state_of_exam: "activo"}]}).sort({date_of_exam: 1});
    //const pList = await Exams.find({user : req.user.id});
    var Admin = Empleado = Medico = Paciente = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    if(req.user.role == 'Paciente'){
        Paciente = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('exams/seeAllExamsByUser', {pList, Admin, Empleado, Medico, Paciente, name, lastname, sec_lastname, rol});
};

examsCtrl.seeAllCancelExamsByUser = async (req, res)=>{       
    const exam1 = await User.findById(req.params.id);
    //const pList = await Exams.find({date_of_exam: {$gte: currentDate}});
    const pList = await Exams.find({$and: [{user : req.user.id}, {state_of_exam: "cancelado"}]}).sort({date_of_exam: 1});
    //const pList = await Exams.find({user : req.user.id});
    var Admin = Empleado = Medico = Paciente = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    if(req.user.role == 'Paciente'){
        Paciente = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('exams/seeAllCancelExamsByUser', {pList, Admin, Empleado, Medico, Paciente, name, lastname, sec_lastname, rol});
};


//Ver todos los examenes pendientes para el rol de paciente
examsCtrl.seeAllResultByUser = async (req, res)=>{       
    const exam1 = await User.findById(req.params.id);
    const date = new Date();
    const currentDate = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' +String(date.getDate()).padStart(2, '0');
    //const pList = await Exams.find({date_of_exam: {$gte: currentDate}});
    const pList = await Exams.find({$and: [{user : req.user.id}, {result_of_exam : {$ne : null}}, {date_of_exam: {$lt: currentDate}}]}).sort({date_of_exam: -1});
    //const pList = await Exams.find({user : req.user.id});
    var Admin = Empleado = Medico = Paciente = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    if(req.user.role == 'Paciente'){
        Paciente = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('exams/seeAllResultByUser', {pList, Admin, Empleado, Medico, Paciente, name, lastname, sec_lastname, rol});
};

examsCtrl.seeAllExamsByUserAdmin = async (req, res) => {
    //console.log('Viendo un usuario') 
    const user1 = await User.findById(req.params.id);
    const exam = String(user1._id);
    //console.log(exam)
    //const date = new Date();
    //const currentDate = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' +String(date.getDate()).padStart(2, '0');
    //const pList = await Exams.find({$and: [{user : exam}, {result_of_exam : null}, {value_of_exam: "yesAssist"}, {date_of_exam: {$lt: currentDate}}, {state_of_exam: "activo"}]}).sort({date_of_exam: -1});
    const date = new Date();
    const currentDate = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' +String(date.getDate()).padStart(2, '0');
    const pList = await Exams.find({$and: [{$or: [{value_of_exam: "yesAssist"}, {value_of_exam: null}]},{user : exam}, {result_of_exam : null}, {date_of_exam: {$lt: currentDate}}, {state_of_exam: "activo"}]}).sort({date_of_exam: -1});
    var Admin = Empleado = Medico = null;
    var Admin = Empleado = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('exams/seeAllExamsByUserAdmin', {pList, Admin, Empleado, Medico, name, lastname, sec_lastname, rol}); 
}

examsCtrl.seeAllOrderExamsByUserAdmin = async (req, res) => {
    //console.log('Viendo un usuario') 
    const user1 = await User.findById(req.params.id);
    const exam = String(user1._id);
    //console.log(exam)
    const fullExam = await Exams.aggregate([{$match: {state_of_exam: "activo"}},{ $group: {_id: "$date_of_exam", count: { $sum: 1} } }, { $match: {count: {"$gte": 6}}}]);
    console.log(fullExam)
    const fechasFull = [];
    const fechasCorrect = [];
    for (i=0; i<fullExam.length; i++){
        fechasFull.push(Date.parse(fullExam[i]._id));
    }
    for (i=0; i<fechasFull.length; i++){
        fechasCorrect.push(new Date(fechasFull[i]).toLocaleDateString());
    }
    console.log(fechasFull)
    console.log(fechasCorrect)
    const pList = await Exams.find({$and: [{user : exam}, {date_of_exam : null}, {hour_of_exam : null}, {state_of_exam: "activo"}]}).sort({date_of_exam: 1});
    var Admin = Empleado = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('exams/seeAllOrderExamsByUserAdmin', {pList, Admin, Empleado, Medico, name, lastname, sec_lastname, rol}); 
}

examsCtrl.seeAllPendingExamsByUserAdmin = async (req, res) => {
    //console.log('Viendo un usuario') 
    const user1 = await User.findById(req.params.id);
    const exam = String(user1._id);
    //console.log(exam)
    const date = new Date();
    const currentDate = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' +String(date.getDate()).padStart(2, '0');
    //const pList = await Exam.find({date_of_exam: {$lt: currentDate}});
    const pList = await Exams.find({$and: [{user : exam}, {date_of_exam: {$gte: currentDate}}, {hour_of_exam : {$ne : null}}, {state_of_exam: "activo"}]}).sort({date_of_exam: 1});
    //console.log(pList)
    //console.log(user1)
    var Admin = Empleado = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('exams/seeAllPendingExamsByUserAdmin', {pList, Admin, Empleado, Medico, name, lastname, sec_lastname, rol}); 
}

examsCtrl.seeAllResultByUserAdmin = async (req, res) => {
    //console.log('Viendo un usuario') seeAllResultByUserAdmin
    const user1 = await User.findById(req.params.id);
    const exam = String(user1._id);
    //console.log(exam)
    const date = new Date();
    const currentDate = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' +String(date.getDate()).padStart(2, '0');
    //const pList = await Exam.find({date_of_exam: {$lt: currentDate}});
    const pList = await Exams.find({$and: [{user : exam}, {result_of_exam : {$ne : null}}, {date_of_exam: {$lt: currentDate}}]}).sort({date_of_exam: -1});
    //console.log(pList)
    //console.log(user1)
    var Admin = Empleado = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('exams/seeAllResultByUserAdmin', {pList, Admin, Empleado, Medico, name, lastname, sec_lastname, rol}); 
}

examsCtrl.seeAllResults = async (req, res)=>{       
    const pList = await Exams.find();    
    var Admin = Empleado = Medico = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('users/seeAllResults', {pList, Admin, Empleado, Medico, name, lastname, sec_lastname, rol});
};

examsCtrl.seeAllResultsPerPatient = async (req, res)=>{       
    const user1 = await Exams.findById(req.params.id);
    const pList = await Exams.find();    
    var Admin = Empleado = Medico = Paciente = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    if(req.user.role == 'Paciente'){
        Paciente = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('users/seeAllResults', {pList, user1, Admin, Empleado, Medico, Paciente, name, lastname, sec_lastname, rol});
};

examsCtrl.editExamForm = async (req, res) => {
    const exam1 = await Exams.findById(req.params.id);
    var Empleado = null;
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('exams/editExamForm', {exam1, Empleado, name, lastname, sec_lastname, rol});      
};
examsCtrl.editExam = async (req, res) => {  
    //console.log(req.body)
    const {date_of_exam, hour_of_exam} = req.body
        
                await Exams.findByIdAndUpdate(req.params.id, {date_of_exam, hour_of_exam})  
                const admin = true
                req.flash('success_msg', 'Examen editado satisfactoriamente.');
                res.redirect('/exams/seeAllExams')
}; 

examsCtrl.cancelExam = async (req, res) => {  
    //console.log(req.body)
    const {state_of_exam} = req.body
        
                await Exams.findByIdAndUpdate(req.params.id, {state_of_exam})  
                const admin = true
                req.flash('success_msg', 'Examen cancelado satisfactoriamente.');
                res.redirect('/users/started')
}; 

examsCtrl.valueExam = async (req, res) => {  
    //console.log(req.body)
    const {value_of_exam} = req.body
        
                await Exams.findByIdAndUpdate(req.params.id, {value_of_exam})  
                const admin = true
                req.flash('success_msg', 'Estado del examen indicado satisfactoriamente.');
                res.redirect('/exams/addResultExamValueYes')
}; 

//////Permite borrar examenes///////
examsCtrl.deleteExam = async (req, res) => {    
    await Exams.findByIdAndDelete(req.params.id);  
    req.flash('success_msg', 'Registro de examen eliminado satisfactoriamente.');  
    res.redirect('/users/started')
};

module.exports = examsCtrl;