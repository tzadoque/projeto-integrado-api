// caso o email seja válido a função retorna 'false',
// se for inválido a função retorna um objeto com a key 'message' informando qual foi o erro

module.exports = function isAnInvalidEmail(email) {
  if (email.includes(' ')) {
    return {
      message: 'O email não pode conter espaços em branco.',
    };
  }

  if (!email.includes('@')) {
    return {
      message: `O email precisa incluir um '@'`,
    };
  }

  const usuario = email.substring(0, email.indexOf('@'));
  const dominio = email.substring(email.indexOf('@') + 1, email.length);

  if (
    !(
      usuario.length >= 1 &&
      dominio.length >= 3 &&
      !usuario.includes('@') &&
      !dominio.includes('@') &&
      dominio.includes('.') &&
      dominio.lastIndexOf('.') < dominio.length - 1
    )
  ) {
    return {
      message: `O email informado não é válido`,
    };
  }
  return false;
};
