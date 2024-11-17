## Contributing to Favor NBA Analytics Dashboard

Thank you for your interest in contributing to Favor! This document provides guidelines and information for contributors.

### Code of Conduct

This project adheres to the Contributor Covenant code of conduct. By participating, you are expected to uphold this code.

### Development Setup

1. **Prerequisites**
   - Node.js 18+
   - npm 9+
   - Git

2. **Environment Setup**
   ```bash
   git clone https://github.com/yourusername/favor-nba-dashboard.git
   cd favor-nba-dashboard
   npm install
   cp .env.example .env
   ```

3. **Required API Keys**
   - Clerk (Authentication)
   - NBA API (RapidAPI)
   - OpenRouter AI
   - Sports Odds API
   - Google Sheets API

### Development Workflow

1. **Branch Naming Convention**
   - Feature: `feature/description`
   - Bug Fix: `fix/description`
   - Documentation: `docs/description`
   - Performance: `perf/description`

2. **Commit Message Format**
   ```
   type(scope): description

   [optional body]

   [optional footer]
   ```
   Types: feat, fix, docs, style, refactor, perf, test, chore

3. **Pull Request Process**
   - Create a feature branch
   - Make your changes
   - Write/update tests
   - Update documentation
   - Submit PR against main branch

### Code Style Guidelines

1. **TypeScript**
   - Use strict mode
   - Explicit return types
   - Interface over type when possible
   - Meaningful variable names

2. **React**
   - Functional components
   - Custom hooks for logic
   - Proper prop typing
   - Error boundaries

3. **CSS/Tailwind**
   - Follow BEM naming (when using CSS)
   - Use Tailwind utility classes
   - Maintain responsive design
   - Dark mode support

### Testing Requirements

1. **Unit Tests**
   ```typescript
   import { expect, test } from 'vitest';

   test('component renders correctly', () => {
     // Test implementation
   });
   ```

2. **Component Tests**
   ```typescript
   import { render, screen } from '@testing-library/react';

   test('component interaction', async () => {
     // Test implementation
   });
   ```

3. **Integration Tests**
   - Critical user flows
   - API integration
   - Authentication flows

### Performance Guidelines

1. **Code Splitting**
   ```typescript
   const Component = lazy(() => import('./Component'));
   ```

2. **Image Optimization**
   - Use appropriate formats
   - Lazy loading
   - Responsive images

3. **State Management**
   - Local state when possible
   - React Query for server state
   - Context for global state

### Documentation

1. **Component Documentation**
   ```typescript
   interface Props {
     /** Description of the prop */
     prop: string;
   }
   ```

2. **API Documentation**
   - Endpoint descriptions
   - Request/response examples
   - Error handling

3. **README Updates**
   - Feature documentation
   - Setup instructions
   - API integration details

### Review Process

1. **Code Review Checklist**
   - [ ] Follows style guidelines
   - [ ] Tests included
   - [ ] Documentation updated
   - [ ] No console errors
   - [ ] Responsive design
   - [ ] Performance considered

2. **Performance Review**
   - Bundle size impact
   - Runtime performance
   - Memory usage
   - Network requests

### Deployment

1. **Build Process**
   ```bash
   npm run build
   ```

2. **Environment Variables**
   - Production API keys
   - Feature flags
   - Environment configs

3. **Monitoring**
   - Error tracking
   - Performance metrics
   - User analytics

### Support

For questions or support:
1. Check existing issues
2. Create a new issue
3. Join our Discord community
4. Contact maintainers

### License

By contributing, you agree that your contributions will be licensed under the MIT License.