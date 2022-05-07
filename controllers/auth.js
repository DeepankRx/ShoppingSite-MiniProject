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
    res.setHeader('Set-Cookie', 'loggedIn=true');
    res.redirect('/');
  };
