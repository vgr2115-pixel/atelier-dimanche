// Traduit les remontées de l'authentification en messages lisibles.
const RULES = [
  {
    test: /verify( your)? email/i,
    message:
      'Votre adresse n’est pas encore confirmée. Saisissez le code à 6 chiffres reçu par email pour activer votre compte.',
  },
  {
    test: /(invalid|incorrect).*(password|credentials)|credentials/i,
    message: 'Email ou mot de passe incorrect. Vérifiez la casse, puis réessayez.',
  },
  {
    test: /user (not found|does not exist)|no account|not registered/i,
    message: 'Aucun compte ne correspond à cette adresse email.',
  },
  {
    test: /already (exists|registered)/i,
    message: 'Un compte existe déjà avec cette adresse. Connectez-vous ou utilisez « Mot de passe oublié ».',
  },
  {
    test: /(too many|rate limit|try again later)/i,
    message: 'Trop de tentatives d’affilée. Patientez une minute avant de réessayer.',
  },
  {
    test: /(expired|invalid).*(code|token|link)/i,
    message: 'Ce code ou ce lien a expiré. Demandez-en un nouveau, il reste valable 10 minutes.',
  },
  {
    test: /password.*(characters|length|weak)/i,
    message: 'Choisissez un mot de passe d’au moins 8 caractères.',
  },
  {
    test: /network|fetch|timeout/i,
    message: 'La connexion a été interrompue. Vérifiez votre réseau, puis réessayez.',
  },
];

export function authErrorMessage(error, fallback = 'Une erreur est survenue. Réessayez dans un instant.') {
  const raw = typeof error === 'string' ? error : error?.message ?? '';
  const match = RULES.find((rule) => rule.test.test(raw));
  return match ? match.message : fallback;
}