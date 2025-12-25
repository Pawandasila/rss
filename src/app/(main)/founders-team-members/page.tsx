"use client";

import React from "react";
import Image from "next/image";
import { pageContent } from "./teamInfo";
import { Users, Crown } from "lucide-react";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";
import { useLeadership } from "@/module/crm/team/hooks/useLeadership";
import { buildMediaUrl } from "@/lib/media";
import type { TeamMember } from "@/module/crm/team/types";

const FoundersTeamPage = () => {
  const { members, loading } = useLeadership();

  const TeamMemberCard = ({ member }: { member: TeamMember }) => (
    <div className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden ">
        <Image
          src={buildMediaUrl(member.photo) || ""}
          alt={member.name}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={IMAGE_BLUR_DATA_URL}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Container */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-1">
          {member.name}
        </h3>

        <p className="text-sm text-muted-foreground font-medium mb-3">
          {member.position}
        </p>

        {member.bio && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {member.bio}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background lg:mt-0 mt-10">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_var(--primary-foreground)_0%,_transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,_var(--primary-foreground)_0%,_transparent_50%)]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4 lg:mb-6 border border-primary-foreground/20">
            <Users className="w-4 h-4" />
            हमारी टीम
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground mb-3 lg:mb-4 leading-tight">
            {pageContent.title}
          </h1>

          <p className="text-base sm:text-lg text-primary-foreground/90 font-medium mb-2 max-w-3xl mx-auto">
            {pageContent.subtitle}
          </p>

          <p className="text-sm sm:text-base text-primary-foreground/80 max-w-4xl mx-auto leading-relaxed">
            {pageContent.description}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 sm:py-16 lg:py-20">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4 lg:mb-6">
            <Crown className="w-4 h-4" />
            नेतृत्व टीम
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 lg:mb-4 leading-tight">
            Our Key Leadership
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Meet the dedicated individuals driving our mission forward.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-2xl bg-muted animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {members.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        )}

        {members.length === 0 && !loading && (
          <div className="text-center py-16 lg:py-20">
            <div className="max-w-md mx-auto bg-muted/30 rounded-2xl p-8 lg:p-12 border border-border">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                No Team Members Found
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                We are currently updating our team list. Please check back
                later.
              </p>
            </div>
          </div>
        )}

        <div className="mt-12 lg:mt-16 pt-10 lg:pt-12 border-t">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
              <div className="flex items-center justify-center">
                <div className="text-center px-3 sm:px-4 lg:px-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1">
                    {members.length}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-muted-foreground font-medium">
                    Total Team Members
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundersTeamPage;
