# à faire

## 1. Aller dans backend et créer un fichier .env
```javascript
JWT_SECRET=chaine_de_64_char
DATABASE_URL="file:./database.sql"  //Important de garder la database.sql, car elle contient des donnés de vérifications pour attribuer les notes des élèves
```

## 2. S'assurer que les ports sont bien expose
```javascript
8734 -> port du frontend
8756 -> port du backend
```

## 3. Configurer le frontend pour utiliser un URL vers l'api backend au lieu du localhost actuel (étape potentiellement requise)
```
Le frontend est montée sur un server. Les api calls sont fait sur celui-ci, ils ne sont pas fait du côté client.

Client envoie une requête de connexion -> le server front reçoit la requête -> La transmet au server de l'api
```