const usersCtrl = {};

const User = require('../models/User')
const passport = require('passport');


/////Tareas comunes para todos los usuarios///////////////////////////////////////

//Formulario para el ingreso a la plataforma 
usersCtrl.signInForm = (req, res)=>{
    if(req.user==undefined){
        res.render('users/signInForm') 
    }else{
        res.redirect('/users/started')
    }  
};
usersCtrl.signIn = passport.authenticate('local', {    
    successRedirect: "/users/started",
    failureRedirect: "/users/signInError",
    failureFlash: true
});
usersCtrl.signInError = (req, res)=>{
    req.flash('error_msg', 'El usuario o contraseña son incorrectos');
    res.redirect('signInForm')
};
usersCtrl.started = (req, res)=>{
    //console.log(req.user.role)
    var Admin = Empleado =  Medico = Paciente = null;
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
    res.render('users/started', {Admin, Empleado, Medico, Paciente, name, lastname, sec_lastname, rol    });
    //res.render('users/started', {name, lastname, sec_lastname}); 
};
/////////// Salida de la plataforma /////////////////////////
usersCtrl.logout = (req, res)=>{
    req.logout();
    req.flash("success_msg", "La sesión se cerró satisfactoriamente.");
    res.redirect("/");
};

//Crea un usuario de cualquier tipo: admin, paciente, laboratorio o médico.
usersCtrl.createUserForm = (req, res)=>{
    var Admin = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('users/createUserForm', {Admin, name, lastname, sec_lastname, rol});
    
};
usersCtrl.createUser = async (req, res)=>{
    //console.log(req.body)    revisar por si hay error
    var Admin = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    const errors = [];
    const { identification_type, identification, name, lastname, sec_lastname, ///Información personal
        date_of_bird, gender, blood_type, rh, marital_status, EPS,             ///Información general
        home_phone, mobile_phone, work_phone, address, city, department,       ///Datos de localización 
        role, email, password, confirm_password,                               ///Información de sesión
        contact_name, contact_lastname, contact_sec_lastname, contact_relationship, contact_phone } = req.body; ///Información de contacto
       
    const userIdentification = await User.findOne({ identification: identification });
    const userEmail = await User.findOne({ email: email }); 
    
    ////Información personal
    if(identification_type === '--- Elija un tipo de identificación ---') {
        errors.push({ text: 'Debe ingresar un tipo de identificación.' });
    }
    if (userIdentification) {
        errors.push({ text: 'Ya existe un usuario con esa identificación en la base de datos.' });
    }
    if (identification === '') {
        errors.push({ text: 'Debe ingresar un número de identificación.' });
    }
    if (name === '') {
        errors.push({ text: 'No ingresó el nombre.' });
    }
    if (lastname === '') {
        errors.push({ text: 'Debe ingresar al menos el primer apellido.' });
    }

    ///Información general
    if(date_of_bird === '') {
        errors.push({ text: 'Debe ingresar la fecha de nacimiento.'})
    }
    if(EPS === ''){
        errors.push({ text: 'Debe ingresar una EPS valida.'})
    }

    ///Datos de localización
    if(home_phone === '' && mobile_phone === '' && work_phone === ''){
        errors.push({ text: 'Debe ingresar al menos un número de teléfono.'})
    }
    if(address === ''){
        errors.push({ text: 'Debe ingresar una dirección.'})
    }
    if(city === ''){
        errors.push({ text: 'Debe ingresar una ciudad.'})
    }
    if(department === ''){
        errors.push({ text: 'Debe ingresar un departamento.'})
    }

    ////Información de sesión
    if (role === '--- Elija un tipo de usuario ---') {
        errors.push({ text: 'No seleccionó un tipo de usuario.' });
    }
    if (email === '') {
        errors.push({ text: 'Debe ingresar un correo electrónico válido.' });
    }    
    if (userEmail) {
        errors.push({ text: 'Ya hay una cuenta registrada con el email ingresado.' });
    }    
    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden.' });
    }
    if (password.length < 5) {
        errors.push({ text: 'Las contraseñas deben tener como mínimo 5 caracteres.' });
    }
     
    ////Información de contacto
    if(contact_name === ''){
        errors.push({ text: 'Debe ingresar un nombre de contacto.'});
    }
    if(contact_lastname === ''){
        errors.push({ text: 'Debe ingresar al menos el primer apellido del contacto.'});
    }
    if(contact_relationship === ''){
        errors.push({ text: 'Debe indicar que relación tiene con el contacto.'});
    }
    if(contact_phone === ''){
        errors.push({ text: 'Debe ingresar un número de teléfono de contacto valido para el contacto.'});
    }    
    
    if (errors.length > 0) {
        res.render('users/createUserForm', { errors, identification_type, identification, name, lastname, sec_lastname, 
            date_of_bird, gender, blood_type, rh, marital_status, EPS, home_phone, mobile_phone, work_phone, address, city, department,
            role, email, contact_name, contact_lastname, contact_sec_lastname, contact_relationship, contact_phone, Admin});
    }else {
        const data = { identification_type, identification, name, lastname, sec_lastname, 
            date_of_bird, gender, blood_type, rh, marital_status, EPS, home_phone, mobile_phone, work_phone, address, city, department,
            role, email, password, contact_name, contact_lastname, contact_sec_lastname, contact_relationship, contact_phone, };
        const newUser = new User(data);
        newUser.password = await newUser.encryptPassword(password);
        console.log(newUser)
        await newUser.save();
        req.flash('success_msg', 'Usuario creado satisfactoriamente.');
        res.redirect('started');
    }    
};

