# Commit Message Structure
```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

## Common Types/Prefixes

### Primary Prefixes
- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation only changes
- `style:` - Changes that don't affect the code's meaning (white-space, formatting, etc.)
- `refactor:` - Code change that neither fixes a bug nor adds a feature
- `perf:` - Code change that improves performance
- `test:` - Adding missing tests or correcting existing tests
- `chore:` - Changes to the build process or auxiliary tools/libraries

### Additional Useful Prefixes
- `build:` - Changes that affect the build system or external dependencies
- `ci:` - Changes to CI configuration files and scripts
- `revert:` - Reverts a previous commit
- `wip:` - Work in progress (should be used sparingly)
- `deps:` - Dependency updates
- `security:` - Security fixes
- `i18n:` - Internationalization and localization
- `a11y:` - Accessibility improvements
- `config:` - Configuration changes

## Scope Examples
- `feat(auth):` - Changes in authentication
- `fix(api):` - API-related fixes
- `style(button):` - Style changes to button component
- `refactor(database):` - Database code restructuring

## Full Examples
```
feat(auth): add OAuth2 login with Google
fix(api): correct user data response format
style(button): align text to center
refactor(database): optimize query performance
docs(readme): update installation instructions
test(utils): add unit tests for date formatter
chore(deps): update dependencies to latest versions
perf(images): implement lazy loading
security(auth): fix SQL injection vulnerability
```

## Best Practices

### Subject Line
- Use imperative mood ("add" not "added" or "adds")
- Don't capitalize first letter
- No period at the end
- Keep it under 50 characters
- Be specific and concise

### Body
- Separate from subject with a blank line
- Wrap at 72 characters
- Explain what and why vs. how
- Use bullet points for multiple points

### Footer
- Reference issues and pull requests
- Note breaking changes
- Mention reviewers if needed

### Breaking Changes
```
BREAKING CHANGE: drop support for Node 6
```

### Issue References
```
fix(api): prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Fixes #123, #456
```

## Special Annotations
- `BREAKING CHANGE:` - Introduces a breaking API change
- `DEPRECATED:` - Marks code as deprecated
- `TODO:` - Indicates planned changes
- `FIXME:` - Indicates known issues that need fixing

## Conventional Commits Specification
Following the [Conventional Commits](https://www.conventionalcommits.org/) specification enables:
- Automated version bumps
- Automatic changelog generation
- Clear communication of changes to teammates
- Easier code review process
