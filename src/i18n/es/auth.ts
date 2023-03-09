export const auth = {
  resetPassword: {
    confirmAction: 'Cambiar contraseña',
    confirmError: 'Ha ocurrido un error al intentar cambiar la contraseña',
    confirmSuccess:
      'Ha cambiado su contraseña correctamente. En unos segundos sera redireccionado al la pantalla de inicio de sesión',
    form: {
      email: 'Email',
    },
    requestAction: 'Enviar email',
    requestError: 'Ha ocurrido un error al intentar enviar el email',
    requestSuccess: 'Se ha enviado el correo correctamente. Verifique su casilla.',
    signInLink: 'Volver a iniciar sesión',
    title: 'Vamos a recuperar tus credenciales',
  },
  signIn: {
    action: 'Iniciar sesión',
    error: 'Usuario o contraseña incorrecta',
    form: {
      email: 'Email',
      password: 'Password',
    },
    resetPasswordLink: 'Olvidaste tu contraseña?',
    registrationLink: {
      dontHaveAccount: 'No tienes una cuenta?',
      link: 'Registrese gratis',
    },
    title: 'Bienvenido! Inicia sesión',
  },
  signUp: {
    action: 'Registrarse',
    error: 'El correo ya se encuentra registrado',
    form: {
      confirmPassword: 'Confirmar Password',
      email: 'Email',
      password: 'Password',
    },
    signInLink: {
      haveAnAccount: 'Ya tienes una cuenta?',
      link: 'Inicia sesión aquí',
    },
    title: 'Registre una nueva cuenta',
  },
  validation: {
    password: {
      min: 'La constraseña es muy corta. Min: 8',
      minLowercase: 'La constraseña debe contener al menos una minuscula.',
      minUppercase: 'La constraseña debe contener al menos una mayuscula',
      minNumbers: 'La constraseña debe contener al menos un numero',
      minSymbols: 'La constraseña debe contener al menos un caracter especial',
    },
    passwordMismatch: 'Las contraseñas no coinciden',
  },
};