//////////////////////////////////////////////////////////////////////////////////
//Crear el primer administrador cuando se instala inicialmente la plataforma
//El primer usuario administrador se crea ingresando directamente la dirección http://localhost:3000/users/createAdminForm
//La idea es que esta dirección quede escondida para el público.
usersCtrl.createAdminForm = async (req, res)=>{  
    //console.log('hola create admin')
    const user = await User.findOne({role: "Admin"});  
    if(!user){
        //console.log('hola create admin otra vez')
        res.render('users/createAdminForm')  
    }else{
        req.flash('error_msg', 'Ya existe un usuario administrador.');
        res.redirect('/')
    }
    
};
usersCtrl.createAdmin = async (req, res)=>{
    console.log(req.body) 
    const errors = [];
    const { identification_type, identification, name, lastname, sec_lastname, ///Información personal
        date_of_bird, gender, blood_type, rh, marital_status, EPS,             ///Información general
        home_phone, mobile_phone, work_phone, address, city, department,       ///Datos de localización 
        role, email, password, confirm_password,                               ///Información de sesión
        contact_name, contact_lastname, contact_sec_lastname, contact_relationship, contact_phone } = req.body; ///Información de contacto
    
    const userIdentification = await User.findOne({ identification: identification });
    const userEmail = await User.findOne({ email: email }); 
    
    ////Información personal
    if(identification_type === '--- Elija un tipo de identificación ---') {
        errors.push({ text: 'Debe ingresar un tipo de identificación.' });
    }
    if (userIdentification) {
        errors.push({ text: 'Ya existe esa identificación en la base de datos.' });
    }
    if (identification === '') {
        errors.push({ text: 'Debe digitar el número de identificación' });
    }
    if (name === '') {
        errors.push({ text: 'Debe ingresar el nombre.' });
    }
    if (lastname === '') {
        errors.push({ text: 'Debe ingresar al menos el primer apellido.' });
    }

    ///Información general
    if(date_of_bird === '') {
        errors.push({ text: 'Debe ingresar la fecha de nacimiento.'})
    }
    if(EPS === ''){
        errors.push({ text: 'Debe ingresar una EPS valida.'})
    }

    ///Datos de localización
    if(home_phone === '' && mobile_phone === '' && work_phone === ''){
        errors.push({ text: 'Debe ingresar al menos un número de teléfono.'})
    }
    if(address === ''){
        errors.push({ text: 'Debe ingresar una dirección.'})
    }
    if(city === ''){
        errors.push({ text: 'Debe ingresar una ciudad.'})
    }
    if(department === ''){
        errors.push({ text: 'Debe ingresar un departamento.'})
    }

    ////Información de sesión
    if (role === '--- Elija un tipo de usuario ---') {
        errors.push({ text: 'Debe ingresar un tipo de usuario.' });
    }
    if (email === '') {
        errors.push({ text: 'Debe ingresar un correo electrónico válido.' });
    }    
    if (userEmail) {
        errors.push({ text: 'El email del usuario ya existe en la base de datos.' });
    }    
    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden.' });
    }
    if (password.length < 5) {
        errors.push({ text: 'Las contraseñas deben tener almenos 5 caracteres.' });
    }
     
    ////Información de contacto
    if(contact_name === ''){
        errors.push({ text: 'Debe ingresar un nombre de contacto.'});
    }
    if(contact_lastname === ''){
        errors.push({ text: 'Debe ingresar al menos un primer apellido del contacto.'});
    }
    if(contact_relationship === ''){
        errors.push({ text: 'Debe indicar que relación tiene con el contacto.'});
    }
    if(contact_phone === ''){
        errors.push({ text: 'Debe ingresar un número de teléfono del contacto.'});
    } 

    if (errors.length > 0) {
        res.render('users/createAdminForm', { errors, identification_type, identification, name, lastname, sec_lastname, 
            date_of_bird, gender, blood_type, rh, marital_status, EPS, home_phone, mobile_phone, work_phone, address, city, department,
            role, email, contact_name, contact_lastname, contact_sec_lastname, contact_relationship, contact_phone, Admin});
    }else {
        const data = { identification_type, identification, name, lastname, sec_lastname, 
            date_of_bird, gender, blood_type, rh, marital_status, EPS, home_phone, mobile_phone, work_phone, address, city, department,
            role, email, password, contact_name, contact_lastname, contact_sec_lastname, contact_relationship, contact_phone, };
        const newUser = new User(data);
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Administrador creado satisfactoriamente.');
        res.redirect('/');
    }     
};

