
# Flint & Fern 🌲

### The Outdoors, Understood.

Flint & Fern is an interactive outdoor knowledge and learning platform designed to make information about nature, survival skills, wildlife, equipment, and environmental safety easier to discover and understand.

Built around the concept of an interconnected field encyclopedia, the application combines structured educational content, interactive visualizations, species identification tools, and guided learning experiences.

The application is currently developed under the name **Bakbone**, with an initial focus on North American outdoor knowledge and an architecture intended to support broader geographical coverage.

---

## Project Overview

Traditional outdoor resources often separate information into disconnected categories. Wildlife identification, navigation, camping skills, environmental hazards, and equipment knowledge are typically presented independently.

Flint & Fern aims to connect these subjects through a unified learning experience.

Users can browse field knowledge, explore related concepts, follow educational guides, and narrow potential species identifications using observable characteristics.

The platform emphasizes accessible information, practical learning, and responsible outdoor activity rather than gamification or engagement-based rewards.

## Key Features

### Interactive Field Encyclopedia

Explore educational entries covering:

- Wildlife and species identification
- Camping and wilderness skills
- Navigation techniques
- Outdoor equipment
- Environmental hazards and safety
- Animal tracks and signs
- Natural systems and concepts

Entries include structured metadata such as subject category, difficulty level, geographical region, and review information.

### Search and Discovery

The Explore interface provides a central location for browsing encyclopedia content.

Users can search for subjects, filter by domain, and navigate between related areas of outdoor knowledge.

### Guided Learning

Organized educational guides help users develop practical outdoor knowledge through structured learning paths.

The learning experience emphasizes:

- Foundational skills and prerequisites
- Relevant safety considerations
- Progression from introductory to advanced subjects
- Connections between related encyclopedia entries
- Self-directed exploration

### Trait-Based Identification

The identification interface allows users to narrow potential matches based on observable characteristics.

Rather than presenting identification as absolute certainty, the experience is designed to help users compare possibilities and understand uncertainty.

### Interactive 3D Visualizations

The application incorporates Three.js to create interactive educational and decorative visualizations.

The campfire visualization includes:

- Real-time WebGL rendering
- Custom 3D geometry
- Scene lighting and shadows
- Interactive model rotation
- Responsive canvas sizing
- Rendering lifecycle and visibility management

These visualizations help make outdoor concepts more engaging and easier to explore.

### Responsive User Interface

The application uses a custom interface built around natural colors, outdoor-inspired visual elements, readable typography, and responsive layouts.

The design prioritizes content accessibility and navigation across different screen sizes.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| TypeScript | Application development and type safety |
| React 19 | Component-based user interfaces |
| Next.js 16 | Application routing and rendering |
| Three.js | Interactive 3D graphics |
| Tailwind CSS 4 | Styling infrastructure |
| Vite / vinext | Development and build tooling |
| Cloudflare | Hosting and deployment integration |
| Drizzle ORM | Optional database infrastructure |
| Cloudflare D1 | Optional persistent storage |
| ESLint | Static code analysis |
| Node.js | JavaScript runtime |

The current application primarily uses structured local content. Database infrastructure is available for future development but is not yet fully implemented.

---

## Application Structure

The project is organized inside the `site/` directory.

```text
Flint-Fern/
└── site/
    ├── app/
    │   ├── components/
    │   ├── entry/
    │   ├── explore/
    │   ├── field-guide/
    │   ├── identify/
    │   ├── learn/
    │   ├── content.ts
    │   ├── entryDetails.ts
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── db/
    ├── drizzle/
    ├── examples/
    ├── public/
    ├── tests/
    ├── worker/
    ├── package.json
    ├── vite.config.ts
    └── tsconfig.json
```

### Major Components

**Home:** Introduces the platform and provides access to its primary educational features.

**Explore:** Provides encyclopedia browsing, searching, and subject filtering.

**Learn:** Presents curated learning guides and educational pathways.

**Identify:** Supports observation-based species and sign identification.

**Entry:** Displays individual encyclopedia subjects and supporting content.

**Field Guide:** Provides an additional outdoor reference experience.

**Components:** Contains reusable interface elements, including the interactive Three.js campfire visualization.

---

## Getting Started

### Prerequisites

- Node.js 22.13.0 or newer
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/Michael-Blake-Donaldson/Flint-Fern.git
```

Navigate into the application directory:

```bash
cd Flint-Fern/site
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local address displayed in the terminal to view the application.

### Production Build

Generate a production build:

```bash
npm run build
```

Run the production server:

```bash
npm run start
```

### Testing

Run the existing test command:

```bash
npm test
```

The test script builds the application and runs the included rendered-HTML test.

### Code Quality

Run ESLint:

```bash
npm run lint
```

---

## Design Philosophy

Flint & Fern is guided by three principles.

### 1. Knowledge Should Be Connected

Outdoor knowledge becomes more valuable when relationships between subjects are understandable.

Learning about a species should naturally lead to its habitat, tracks, behavior, and relevant safety considerations.

### 2. Learning Should Be Practical

The platform emphasizes information that can support responsible outdoor decisions.

Learning paths prioritize comprehension, preparation, and relevant prerequisites rather than points, streaks, or competitive progression.

### 3. Exploration Should Be Accessible

Users should be able to discover and learn about outdoor subjects without unnecessary barriers.

The interface is designed to encourage independent exploration through approachable navigation and organized content.

---

## Current Development Status

**Status: Active Development**

The repository currently includes:

- A structured Next.js application
- An outdoor-themed homepage
- Encyclopedia content and entry structures
- Search and exploration interfaces
- Guided learning pages
- Trait-based identification interfaces
- Interactive Three.js graphics
- Responsive styling
- Build and testing infrastructure

The application is still evolving, and not all planned functionality has been completed or independently validated for production use.

---

## Planned Improvements

Future development priorities include:

- Expanding encyclopedia coverage
- Adding more detailed species identification data
- Developing additional interactive 3D educational models
- Building richer relationships between encyclopedia entries
- Improving learning progress tracking
- Expanding regional coverage
- Adding persistent data storage where needed
- Improving offline access for field use
- Increasing automated test coverage
- Refining accessibility and mobile usability

---

## Engineering Focus

This project explores several areas of software engineering:

**Frontend Architecture:** Building reusable React components and structured application routes.

**Interactive Graphics:** Integrating a real-time Three.js rendering system into a React application.

**Content Modeling:** Representing diverse educational subjects through consistent TypeScript types and metadata.

**User Experience:** Creating an approachable information architecture for a content-heavy application.

**Performance:** Managing rendering resources, responsive behavior, and browser-based 3D graphics.

**Extensibility:** Organizing the application to support additional educational content, data models, and future functionality.

---

## Author

**Michael Blake Donaldson**

Computer Science Student — Software Engineering Concentration

GitHub: https://github.com/Michael-Blake-Donaldson

Portfolio: https://michael-blake-donaldson.github.io/MichaelDonaldson_Portfolio/

---

## License

No open-source license has been specified for this repository.

All rights reserved unless a license is added.

---

*Flint & Fern — Explore more. Understand the outdoors.*
