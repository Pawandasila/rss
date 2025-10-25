import * as z from 'zod';

export const registerFormSchema = z.object({
  name: z
    .string()
    .min(2, "नाम कम से कम 2 अक्षर का होना चाहिए")
    .max(50, "नाम 50 अक्षरों से अधिक नहीं हो सकता")
    .regex(/^[a-zA-Z\s.'-]+$/, "कृपया नाम केवल अंग्रेजी में लिखें (हिंदी में नहीं)"),
  email: z
    .string()
    .email("कृपया वैध ईमेल पता दर्ज करें")
    .min(1, "ईमेल आवश्यक है")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "कृपया ईमेल केवल अंग्रेजी में लिखें"),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "मोबाइल नंबर 10 अंक का होना चाहिए")
    .min(1, "मोबाइल नंबर आवश्यक है"),
  dateOfBirth: z
    .date()
    .refine((date) => {
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
        return age - 1 >= 18 && age - 1 <= 100;
      }
      return age >= 18 && age <= 100;
    }, "आयु 18 से 100 वर्ष के बीच होनी चाहिए"),
  referralCode: z
    .string()
    .optional()
    .refine((code) => {
      if (!code || code.trim() === '') return true;
      return /^[a-zA-Z0-9]+$/.test(code);
    }, "रेफरल कोड केवल अंग्रेजी अक्षर और संख्या में होना चाहिए"),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;