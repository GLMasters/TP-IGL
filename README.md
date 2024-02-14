# Projet Vue Globale

Bienvenue dans le projet Vue Globale, une application Web permettant aux utilisateurs de rechercher des articles scientifiques à partir de mots-clés spécifiques. Cette application est développée en utilisant Flask pour le backend, React pour le frontend, MySQL comme base de données relationnelle, Elasticsearch pour l'indexation et la recherche avancée, et Docker pour la gestion des conteneurs.

## Lancement Rapide

### Backend avec Flask, Docker et MySql 

Pour lancer le backend avec Docker, utilisez les scripts fournis :

```bash
sudo ./setup.sh
sudo ./docker_start.sh
````
### Frontend avec React 
- Accédez au répertoire frontend :
```bash
cd frontend
````
- Installez les dépendances avec la commande :
```bash
npm install
````
- Démarrez l'application React avec la commande :
```bash
npm start
````
L'application frontend sera accessible à l'adresse http://localhost:3000.

### Utilisation de l'Application
1. Accédez à l'application via le navigateur à l'adresse http://localhost:5000.
2. Connectez-vous avec vos identifiants.
3. Utilisez la fonction de recherche pour trouver des articles scientifiques en fonction des mots-clés.
4. Explorez les filtres de recherche, consultez les détails des articles et sauvegardez vos favoris.
5. Accédez à la liste des articles favoris pour une consultation ultérieure.
