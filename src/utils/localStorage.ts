import type { Task } from "../types/task";

const TASKS_KEY = "task-dashboard-tasks";

export const loadTasks = (): Task[] => {
  try {
    const data = localStorage.getItem(TASKS_KEY);
    if (!data) return [];

    const tasks = JSON.parse(data);

    // Validate loaded data
    if (!Array.isArray(tasks)) return [];

    // Filter out invalid tasks and ensure completed tasks remain
    return tasks.filter(
      (task: any) =>
        task.id &&
        task.title &&
        ["Low", "Medium", "High"].includes(task.priority) &&
        ["Todo", "In Progress", "Done"].includes(task.status) &&
        task.dueDate &&
        task.createdAt,
    );
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error);
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  try {
    // Preserve completed tasks
    const tasksToSave = tasks.filter(
      (task) =>
        task.status !== "Done" ||
        (task.status === "Done" && tasks.find((t) => t.id === task.id)), // Ensure it still exists
    );
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasksToSave));
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
  }
};
