export const getMinDate = (): string => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

export const getMaxDate = (): string => {
  const date = new Date();
  date.setDate(date.getDate() + 4); // 4 days from today (5 total including today)
  return date.toISOString().split("T")[0];
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const isOverdue = (dueDate: string): boolean => {
  const today = new Date().toISOString().split("T")[0];
  return dueDate < today;
};

// Get available dates (today + next 4 days)
export const getAvailableDates = (): string[] => {
  const dates: string[] = [];
  const today = new Date();

  // Set time to start of day for accurate comparison
  today.setHours(0, 0, 0, 0);

  // Get next 4 days including today (total 5 days)
  for (let i = 0; i <= 4; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split("T")[0]);
  }

  return dates;
};

// Helper function to get day difference between two dates
export const getDayDifference = (dateString: string): number => {
  const dueDate = new Date(dateString);
  const today = new Date();

  // Set both dates to start of day for accurate difference
  dueDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = dueDate.getTime() - today.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

// Get label for date
export const getDateLabel = (dateString: string): string => {
  const diffDays = getDayDifference(dateString);

  switch (diffDays) {
    case 0:
      return "Today";
    case 1:
      return "Tomorrow";
    case 2:
      return "Day after tomorrow";
    default:
      return `${diffDays} days from now`;
  }
};

// Check if a date is within allowed range
export const isValidDueDate = (dateString: string): boolean => {
  const minDate = getMinDate();
  const maxDate = getMaxDate();
  return dateString >= minDate && dateString <= maxDate;
};
