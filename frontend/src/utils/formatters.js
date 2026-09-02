export const formatCurrency = (amount) => {
  if (amount == null || isNaN(amount)) return "$0.00";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return "—";

  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "—";

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  } catch {
    return "—";
  }
};

export const formatDateTime = (dateString) => {
  if (!dateString) return "—";

  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "—";

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return "—";
  }
};

export const formatStatus = (status) => {
  if (!status) return "—";

  return status
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
};
