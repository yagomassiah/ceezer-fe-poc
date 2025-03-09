# Ceezer Carbon Footprint Calculator POC

This proof-of-concept application was developed with significant assistance from AI (Claude), particularly in areas of:
- Component styling using shadcn/ui
- React hooks architecture and state management
- TypeScript type definitions and validation
- Code organization and architectural patterns

## 🤖 AI Contribution

The AI (Claude) was particularly helpful in:
- Setting up the clean architecture pattern with services, hooks, and components
- Implementing proper TypeScript types and validation
- Creating reusable UI components with shadcn/ui
- Handling edge cases and error states
- Unit conversion and emissions calculations

While the core business logic and requirements were human-defined, the AI helped streamline the development process and ensure best practices were followed.

## 🚀 Getting Started

### Prerequisites

1. Install [Bun](https://bun.sh/) (our package manager):
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. Verify Bun installation:
   ```bash
   bun --version
   ```

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd ceezer-fe-poc
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun run dev
   ```

4. Open [http://localhost:3000/emissions](http://localhost:3000/emissions) in your browser

## 🏗️ Project Structure

```
src/
  ├── app/
  │   └── modules/
  │       └── emissions/
  │           ├── api/
  │           │   └── emissionsCalculator.ts
  │           ├── services/
  │           │   └── emissionsService.ts
  │           ├── hooks/
  │           │   └── useEmissions.ts
  │           ├── components/
  │           │   └── EmissionsForm.tsx
  │           └── types.ts
  └── components/
      └── ui/
          └── [shadcn-ui components]
```

## 🧮 Features

- Calculate carbon footprint from multiple emission sources:
  - Transportation (plane, gasoline car, electric car)
  - Home Energy (electricity, natural gas, heating oil, solar)
  - Food Consumption (various food types)
- Real-time calculations and updates
- Category-specific unit handling (km, kWh, m³, L, kg)
- Detailed emission breakdowns by category
- Input validation and error handling

## 🛠️ Technical Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui
- Bun package manager

## 📝 Development Notes

- The application uses a clean architecture pattern with separate concerns for:
  - Data types and constants (`types.ts`)
  - Business logic (`emissionsCalculator.ts`)
  - Service layer (`emissionsService.ts`)
  - State management (`useEmissions.ts`)
  - UI components (`EmissionsForm.tsx`)

- All emission factors are stored in constants and can be easily updated
- Unit conversions are handled automatically based on the emission type
- The UI is responsive and follows modern design practices

## 🤝 Contributing

Feel free to submit issues and enhancement requests. Please note that this is a proof-of-concept application.
