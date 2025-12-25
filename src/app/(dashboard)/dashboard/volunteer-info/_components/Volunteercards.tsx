"use client"

import React, { useEffect, useState } from 'react'
import useAxios from '@/hooks/use-axios'
import { Loader2, Search, Users, Eye } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { VolunteerWithUser, ViewVolunteerModal } from '@/module/dashboard/volunteer'

const VolunteerCard: React.FC = () => {
  const api = useAxios()
  const [volunteers, setVolunteers] = useState<VolunteerWithUser[]>([])
  const [filteredVolunteers, setFilteredVolunteers] = useState<VolunteerWithUser[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerWithUser | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    let mounted = true
    const fetchVolunteers = async () => {
      try {
        setLoading(true)
        const res = await api.get('/volunteer/volunteers/')
        const results = res.data.results || []
        if (mounted) {
          setVolunteers(results)
          setFilteredVolunteers(results)
        }
      } catch (error) {
        console.error('Error fetching volunteers:', error)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchVolunteers()
    return () => { mounted = false }
  }, [api])

  useEffect(() => {
    const q = searchQuery.toLowerCase()
    const filtered = volunteers.filter((v) => {
      const u = v.user
      return (
        u.name?.toLowerCase().includes(q) ||
        u.username?.toLowerCase().includes(q) ||
        u.profession?.toLowerCase().includes(q) ||
        u.city?.toLowerCase().includes(q) ||
        u.state?.toLowerCase().includes(q) ||
        u.district?.toLowerCase().includes(q) ||
        v.phone_number?.includes(q)
      )
    })
    setFilteredVolunteers(filtered)
  }, [searchQuery, volunteers])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2">
            <Users className="h-4 w-4 sm:h-5 sm:w-5" />
            Volunteers
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">{filteredVolunteers.length} active volunteer(s)</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
            <Input placeholder="Search name, phone, city..." className="pl-9 h-9 sm:h-10 text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>
      </div>

      {filteredVolunteers.length === 0 ? (
        <div className="text-center py-20 border rounded-lg bg-muted/10">
          <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-20" />
          <h3 className="text-xl font-semibold mb-2">No volunteers found</h3>
          <p className="text-muted-foreground">Try changing your search filters</p>
        </div>
      ) : (
        <div className="rounded-lg border bg-card overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[50px] sm:w-[60px] text-xs sm:text-sm">Photo</TableHead>
                <TableHead className="min-w-[120px] sm:min-w-[150px] text-xs sm:text-sm">Name</TableHead>
                <TableHead className="hidden sm:table-cell min-w-[180px] text-xs sm:text-sm">Contact</TableHead>
                <TableHead className="hidden md:table-cell text-xs sm:text-sm">Wing</TableHead>
                <TableHead className="hidden lg:table-cell text-xs sm:text-sm">Level</TableHead>
                <TableHead className="hidden xl:table-cell text-xs sm:text-sm">Designation</TableHead>
                <TableHead className="w-[80px] sm:w-[130px] text-right text-xs sm:text-sm">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVolunteers.map((volunteer) => {
                const u = volunteer.user
                return (
                  <TableRow key={volunteer.id}>
                    <TableCell>
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                        <AvatarImage src={u.image ?? ''} alt={u.name ?? 'volunteer'} />
                        <AvatarFallback className="text-xs sm:text-sm">{(u.name || u.username || 'V').slice(0,2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </TableCell>

                    <TableCell>
                      <div>
                        <p className="font-medium text-xs sm:text-sm">{u.name}</p>
                        <div className="sm:hidden mt-1 space-y-0.5 text-xs text-muted-foreground">
                          <div className="truncate">{u.email}</div>
                          <div className="font-medium">{volunteer.phone_number || u.phone}</div>
                          <div className="md:hidden">{volunteer.wing_name || '—'}</div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="hidden sm:table-cell">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs sm:text-sm text-muted-foreground truncate max-w-[180px]">{u.email}</span>
                        <span className="text-xs sm:text-sm font-medium">{volunteer.phone_number || u.phone}</span>
                      </div>
                    </TableCell>

                    <TableCell className="hidden md:table-cell text-xs sm:text-sm">{volunteer.wing_name || '—'}</TableCell>

                    <TableCell className="hidden lg:table-cell text-xs sm:text-sm">{volunteer.level_name || '—'}</TableCell>

                    <TableCell className="hidden xl:table-cell text-xs sm:text-sm">{volunteer.designation_title || '—'}</TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1 sm:gap-2">
                        {volunteer.can_view_member_data ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)]"
                            onClick={() => {
                              setSelectedVolunteer(volunteer)
                              setIsModalOpen(true)
                            }}
                          >
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] opacity-50"
                            disabled
                          >
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <ViewVolunteerModal
        volunteer={selectedVolunteer}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  )
}

export default VolunteerCard
