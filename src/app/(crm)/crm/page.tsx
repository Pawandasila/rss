"use client";

import React from "react";

import { Badge } from "@/components/ui/badge";
import {
  Image as ImageIcon,
  FileText,
  Briefcase,
  Users,
  MessageSquare,
  Mail,
  Layout,
  Settings,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CrmPage = () => {
  const contentSections = [
    {
      title: "Hero Section",
      description: "Manage hero images, headlines, and call-to-action buttons",
      icon: ImageIcon,
      url: "/crm/hero",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "About Section",
      description: "Update about us content, mission, and vision statements",
      icon: FileText,
      url: "/crm/about",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Services Section",
      description: "Add, edit, or remove services offered by the organization",
      icon: Briefcase,
      url: "/crm/services",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Gallery",
      description: "Upload and organize images for the photo gallery",
      icon: ImageIcon,
      url: "/crm/gallery",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Team Section",
      description: "Manage team member profiles, roles, and photos",
      icon: Users,
      url: "/crm/team",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Testimonials",
      description: "Add and moderate user testimonials and reviews",
      icon: MessageSquare,
      url: "/crm/testimonials",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      title: "Contact Info",
      description: "Update contact details, addresses, and social media links",
      icon: Mail,
      url: "/crm/contact",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
    },
    {
      title: "Page Layout",
      description: "Configure page sections, ordering, and visibility",
      icon: Layout,
      url: "/crm/layout",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
    },
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Content Management System</h1>
            <p className="text-muted-foreground mt-1">
              Manage all frontend content from this central dashboard
            </p>
          </div>
          <Badge variant="outline" className="hidden sm:flex">
            Admin Only
          </Badge>
        </div>
      </div>

      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Total Sections</h3>
            <Layout className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">{contentSections.length}</div>
            <p className="text-xs text-muted-foreground">Content areas to manage</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Quick Access</h3>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">Hero</div>
            <p className="text-xs text-muted-foreground">Most frequently updated</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">System Status</h3>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">Active</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </div>
        </div>
      </div>

      
      <div>
        <h2 className="text-xl font-semibold mb-4">Content Sections</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contentSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link key={section.url} href={section.url}>
                <div className="group h-full bg-white rounded-lg border border-gray-200 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${section.bgColor}`}>
                        <Icon className={`h-6 w-6 ${section.color}`} />
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{section.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {section.description}
                    </p>
                    <Button variant="ghost" size="sm" className="w-full group-hover:bg-primary/10">
                      Manage Content
                    </Button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
        <div>
          <h3 className="text-lg font-semibold">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Common tasks and shortcuts</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <Link href="/crm/hero">
            <Button variant="outline" size="sm">
              <ImageIcon className="h-4 w-4 mr-2" />
              Update Hero Image
            </Button>
          </Link>
          <Link href="/crm/gallery">
            <Button variant="outline" size="sm">
              <ImageIcon className="h-4 w-4 mr-2" />
              Upload to Gallery
            </Button>
          </Link>
          <Link href="/crm/settings">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              CRM Settings
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CrmPage;