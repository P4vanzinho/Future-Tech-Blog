# 🧭 Workflow Documentation — Project GitFlow

## 📌 Objective
This document aims to explain the **basic workflow** adopted in this project, describing how **branches** are organized, how the **development cycle** happens, and which **commands and best practices** should be followed.  
The goal is for any new developer to quickly understand **how to contribute in a standardized and safe way**.

---

## 🌿 Branch Structure

The project follows a simplified **GitFlow**, using two main branches and temporary branches for features, fixes, and adjustments.

### Main branches
- **`main`** → Contains the **production code**.  
  - Always stable and ready for deployment.
  - No commits are made directly to it.

- **`dev`** → Contains the **development code**.  
  - It's the base for creating new features and fixes.
  - Serves as an integration environment before reaching `main`.

> ⚠️ **Important:**  
> The `main` and `dev` branches **cannot receive direct pushes**.  
> All changes to them must occur **only via Pull Request (PR)** and after **review and approval**.

---

## 🌱 Development Branches

To develop new features, fixes, or improvements, specific branches must be created **from the `dev` branch**.

### Naming convention
Use descriptive names, separated by hyphens:
```
feature/feature-name
fix/bug-fix-x
chore/config-adjustment
```

### Branch creation example
```bash
git checkout dev
git pull origin dev
git checkout -b feature/feature-name
```

---

## 🔁 Workflow

### 1. Update your base branch
Before starting a new task:
```bash
git checkout dev
git pull origin dev
```

### 2. Create a branch for your task
```bash
git checkout -b feature/feature-name
```

### 3. Make your commits locally
Keep commits small and descriptive:
```bash
git add .
git commit -m "feat: add login component"
```

### 4. Push your branch to the remote repository
```bash
git push origin feature/feature-name
```

### 5. Open a Pull Request (PR)
- Compare your branch with `dev`.
- Clearly describe what was changed.
- Wait for review and approval.

### 6. Merge and deletion
After approval:
- The PR will be merged into `dev`.
- The feature branch can be **deleted**.

### 7. Deploy (to production)
- When `dev` is stable and tested, a **merge from `dev` → `main`** will be made.
- This triggers the pipeline or deployment process.

---

## 🧩 Visual Flow Summary

```
main  ←── merge ───  dev  ←── merge ───  feature/feature-name
│                        ↑
│                        └── all task branches start from dev
```

---

## 🧠 Best Practices

- Always **pull** from `dev` before starting something new.  
- Never **push directly** to `main` or `dev`.  
- Make clear and atomic commits.  
- Keep your branch **short and focused on one task**.  
- Resolve conflicts **before opening the PR**.  
- After merging, **delete your remote branch**.

---

## 🛠️ Useful Commands

| Action | Command |
|------|----------|
| Update `dev` | `git pull origin dev` |
| Create new branch | `git checkout -b feature/name` |
| Switch branch | `git checkout dev` |
| Push branch | `git push origin feature/name` |
| View local branches | `git branch` |
| View remote branches | `git branch -r` |
| Delete local branch | `git branch -d feature/name` |
| Delete remote branch | `git push origin --delete feature/name` |

---

## 💡 Important Tips

### Forgot to create a branch and already started changing code in `dev`?

If you've already made changes in the `dev` branch and realized you should have created a specific branch, use `git stash` to save your work:

```bash
# 1. Add the changes to stage
git add .

# 2. Save the changes temporarily
git stash

# 3. Create a new branch from dev
git checkout -b feature/feature-name

# 4. Recover your changes in the new branch
git stash apply
```

> 💡 **Tip:** `git stash` is perfect for "pausing" your work and moving it to the right place without losing anything!

---

## ✅ Conclusion

Following this flow, we ensure:
- A clean and understandable commit history;  
- Controlled and safe integration;  
- A predictable environment between development and production;  
- Easy collaboration between multiple developers.
