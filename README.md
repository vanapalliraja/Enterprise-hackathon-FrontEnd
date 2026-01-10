1. Frontend Architecture Diagram 

User (Browser)
   │
   
index.html
   │
   
src/main.tsx
   │  - ReactDOM.createRoot()
   │  - Global Providers
   
src/App.tsx
   │  - App Layout
   │  - React Router
   
src
   │
   ── Public Routes
   │     ── pages/Login.tsx
   │
   ── Protected Routes
         ── pages/Dashboard.tsx
                │
                
        components/layout/
            ── Navbar.tsx
            ── Sidebar.tsx
                │
                
        components/ui/
            ── Button.tsx
            ── Input.tsx
            ── Card.tsx
                │
                
        hooks/
            ── useAuth.ts
            ── useForm.ts
            |
        User interface

 2. State Management Explanation
State Management Strategy

The application uses React Hooks + Context API, suitable for scalable frontend applications.

Types of State Used
State Type	File / Location	Purpose
Local State	useState in components	Forms, inputs
Global State	hooks/useAuth.ts	User & auth
Derived State	Hooks	Computed UI state



3. Component Reuse Strategy
Folder Structure
src/components/
├── ui/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
├── layout/
│   ├── Navbar.tsx
│   ├── Sidebar.tsx

Reuse Levels
 UI Components

Button.tsx

Input.tsx

Card.tsx

✔ Used across Login, Dashboard, Forms
✔ Controlled via props
✔ No business logic

 Layout Components

Navbar.tsx

Sidebar.tsx

✔ Shared across all protected pages
✔ Ensures UI consistency

Logic Reuse 
src/hooks/
├── useAuth.ts
├── useForm.ts



4. Performance Optimization Summary
Build-Time Optimizations

Vite for fast bundling

Tree-shaking enabled

Tailwind CSS purge enabled

Runtime Optimizations

Component-level rendering

Lazy loading routes

Minimal DOM updates via React Virtual DOM

Centralized API calls







Security & Role-Handling Explanation
Frontend Security Measures

API calls only through services/api.ts

Token-based authentication

Input validation at UI level

React XSS protection

Role-Based Access Control (RBAC)
Flow
Login
 ↓
Token Stored
 ↓
Role Retrieved (Admin/User)
 ↓
Protected Route Check
 ↓
Allow / Redirect

Protected Route Logic

Unauthorized users redirected to Login

Role mismatch redirects to Access Denied page


component reuse
Page Component
     │
Layout Component
     │
UI Components
     │
Custom Hooks
     │
API Service Layer