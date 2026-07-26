# UI Components Architecture - Vyapar Mandap

Built with React 18, Vite, TypeScript, Tailwind CSS (Slate Dark Mode), Lucide Icons, and Framer Motion.

---

## 🎨 Design System Tokens

- **Background Palette**: `bg-slate-950` (`#020617`), `bg-slate-900` (`#0f172a`), `glass-card` (`rgba(15, 23, 42, 0.75)` with blur).
- **Accents**: Emerald (`#059669`) for financial success and credits; Rose (`#e11d48`) for liabilities and debits; Amber (`#d97706`) for review alerts.
- **Typography**: Inter for clean interface body text; JetBrains Mono for monetary values, GSTINs, and journal numbers.

---

## 🧩 Primary Components

1. **`Navbar.tsx`**: Top header featuring Organization Switcher (`M/S Sharma Traders`), live 10-Agent status badge, notification bell, and `Cmd+K` search bar trigger.
2. **`Sidebar.tsx`**: Left navigation sidebar with linear-style icons, active tab highlight, and immutable double-entry security badge.
3. **`CommandPalette.tsx`**: Global modal opened via `Cmd+K` keyboard shortcut for rapid action navigation.
4. **`ActivityTimeline.tsx`**: GitHub/Linear-style event ticker rendering live AI agent execution step logs and confidence metrics.
5. **`AgentMonitor.tsx`**: Interactive graph visualizer displaying deployed AI agents and status.
6. **`DocumentViewer.tsx`**: HTML5 Canvas rendering component for tax invoice previewing.
