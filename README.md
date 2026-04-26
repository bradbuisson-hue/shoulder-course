# The Shoulder & Rotator Cuff — Clinical Course

A self-contained, single-page course for placement students. Five modules covering anatomy, common pathologies, rehabilitation techniques, programming, and session planning — plus a built-in AI study tutor (Claude) and a separate **admin page** for managing video URLs without editing code.

Built with React + Vite + Tailwind. Deploys to Netlify in one click. Progress is stored in the browser's localStorage; video URLs are stored in Netlify Blobs (server-side) so they're shared across devices and persist across deployments.

---

## What's new in v1.1

- 🌗 **Dark / light theme toggle** with system preference detection
- 🎨 **Sleek modern redesign** — Geist typography, emerald accent, glassy panels, subtle gradients
- 🛠 **Admin page** at `/admin` for managing video URLs through forms (no code editing required)
- 💾 Video URLs stored server-side via Netlify Blobs — instant updates, no rebuild

---

## Project structure

```
shoulder-course/
├─ src/
│  ├─ App.jsx                    — main shell + admin route detection
│  ├─ index.css                  — Tailwind + theme tokens
│  ├─ content/
│  │  └─ modules.js              ★ ALL COURSE CONTENT — edit for lessons/quizzes
│  ├─ components/
│  │  ├─ AdminView.jsx           — /admin page for managing video URLs
│  │  ├─ CoverView.jsx           — landing page
│  │  ├─ ModuleView.jsx          — renders one module's lessons
│  │  ├─ Quiz.jsx                — quiz with instant feedback
│  │  ├─ CaseStudy.jsx           — case study + reflection textarea
│  │  ├─ TasksView.jsx           — task log with auto-save
│  │  ├─ AssessmentView.jsx      — end-of-week summative
│  │  ├─ ChatTutor.jsx           — AI tutor UI
│  │  ├─ Sidebar.jsx             — module navigation
│  │  ├─ ThemeToggle.jsx         — light/dark switch
│  │  ├─ VideoEmbed.jsx          — YouTube/Vimeo/mp4 player
│  │  └─ LessonContent.jsx       — typed-block content renderer
│  ├─ hooks/
│  │  ├─ useProgress.js          — localStorage progress + reset
│  │  ├─ useVideos.js            — fetches video URLs from /api/videos
│  │  └─ useTheme.js             — theme management
│  └─ lib/                       — icon set + inline markdown
└─ netlify/functions/
   ├─ chat.js                    — AI tutor proxy → Anthropic API
   └─ videos.js                  — video URL CRUD via Netlify Blobs
```

---

## Required environment variables

Set these in Netlify → Site settings → Environment variables (and in a local `.env` file for dev):

| Variable             | Required | What it does                                      |
| -------------------- | -------- | ------------------------------------------------- |
| `ANTHROPIC_API_KEY`  | Yes      | Powers the AI tutor. Get one at console.anthropic.com |
| `ADMIN_PASSWORD`     | Yes      | Required to save changes from the `/admin` page   |
| `ANTHROPIC_MODEL`    | No       | Defaults to `claude-sonnet-4-5`                   |

---

## Local development

You need **Node 18+** and the **Netlify CLI**.

```bash
# one-time
npm install -g netlify-cli

# in this folder
npm install
```

Create a file called `.env` in the project root:

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
ADMIN_PASSWORD=pick-something-good
```

Then run:

```bash
netlify dev
```

Site at **http://localhost:8888**, admin at **http://localhost:8888/admin**.

> **Important:** use `netlify dev`, not `npm run dev`. The plain Vite dev server doesn't run the serverless functions, so the AI tutor and admin saves will fail.

---

## Deploying to Netlify

### Option A — connect your GitHub repo (recommended)

1. Push this folder to GitHub.
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**.
3. Select your repo. Netlify reads `netlify.toml` and configures the build automatically.
4. Before the first deploy, in **Site settings → Environment variables**, add:
   - `ANTHROPIC_API_KEY` = `sk-ant-…`
   - `ADMIN_PASSWORD` = a password you'll remember
5. Trigger a deploy. Live in ~90 seconds.

### Option B — deploy from your terminal

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify env:set ANTHROPIC_API_KEY sk-ant-your-key-here
netlify env:set ADMIN_PASSWORD your-admin-password
netlify deploy --prod
```

