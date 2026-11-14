# Forward website

A responsive, interactive company website for custom software engineering, business automation and business intelligence. This project uses plain HTML, CSS and JavaScript so it can be deployed as static files without a build step or runtime dependencies.

## Run locally

Open `index.html` in a browser, or serve this directory with any static web server. For example, from this folder:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Clean URL routes require a static host configured to serve `index.html` as the fallback for application paths.

## Configure before launch

Edit the `CONFIG` object near the top of `app.js`:

- `email`, `phone`, `linkedin`, and `address`: actual company contact details. Leave empty to display “To be configured.”
- `siteUrl`: production origin, for example `https://www.yourcompany.com`; enables page canonical URLs.
- `formEndpoint`: HTTPS endpoint accepting a JSON `POST` from the contact form and returning a successful 2xx response. Configure the endpoint and any required spam protection/CORS on the receiving service. The form explicitly reports that submissions are disabled when no endpoint is set.
- `companyName`: actual company brand.

The form sends name, business email, company, phone, requested service, budget, timeline and project description. It includes a honeypot field and browser-native required/email validation. A valid service endpoint is intentionally not fabricated.

Before deploying, replace `YOUR_DOMAIN_HERE` in `robots.txt` and `sitemap.xml`, review the privacy policy for the selected form provider and applicable jurisdiction, and replace the sample brand “Forward” if needed.

## Build and deploy

There is no compilation step. Upload the project files to a static hosting provider and enable SPA fallback routing for `index.html` (the included `_redirects` does this on Netlify-compatible hosts). Assets and client-side routes support a GitHub Pages project-site subpath. The color palette automatically follows the visitor's light/dark browser preference. The site includes responsive layouts, keyboard-visible focus styles, reduced-motion handling, metadata, structured data, robots and sitemap files.
