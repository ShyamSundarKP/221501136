export const validateUrlInput = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export const validateValidityPeriod = (validity) => {
  return validity === undefined || (!isNaN(validity) && Number.isInteger(+validity) && +validity > 0);
};

export const validateShortcode = (code) => {
  return !code || /^[a-zA-Z0-9]{4,15}$/.test(code); // Optional, alphanumeric, reasonable length
};
