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

module.exports = graphicsCtrl;