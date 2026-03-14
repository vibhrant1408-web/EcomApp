export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const formatPrice = (price?: number): string => {
  return `$${price?.toFixed(2) || '0.00'}`;
};

export const formatPhoneNumber = (phone?: string): string => {
  return phone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') || '';
};
