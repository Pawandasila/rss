"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { Mission } from "@/module/crm/mission/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buildMediaUrl } from "@/lib/media";

interface MissionTableProps {
  missions: Mission[];
  onEdit: (mission: Mission) => void;
  onDelete: (id: number) => void;
}

export function MissionTable({
  missions,
  onEdit,
  onDelete,
}: MissionTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {missions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No missions found.
              </TableCell>
            </TableRow>
          ) : (
            missions.map((mission) => (
              <TableRow key={mission.id}>
                <TableCell>
                  <Avatar className="h-10 w-10 rounded-md">
                    <AvatarImage
                      src={buildMediaUrl(mission.image)}
                      alt={mission.title}
                      className="object-cover"
                    />
                    <AvatarFallback>IMG</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {mission.icon && (
                      <Image
                        src={buildMediaUrl(mission.icon)!}
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                        alt="icon"
                      />
                    )}
                    <div className="flex flex-col">
                      <span>{mission.title}</span>
                      {mission.headline && (
                        <span className="text-xs text-muted-foreground">
                          {mission.headline}
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{mission.category || "-"}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(mission.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(mission)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => onDelete(mission.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
