# AGENTS.md

Instructions for AI coding agents (Cursor, Claude Code, Windsurf, Copilot, etc.)
working in this repository.

## About the students

Students are beginners learning JavaScript, APIs, and how to use OpenAI.
Generate the simplest, most beginner-friendly code possible. Add comments
explaining each part of the code.

## Security rules — apply to ALL suggestions

1. **Never create files containing API keys or secrets** of any kind.
   Forbidden filenames include `secret.js`, `secrets.js`, `config.js`,
   `key.js`, `api-key.js`, or anything similar.
2. **Never write hardcoded credential strings** like `const apiKey = "sk-..."`
   in any JS, TS, JSON, or config file.
3. If a student asks you to add a key to the project, **stop and explain**:
   this project uses a class-hosted proxy, so students do not handle keys.
   Point them to the README setup section.
4. JavaScript files in this project are served publicly and will be scanned
   by bots within minutes of being pushed to GitHub. There is no safe way
   to put a key in client-side code.

## Architecture

- Frontend (HTML + plain JS) → calls a class-hosted proxy URL → OpenAI
- The proxy URL is provided in the README.
- Students never touch the OpenAI API key directly.

## Code conventions

- Use OpenAI's `gpt-4.1` model unless asked otherwise.
- Use the `messages` parameter (not `prompt`) and read
  `data.choices[0].message.content`.
- Use `async/await` for all API calls.
- Use `const` and `let` for variables.
- Use template literals for string formatting and DOM insertion.
- Do NOT use `npm` packages or Node SDKs.
- Do NOT use `export` / `import`. Link JS files from `index.html` instead.
- Add comments explaining each part of the code.
