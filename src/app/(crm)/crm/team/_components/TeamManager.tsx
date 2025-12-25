import React, { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Edit2,
  Image as ImageIcon,
  Plus,
  Save,
  Trash2,
  X,
  Crown,
  CalendarIcon,
} from "lucide-react";
import type { TeamMember, TeamFormData } from "@/module/crm/team/types";
import { buildMediaUrl } from "@/lib/media";

interface TeamManagerProps {
  members: TeamMember[];
  loading: boolean;
  onCreate: (data: TeamFormData) => Promise<TeamMember>;
  onUpdate: (id: number, data: TeamFormData) => Promise<TeamMember>;
  onDelete: (id: number) => Promise<void>;
}

const TeamManager: React.FC<TeamManagerProps> = ({
  members,
  loading,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [form, setForm] = useState<TeamFormData>({
    name: "",
    position: "",
    bio: "",
    joined_at: new Date().toISOString().split("T")[0],
  });

  const onAdd = () => {
    setEditing(null);
    setForm({
      name: "",
      position: "",
      bio: "",
      joined_at: new Date().toISOString().split("T")[0],
    });
    setImagePreview("");
    setImageFile(null);
    setOpen(true);
  };

  const onEdit = (member: TeamMember) => {
    setEditing(member);
    setForm({
      name: member.name,
      position: member.position,
      bio: member.bio || "",
      joined_at: member.joined_at ? member.joined_at.split("T")[0] : "",
    });
    setImagePreview(buildMediaUrl(member.photo) || "");
    setImageFile(null);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this member?")) {
      await onDelete(id);
    }
  };

  const onImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSave = async () => {
    if (!form.name.trim()) return;

    try {
      const data: TeamFormData = {
        name: form.name.trim(),
        position: form.position.trim(),
        bio: form.bio || undefined,
        photo: imageFile || undefined,
        joined_at: form.joined_at || undefined,
      };

      if (editing) {
        await onUpdate(editing.id, data);
      } else {
        if (!imageFile) {
          alert("Please upload an image for new members");
          return;
        }
        await onCreate(data);
      }
      setOpen(false);
      setEditing(null);
      setImagePreview("");
      setImageFile(null);
    } catch (error) {
      console.error("Failed to save member", error);
      alert("Failed to save member. Please try again.");
    }
  };

  if (loading && members.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Team Management</h3>
          <p className="text-sm text-gray-600">
            Manage founders and team members
          </p>
        </div>
        <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="group relative bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="aspect-square bg-gray-100 overflow-hidden">
              {member.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={buildMediaUrl(member.photo) || ""}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>

            <div className="p-4">
              <h4 className="font-semibold text-gray-900 truncate">
                {member.name}
              </h4>
              <p className="text-xs text-gray-600 mb-2">{member.position}</p>

              {member.bio && (
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                  {member.bio}
                </p>
              )}

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(member)}
                  className="flex-1"
                  disabled={loading}
                >
                  <Edit2 className="w-3 h-3 mr-1" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(member.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  disabled={loading}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {members.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No team members yet. Add your first member!</p>
        </div>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="flex flex-col max-h-screen overflow-hidden">
          <SheetHeader className="px-6 py-4 border-b flex-shrink-0">
            <SheetTitle>
              {editing ? "Edit Member" : "Add Team Member"}
            </SheetTitle>
            <SheetDescription>
              Add or update team member information
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((s) => ({ ...s, name: e.target.value }))
                }
                placeholder="Full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Position</label>
              <Input
                value={form.position}
                onChange={(e) =>
                  setForm((s) => ({ ...s, position: e.target.value }))
                }
                placeholder="Job title or position"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Joined At
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.joined_at && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.joined_at ? (
                      format(new Date(form.joined_at), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      form.joined_at ? new Date(form.joined_at) : undefined
                    }
                    onSelect={(date) =>
                      setForm((s) => ({
                        ...s,
                        joined_at: date ? format(date, "yyyy-MM-dd") : "",
                      }))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Biography
              </label>
              <Textarea
                value={form.bio || ""}
                onChange={(e) =>
                  setForm((s) => ({ ...s, bio: e.target.value }))
                }
                placeholder="Short biography (optional)"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Photo</label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                {imagePreview ? (
                  <div className="space-y-3">
                    <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setImagePreview("");
                        setImageFile(null);
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div>
                    <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                    <label className="cursor-pointer">
                      <span className="text-sm text-primary hover:text-primary/80">
                        Click to upload photo
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={onImageFileChange}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t flex gap-2 justify-end flex-shrink-0">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={onSave}
              disabled={loading}
              className="min-w-[120px]"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {editing ? "Update" : "Save"}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default TeamManager;
