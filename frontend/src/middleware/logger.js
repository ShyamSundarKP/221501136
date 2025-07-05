const logger = (message, data = null) => {
  const timestamp = new Date().toISOString();
  const logEntry = { timestamp, message, data };
  const existingLogs = JSON.parse(localStorage.getItem("logs") || "[]");
  existingLogs.push(logEntry);
  localStorage.setItem("logs", JSON.stringify(existingLogs));
};

export default logger;
 