---

## Adding videos (the easy way — no code)

Once deployed, navigate to **`https://your-site.netlify.app/admin`**.

1. Enter your `ADMIN_PASSWORD` at the top.
2. Paste a video URL next to each lesson.
3. Click **Save changes**.

Changes are live immediately — no rebuild, no git push. The student's next page load will show the videos.

**Supported URL formats:**
- YouTube: `https://www.youtube.com/watch?v=VIDEO_ID` or `https://youtu.be/VIDEO_ID`
- Vimeo: `https://vimeo.com/VIDEO_ID`
- Direct file: any URL ending in `.mp4` or `.webm`

YouTube unlisted videos work fine — they embed even though they don't appear in search.

> Tip: if you change `ADMIN_PASSWORD` later, you'll need to update it in Netlify env vars and trigger a new deploy for the change to take effect.

---

## Editing lesson content

Lesson copy, quiz questions, case studies and tasks all live in **`src/content/modules.js`**. The file is heavily commented.

### Available block types (inside `lesson.blocks`)

| Type           | Shape                                                            |
| -------------- | ---------------------------------------------------------------- |
| `p`            | `{ type: 'p', text: '...' }`                                     |
| `h`            | `{ type: 'h', text: '...' }` (sub-heading)                       |
| `ul`           | `{ type: 'ul', items: ['...', '...'] }`                          |
| `ol`           | `{ type: 'ol', items: ['...', '...'] }`                          |
| `callout`      | `{ type: 'callout', tone: 'sage' \| 'rust', title?, text }`      |
| `quote`        | `{ type: 'quote', text, by? }`                                   |
| `definition`   | `{ type: 'definition', term, text }`                             |

Inside any text, `**bold**` and `*italic*` render correctly.

After editing, push to GitHub (if connected) or run `netlify deploy --prod`. The site rebuilds in ~90 seconds.

---

## Customising the look

Theme tokens live in **`src/index.css`** (under `:root` for light, `.dark` for dark). Adjust the RGB triples to change colours globally.

Default palette: **emerald accent** (`#059669` light / `#10B981` dark) on a near-monochrome zinc base. Typography is Geist for sans and Geist Mono for code/numerals.

---

## Resetting student progress

In the header, the circular arrow icon at the right opens a confirmation dialog. Confirming clears all localStorage data on this device — quiz scores, task notes, case reflections, chat history. Useful when handing the course to a new placement student.

> Note: this does NOT clear video URLs (which are server-side). Those persist for everyone.

---

## Tech stack

- **React 18** + **Vite 5**
- **TailwindCSS 3** with CSS variable theme tokens
- **Netlify Functions** (Node, v2) for the AI tutor and video storage
- **Netlify Blobs** for server-side persistence of video URLs
- **Anthropic Messages API** (`claude-sonnet-4-5` by default)
- No icon library, no markdown library, no UI library — kept lean

---

## Troubleshooting

**"Could not reach tutor" in the AI tutor.**
Check `ANTHROPIC_API_KEY` in Netlify environment variables. For local dev, ensure `.env` is set and you're running `netlify dev`.

**"Wrong password" on the admin page.**
The password must exactly match `ADMIN_PASSWORD` in Netlify env vars. After changing the env var, trigger a new deploy.

**Admin saves succeed but videos don't appear.**
Hard-refresh the lesson page (Cmd+Shift+R). The site fetches the URL list once on page load.

**Videos don't render even though the URL is correct.**
Check the URL format — see "Supported URL formats" above. Private YouTube videos won't work; unlisted will.

**Want a different model.**
Set `ANTHROPIC_MODEL` to any current model identifier (e.g. `claude-opus-4-5`).

---

*For educational use during placement.*
