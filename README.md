# RunRank

Classe ton niveau de coureur comme sur League of Legends. Entre ta distance et ton temps, et découvre ton rang.

## Fonctionnement

L'app calcule ton **allure (min/km)** et te classe dans un rang basé sur tes performances :

| Rang | Allure (min/km) | Percentile |
|------|-----------------|------------|
| Challenger | < 3:00 | Top 1% |
| Grandmaster | 3:00 – 3:30 | Top 3% |
| Master | 3:30 – 4:00 | Top 5% |
| Diamond | 4:00 – 4:30 | Top 10% |
| Platinum | 4:30 – 5:00 | Top 20% |
| Gold | 5:00 – 5:30 | Top 35% |
| Silver | 5:30 – 6:30 | Top 50% |
| Bronze | 6:30 – 7:30 | Top 70% |
| Iron | > 7:30 | Top 85%+ |

## Stack

- **React 18** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS** — styling
- **shadcn/ui** — composants UI
- **lucide-react** — icônes

## Démarrage

```bash
# Installer les dépendances
npm install

# Lancer en dev
npm run dev

# Build de production
npm run build
```

## Distances supportées

5 km · 10 km · Semi-marathon (21,1 km) · Marathon (42,2 km)

## License

MIT