////Permite ver usuarios
usersCtrl.seeAllPatientsAdmin = async (req, res)=>{  
    const role = 'Paciente';    
    const pList = await User.find({role}).sort({name: 1});    
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
    res.render('users/seeAllUserAdmin', {pList, Admin, Empleado, Medico, name, lastname, sec_lastname, rol});    
};

usersCtrl.adminManual = (req, res)=>{
    var Admin =  null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('users/adminManual', {Admin, name, lastname, sec_lastname, rol});
};

usersCtrl.labStaffManual = (req, res)=>{
    var Empleado =  null;
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('users/labStaffManual', {Empleado, name, lastname, sec_lastname, rol});
};

usersCtrl.physicianManual = (req, res)=>{
    var Medico =  null;
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('users/physicianManual', {Medico, name, lastname, sec_lastname, rol});
};

usersCtrl.patientManual = (req, res)=>{
    var Medico = Empleado = Admin = Paciente = null;
    if(req.user.role == 'Medico'){
        Medico = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Paciente'){
        Paciente = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('users/patientManual', {Medico, Empleado, Admin, Paciente, name, lastname, sec_lastname, rol});
};

usersCtrl.seeAllPhysicianAdmin = async (req, res)=>{
    const role = 'Medico';    
    const pList = await User.find({role}).sort({name: 1});    
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
    res.render('users/seeAllUserAdmin', {pList, Admin, Empleado, Medico, name, lastname, sec_lastname, rol});
};
usersCtrl.seeAllLabStaffAdmin = async (req, res)=>{
    const role = 'Empleado';    
    const pList = await User.find({role}).sort({name: 1});    
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
    res.render('users/seeAllUserAdmin', {pList, Admin, Empleado, Medico, name, lastname, sec_lastname, rol});
};
usersCtrl.seeAllAdmin = async (req, res)=>{
    const role = 'Admin';    
    const pList = await User.find({role}).sort({name: 1});    
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
    res.render('users/seeAllUserAdmin', {pList, Admin, Empleado, Medico, name, lastname, sec_lastname, rol});
};
usersCtrl.seeAllUsersAdmin = async (req, res)=>{       
    const pList = await User.find().sort({name: 1});    
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
    res.render('users/seeAllUserAdmin', {pList, Admin, Empleado, Medico, name, lastname, sec_lastname, rol});
};
usersCtrl.findUserByIdentificationForm = (req, res)=>{
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
    res.render('users/findUserByIdentification', {Admin, Empleado, Medico, name, lastname, sec_lastname, rol});
}
usersCtrl.findUserByIdentification = async (req, res)=>{
    const { identification } = req.body;
    const pList = await User.find({identification});
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
    res.render('users/seeAllUserAdmin', {pList, Admin, Empleado, Medico, name, lastname, sec_lastname, rol});        
}
usersCtrl.findUserByEmailForm = (req, res)=>{
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
    res.render('users/findUserByEmail', {Admin, Empleado, Medico, name, lastname, sec_lastname, rol});
}
usersCtrl.findUserByEmail = async (req, res)=>{
    const { email } = req.body;
    const pList = await User.find({email})
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
    res.render('users/seeAllUserAdmin', {pList, Admin, Empleado, Medico, name, lastname, sec_lastname, rol});
}

//////Permite ver y Editar usuarios///////
usersCtrl.seeUserAdminForm = async (req, res) => {
    //console.log('Viendo un usuario')
    const user1 = await User.findById(req.params.id);
    //console.log(user1)
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
    res.render('users/seeUserAdminForm', {user1, Admin, Medico, Empleado, name, lastname, sec_lastname, rol}); 
}

usersCtrl.editUserFormAdmin = async (req, res) => {
    const user1 = await User.findById(req.params.id);
    var Admin = Empleado = null;
    if(req.user.role == 'Admin'){
        Admin = true;        
    }
    if(req.user.role == 'Empleado'){
        Empleado = true;        
    }
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    res.render('users/editUserAdminForm', {user1, Admin, Empleado, name, lastname, sec_lastname, rol});      
};
usersCtrl.editUserAdmin = async (req, res) => {  
    //console.log(req.body)
    const {identification_type, identification, name, lastname, sec_lastname, ///Información personal
        date_of_bird, gender, blood_type, rh, marital_status, EPS,             ///Información general
        home_phone, mobile_phone, work_phone, address, city, department,       ///Datos de localización 
        role, email, password, confirm_password,                               ///Información de sesión
        contact_name, contact_lastname, contact_sec_lastname, contact_relationship, contact_phone} = req.body
        
                await User.findByIdAndUpdate(req.params.id, {identification_type, identification, name, lastname, sec_lastname, ///Información personal
                    date_of_bird, gender, blood_type, rh, marital_status, EPS,             ///Información general
                    home_phone, mobile_phone, work_phone, address, city, department,       ///Datos de localización 
                    role, email, password, confirm_password,                               ///Información de sesión
                    contact_name, contact_lastname, contact_sec_lastname, contact_relationship, contact_phone})  
                const admin = true
                req.flash('success_msg', 'Datos editados satisfactoriamente.');
                res.redirect('/users/seeAllUsersAdmin')
}; 
//////Permite borrar usuarios///////
usersCtrl.deletUserAdmin = async (req, res) => {    
    await User.findByIdAndDelete(req.params.id);    
    req.flash('success_msg', 'Usuario eliminado satisfactoriamente.');
    res.redirect('/users/seeAllUsersAdmin')
};

usersCtrl.myProfile = (req, res)=>{
    //const { name, lastname, sec_lastname, identification, email } = req.user;
    //console.log(req.user)
    const user = req.user;
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    if(req.user.role == 'Admin'){
        const Admin = true;
        res.render('users/myProfile', {Admin, user, name, lastname, sec_lastname, rol});
    }else if (req.user.role == 'Medico'){
        const Medico = true;
        res.render('users/myProfile', {Medico, user, name, lastname, sec_lastname, rol});
    }else if (req.user.role == 'Empleado'){
        const Empleado = true;
        res.render('users/myProfile', {Empleado, user, name, lastname, sec_lastname, rol});
    }else if (req.user.role == 'Paciente'){
        const Paciente = true;
        res.render('users/myProfile', {Paciente, user, name, lastname, sec_lastname, rol});
    } 
    //res.render('users/myProfile')
}

////Cambiara la contraseña///
usersCtrl.changePasswdForm = (req, res)=>{
    const user = req.user;
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    if(req.user.role == 'Admin'){
        const Admin = true
        res.render('users/changePasswd', { user, Admin, name, lastname, sec_lastname, rol});
    } else if(req.user.role == 'Empleado'){
        const Empleado = true
        res.render('users/changePasswd', { user, Empleado,name, lastname, sec_lastname, rol});
    } else if(req.user.role == 'Medico'){
        const Medico = true
        res.render('users/changePasswd', { user, Medico, lastname, sec_lastname, rol});
    } else if(req.user.role == 'Paciente'){
        const Paciente = true
        res.render('users/changePasswd', { user, Paciente, name, lastname, sec_lastname, rol});
    }

} 
usersCtrl.changePasswd = async (req, res)=>{
    const errors = [];
    const { actual_password, new_password, confirm_new_password } = req.body
    
    const match = await req.user.matchPassword(actual_password);
    const name = req.user.name;
    const lastname = req.user.lastname;
    const sec_lastname = req.user.sec_lastname;
    const rol = req.user.role;
    if(!match){
        //console.log('No digitaste bien tu contraseña actual!!!')
        errors.push({ text: 'Error al digitar la contraseña actual.'}); 
    } 
    if ( new_password != confirm_new_password) {
        errors.push({ text: 'No coinciden las contraseñas.' });
    }
    if (new_password.length < 5) {
        errors.push({ text: 'La nueva contraseña debe tener almenos 5 caracteres.'});
    }

    if (errors.length > 0) {
        if(req.user.role == 'Admin'){
            const Admin = true;
            res.render('users/changePasswd', {errors, Admin, name, lastname, sec_lastname, rol});
        }else if (req.user.role == 'Medico'){
            const Medico = true;
            res.render('users/changePasswd', {errors, Medico, name, lastname, sec_lastname, rol});
        }else if (req.user.role == 'Empleado'){
            const Empleado = true;
            res.render('users/changePasswd', {errors, Empleado, name, lastname, sec_lastname, rol});
        }else if (req.user.role == 'Paciente'){
            const Paciente = true;
            res.render('users/changePasswd', {errors, Paciente, name, lastname, sec_lastname, rol});
        }               
    } else {
        password = await req.user.encryptPassword(new_password);        
        //console.log(password);
        const id = req.user._id;
        await User.findByIdAndUpdate(id, { password });
        req.flash('success_msg', 'Contraseña actualizada satisfactoriamente.');
        res.redirect('/users/started')         
    }
};
///Cuando se olvida la contraseña
usersCtrl.forgotPasswordForm = (req, res)=>{
    if(req.user == undefined){
        res.render('users/forgotPasswordForm')
    }else{
        res.redirect('/users/started')
    }
}
usersCtrl.forgotPassword = async (req, res)=>{
    const { email } = req.body;
    const user = await User.findOne({email});    

    if(user != null){
        //console.log(user);
        const {name, lastname, sec_lastname} = user;
        var passwd = '';
        var characters = 'ABCDEFGHIJ#KLM!NO$PQR%ST&UVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 10; i++ ) {
           passwd += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        //console.log(passwd)

        password = await user.encryptPassword(passwd); 
        const id = user._id;
        await User.findByIdAndUpdate(id, { password });
        const message = "Su contraseña ha sido cambiada correctamente."

        contentHTML = `
        <h1>PAV - Sistema de Información</h1>
        <h4>Sistema hospitalario del Huila</h4>
        <ul>
            <li>Usuario: ${name } ${lastname } ${sec_lastname }</li>
            <li>Email: ${email}</li>
            <li>Nueva contraseña: ${passwd}</li>             
        </ul>
        <p>${message}</p> `;

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'gtst@usco.edu.co',  
                pass: 'pnckgyqntqlzjzagfffffff'
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    
        let info = await transporter.sendMail({
            from: '"Plataforma PAV - Sistema de información - GTST-Usco" <gtst@usco.edu.co>', // sender address,
            to: email,                               //A esta dirección sera enviado el correo
            subject: 'Recuperación de contraseña',
            // text: 'Hello World'
            html: contentHTML
        })


    } 
    req.flash('success_msg', 'Se ha enviado la nueva contraseña al correo del usuario.');
    res.redirect('/users/signInForm')
}




module.exports = usersCtrl;