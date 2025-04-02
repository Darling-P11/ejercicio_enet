export const isValidUsername = (username: string): boolean => {
    const regex = /^[A-Za-z0-9]{8,20}$/;
    return regex.test(username) && /\d/.test(username);
  };
  
  export const isValidPassword = (password: string): boolean => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,30}$/;
    return regex.test(password);
  };
  export const isValidIdentificacion = (id: string): boolean => {
    return /^\d{10,13}$/.test(id);
  };
  
  export const isValidTelefono = (telefono: string): boolean => {
    return /^09\d{8}$/.test(telefono);
  };
  
  export const isValidTextoLargo = (texto: string): boolean => {
    return texto.length >= 20 && texto.length <= 100;
  };
  
  