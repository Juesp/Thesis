const {Router} = require('express')
const router =Router();

const {isAuthenticated, isAdmin, isLab_Staff, isPhysician, isAdminEmple, isAdminMedi, isAdminEmpleMedi} = require('../helpers/auth');

const { valueExam, createExamHour, addResultExamValue, addResultExamValueYes, seeAllOrderExams, seeAllCancelExamsByUser, seeAllCancelExams, cancelExam, obtainDate, seeUsersForm, seeUser, seeAllExams, seeAllExamsByUser, seeAllResultByUser, seeAllExamsByUserAdmin, seeAllResultByUserAdmin, createExam, createExamForm, seeAllResults, 
    seeAllResultsPerPatient, addResultExam, resultExam, seeAllPendingExamsByUserAdmin, editExamForm, editExam, deleteExam, addResult, addResultForm, seeAllUsersExam, seeAllUsersResult } = require('../controllers/exams.controllers');

//Crear examenes nuevos
router.get('/exams/seeUsersForm',  isAuthenticated, isPhysician, seeUsersForm); //filtrar la cedula para el examen
router.post('/exams/seeUser', isAuthenticated, isPhysician, seeUser); //ya
//router.post('/exams/createExamForm', isAuthenticated, isAdminEmple, createExamForm); //ya
router.get('/exams/seeAllUsersExam', isAuthenticated, isPhysician, seeAllUsersExam);//se muestra la lista con la cedula digitada
router.post('/exams/createExam', isAuthenticated, isPhysician, createExam);//se mandan los datos a la bd
router.post('/exams/obtainDate/:id', isAuthenticated, isLab_Staff, obtainDate);
router.get('/exams/createExamForm/:id', isAuthenticated, isLab_Staff, createExamForm);
router.put('/exams/createExamHour/:id', isAuthenticated, isLab_Staff, createExamHour);

//router.post('/exams/addResult', isAuthenticated, isAdminEmpleMedi, addResult);//ya
router.get('/exams/seeAllUsersResult', isAuthenticated, isAdminEmple, seeAllUsersResult);

//Examenes ordenados(todos, solo lo pueden ver el administrador, el medico y el empleado)
router.get('/exams/seeAllOrderExams', isAuthenticated, isAdminEmpleMedi, seeAllOrderExams);//ya

//Examenes programados(todos, solo lo pueden ver el administrador, el medico y el empleado)
router.get('/exams/seeAllExams', isAuthenticated, isAdminEmpleMedi, seeAllExams);//ya

//Dar el estado si fue o no el paciente al examen(solo lo pueden ver el administrador, el medico y el empleado)
router.get('/exams/addResultExam', isAuthenticated, isAdminEmpleMedi, addResultExam);//ya

//examenes a los que no asistieron los pacientes(solo lo pueden ver el administrador, el medico y el empleado)
router.get('/exams/addResultExamValue', isAuthenticated, isAdminEmpleMedi, addResultExamValue);//ya

//examenes a los que no asistieron los pacientes(solo lo pueden ver el administrador, el medico y el empleado)
router.get('/exams/addResultExamValueYes', isAuthenticated, isAdminEmpleMedi, addResultExamValueYes);//ya

//ver resultados para la ventana de examenes(solo lo pueden ver el administrador, el medico y el empleado)
router.get('/exams/resultExam', isAuthenticated, isAdminEmpleMedi, resultExam);//ya

//Examenes cancelados(todos, solo lo pueden ver el administrador, el medico y el empleado)
router.get('/exams/seeAllCancelExams', isAuthenticated, isAdminEmpleMedi, seeAllCancelExams);//ya

//Examenes pendientes, cancelados y resultados(todos los de cada paciente)
router.get('/exams/seeAllExamsByUser', isAuthenticated, seeAllExamsByUser);
router.get('/exams/seeAllCancelExamsByUser', isAuthenticated, seeAllCancelExamsByUser);
router.get('/exams/seeAllResultByUser', isAuthenticated, seeAllResultByUser);//*

//Examenes pendientes(todos los de cada paciente para agregar resultados) seeAllResultByUserAdmin
router.get('/exams/seeAllExamsByUserAdmin/:id', isAuthenticated, isAdminEmpleMedi, seeAllExamsByUserAdmin);//ya
router.get('/exams/seeAllPendingExamsByUserAdmin/:id', isAuthenticated, isAdminEmpleMedi, seeAllPendingExamsByUserAdmin);//ya
router.get('/exams/seeAllResultByUserAdmin/:id', isAuthenticated, isAdminEmpleMedi, seeAllResultByUserAdmin);//**modificando**

//Agregar Resultados
router.get('/exams/addResultForm/:id',  isAuthenticated, isAdminEmpleMedi, addResultForm);//modificando**
router.put('/exams/addResult/:id', isAuthenticated, isAdminEmpleMedi, addResult);//ya///actualiza usuario

//Ver todos los Resultados
router.get('/exams/seeAllResults', isAuthenticated, isAdminEmpleMedi, seeAllResults);//para modificar

//Ver Resultados individuales para cada paciente
router.get('/exams/seeAllResults/:id', isAuthenticated, seeAllResultsPerPatient); //ya

////Permite ditar los examenes desde examenes pendientes///////////////////////////////////////////////
router.get('/exams/editExamForm/:id', isAuthenticated, isLab_Staff, editExamForm);//ya//Formulario para editar usuarios
router.put('/exams/editExam/:id', isAuthenticated, isLab_Staff, editExam);//ya///actualiza usuario

router.put('/exams/cancelExam/:id', isAuthenticated, isLab_Staff, cancelExam);
router.put('/exams/valueExam/:id', isAuthenticated, isLab_Staff, valueExam);
//////////////Borrar usuarios //////////////////////////////
router.delete('/exams/deleteExam/:id', isAuthenticated, isAdmin, deleteExam);//ya


module.exports = router;