# Adekan - Real-time Text Analysis Tool

A modern, responsive web application built with Angular 21 that provides comprehensive real-time text analysis including character count, word count, sentence count, reading time estimation, and letter frequency visualization.

##  Features

- **Real-time Text Analysis**: Instant feedback as you type
- **Character Counting**: With optional space exclusion
- **Word & Sentence Counting**: Accurate text statistics
- **Reading Time Estimation**: Based on average reading speed
- **Letter Frequency Visualization**: Interactive density charts
- **Character Limit Control**: Configurable text limits with warnings
- **Dark/Light Theme Toggle**: Persistent theme preferences
- **Text Persistence**: Content saved across browser sessions
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Accessibility**: Full keyboard navigation and screen reader support

##  Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (v21.0.4)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd adekan

# Install dependencies
npm install

# Start development server
ng serve
```

Open your browser and navigate to `http://localhost:4200/`

##  Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/           # App header with theme toggle
│   │   ├── text-input/       # Main textarea with persistence
│   │   ├── controls/         # Analysis controls panel
│   │   ├── stats-cards/      # Statistics display cards
│   │   ├── letter-density/   # Letter frequency visualization
│   │   └── limit-popup/      # Character limit warning modal
│   ├── pages/
│   │   └── home/            # Main application page
│   ├── services/
│   │   ├── theme.service.ts     # Theme management
│   │   └── text-analysis.service.ts # Text processing logic
│   └── app.ts               # Root component
├── assets/                  # Images, icons, and fonts
└── styles.css              # Global styles and CSS variables
```

##  Components Overview

### Header Component
- Logo display with theme-aware switching
- Theme toggle button with keyboard support
- Responsive design for all screen sizes

### Text Input Component
- Large textarea for text input
- Character limit enforcement
- localStorage persistence
- Warning messages for limit exceeded

### Controls Component
- Space exclusion toggle
- Character limit configuration
- Reading time display

### Stats Cards Component
- Character count display
- Word count statistics
- Sentence count analysis
- Hover animations and responsive layout

### Letter Density Component
- Interactive letter frequency visualization
- Percentage-based density bars
- Responsive grid layout

### Limit Popup Component
- Modal warning for character limit exceeded
- Accessible with keyboard navigation
- Auto-dismiss functionality

##  Services

### ThemeService
- Manages dark/light theme switching
- Persists theme preference in localStorage
- Observable-based theme change notifications

### TextAnalysisService
- Real-time text processing
- Character, word, and sentence counting
- Reading time estimation
- Letter frequency analysis

##  Usage

1. **Enter Text**: Type or paste text into the main textarea
2. **View Statistics**: Real-time updates in the stats cards
3. **Toggle Options**: Use controls to exclude spaces or set character limits
4. **Switch Themes**: Click the theme toggle in the header
5. **Analyze Density**: View letter frequency in the density visualization

##  Responsive Design

- **Desktop** (1024px+): Full layout with all components visible
- **Tablet** (768px-1023px): Optimized spacing and component sizing
- **Mobile** (767px and below): Stacked layout with touch-friendly controls

## ♿ Accessibility Features

- Full keyboard navigation support
- ARIA labels and roles
- Screen reader compatibility
- Focus management
- High contrast theme support



##  Building

Build for production:
```bash
ng build
```

Build artifacts will be stored in the `dist/` directory.

##  Configuration

### Theme Customization
Modify CSS variables in `src/styles.css`:
```css
:root {
  --purple: #d3a0fa;
  --yellow: #ff9f00;
  --orange: #fe8159;
  /* ... other variables */
}
```

### Character Limits
Default character limit is 300, configurable through the controls panel.

##  Dependencies

- **Angular 21**: Modern web framework
- **RxJS**: Reactive programming
- **TypeScript**: Type-safe JavaScript
- **Vitest**: Fast unit testing

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention
This project follows [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions or modifications

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

##  Acknowledgments

- Angular team for the excellent framework
- DM Sans font family for typography
- Icons and patterns from the design system

---

**Built with using Angular 21**
