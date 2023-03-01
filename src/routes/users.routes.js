const {Router} = require('express')
const router =Router();

const {isAuthenticated, isAdmin, isLab_Staff, isAdminEmpleMedi, isPhysician, isAdminEmple, isAdminMedi} = require('../helpers/auth');

const {patientManual, physicianManual, labStaffManual, adminManual, createAdminForm, createAdmin, createUserForm, createUser, signInForm, signIn, 
        started, logout, changePasswdForm, changePasswd, signInError, seeAllPatientsAdmin, seeAllPhysicianAdmin, seeAllLabStaffAdmin, seeAllAdmin,
        seeAllUsersAdmin, findUserByIdentificationForm, findUserByIdentification, findUserByEmailForm, findUserByEmail, editUserFormAdmin, 
        editUserAdmin, seeUserAdminForm,     deletUserAdmin, forgotPasswordForm, forgotPassword, myProfile} = require('../controllers/users.controllers')

/////Tareas comunes para todos los usuarios///////////////////////////////////////

///Formulario para el ingreso a la plataforma
router.get('/users/signInForm', signInForm);
router.post('/users/signIn', signIn);
router.get('/users/signInError', signInError);
router.get('/users/started', isAuthenticated, started);  

/////////// Salida de la plataforma /////////////////////////
router.get('/users/logout', logout);


//Crear un usuario de cualquier tipo: Admin, paciente, laboratorio o médico.
//router.get('/users/createUserForm',  isAuthenticated, isAdmin, createUserForm);
//router.post('/users/createUser', isAuthenticated, isAdmin, createUser);

router.get('/users/createUserForm',  isAuthenticated, isAdmin, createUserForm);
router.post('/users/createUser', isAuthenticated, isAdmin, createUser);

//funciones
router.get('/users/adminManual',  isAuthenticated, isAdmin, adminManual);
router.get('/users/labStaffManual',  isAuthenticated, isLab_Staff, labStaffManual);
router.get('/users/physicianManual',  isAuthenticated, isPhysician, physicianManual);
router.get('/users/patientManual',  isAuthenticated, patientManual);

//Crear el primer administrador de la plataforma cuando se instala inicialmente 
router.get('/users/createAdminForm', createAdminForm);
router.post('/users/createAdmin', createAdmin);

////////////////////////////////////////////////////////////////////////////
////Operaciones realizadas por los administradores
////////////////////////////////////////////////////////////////////////////
//////////////Consultas, borrado y edición de usuarios //////////////////////////////
//Permite al admin y al empleado ver todos los usuarios
router.get('/users/seeAllPatientsAdmin', isAuthenticated, isAdminEmpleMedi, seeAllPatientsAdmin);
router.get('/users/seeAllPhysicianAdmin', isAuthenticated, isAdminEmpleMedi, seeAllPhysicianAdmin)
router.get('/users/seeAllLabStaffAdmin', isAuthenticated, isAdminEmpleMedi, seeAllLabStaffAdmin);
router.get('/users/seeAllAdmin', isAuthenticated, isAdminEmpleMedi, seeAllAdmin);
router.get('/users/seeAllUsersAdmin', isAuthenticated, isAdminEmpleMedi, seeAllUsersAdmin);

router.get('/users/findUserByIdentification', isAuthenticated, isAdminEmpleMedi, findUserByIdentificationForm);
router.post('/users/findUserByIdentification', isAuthenticated, isAdminEmpleMedi, findUserByIdentification);

router.get('/users/findUserByEmail', isAuthenticated, isAdminEmpleMedi, findUserByEmailForm);
router.post('/users/findUserByEmail', isAuthenticated, isAdminEmpleMedi, findUserByEmail);

////Permite ver y editar los usuarios///////////////////////////////////////////////
router.get('/users/seeUserAdminForm/:id', isAuthenticated, isAdminEmpleMedi, seeUserAdminForm)

router.get('/users/editUserFormAdmin/:id', isAuthenticated, isAdminEmple, editUserFormAdmin);///Formulario para editar usuarios
router.put('/users/editUserAdmin/:id', isAuthenticated, isAdminEmple, editUserAdmin);/////actualiza usuario

//////////////Borrar usuarios //////////////////////////////
router.delete('/users/deleteUserAdmin/:id', isAuthenticated, isAdmin, deletUserAdmin);


//////////////////////////////////////////////////////////////////////////// 
////Operaciones comunes - realizadas por todos los usuarios/////////////////
///////////////////////////////////////////////////////////////////////////
router.get('/users/myProfile', isAuthenticated, myProfile);

router.get('/users/changePasswd', isAuthenticated, changePasswdForm);
router.post('/users/changePasswd', isAuthenticated, changePasswd);
///Cuando olvidamos la contraseña
router.get('/users/forgotPasswdForm', forgotPasswordForm);
router.post('/users/forgotPassword', forgotPassword)
////////////////////////////////////////////////////////////////////////////

module.exports = router;