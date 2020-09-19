export const appConfig = {
    apiUrl: 'http://13.232.167.5:4005/api',
    // apiUrl: 'http://localhost:4005/api',

    role: JSON.parse(localStorage.getItem('currentUser')).role,

    token: JSON.parse(localStorage.getItem('currentUser')).token,

    school_id: JSON.parse(localStorage.getItem('currentUser')).school_id,

    employee_id: JSON.parse(localStorage.getItem('currentUser')).employee_id,

};