export const auth = {
  signIn: {
    action: 'Iniciar sesión',
    error: 'Usuario o contraseña incorrecta',
    form: {
      email: 'Email',
      password: 'Password',
    },
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
};
