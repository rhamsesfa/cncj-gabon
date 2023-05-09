module.exports = (req, res, next) => {
  const entree = req.body.adresseContact
; // On suppose que la valeur à valider est dans la query string

  const expressionReguliereTelephone = /^((\+|00)\d{1,3}|0)\d{8,}$/; //expression régulière pour un numéro de téléphone avec indicatif
  const expressionReguliereEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //expression régulière pour une adresse email valide

  if (!entree) {
    // Si l'entrée est manquante, on retourne un code d'erreur
    return res.status(400).send("L'entrée est manquante");
  }

  if (!expressionReguliereTelephone.test(entree) && !expressionReguliereEmail.test(entree)) {
    // Si l'entrée ne correspond ni à un numéro de téléphone ni à une adresse email valide, on retourne un code d'erreur
    return res.status(400).send("L'entrée n'est pas un numéro de téléphone ou une adresse email valide");
  }
  if(expressionReguliereTelephone.test(entree)){
    req.body.typeContact = 'Téléphone'
  }
  if(expressionReguliereEmail.test(entree)){
    req.body.typeContact = 'Mail'
    
  }

  // Si l'entrée est valide, on passe à la fonction suivante dans la chaîne de middleware
  next();
}