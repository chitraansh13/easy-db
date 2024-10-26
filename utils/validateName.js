
function isValidName(name) {
    const validNameRegex = /^[a-zA-Z0-9_]+$/;
    if (!validNameRegex.test(name)) {
        return false;
    }
   
    const specialKeywords = [
        'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'ALTER', 'CREATE', 'DATABASE', 'TABLE', 'INDEX', 'VIEW'
    ];
    const upperName = name.toUpperCase();
    if (specialKeywords.some(keyword => upperName.includes(keyword))) {
        return false;
    }

    return true;
}

export default isValidName;