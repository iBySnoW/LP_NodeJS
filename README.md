# Fonctionnement de l’application

# ⚙️ Variable d’environnement : ./server/.env

On y retrouvera les valeurs suivantes :

```
// Variable d'environnement pour la connection à la base mysql

DB_HOST=0.0.0.0
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=nodeProject

// Variable d'environnement pour configurer le protocole SMTP qui permettra d'envoyer 
les mails avec NodeMailer

SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SERVER_MAIL=sender@server.com
```

La simulation de mail avec Ethereal renvoie dans la console un lien permettant de voir la simulation d’envoie de ce mail.

![Untitled](Fonctionnement%20de%20l%E2%80%99application%200c4a2db6ac2d41c9a9f2954687dfeafc/Untitled.png)

![Untitled](Fonctionnement%20de%20l%E2%80%99application%200c4a2db6ac2d41c9a9f2954687dfeafc/Untitled%201.png)

Lancer le projet avec la commande 

```jsx
> npm run start

```

Et ouvrer le lien suivant qui vous donnera accès au swagger →[http://localhost:3000/documentation#/](http://localhost:3000/documentation#/)