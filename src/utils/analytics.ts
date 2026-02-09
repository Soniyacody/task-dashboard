import type { Task, Priority } from "../types/task";

export const getAnalytics = (tasks: Task[]) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Done").length;
  const overdue = tasks.filter((t) => {
    const today = new Date().toISOString().split("T")[0];
    return t.dueDate < today && t.status !== "Done";
  }).length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Most common priority
  const priorityCount: Record<Priority, number> = {
    Low: tasks.filter((t) => t.priority === "Low").length,
    Medium: tasks.filter((t) => t.priority === "Medium").length,
    High: tasks.filter((t) => t.priority === "High").length,
  };

  const mostCommonPriority = Object.entries(priorityCount).reduce(
    (max, [priority, count]) =>
      count > max.count ? { priority: priority as Priority, count } : max,
    { priority: "Medium" as Priority, count: 0 },
  ).priority;

  return {
    total,
    completed,
    overdue,
    completionRate,
    mostCommonPriority,
    todoCount: tasks.filter((t) => t.status === "Todo").length,
    inProgressCount: tasks.filter((t) => t.status === "In Progress").length,
  };
};
