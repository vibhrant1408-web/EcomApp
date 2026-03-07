export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const formatPrice = (price) => {
  return `$${price?.toFixed(2) || '0.00'}`;
};

export const formatPhoneNumber = (phone) => {
  return phone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') || '';
};
