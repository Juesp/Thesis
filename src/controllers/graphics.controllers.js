const graphicsCtrl = {};

const Exams = require('../models/Exams')
const User = require('../models/User')
const passport = require('passport');
const mongoose = require('mongoose')

graphicsCtrl.generalPromPerMonth = async (req, res)=>{     
    const date = new Date();
    const currentYear = String(date.getFullYear());
    //console.log(currentYear)
    const Enero = await Exams.find({$and: [{date_of_exam: {$gte: (currentYear + '-01-01')}}, {date_of_exam: {$lte: (currentYear + '-01-31')}}, {result_of_exam : {$ne : null}}]});
    const Febrero = await Exams.find({$and: [{date_of_exam: {$gte: (currentYear + '-02-01')}}, {date_of_exam: {$lte: (currentYear + '-02-29')}}, {result_of_exam : {$ne : null}}]});
    const Marzo = await Exams.find({$and: [{date_of_exam: {$gte: (currentYear + '-03-01')}}, {date_of_exam: {$lte: (currentYear + '-03-31')}}, {result_of_exam : {$ne : null}}]});
    const Abril = await Exams.find({$and: [{date_of_exam: {$gte: (currentYear + '-04-01')}}, {date_of_exam: {$lte: (currentYear + '-04-30')}}, {result_of_exam : {$ne : null}}]});
    const Mayo = await Exams.find({$and: [{date_of_exam: {$gte: (currentYear + '-05-01')}}, {date_of_exam: {$lte: (currentYear + '-05-31')}}, {result_of_exam : {$ne : null}}]});
    const Junio = await Exams.find({$and: [{date_of_exam: {$gte: (currentYear + '-06-01')}}, {date_of_exam: {$lte: (currentYear + '-06-30')}}, {result_of_exam : {$ne : null}}]});
    const Julio = await Exams.find({$and: [{date_of_exam: {$gte: (currentYear + '-07-01')}}, {date_of_exam: {$lte: (currentYear + '-07-30')}}, {result_of_exam : {$ne : null}}]});
    const Agosto = await Exams.find({$and: [{date_of_exam: {$gte: (currentYear + '-08-01')}}, {date_of_exam: {$lte: (currentYear + '-08-31')}}, {result_of_exam : {$ne : null}}]});
    const Septiembre = await Exams.find({$and: [{date_of_exam: {$gte: (currentYear + '-09-01')}}, {date_of_exam: {$lte: (currentYear + '-09-30')}}, {result_of_exam : {$ne : null}}]});
    const Octubre = await Exams.find({$and: [{date_of_exam: {$gte: (currentYear + '-10-01')}}, {date_of_exam: {$lte: (currentYear + '-10-31')}}, {result_of_exam : {$ne : null}}]});
    const Noviembre = await Exams.find({$and: [{date_of_exam: {$gte: (currentYear + '-11-01')}}, {date_of_exam: {$lte: (currentYear + '-11-30')}}, {result_of_exam : {$ne : null}}]});
    const Diciembre = await Exams.find({$and: [{date_of_exam: {$gte: (currentYear + '-12-01')}}, {date_of_exam: {$lte: (currentYear + '-12-31')}}, {result_of_exam : {$ne : null}}]});
    //Datos para Enero
    var sumEnero = 0;
    const largoEnero = Enero.length;
    for (i=0; i<Enero.length; i++){
        sumEnero+= parseFloat(Enero[i].result_of_exam);
    }
    const promEnero = sumEnero/largoEnero;
    
    //Datos para febrero
    var sumFebrero = 0;
    const largoFebrero = Febrero.length;
    for (i=0; i<Febrero.length; i++){
        sumFebrero+= parseFloat(Febrero[i].result_of_exam);
    }
    const promFebrero = sumFebrero/largoFebrero;
    
    //Datos para marzo
    var sumMarzo = 0;
    const largoMarzo = Marzo.length;
    for (i=0; i<Marzo.length; i++){
        sumMarzo+= parseFloat(Marzo[i].result_of_exam);
    }
    const promMarzo = sumMarzo/largoMarzo;
    
    //Datos para abril
    var sumAbril = 0;
    const largoAbril = Abril.length;
    for (i=0; i<Abril.length; i++){
        sumAbril+= parseFloat(Abril[i].result_of_exam);
    }
    const promAbril = sumAbril/largoAbril;

    //Datos para mayo
    var sumMayo = 0;
    const largoMayo = Mayo.length;
    for (i=0; i<Mayo.length; i++){
        sumMayo+= parseFloat(Mayo[i].result_of_exam);
    }
    const promMayo = sumMayo/largoMayo;

    //Datos para junio
    var sumJunio = 0;
    const largoJunio = Junio.length;
    for (i=0; i<Junio.length; i++){
        sumJunio+= parseFloat(Junio[i].result_of_exam);
    }
    const promJunio = sumJunio/largoJunio;

    //Datos para julio
    var sumJulio = 0;
    const largoJulio = Julio.length;
    for (i=0; i<Julio.length; i++){
        sumJulio+= parseFloat(Julio[i].result_of_exam);
    }
    const promJulio = sumJulio/largoJulio;

    //Datos para agosto
    var sumAgosto = 0;
    const largoAgosto = Agosto.length;
    for (i=0; i<Agosto.length; i++){
        sumAgosto+= parseFloat(Agosto[i].result_of_exam);
    }
    const promAgosto = sumAgosto/largoAgosto;

    //Datos para Septiembre
    var sumSeptiembre = 0;
    const largoSeptiembre = Septiembre.length;
    for (i=0; i<Septiembre.length; i++){
        sumSeptiembre+= parseFloat(Septiembre[i].result_of_exam);
    }
    const promSeptiembre = sumSeptiembre/largoSeptiembre;

    //Datos para Octubre
    var sumOctubre = 0;
    const largoOctubre = Octubre.length;
    for (i=0; i<Octubre.length; i++){
        sumOctubre+= parseFloat(Octubre[i].result_of_exam);
    }
    const promOctubre = sumOctubre/largoOctubre;

    //Datos para Noviembre
    var sumNoviembre = 0;
    const largoNoviembre = Noviembre.length;
    for (i=0; i<Noviembre.length; i++){
        sumNoviembre+= parseFloat(Noviembre[i].result_of_exam);
    }
    const promNoviembre = sumNoviembre/largoNoviembre;

    //Datos para Diciembre
    var sumDiciembre = 0;
    const largoDiciembre = Diciembre.length;
    for (i=0; i<Diciembre.length; i++){
        sumDiciembre+= parseFloat(Diciembre[i].result_of_exam);
    }
    const promDiciembre = sumDiciembre/largoDiciembre;

    //console.log(fechas)
    var Admin = Empleado = Medico = Paciente = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Paciente'){
        Paciente = true;        
    }
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('graphics/generalPromPerMonth', {promEnero, promFebrero, promMarzo, promAbril, promMayo, promJunio, promJulio, promAgosto, promSeptiembre, promOctubre, promNoviembre, promDiciembre, Admin, Empleado, Paciente, Medico, name, lastname, sec_lastname, rol});
};

