# MoneyTracker

A modern personal finance tracker built with Electron, React, and TypeScript. Track your credit scores, credit cards, bank accounts, and debts all in one place.

## Features

- 📈 **Credit Score Tracking** - Monitor scores from Canadian providers (Credit Karma, Borrowell, Equifax)
- 💳 **Credit Card Management** - Track limits, APR, fees, and rewards
- 🏦 **Bank Account Tracking** - Manage checking, savings, TFSA, and RRSP accounts
- 💰 **Debt Management** - Monitor CRA debts, loans, and payment schedules
- 📊 **Analytics & Charts** - Visual insights into your financial health
- 🌙 **Dark Theme** - Professional dark interface with green accents
- 🔄 **Auto-Updates** - Automatic updates via GitHub releases

## Privacy & Security

- ✅ **100% Local Data** - All your financial data stays on your device
- ✅ **No Cloud Sync** - No data is sent to external servers
- ✅ **Open Source** - Full transparency of code
- ✅ **No Telemetry** - Zero tracking or analytics

## Development

### Prerequisites
- Node.js 18+
- npm

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run electron:dev

# Build for production
npm run dist
```

### Publishing Updates

1. Update version in `package.json`
2. Create a git tag: `git tag v1.0.1`
3. Push tag: `git push origin v1.0.1`
4. GitHub Actions will automatically build and create a release

## Download

Download the latest version from the [Releases](https://github.com/WynterJones/MT/releases) page.

## Tech Stack

- **Electron** - Desktop app framework
- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **React Icons** - Professional icons
- **Vite** - Build tool

## License

MIT License - feel free to use and modify for personal use.
