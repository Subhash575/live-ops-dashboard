export const ROUTES = {
  DASHBOARD: "/dashboard",
  BOOKINGS: "/bookings",
  BOOKING_DETAIL: "/bookings/:id",
  MECHANICS: "/mechanics",
  MECHANIC_DETAIL: "/mechanics/:id",
  CUSTOMERS: "/customers",
};

export const BOOKING_STATUSES = {
  PENDING: "PENDING",
  ASSIGNED: "ASSIGNED",
  ON_THE_WAY: "ON_THE_WAY",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

export const BOOKING_STATUS_OPTIONS = [
  { value: "PENDING", label: "Pending" },
  { value: "ASSIGNED", label: "Assigned" },
  { value: "ON_THE_WAY", label: "On the Way" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

export const BOOKING_STATUS_STYLES = {
  PENDING: {
    bg: "bg-status-pending-bg",
    text: "text-status-pending",
  },
  ASSIGNED: {
    bg: "bg-status-assigned-bg",
    text: "text-status-assigned",
  },
  ON_THE_WAY: {
    bg: "bg-status-on-the-way-bg",
    text: "text-status-on-the-way",
  },
  COMPLETED: {
    bg: "bg-status-completed-bg",
    text: "text-status-completed",
  },
  CANCELLED: {
    bg: "bg-status-cancelled-bg",
    text: "text-status-cancelled",
  },
};

export const MECHANIC_STATUSES = {
  AVAILABLE: "AVAILABLE",
  BUSY: "BUSY",
  OFFLINE: "OFFLINE",
};

export const MECHANIC_STATUS_OPTIONS = [
  { value: "AVAILABLE", label: "Available" },
  { value: "BUSY", label: "Busy" },
  { value: "OFFLINE", label: "Offline" },
];

export const MECHANIC_STATUS_STYLES = {
  AVAILABLE: {
    bg: "bg-status-available-bg",
    text: "text-status-available",
  },
  BUSY: {
    bg: "bg-status-busy-bg",
    text: "text-status-busy",
  },
  OFFLINE: {
    bg: "bg-status-offline-bg",
    text: "text-status-offline",
  },
};

export const BOOKING_SORT_FIELDS = [
  "bookingId",
  "status",
  "amount",
  "scheduledAt",
  "createdAt",
];

export const CUSTOMER_SORT_FIELDS = ["name", "email", "phone", "createdAt"];

export const MECHANIC_SORT_FIELDS = [
  "name",
  "status",
  "jobsCompleted",
  "createdAt",
];