graphicsCtrl.individualGraph = async (req, res)=>{
    var Admin = Empleado = null;
    const arrayDatos = await Exams.find({$and: [{user : req.user.id}, {result_of_exam : {$ne : null}}]}).sort({date_of_exam: 1});
    console.log(arrayDatos)
    var resultados = [];
    const fechas = [];
    for (i=0; i<arrayDatos.length; i++){
        resultados.push(parseFloat(arrayDatos[i].result_of_exam));
        fechas.push(Date.parse(arrayDatos[i].date_of_exam));
    }
    console.log(resultados)
    console.log(fechas)
    //console.log(datos)
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Paciente'){
        Paciente = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('graphics/individualGraph', {resultados, fechas, Admin, Empleado, Paciente, name, lastname, sec_lastname, rol});
};

graphicsCtrl.generalPromPerGender = async (req, res)=>{     
    const date = new Date();
    const currentYear = String(date.getFullYear());
    //console.log(currentYear)
    const Male = await Exams.find({$and: [{genderRel: "Masculino"}, {result_of_exam : {$ne : null}}]});
    const Female = await Exams.find({$and: [{genderRel: "Femenino"}, {result_of_exam : {$ne : null}}]});
    const Other = await Exams.find({$and: [{genderRel: "Otro"}, {result_of_exam : {$ne : null}}]});
    //console.log(Male)
    //console.log("-----------------")
    //console.log(Female)
    //Datos para masculinos
    var sumMale = 0;
    const largoMale = Male.length;
    for (i=0; i<Male.length; i++){
        sumMale+= parseFloat(Male[i].result_of_exam);
    }
    const promMale = sumMale/largoMale;
    
    //Datos para femenino
    var sumFemale = 0;
    const largoFemale = Female.length;
    for (i=0; i<Female.length; i++){
        sumFemale+= parseFloat(Female[i].result_of_exam);
    }
    const promFemale = sumFemale/largoFemale;

    //Datos para Other
    var sumOther = 0;
    const largoOther = Other.length;
    for (i=0; i<Other.length; i++){
        sumOther+= parseFloat(Other[i].result_of_exam);
    }
    const promOther = sumOther/largoOther;
    
    //console.log(fechas)
    var Admin = Empleado = Medico = Paciente = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Paciente'){
        Paciente = true;        
    }
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('graphics/generalPromPerGender', {promMale, promFemale, promOther, Admin, Empleado, Paciente, Medico, name, lastname, sec_lastname, rol});
};

