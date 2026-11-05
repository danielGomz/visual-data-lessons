# Visual Data Lessons

**🎬 The code behind the videos.**

Visual lessons in Data Science, Python, Mathematics, Statistics, and Computer Science — powered by **React, TypeScript, and Remotion**.

This repository contains the source code, animations, and reusable components for producing educational videos from *Visual Data Lessons*.

The goal is to make technical concepts easier to understand through clear explanations, mathematical visualizations, and thoughtfully designed animations.

## Tech Stack

- **React** — Declarative visual components.
- **TypeScript** — Type-safe animation development.
- **Remotion** — Programmatic video creation and rendering.
- **pnpm** — Dependency management.
- **ESLint and Prettier** — Code quality and formatting.

Additional tools for visualization, scientific computing, and code highlighting will be introduced as needed.

## Getting Started

### Requirements

To render videos locally, you need:

- [Node.js](https://nodejs.org/) — Use the version specified in `.nvmrc`.
- [pnpm](https://pnpm.io/) — Use the version specified in `package.json`.
- Git.
- An internet connection for the initial installation of dependencies and any required rendering tools.

You do not need Manim or a Python environment to render the current test episode.

### 1. Clone the Repository

```bash
git clone https://github.com/danielGomz/visual-data-lessons.git
cd visual-data-lessons
```

### 2. Set Up Node.js and pnpm

If you use **nvm**, you can install and activate the project's Node.js version:

```bash
nvm install
nvm use
```

If Corepack is available, enable it to manage the package manager version declared in `package.json`:

```bash
corepack enable
```

Verify your environment:

```bash
node --version
pnpm --version
```

If you do not use nvm or Corepack, install compatible versions of Node.js and pnpm using your preferred method.

### 3. Install Dependencies

```bash
pnpm install
```

The repository includes `pnpm-lock.yaml` to help reproduce dependency versions.

If pnpm requests approval to execute dependency build scripts, review the requested packages before approving them.

### 4. Verify the Installation

```bash
pnpm check
pnpm lint
pnpm format:check
```

These commands check TypeScript, ESLint rules, and formatting without changing source files.

## Available Videos and Compositions

Videos are organized into episodes under `src/videos/`.

Each episode provides its own Remotion entry point, usually `index.tsx`, which registers the videos that can be previewed or rendered.

The current repository includes `000-test`, a development episode for validating shared animations.

| Composition ID | Content | Format |
|---|---|---|
| `Test000` | Intro + test scene + outro | Landscape, 16:9 |
| `Test000Short` | Test scene only | Portrait, 9:16 |
| `TestIntroVertical` | Shared intro preview | Portrait, 9:16 |
| `TestOutroVertical` | Shared outro preview | Portrait, 9:16 |
| `TestSubscribeVertical` | Subscription reminder preview | Portrait, 9:16 |

The three standalone vertical previews are development compositions, not published lessons.

### List Available Compositions

```bash
pnpm compositions src/videos/000-test/index.tsx
```

Use this command to discover valid composition IDs before rendering. Each future episode will register its own compositions.

## Preview Videos

Open Remotion Studio:

```bash
pnpm dev src/videos/000-test/index.tsx
```

Remotion Studio allows you to select a composition, inspect its timeline, preview animations, and render a video.

## Render Videos

Use the following command structure:

```bash
pnpm render <entry-point> <composition-id> <output-file> [options]
```

The examples below use the `000-test` episode.

### Quick Preview — Low Resolution

For faster development renders:

```bash
pnpm render src/videos/000-test/index.tsx Test000 renders/test-preview.mp4 --scale=0.5 --crf=24
```

Output: **960 × 540**, 30 FPS.

### Full HD — Landscape

```bash
pnpm render src/videos/000-test/index.tsx Test000 renders/test-hd.mp4 --scale=1 --crf=18
```

Output: **1920 × 1080**, 30 FPS.

### 4K — Landscape

```bash
pnpm render src/videos/000-test/index.tsx Test000 renders/test-4k.mp4 --scale=2 --codec=h264 --crf=16
```

Output: **3840 × 2160**, 30 FPS.

### Full HD — Vertical Short

```bash
pnpm render src/videos/000-test/index.tsx Test000Short renders/short-hd.mp4 --scale=1 --crf=18
```

Output: **1080 × 1920**, 30 FPS.

### 4K — Vertical Short

```bash
pnpm render src/videos/000-test/index.tsx Test000Short renders/short-4k.mp4 --scale=2 --codec=h264 --crf=16
```

Output: **2160 × 3840**, 30 FPS.

### Understanding Render Quality

Resolution and compression are independent settings:

| `--scale` | Purpose |
|---|---|
| `0.5` | Lower-resolution preview |
| `1` | Composition's original resolution |
| `2` | Double the composition's width and height |

For H.264 encoding, a lower `--crf` generally produces better quality and larger files.

The examples use `24` for previews, `18` for Full HD, and `16` for high-quality 4K output.

Scaling does not change a composition's orientation or create additional detail in low-resolution source recordings.

All generated files are saved under `renders/`, which is excluded from Git.

## Project Structure

```text
visual-data-lessons/
├── public/
│   └── assets/
│       ├── audio/                 # Optional local audio
│       ├── fonts/
│       │   └── FiraCode/
│       └── images/
│           └── logo.png
│
├── src/
│   ├── common/
│   │   ├── components/
│   │   │   └── SubscribeReminder.tsx
│   │   ├── scenes/
│   │   │   ├── Intro.tsx
│   │   │   └── Outro.tsx
│   │   └── theme.css
│   │
│   └── videos/
│       └── 000-test/
│           ├── scenes/
│           │   └── Scene01.tsx
│           ├── Video.tsx
│           └── index.tsx
│
├── .gitignore
├── .nvmrc
├── .prettierignore
├── .prettierrc.json
├── eslint.config.mjs
├── LICENSE
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── tsconfig.json
```

### Shared Components

The `src/common/` directory provides reusable components:

- **Intro** — Animated introduction with a configurable video title and optional music.
- **Outro** — Closing animation featuring the project logo, farewell messages, and optional music and narration.
- **SubscribeReminder** — Animated subscription prompt with a cursor, notification bell, and Like interaction.
- **theme.css** — Shared typography, colors, and visual identity.

### Episode Structure

Each episode lives in its own directory under `src/videos/`.

Typically:

- `index.tsx` registers the available Remotion compositions.
- `Video.tsx` assembles the full video.
- `scenes/` contains individual scenes.

Episode-specific scripts, data, images, and recordings belong to the episode that uses them.

An episode may also include its own `README.md` with additional requirements or instructions for reproducing its output.

## Full Videos and Shorts

The project is designed to produce multiple outputs from the same educational content.

**Full videos** use a landscape composition and assemble multiple scenes in sequence, usually with the shared intro and outro.

**Shorts** use portrait compositions that render selected scenes from the full video.

Scenes can use Remotion's `useVideoConfig()` to adapt their layout to the composition's aspect ratio.

Reusing a scene does not guarantee that it will automatically look good in both formats. Content-heavy scenes and screen recordings may require specific layout adjustments for portrait orientation.

## Optional Audio Assets

Some media used during production is intentionally not redistributed with this repository.

The shared intro and outro support these optional local files:

```text
public/assets/audio/
├── intro.wav
├── outro.mp3
└── outro-voice.wav
```

| File | Purpose |
|---|---|
| `intro.wav` | Intro music |
| `outro.mp3` | Outro piano music |
| `outro-voice.wav` | Optional spoken farewell |

These files are **not required to render the current test episode**.

When the relevant audio file is missing, the corresponding shared component renders without that audio track. The visual animation and its configured duration remain unchanged.

The original music files are not provided for download through this repository.

If you add audio locally, verify that you have permission to use it for your intended purpose.

**Important:** Permission to use a soundtrack in a video does not necessarily include permission to redistribute the original audio recording.

Future episodes may introduce other media dependencies. Consult each episode's documentation for any required recordings, datasets, or external assets.

## Development Commands

| Command | Description |
|---|---|
| `pnpm dev <entry-point>` | Open Remotion Studio |
| `pnpm render <entry-point> <composition-id> <output>` | Render a video |
| `pnpm compositions <entry-point>` | List compositions |
| `pnpm check` | Check TypeScript |
| `pnpm lint` | Run ESLint |
| `pnpm format:check` | Check formatting |
| `pnpm format` | Apply Prettier formatting |

## Development Philosophy

Visual Data Lessons follows a few simple principles:

1. **Keep lessons independent.** Each episode owns its scenes, scripts, data, and episode-specific assets.
2. **Reuse shared elements.** Branding and common animations belong in `src/common/`.
3. **Prioritize clarity.** Animations should support understanding, not distract from it.
4. **Build incrementally.** Introduce dependencies and abstractions when they solve real problems.
5. **Support reproducible rendering.** Document required assets and avoid unnecessary reliance on private resources.

## Assets and Licensing

The repository includes FiraCode Nerd Font files together with their corresponding license and documentation.

Third-party assets remain subject to their respective licensing terms.

The root `LICENSE` file governs the material covered by that license; it does not override the licenses of third-party fonts, recordings, or other assets.

If you reuse or redistribute resources from this repository, review the applicable licenses.

---

**Visual Data Lessons**
*The code behind the videos.*