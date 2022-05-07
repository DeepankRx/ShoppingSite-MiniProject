exports.getLogin = (req, res, next) => {
    
    let isLoggedIn = req.get('Cookie').split('=')[1];


    if (isLoggedIn === 'true') {
        isLoggedIn = true;
    } else {
        isLoggedIn = false;
    }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;   
    res.redirect('/');
  };
