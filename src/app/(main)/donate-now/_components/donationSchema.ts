import * as z from 'zod';

export const donationFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  amount: z.number().min(1, "Please enter a valid donation amount").max(500000, "Maximum donation amount is ₹5,00,000"),
  donationType: z.enum(["general", "education", "health", "infrastructure", "other"], {
    message: "Please select a donation type",
  }),
  anonymous: z.boolean().default(false),
  panCard: z.string().optional(),
  address: z.string().optional(),
  message: z.string().optional(),
});

export type DonationFormData = z.infer<typeof donationFormSchema>;

export const donationAmounts = [
  { value: 100, label: "₹100", description: "Basic Support" },
  { value: 200, label: "₹200", description: "Monthly Support" },
  { value: 500, label: "₹500", description: "Special Support" },
  { value: 1000, label: "₹1000", description: "Major Support" },
  { value: 5000, label: "₹5000", description: "Premium Support" },
  { value: 10000, label: "₹10000", description: "Elite Support" },
];

export const donationTypes = [
  { value: "general", label: "General Donation", description: "Support overall activities" },
  { value: "education", label: "Education", description: "Support educational programs" },
  { value: "health", label: "Health & Wellness", description: "Support health initiatives" },
  { value: "infrastructure", label: "Infrastructure", description: "Support building projects" },
  { value: "other", label: "Other", description: "Specify your cause" },
];