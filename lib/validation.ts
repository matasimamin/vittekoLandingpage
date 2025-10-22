export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export type ContactForm = {
  name: string;
  email: string;
  message: string;
  hp?: string;
};

export const isFormValid = (form: ContactForm) =>
  form.name.trim().length > 1 &&
  isValidEmail(form.email) &&
  form.message.trim().length > 5 &&
  (form.hp ?? "") === "";
