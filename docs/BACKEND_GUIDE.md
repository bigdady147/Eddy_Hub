# Backend Development Guide

## Standardization

The backend enforces strict standards to ensure reliability, security, and maintainability.

### 1. API Response Format

All API responses must follow the `ApiResponse` class format:

```json
{
  "statusCode": 200,
  "data": { ... },
  "message": "Success message",
  "success": true
}
```

**Usage:**

```typescript
return res.status(200).json(new ApiResponse(200, user, "Success"));
```

### 2. Error Handling

Never use `try-catch` blocks in Controllers. Use `asyncHandler` wrapper instead.
If an error occurs, throw an `ApiError`.

**Usage:**

```typescript
export const login = asyncHandler(async (req, res) => {
  if (!user) throw new ApiError(401, "Invalid credentials");
  // ...
});
```

### 3. Validation

All incoming requests must be validated using `Zod` schemas and the `validate` middleware.

**Schema:**

```typescript
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});
```

**Route:**

```typescript
router.post("/login", validate(loginSchema), login);
```

### 4. Logging

Use the global `Logger` for all system logs.

- `Logger.info()`: General information
- `Logger.error()`: Critical errors (Auto-saved to DB)
- `Logger.warn()`: Warnings

Logs are automatically stored in MongoDB collection `system_logs`.
