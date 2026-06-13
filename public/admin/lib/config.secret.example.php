<?php
/**
 * MODÈLE — copier vers  cms-data/config.secret.php  (hors racine web, NON
 * versionné) puis remplacer le hash. Ce fichier-ci est un exemple inerte.
 *
 * Générer le hash du mot de passe éditeur :
 *   php -r "echo password_hash('VOTRE_MOT_DE_PASSE', PASSWORD_DEFAULT), PHP_EOL;"
 *
 * Le mot de passe en clair n'est JAMAIS stocké : seul le hash bcrypt l'est.
 */
return [
    'PASSWORD_HASH' => '$2y$10$REMPLACER_PAR_LE_HASH_GENERE_CI_DESSUS_xxxxxxxxxxxxxxxxxxxxxx',
];
