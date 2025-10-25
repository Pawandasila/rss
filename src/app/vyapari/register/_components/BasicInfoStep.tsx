import { FileText, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Category, SubCategory } from "../../types";

interface BasicInfoStepProps {
  formData: {
    name: string;
    owner: string;
    category: string;
    subcategory: string;
    short_description: string;
    long_description: string;
    phone: string;
  };
  categories: Category[];
  filteredSubcategories: SubCategory[];
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSelectChange: (name: string, value: string) => void;
}

export function BasicInfoStep({
  formData,
  categories,
  filteredSubcategories,
  handleInputChange,
  handleSelectChange,
}: BasicInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Basic Information
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">
            Business Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your business name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="owner">Owner Name</Label>
          <Input
            id="owner"
            name="owner"
            value={formData.owner}
            onChange={handleInputChange}
            placeholder="Enter owner name"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">
            Category <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleSelectChange("category", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Select Category</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id.toString()}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subcategory">Subcategory</Label>
          <Select
            value={formData.subcategory}
            onValueChange={(value) => handleSelectChange("subcategory", value)}
            disabled={filteredSubcategories.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select subcategory" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {filteredSubcategories.map((sub) => (
                <SelectItem key={sub.id} value={sub.id.toString()}>
                  {sub.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="short_description">Short Description</Label>
        <Textarea
          id="short_description"
          name="short_description"
          value={formData.short_description}
          onChange={handleInputChange}
          placeholder="Brief description of your business (1-2 lines)"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="long_description">Detailed Description</Label>
        <Textarea
          id="long_description"
          name="long_description"
          value={formData.long_description}
          onChange={handleInputChange}
          placeholder="Detailed description of your business, products, and services"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">
          Phone Number <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+91 1234567890"
            className="pl-10"
          />
        </div>
      </div>
    </div>
  );
}
