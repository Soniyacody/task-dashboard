# Task Dashboard

## 📋 Overview
A responsive task management application built with React and TypeScript, featuring real-time analytics and persistent storage.

## 🚀 Live Demo
[Netlify Deployment URL](#) *(https://task-dashboard100.netlify.app/)*

## 🛠️ Tech Stack
- **React 18** + **TypeScript**
- **Pure CSS** (No UI libraries)
- **LocalStorage** for persistence
- **Flexbox** for responsive layouts

## 📁 Project Structure
```
src/
├── components/
│   ├── common/           # Reusable UI components
│   ├── TaskForm.tsx      # Task creation/editing
│   ├── TaskItem.tsx      # Task display with inline edit
│   ├── FilterBar.tsx     # Filtering & sorting
│   ├── Analytics.tsx     # Dashboard metrics
│   └── InstructionsPanel.tsx
├── types/                # TypeScript definitions
├── utils/                # Utilities & helpers
└── App.tsx              # Main application
```

## ✨ Features

### 📝 Task Management
- **Add tasks** with title, priority, status, and due date
- **Inline editing** - modify tasks directly in the list
- **Status cycling** - click badge to change Todo → In Progress → Done
- **Delete with confirmation** - modal prevents accidental deletion
- **Date restriction** - due dates limited to next 5 days

### 🔍 Filtering & Sorting
- Filter by status (All/Todo/In Progress/Done)
- Filter by priority (All/Low/Medium/High)
- Sort by due date, priority, or creation date
- Ascending/descending order options

### 📊 Real-time Analytics
- Total tasks count
- Completed tasks
- Overdue tasks
- Completion percentage
- Most common priority

### 💾 Data Persistence
- **Automatic saving** to localStorage on every change
- **Data survives** page reloads and browser restarts
- **Corruption handling** - gracefully handles malformed data
- 

### 📱 User Experience
- **Toast notifications** for all actions
- **Responsive design** - mobile and desktop optimized
- **Collapsible instructions** - minimal interface
- **Keyboard shortcuts** - Enter to save, Escape to cancel
- **Form auto-clear** - inputs reset after adding tasks

## 🏗️ Architecture

### Component Design
- **Reusable components** - Button, InputField, SelectField
- **Single responsibility** - each component focused on one task
- **Props-based communication** - clean data flow
- **Minimal state** - lifted up to parent components

### State Management
```typescript
// Central state in App.tsx
const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

// Auto-save effect
useEffect(() => {
  saveTasks(tasks);
}, [tasks]);
```

### Data Flow
```
App (state)
  ├── TaskForm (adds new tasks)
  ├── FilterBar (controls view)
  ├── Analytics (displays metrics)
  └── TaskList
       └── TaskItem (edits/deletes tasks)
```

## 🎨 Styling
- **CSS Variables** - consistent theming
- **Flexbox Only** - no CSS Grid used
- **Mobile-First** approach
- **Semantic HTML** throughout
- **No inline styles** - all CSS externalized

## 🚦 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation
```bash
git clone [repository-url]
cd task-dashboard
npm install
npm run dev
```

### Build for Production
```bash
npm run build
```

## 📄 Code Quality
- **TypeScript strict mode** - full type safety
- **Clean component structure** - no duplicate logic
- **Error handling** - graceful degradation
- **Accessibility** - semantic HTML and ARIA labels

## 🔧 Technical Decisions

### Why LocalStorage?
- Simple persistence without backend
- Works offline
- Fast read/write operations
- Built-in browser support

### Why No State Libraries?
- Small app size doesn't warrant Redux/Zustand
- React state + props sufficient for needs
- Reduces bundle size and complexity

### Date Handling
- Restricts to 5 days for realistic task management
- Prevents unrealistic future dates
- Consistent date formatting throughout

## 📱 Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📈 Performance
- **Fast initial load** - minimal dependencies
- **Efficient rendering** - memoized components
- **Optimized updates** - batched state changes
- **Small bundle size** - no external UI libraries



## 📝 License
Internal use for hiring assessment only.

---

*Built as part of a frontend developer assessment. Demonstrates React fundamentals, TypeScript expertise, and clean architecture principles.*
