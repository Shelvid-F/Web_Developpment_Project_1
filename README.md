# Ready-N - Site Web Multi-Pages

Projet réalisé par David NGUEAJIO dans le cadre du Devoir N°1 de Développement Web (HTML/CSS/JavaScript).

## Description du Projet

Il s'agit d'un site web responsive de 3 pages pour Ready-N, une startup fictive Ed-Tech :
- **Accueil** : Présentation des services et valeurs
- **Présentation** : Informations détaillées sur Ready-N
- **Contact** : Formulaire dynamique avec validation JavaScript

## Structure du Projet

```
moussa_diop/
├── index.html              # Page d'accueil
├── presentation.html       # Page de présentation
├── contact.html           # Page de contact avec formulaire
├── css/
│   └── style.css          # Feuille de style principale
├── js/
│   └── script.js          # Script JavaScript (menu + validation)
├── img/                   # Dossier pour les images
│   └── (placeholders)     # Remplacer par vos images
└── README.md              # Ce fichier
```

##  Fonctionnalités Implémentées



### JavaScript
- Menu hamburger responsive pour mobile
- Affichage/masquage dynamique des champs conditionnels selon le sujet
- Validation en temps réel (nom, email, téléphone)
- Validation complète à la soumission
- Affichage d'un récapitulatif des données saisies
- Messages d'erreur clairs sous chaque champ

### CSS
-  Design moderne et professionnel
-  Palette de couleurs cohérente (bleu, vert, orange)
-  Responsive design avec media queries
-  Animations et transitions légères
-  Menu mobile adaptatif

### HTML
-  Structure sémantique HTML5
-  Accessibilité (labels, aria-attributes)
-  Formulaire complet avec tous les champs requis


## Note sur champs Conditionnels du Formulaire

Selon le **Sujet de contact** sélectionné :
- **Demande d'information** → Affiche "Domaine d'intérêt"
- **Support technique** → Affiche "Numéro de ticket" + "Urgence"
- **Réclamation** → Affiche "Date de l'incident"
- **Autre** → Aucun champ supplémentaire

## Note sur validation en Temps Réel

- **Nom** : Minimum 3 caractères
- **Email** : Doit contenir @ et un point
- **Téléphone** : Uniquement des chiffres, minimum 9 chiffres
- Messages d'erreur en rouge sous chaque champ invalide