graphicsCtrl.generalPromPerYear = async (req, res)=>{     
    const date = new Date();
    const currentYear20 = String(date.getFullYear() - 20);
    const currentYear40 = String(date.getFullYear() - 40);
    const currentYear60 = String(date.getFullYear() - 60);
    const currentYear80 = String(date.getFullYear() - 80);
    console.log(currentYear20)
    const Until20 = await Exams.find({$and: [{birthayRel: {$gte: (currentYear20 + '-01-01')}}, {result_of_exam : {$ne : null}}]});
    const Until40 = await Exams.find({$and: [{birthayRel: {$lte: (currentYear20 + '-01-01')}}, {birthayRel: {$gte: (currentYear40 + '-01-01')}}, {result_of_exam : {$ne : null}}]});
    const Until60 = await Exams.find({$and: [{birthayRel: {$lte: (currentYear40 + '-01-01')}}, {birthayRel: {$gte: (currentYear60 + '-01-01')}}, {result_of_exam : {$ne : null}}]});
    const Until80 = await Exams.find({$and: [{birthayRel: {$lte: (currentYear60 + '-01-01')}}, {birthayRel: {$gte: (currentYear80 + '-01-01')}}, {result_of_exam : {$ne : null}}]});
    const Until90 = await Exams.find({$and: [{birthayRel: {$lte: (currentYear80 + '-01-01')}}, {result_of_exam : {$ne : null}}]});
    //console.log(Until20)
    //console.log("-----------------")
    //console.log(Until40)
    //console.log("-----------------")
    //console.log(Until60)
    //console.log("-----------------")
    //console.log(Until80)
    //Datos para hasta 20
    var sumUntil20 = 0;
    const largoUntil20 = Until20.length;
    for (i=0; i<Until20.length; i++){
        sumUntil20+= parseFloat(Until20[i].result_of_exam);
    }
    const promUntil20 = sumUntil20/largoUntil20;
    
    //Datos para de 20 hasta 40
    var sumUntil40 = 0;
    const largoUntil40 = Until40.length;
    for (i=0; i<Until40.length; i++){
        sumUntil40+= parseFloat(Until40[i].result_of_exam);
    }
    const promUntil40 = sumUntil40/largoUntil40;

    //Datos para de 40 a 60
    var sumUntil60 = 0;
    const largoUntil60 = Until60.length;
    for (i=0; i<Until60.length; i++){
        sumUntil60+= parseFloat(Until60[i].result_of_exam);
    }
    const promUntil60 = sumUntil60/largoUntil60;

    //Datos para de 60 a 80
    var sumUntil80 = 0;
    const largoUntil80 = Until80.length;
    for (i=0; i<Until80.length; i++){
        sumUntil80+= parseFloat(Until80[i].result_of_exam);
    }
    const promUntil80 = sumUntil80/largoUntil80;

    //Datos para de  80 en adelante
    var sumUntil90 = 0;
    const largoUntil90 = Until90.length;
    for (i=0; i<Until90.length; i++){
        sumUntil90+= parseFloat(Until90[i].result_of_exam);
    }
    const promUntil90 = sumUntil90/largoUntil90;
    
    //console.log(fechas)
    var Admin = Empleado = Medico = Paciente = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Paciente'){
        Paciente = true;        
    }
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('graphics/generalPromPerYear', {promUntil20, promUntil40, promUntil60, promUntil80, promUntil90, Admin, Empleado, Paciente, Medico, name, lastname, sec_lastname, rol});
};

module.exports = graphicsCtrl;