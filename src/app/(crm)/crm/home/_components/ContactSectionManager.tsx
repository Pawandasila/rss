"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Save, X, Plus, Edit, Trash2, Phone, Mail, MapPin, Clock, Link as LinkIcon } from "lucide-react";
import { ContactData, ContactInfo, SocialLink } from "../../types/home/contact/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  data: ContactData;
  setData: React.Dispatch<React.SetStateAction<ContactData>>;
};

export default function ContactSectionManager({ data, setData }: Props) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [contactForm, setContactForm] = useState<ContactInfo>({
    type: "phone",
    label: "",
    value: "",
    icon: "📞",
    link: "",
  });

  const [socialForm, setSocialForm] = useState<SocialLink>({
    platform: "",
    url: "",
    icon: "🔗",
  });

  const openAddContact = () => {
    setIsEditingSocial(false);
    setEditingIndex(null);
    setContactForm({
      type: "phone",
      label: "",
      value: "",
      icon: "📞",
      link: "",
    });
    setIsSheetOpen(true);
  };

  const openEditContact = (index: number) => {
    setIsEditingSocial(false);
    setEditingIndex(index);
    setContactForm({ ...data.contacts[index] });
    setIsSheetOpen(true);
  };

  const openAddSocial = () => {
    setIsEditingSocial(true);
    setEditingIndex(null);
    setSocialForm({
      platform: "",
      url: "",
      icon: "🔗",
    });
    setIsSheetOpen(true);
  };

  const openEditSocial = (index: number) => {
    setIsEditingSocial(true);
    setEditingIndex(index);
    setSocialForm({ ...data.socialLinks[index] });
    setIsSheetOpen(true);
  };

  const handleSaveContact = () => {
    if (editingIndex !== null) {
      setData((prev) => ({
        ...prev,
        contacts: prev.contacts.map((c, i) => (i === editingIndex ? contactForm : c)),
      }));
    } else {
      setData((prev) => ({
        ...prev,
        contacts: [...prev.contacts, contactForm],
      }));
    }
    setIsSheetOpen(false);
    setEditingIndex(null);
  };

  const handleSaveSocial = () => {
    if (editingIndex !== null) {
      setData((prev) => ({
        ...prev,
        socialLinks: prev.socialLinks.map((s, i) => (i === editingIndex ? socialForm : s)),
      }));
    } else {
      setData((prev) => ({
        ...prev,
        socialLinks: [...prev.socialLinks, socialForm],
      }));
    }
    setIsSheetOpen(false);
    setEditingIndex(null);
  };

  const handleDeleteContact = (index: number) => {
    setData((prev) => ({
      ...prev,
      contacts: prev.contacts.filter((_, i) => i !== index),
    }));
  };

  const handleDeleteSocial = (index: number) => {
    setData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "phone": return <Phone className="w-5 h-5" />;
      case "email": return <Mail className="w-5 h-5" />;
      case "address": return <MapPin className="w-5 h-5" />;
      case "hours": return <Clock className="w-5 h-5" />;
      default: return <LinkIcon className="w-5 h-5" />;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Contact Information Management</h2>
        <div className="flex gap-2">
          <Button onClick={openAddContact} className="bg-orange-600 hover:bg-orange-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
          <Button onClick={openAddSocial} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Social Link
          </Button>
        </div>
      </div>

      {/* Contact Info Grid */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.contacts.map((contact, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                  {getTypeIcon(contact.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{contact.icon}</span>
                    <h4 className="font-semibold text-gray-900">{contact.label}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{contact.value}</p>
                  {contact.link && (
                    <a
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-orange-600 hover:underline"
                    >
                      Open Link
                    </a>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button
                    onClick={() => openEditContact(index)}
                    variant="ghost"
                    size="sm"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteContact(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Social Media Links</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.socialLinks.map((social, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white text-center"
            >
              <div className="text-4xl mb-2">{social.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-1">{social.platform}</h4>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-orange-600 hover:underline block truncate"
              >
                {social.url}
              </a>
              <div className="flex gap-1 justify-center mt-3">
                <Button
                  onClick={() => openEditSocial(index)}
                  variant="ghost"
                  size="sm"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleDeleteSocial(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl p-0 flex flex-col">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle>
              {isEditingSocial
                ? editingIndex !== null
                  ? "Edit Social Link"
                  : "Add Social Link"
                : editingIndex !== null
                ? "Edit Contact"
                : "Add Contact"}
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="space-y-6">
              {isEditingSocial ? (
                <>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Platform Name</label>
                    <Input
                      value={socialForm.platform}
                      onChange={(e) =>
                        setSocialForm({ ...socialForm, platform: e.target.value })
                      }
                      placeholder="Facebook, Twitter, Instagram..."
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">URL</label>
                    <Input
                      value={socialForm.url}
                      onChange={(e) =>
                        setSocialForm({ ...socialForm, url: e.target.value })
                      }
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Icon (Emoji)</label>
                    <Input
                      value={socialForm.icon}
                      onChange={(e) =>
                        setSocialForm({ ...socialForm, icon: e.target.value })
                      }
                      placeholder="🔗"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Type</label>
                    <Select
                      value={contactForm.type}
                      onValueChange={(value: ContactInfo["type"]) =>
                        setContactForm({ ...contactForm, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="address">Address</SelectItem>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Label</label>
                    <Input
                      value={contactForm.label}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, label: e.target.value })
                      }
                      placeholder="Phone Number, Email Address..."
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Value</label>
                    <Textarea
                      value={contactForm.value}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, value: e.target.value })
                      }
                      rows={3}
                      placeholder="Contact information..."
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Icon (Emoji)</label>
                    <Input
                      value={contactForm.icon}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, icon: e.target.value })
                      }
                      placeholder="📞"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Link (Optional)
                    </label>
                    <Input
                      value={contactForm.link || ""}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, link: e.target.value })
                      }
                      placeholder="tel:+91..., mailto:..., https://maps.google.com/..."
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <SheetFooter className="px-6 py-4 border-t bg-background">
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                onClick={() => setIsSheetOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                className="bg-orange-600 hover:bg-orange-700 flex-1"
                onClick={isEditingSocial ? handleSaveSocial : handleSaveContact}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
