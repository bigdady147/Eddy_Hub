# Frontend Development Guide

## Component System

The project uses a set of "Base" components to standardize UI and behavior.

### 1. BaseInput

Wrapper around standard `<input>` with built-in validation support.
**Usage:**

```vue
<BaseInput name="email" label="Email Address" placeholder="Enter email" />
```

_Note: Must be used inside a Vee-Validate `<Form>` context._

### 2. BaseButton

Standard button with loading state support.
**Usage:**

```vue
<BaseButton :loading="isLoading" variant="primary">
  Submit
</BaseButton>
```

## State Management (Pinia)

Each module should have its own Store (e.g., `auth.store.ts`).

- Stores should handle API calls and update state.
- Stores should interact with Global Stores (`ui.store`, `toast.store`) for feedback.

## Validation

Use **Vee-Validate** with **Zod** schemas for all forms.

1. Define Zod Schema.
2. Pass schema to `<Form :validation-schema="schema">`.
3. Use `BaseInput` inside `Form`.

## Styling

- **TailwindCSS**: Used for layout, spacing, and utility classes.
- **SCSS**: Used for base styles, variables, and complex component styling.
- **Glassmorphism**: Use keys `.glass-panel`, `.glass-input`, `.glass-btn` for the signature look.
