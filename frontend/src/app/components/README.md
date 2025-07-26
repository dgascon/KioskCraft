# 📁 Components Structure

Organisation simplifiée des composants avec imports centralisés.

## 🎯 **Usage**

```typescript
// ✅ Import depuis l'index
import { HeroSectionComponent, ThemeService, TranslatePipe } from "../components";

// ❌ Éviter les imports directs
import { HeroSectionComponent } from "../components/hero-section/hero-section";
```

## 🌍 **Usage i18n**

```typescript
// Dans le composant
import { TranslatePipe } from '../components';

@Component({
  imports: [TranslatePipe],
  // ...
})

// Dans le template
{{ 'hero.title' | translate }}
{{ 'hero.subtitle' | translate: {name: 'KioskCraft'} }}
```

## 📂 **Architecture**

```
components/
├── index.ts                    # 🚀 Point d'entrée unique
├── landing-page/              # 📄 Page principale
├── hero-section/              # 🎨 Section héro
├── features-section/          # ⚡ Fonctionnalités
├── stats-section/             # 📊 Statistiques
├── testimonials-section/      # 💬 Témoignages
├── cta-section/              # 🎯 Call-to-action
├── footer-section/           # 🦶 Pied de page
├── theme-toggle/             # 🌙 Basculeur thème
├── language-toggle/          # 🌍 Sélecteur de langue
└── seo-head/                 # 🔍 SEO metadata
```

## 🌙 **Dark Mode**

- **Service** : `ThemeService` avec persistance localStorage
- **Toggle** : Bouton fixe en haut à droite
- **Classes** : Toutes les sections supportent `dark:*`
- **Transition** : Animations fluides entre thèmes
- **Fix** : Utilise `@custom-variant dark (&:where(.dark, .dark *));` dans styles.scss

## 🌍 **Internationalisation (i18n)**

- **Langues** : Français (défaut) et Anglais
- **Service** : `TranslationService` avec fichiers JSON (`/locale/fr.json`, `/locale/en.json`)
- **Pipe** : `{{ 'key' | translate }}` dans les templates
- **Toggle** : Bouton fixe en haut à gauche
- **Persistance** : localStorage avec détection navigateur

## ➕ **Ajouter un composant**

1. Créer le dossier `components/mon-composant/`
2. Ajouter à `index.ts` : `export { MonComposant } from './mon-composant/mon-composant';`
3. Utiliser : `import { MonComposant } from '../components';`

## 🎨 **Conventions**

- **Standalone** : Tous les composants sont autonomes
- **TypeScript** : Interfaces pour les données
- **Tailwind** : Classes dark mode sur tous les éléments
- **Signals** : Pour la réactivité Angular
