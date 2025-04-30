# JobMatch website

![JobMatch](/public/logo.png)

## Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   │   └── homepage/
│   │       └── -index.md
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── react/
│   ├── styles/
│   ├── types/
│   └── utils/
└── package.json
```

## 📝 Content Management

All website content is stored in Markdown files located in the `src/content/` directory:

- Homepage content: `src/content/homepage/-index.md`

## 🚢 Deployment

The website is automatically deployed when changes are pushed to the main branch. The deployment is handled by a GitHub Actions workflow defined in `.github/workflows/deploy.yml`.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `yarn install`         | Installs dependencies                            |
| `yarn dev`             | Starts local dev server at `localhost:4321`      |
| `yarn build`           | Build your production site to `./dist/`          |
| `yarn preview`         | Preview your build locally, before deploying     |
| `yarn astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `yarn astro -- --help` | Get help using the Astro CLI                     |
