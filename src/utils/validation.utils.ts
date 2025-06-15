
export const validateCredentials = (apiKey: string, namespace: string): boolean => {
  return Boolean(apiKey?.trim() && namespace?.trim());
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
