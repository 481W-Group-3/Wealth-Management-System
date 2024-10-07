
export const isLoggedin=()=>{
    let data=localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if(data==null){
        return false;
    }else{
        return true;
    }
};


export const doLogin = (userData, callback) => {
    // Save user data and token in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    // Optionally store the token if it is part of userData
    if (userData.token) {
        localStorage.setItem('token', userData.token);
        console.log(userData.token);
    }
    callback();
};

export const doLogout = (next) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Remove the token upon logout
    next();
};



export const getCurrentUserDetail=()=>{
    if (isLoggedin()) { 
        return JSON.parse(localStorage.getItem('user'));
    } else {
        return false;
    }
};

