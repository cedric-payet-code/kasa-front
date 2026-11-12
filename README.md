# Kasa – Front-end (Next.js)

Refonte du site de **Kasa**, plateforme de location d'appartements et de maisons entre particuliers.
Ce dépôt contient le front-end, développé avec **Next.js (App Router)** et branché sur l'API Express de Kasa.

> Projet réalisé dans le cadre de la formation OpenClassrooms « Développeur d'application Full-stack »
> (mission fictive : « Développez une plateforme de réservation avec React »).

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Lancement du projet](#lancement-du-projet)
- [Scripts disponibles](#scripts-disponibles)
- [Tests](#tests)
- [Structure du projet](#structure-du-projet)
- [Choix techniques](#choix-techniques)

## Fonctionnalités

- **Page d'accueil** : liste de tous les logements récupérés depuis l'API, avec un skeleton pendant le chargement.
- **Page détail d'un logement** (`/logement/[slug]`) :
  - carrousel de photos (flèches, boucle, transition, navigation au clavier, pas de flèches s'il n'y a qu'une photo) ;
  - description, équipements, catégories et encadré de l'hôte ;
  - titre et description de page propres à chaque logement (SEO).
- **Favoris** : ajout et retrait via le bouton cœur des cartes, conservés dans le navigateur (`localStorage`), et page **« Vos favoris »** (`/favoris`).
- **Responsive** : mobile, tablette et desktop, avec un menu burger en mobile.
- **Accessibilité** : navigation au clavier, libellés pour les lecteurs d'écran, focus visible.

## Stack technique

| Domaine | Outil |
|---|---|
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) + React 19 |
| Langage | TypeScript |
| Styles | Tailwind CSS 4 |
| Validation des données | [Zod](https://zod.dev/) |
| Tests unitaires | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) |
| Qualité | ESLint |

## Prérequis

- **Node.js 20.9 ou plus** (version minimale requise par Next.js 16) — vérifier avec `node -v`
- **npm** (installé avec Node.js)
- **Git**
- Le **back-end Kasa** (API Express) : [OpenClassrooms-Student-Center/dev-react-P12](https://github.com/OpenClassrooms-Student-Center/dev-react-P12)

## Installation

### 1. Le back-end (API)

```bash
git clone https://github.com/OpenClassrooms-Student-Center/dev-react-P12.git kasa-back
cd kasa-back
npm install
```

### 2. Le front-end (ce dépôt)

```bash
git clone https://github.com/cedric-payet-code/kasa-front.git kasa-front
cd kasa-front
npm install
```

### 3. Variables d'environnement

Copier le fichier d'exemple :

```bash
cp .env.example .env.local
```

| Variable | Description | Valeur par défaut |
|---|---|---|
| `API_URL` | URL de l'API Express | `http://localhost:3000` |
| `USE_MOCK_DATA` | `true` pour utiliser les données mockées au lieu de l'API | `false` |

## Lancement du projet

Le back-end et le front-end tournent en même temps, dans **deux terminaux** :

**Terminal 1 – API** (port 3000) :

```bash
cd kasa-back
npm start
```

Au premier lancement, la base SQLite (`data/kasa.sqlite3`) est créée et remplie automatiquement avec les logements de démonstration. La documentation de l'API est disponible sur http://localhost:3000/docs.html.

**Terminal 2 – Front-end** (port 3001) :

```bash
cd kasa-front
npm run dev
```

Le site est alors accessible sur **http://localhost:3001**.

> Le front-end tourne sur le port **3001** car l'API utilise déjà le port 3000.

### Lancer sans le back-end (données mockées)

Le dossier `lib/mocks/` contient une copie des 20 logements de l'API. Pour lancer le front-end sans le back-end, passer la variable à `true` dans `.env.local` :

```bash
USE_MOCK_DATA=true
```

C'est ce mode qui est utilisé pour le site déployé, le back-end n'étant pas en ligne.

## Déploiement (Vercel)

1. Importer le dépôt GitHub sur [Vercel](https://vercel.com/new) (framework détecté automatiquement : Next.js).
2. Dans *Settings → Environment Variables*, ajouter `USE_MOCK_DATA` = `true`.
3. Déployer : chaque push sur `master` redéploie automatiquement le site.

## Scripts disponibles

| Commande | Rôle |
|---|---|
| `npm run dev` | Lance le serveur de développement (http://localhost:3001) |
| `npm run build` | Construit la version de production |
| `npm start` | Lance la version de production (après `npm run build`) |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm test` | Lance les tests unitaires en mode surveillance |
| `npx vitest run` | Lance les tests unitaires une seule fois |

## Tests

Les tests unitaires portent sur les deux fonctionnalités clés :

- **Carrousel** (`components/carousel/Carousel.test.tsx`) : image affichée au départ, navigation avec les flèches, boucle dans les deux sens, navigation au clavier, absence de flèches avec une seule image, cas sans image.
- **Données mockées** (`lib/mocks/properties.test.ts`) : format de la liste et du détail, erreur pour un id inconnu.
- **Favoris** (`components/favorites/favorites.test.tsx`) : ajout et retrait, enregistrement dans le `localStorage`, relecture des favoris au retour sur le site, donnée corrompue ignorée, synchronisation des boutons d'un même logement.

```bash
npx vitest run
```

## Structure du projet

```
kasa-front/
├── app/                      # Pages et layouts (App Router)
│   ├── layout.tsx            # Layout commun : header, footer, provider des favoris
│   ├── page.tsx              # Page d'accueil
│   ├── error.tsx             # Page d'erreur (API injoignable…)
│   ├── favoris/              # Page « Vos favoris »
│   └── logement/[slug]/      # Page détail d'un logement (+ skeleton de chargement)
├── components/
│   ├── carousel/             # Carrousel et ses tests
│   ├── favorites/            # Context, bouton cœur, liste des favoris et tests
│   ├── home/                 # Sections de la page d'accueil
│   ├── layout/               # Header, menu mobile, footer, navigation
│   ├── property/             # Cartes, grille, galerie, infos, hôte
│   └── ui/                   # Composants réutilisables : Button, Icon, Tag
├── lib/
│   ├── api/                  # Appels à l'API (client + service des propriétés)
│   ├── favorites/            # Stockage des favoris dans le localStorage
│   ├── mocks/                # Données mockées (copie de l'API) pour le déploiement
│   └── schemas/              # Schémas Zod et types des données de l'API
└── public/images/            # Logos et photo du bandeau
```

## Choix techniques

- **Server components par défaut** : les pages et la plupart des composants sont rendus côté serveur (meilleur SEO et moins de JavaScript envoyé au navigateur). Seuls les composants interactifs sont des composants clients : carrousel, menu mobile, bouton favori, liens actifs.
- **Couche d'accès aux données isolée** (`lib/api`) : toutes les requêtes passent par `apiFetch`, qui valide chaque réponse avec un schéma **Zod**. Une donnée inattendue de l'API est détectée immédiatement, et les types TypeScript sont déduits des schémas.
- **Slug dans les URL** : les pages détail utilisent le slug (`/logement/appartement-cosy`), plus lisible et meilleur pour le référencement. L'API ne cherchant que par id, `getPropertyBySlug` retrouve l'id correspondant.
- **Favoris avec Context + localStorage** : un `FavoritesProvider` partage l'état dans toute l'application. Il s'appuie sur `useSyncExternalStore` pour lire le `localStorage` sans erreur d'hydratation, et synchronise les favoris entre plusieurs onglets.
- **Images optimisées** avec `next/image` : formats légers, tailles adaptées à l'écran, chargement différé hors écran et chargement prioritaire des images visibles en premier.
- **Documentation du code** : les fonctions et composants principaux sont documentés en **JSDoc** (`@param`, `@returns`, `@throws`).
