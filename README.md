# Future Tech Blog

A modern technology blog built with Next.js 15, React 19, and TailwindCSS.

## 🚀 Technologies

- **Next.js 15** - React framework with App Router
- **React 19** - Library for user interfaces
- **TypeScript** - Typed superset of JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **ESLint** - Linter for JavaScript/TypeScript code

## 📋 Prerequisites

- Node.js 18+
- npm, yarn, pnpm or bun

## 🛠️ Installation

```bash
# Clone the repository
git clone <repository-url>
cd Future-Tech-Blog

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

## 🏃‍♂️ Running the Project

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
Future-Tech-Blog/
├── src/
│   └── app/
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── public/
├── docs/
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

## 🔄 Development Workflow

### 1. Initial Setup

- Clone the repository
- Install dependencies
- Configure environment variables (if needed)

### 2. Git Workflow

#### Branches

- `main` - Main branch (production)
- `develop` - Development branch
- `feature/feature-name` - New features
- `fix/bug-name` - Bug fixes
- `hotfix/hotfix-name` - Urgent fixes

#### Development Process

```bash
# 1. Create new branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/new-feature

# 2. Develop the feature
# Make frequent and descriptive commits

# 3. Before pushing, verify everything is ok
npm run lint
npm run build

# 4. Push the branch
git push origin feature/new-feature

# 5. Open Pull Request to develop
# 6. After approval, merge to develop
# 7. Deploy to staging/testing
# 8. After testing, merge develop -> main
# 9. Deploy to production
```

### 3. Commit Standards

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new comments functionality
fix: fix search system bug
docs: update API documentation
style: adjust code formatting
refactor: refactor header component
test: add tests for Button component
chore: update dependencies
```

### 4. Code Review

#### Pull Request Templates

- The template used in the project is located at github/pull_request_template.md
- For every opened pull request, this content should be pasted in the description
- The template must be filled out when opening the PR

#### File Structure

```
src/
├── app/
│   ├── (routes)/
│   ├── components/
│   ├── lib/
│   ├── types/
│   └── utils/
```

### 5. Testing

```bash
# Run tests (when implemented)
npm run test

# Tests in watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### 6. Deployment

#### Staging

- Automatically deployed when merged to `dev`
- URL: `https://dev-future-tech-blog.vercel.app`

#### Production

- Automatically deployed when merged to `main`
- URL: `https://future-tech-blog.vercel.app`

## 🐛 Reporting Bugs

1. Check if the bug has already been reported
2. Create an issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment information

## 🤝 Contributing

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is under the MIT license. See the `LICENSE` file for more details.

## 📞 Contact

- **Developer**: [Your Name]
- **Email**: [your-email@example.com]
- **LinkedIn**: [your-linkedin]

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

⭐ If this project helped you, consider giving it a star!
