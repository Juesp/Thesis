const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }  
  req.flash('error', 'Usuario no autenticado.');
  res.redirect('/users/signInForm');
};

helpers.isAdmin = (req, res, next) => {
  if(req.user.role === 'Admin'){
    return next();
  }
  req.flash('error', 'El usuario no es admin.');
  res.redirect('/users/started');
};

helpers.isLab_Staff = (req, res, next) => {
  if(req.user.role === 'Empleado'){
    return next();
  }
  req.flash('error', 'El usuario no es empleado.');
  res.redirect('/users/started');
};

helpers.isPhysician = (req, res, next) => {
  if(req.user.role === 'Medico'){
    return next();
  }
  req.flash('error', 'El usuario no es médico.');
  res.redirect('/users/started');
};

helpers.isAdminEmple = (req, res, next) => {
  if(req.user.role === 'Empleado' || req.user.role === 'Admin'){
    return next();
  }
  req.flash('error', 'El usuario no Administrador o empleado.');
  res.redirect('/users/started');
};

helpers.isAdminMedi = (req, res, next) => {
  if(req.user.role === 'Medico' || req.user.role === 'Admin'){
    return next();
  }
  req.flash('error', 'El usuario no es Administrador o Médico.');
  res.redirect('/users/started');
};

helpers.isAdminEmpleMedi = (req, res, next) => {
  if(req.user.role === 'Empleado' || req.user.role === 'Admin' || req.user.role === 'Medico'){
    return next();
  }
  req.flash('error', 'El usuario no Administrador o empleado.');
  res.redirect('/users/started');
};


//["admin", "physician", "lab_Staff", "patient"]


module.exports = helpers;
