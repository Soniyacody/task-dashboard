export type Priority = "Low" | "Medium" | "High";
export type Status = "Todo" | "In Progress" | "Done";

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  createdAt: string;
}

export interface FilterState {
  status: Status | "All";
  priority: Priority | "All";
  sortBy: "dueDate" | "priority" | "createdAt";
  sortOrder: "asc" | "desc";
}
