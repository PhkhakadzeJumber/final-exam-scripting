# Final Exam Scripting — React E-Commerce App

## 🌐 Live Application

**Production URL:** [https://final-exam-scripting-g3xvzjn1p-phkhakadzejumbers-projects.vercel.app](https://final-exam-scripting-g3xvzjn1p-phkhakadzejumbers-projects.vercel.app)

---

## 📸 Screenshots

> - Screenshot of the hosted live application

<br>

<img width="1918" height="962" alt="devops img2" src="https://github.com/user-attachments/assets/029ff7f4-cae6-4126-8758-a48db4e1e354" />

<br><br>

> - Screenshot of the successful GitHub Actions run (✅)

<br>

<img width="1918" height="863" alt="devops img1" src="https://github.com/user-attachments/assets/4eebc270-77a2-4ba2-be8a-ad678fb51561" />

<br><br>

---

## ⚙️ Pipeline Description

This project uses **GitHub Actions** for a fully automated CI/CD pipeline. The pipeline is defined in `.github/workflows/config.yml` and runs on every push to the `master`, `main`, or `develop` branches, as well as on pull requests.

### Flow:

1. **Checkout** — The repository code is checked out onto the CI runner.
2. **Setup Node.js** — Node.js v22 is installed with npm caching enabled.
3. **Install Dependencies** — `npm ci` installs all dependencies cleanly from `package-lock.json`.
4. **Build** — `npm run build` compiles the React app into an optimized production bundle.
5. **Lint** — ESLint runs to check code quality (non-blocking, pipeline continues even with warnings).
6. **Run Tests** — `npm test -- --coverage` runs the test suite with coverage reporting.
7. **Deploy** — Only if all previous steps pass, the app is deployed to Vercel using the Vercel CLI.

### Quality Gate:

If the **tests fail**, the pipeline stops immediately and **deployment is blocked**. This ensures broken code never reaches production.

---

## 🚀 Deployment Strategy

### Strategy Chosen: Rolling Update (simulated via Vercel Instant Rollout)

A **Rolling Update** strategy gradually replaces the old version of the application with the new one, minimizing downtime. In this project, the strategy is implemented as follows:

- Every push to `master`/`main` triggers a new production deployment via the Vercel CLI (`vercel deploy --prod`).
- Vercel performs an **atomic deployment** — the new version is built and only made live after a successful build. There is no period where both old and new code are partially served.
- Every push to the `develop` branch triggers a **Preview deployment**, which acts as a staging environment to validate changes before they reach production.

This approach ensures:
- Zero-downtime deployments (Vercel swaps traffic instantly after a successful build)
- A staging environment (`develop` → Preview) to test before merging to production
- Every deployment is versioned and traceable in the Vercel dashboard

### Implementation Steps:

1. `develop` branch pushes deploy to Vercel **Preview** environment (staging).
2. After validation, code is merged to `master`.
3. Push to `master` triggers a **Production** deployment automatically.
4. Vercel routes 100% of traffic to the new deployment atomically — no partial rollout.

---

## 🔄 Rollback Guide

If a bug is discovered in production after a deployment, follow these steps to revert to the previous stable version:

### Option 1: Instant Rollback via Vercel Dashboard (Recommended)

1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on the **`final-exam-scripting`** project
3. Click the **"Deployments"** tab
4. Find the last known **stable/working deployment** in the list
5. Click the **three dots `...`** menu on the right side of that deployment
6. Click **"Instant Rollback"**
7. Confirm the rollback — Vercel instantly routes all traffic back to that deployment

✅ The rollback takes effect immediately with zero downtime.

### Option 2: Revert via Git and Redeploy

1. In your terminal, identify the last good commit:
   ```bash
   git log --oneline
   ```
2. Revert to the previous commit:
   ```bash
   git revert HEAD
   git push origin master
   ```
3. This triggers a new pipeline run which automatically deploys the reverted code to production.

---

## 🧪 Testing

The project includes a test suite using **Jest** and **React Testing Library**.

### Test Example:

```javascript
test('renders 3 products on default category', () => {
  render(
    <MemoryRouter initialEntries={['/category/man']}>
      <App />
    </MemoryRouter>
  );
  const productCards = screen.getAllByRole('img');
  expect(productCards.length).toBe(3);
});
```

This test verifies that the application correctly renders product images when navigating to a category page.

Tests are run automatically on every push. If they fail, deployment is blocked.

---

## 🛠️ Tech Stack

- **Frontend:** React (Create React App)
- **Hosting:** Vercel
- **CI/CD:** GitHub Actions
- **Package Manager:** npm
- **Testing:** Jest + React Testing Library
- **Deployment CLI:** Vercel CLI

---

## 📋 CI/CD Workflow File

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [master, main, develop]
  pull_request:

jobs:
  build-test-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Lint
        run: npm run lint || true

      - name: Run tests
        run: npm test -- --coverage

      - name: Deploy to Vercel (Preview - develop)
        if: github.ref == 'refs/heads/develop'
        run: |
          npm install -g vercel
          vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
          vercel deploy --yes --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

      - name: Deploy to Vercel (Production - main)
        if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master'
        run: |
          npm install -g vercel
          vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
          vercel deploy --prod --yes --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```
