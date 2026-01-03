# LeverX Employee Services

An internal employee services platform: address book, search, user profiles, and settings.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

```

## 🔐 Testing Credentials

**Admin Account:**

- Email: `hermione.granger@leverx.com`
- Password: `test123`

**All Other Users:**

- Password: `test123`

---

📂 Project Structure
src/
├── components/ # UI components (Header, EmployeeCard, SearchPanel)
├── pages/ # Pages (EmployeeSection, UserDetails, Settings)
├── store/ # Redux Toolkit store, slices, RTK Query API
├── assets/ # Icons, images, avatars
├── styles/ # SCSS files (\_header.scss, \_search.scss, \_employee.scss, \_user-details.scss)
└── App.tsx # Main routing

🛠️ Routes
/ — Address Book (default page, merged with Home)

/address-book — Employee address book

/settings — Settings (Admin only)

/users/:id — User profile page

- — 404 Page Not Found

🔎 Features
Header

Logo, navigation, support button, burger menu for mobile.

SearchPanel

Basic / Advanced search, filters by name, email, phone, department, building, etc.

EmployeeSection

Employee list in Grid or List view.

.nothing-found placeholder when no results match.

EmployeeCard

Displays avatar, name, department, and room.

UserDetails

User profile with General Info, Contacts, Travel Info.

Edit mode available for Admin and HR (for their employees).

Edit / Save / Cancel buttons.

404 Page

Placeholder for non-existent routes.

🎨 Styling
All styles are written in SCSS:

\_header.scss

\_search.scss

\_employee.scss

\_user-details.scss

Uses CSS variables (var(--primary-color), var(--card-color), var(--text-color), etc.) for theming support.

🔐 Access Control
Admin: Full access. Can edit any user, delete users, and change roles (except their own role).

HR: Can ONLY edit users where user.manager_id === currentUser.\_id.

Employee: Read-only access everywhere.

📦 API
usersApi.ts — RTK Query endpoints:

useGetUsersQuery — fetch employee list

useGetUserByIdQuery — fetch profile by ID

useUpdateUserMutation — update profile

📋 Checklist Before Production
[ ] Test responsiveness at <768px screen width

[ ] Add basic form validation (email, phone)

[ ] Ensure visa field renders correctly (array → string)

[ ] Run npm run lint and tsc for code quality

[ ] Verify all icons exist in assets/icons

👨‍💻 Authors
Development: LeverX Team

Architecture & Styling: Nino Markarovi
