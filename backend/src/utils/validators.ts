export const isValidUsername = (username: string): boolean => {
    const regex = /^[A-Za-z0-9]{8,20}$/;
    return regex.test(username) && /\d/.test(username);
  };
  
  export const isValidPassword = (password: string): boolean => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,30}$/;
    return regex.test(password);
  };
  