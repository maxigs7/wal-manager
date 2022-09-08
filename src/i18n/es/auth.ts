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
    registrationLink: 'No tienes una cuenta? Crea una aquí',
    title: 'Inicia sesión en tu cuenta',
  },
  signUp: {
    action: 'Registrarse',
    error: (email: string) => `${email} ya se encuentra registrado`,
    form: {
      confirmPassword: 'Confirmar Password',
      email: 'Email',
      password: 'Password',
    },
    signInLink: 'Ya tienes una cuenta? Inicia sesión',
    title: 'Registre una nueva cuenta',
  },
  validation: {
    passwordMismatch: 'Las contraseñas no coinciden',
  },
};
