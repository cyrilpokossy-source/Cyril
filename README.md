# Synapse

Plateforme de révision — Faculté des Sciences, Université de Douala.

## Déploiement Vercel

1. Importez ce dépôt dans Vercel (Import Git Repository).
2. Framework : détecté automatiquement (Vite / TanStack Start).
3. Ajoutez ces variables d’environnement :

| Variable | Valeur |
|---|---|
| `VITE_AUTH_ENABLED` | `true` |
| `BETTER_AUTH_URL` | URL publique, ex. `https://votre-app.vercel.app` (sans slash final) |
| `BETTER_AUTH_SECRET` | chaîne secrète aléatoire (32+ caractères) |
| `DATABASE_URL` | URL Postgres (Neon) |
| `GROK_AUTH_ISSUER` | `https://auth.grok.me` |
| `GROK_AUTH_CLIENT_ID` | client Grok de l’app |
| `GROK_AUTH_CLIENT_SECRET` | secret Grok de l’app |

4. Déployez. Après le premier déploiement, mettez `BETTER_AUTH_URL` à l’URL réelle puis redéployez.

Connexion : **Google** (bouton principal) ou e-mail / mot de passe.
