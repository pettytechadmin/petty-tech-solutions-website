# Petty Tech Solutions

Approved static website for Petty Tech Solutions, serving Frisco, Little Elm, Prosper, The Colony and nearby North Texas communities.

## Project

- `dist/` — complete production website; this is the future hosting output directory.
- `dist/assets/brand/` — approved SVG and PNG brand assets, social artwork and `brand-guide.md`.
- `dist/assets/config.js` — public Formspree submission endpoint.
- `dist/assets/main.js` — existing navigation and AJAX contact-form behavior.
- `dist/assets/styles.css` — approved responsive styling.

Plain HTML, CSS and Vanilla JavaScript. No dependency installation or build step required. No external fonts or JavaScript libraries.

The business owner reports that the contact form was tested successfully and the notification email was received. It uses the public Formspree endpoint `https://formspree.io/f/xbgdqnyq`. The form's notification destination is configured in Formspree, not through an email password in the website. The `email` field supplies Reply-To. Never add private API keys, passwords or tokens to browser files.

## Local preview

Open `dist/index.html` in a browser, or run `python -m http.server 8000 --directory dist` from the project folder and visit http://localhost:8000. On Windows, use `py` instead of `python` if needed. Submitting the form sends a real request.

## Put this project in GitHub

Repository: https://github.com/pettytechadmin/petty-tech-solutions-website

1. Extract the supplied GitHub-ready ZIP.
2. Open the extracted `petty-tech-solutions-website` folder. Its contents are `dist`, `README.md` and `.gitignore`.
3. Open the repository in GitHub. Select **Add file → Upload files**. For an empty repository, use the **uploading an existing file** link.
4. Drag the three items inside the extracted folder into the upload area. Preserve `dist` as a folder. Do not upload the ZIP, the outer folder or just `dist`'s contents.
5. Review the upload list. The homepage must be `dist/index.html`, with `README.md` at the repository root. This package has 28 files and fits a single browser upload.
6. Use a commit message such as **Add approved Petty Tech Solutions website**. If the repository already has a branch, select a new branch named `website-ready`, then propose the changes. Leave it unmerged until any hosting automation is understood. For an empty, unconnected repository, commit its first files to `main`.
7. Verify the file tree. Uploading to GitHub is the source-storage step; do not enable GitHub Pages or connect a host yet.

If existing files would be replaced, review the differences first. If hosting or an existing deployment workflow is already connected, a commit can trigger it; stop before committing and check that configuration. This package itself contains no GitHub Actions or deployment workflow. Branch preview deployments are also possible with a connected host.

## Future hosting — not enabled

When separately approved, Cloudflare Pages can use production branch `main`, no framework preset, build command `exit 0`, and output directory `dist`. Do not deploy or change DNS during the repository upload. Preserve business-email DNS records during any later domain setup.

## Public-repository review

The prepared package was checked for credential files, common token/private-key patterns, environment files, personal/customer data, source maps, logs, build tools, temporary previews and image metadata. No secrets were found. Intentional public information is limited to the approved business name, business contact details, service areas, production domain and public Formspree endpoint. The security header file `_headers` is required production configuration and should be committed.

Development scripts, test harnesses, internal QA logs, standalone previews, concept sheets, screenshots and unused legacy logo assets are not included. Required production HTML, CSS, JavaScript and official brand assets match the approved originals byte for byte.

Browser/device testing was not available in the assistant environment; the owner has approved the site and reported successful form delivery. This package does not claim a comprehensive browser or security audit.

Official GitHub upload instructions: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
