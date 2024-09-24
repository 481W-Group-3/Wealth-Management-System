export const isLoggedin=()=>{
    let data=localStorage.getItem('user');
    if(data==null){
        return false;
    }else{
        return true;
    }
};

export const doLogin = (userData, callback) => {
    // Save user data in localStorage or handle login logic
    localStorage.setItem('user', JSON.stringify(userData));
    callback();
};
export const doLogout=(next)=>{
    localStorage.removeItem('user');
    next();
};

export const getCurrentUserDetail=()=>{
    if (isLoggedin()) { 
        return JSON.parse(localStorage.getItem('user'));
    } else {
        return false;
    }
};