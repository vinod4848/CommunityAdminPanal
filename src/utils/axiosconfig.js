const gettokenlocalStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

export const Config = {
    headers: {
        Authorization: `Bearer ${gettokenlocalStorage?.token}`,
        Accept: "application/json"
    }
}