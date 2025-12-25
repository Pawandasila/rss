'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { User } from '@/types/auth.types';
import Image from 'next/image';
import { getApiBaseUrl } from '@/lib/env';
import { getUserImageUrl } from '@/lib/media';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, Mail, Phone, MapPin, Calendar, User as UserIcon, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const IDCardManagement = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<number | undefined>(undefined);
  const [errorDetail, setErrorDetail] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchMemberData() {
      if (!id) {
        setError('No user ID provided');
        setErrorStatus(undefined);
        setErrorDetail(undefined);
        setLoading(false);
        return;
      }

      try {
        const apiBaseUrl = getApiBaseUrl();

        const response = await fetch(`${apiBaseUrl}/account/list/?user_id=${id}` as string, {
          method: 'GET',
          cache: 'no-store',
        });

        if (!response.ok) {
          let detail = '';
          try {
            const errJson = await response.json();
            detail = errJson?.detail || errJson?.message || '';
          } catch {}


          setError(detail || `Failed to fetch user data (HTTP ${response.status}).`);
          setErrorStatus(response.status);
          setErrorDetail(detail);
          return;
        }

        const data = await response.json();

        if (data?.results?.length > 0) {
          setUser(data.results[0]);
          setError(null);
          setErrorStatus(undefined);
          setErrorDetail(undefined);
        } else {
          setError('User not found');
          setErrorStatus(404);
          setErrorDetail('No user matches this ID.');
        }
      } catch (err) {
        console.error('Error fetching member data:', err);
        const message = err instanceof Error ? err.message : 'Failed to load user data';
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchMemberData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <Card className="w-full max-w-md border-0 shadow-2xl">
          <CardHeader>
            <CardTitle>ID Verification</CardTitle>
            <CardDescription>Loading ID Card...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse">
              <div className="h-28 w-full rounded-xl bg-slate-200" />
              <div className="-mt-10 ml-4 h-20 w-20 rounded-full bg-slate-300 border-4 border-white" />
              <div className="mt-8 space-y-3">
                <div className="h-4 bg-slate-200 rounded w-1/2" />
                <div className="h-3 bg-slate-200 rounded w-1/3" />
                <div className="h-3 bg-slate-200 rounded w-2/3" />
                <div className="h-3 bg-slate-200 rounded w-1/4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                ID Verification Error
              </CardTitle>
              <CardDescription>
                {typeof id === 'string' ? `For ID: ${id}` : 'Unable to read ID from URL'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {error}
                    {errorStatus && (
                      <>
                        <span className="ml-2 inline-block">
                          <Badge variant="outline">HTTP {errorStatus}</Badge>
                        </span>
                      </>
                    )}
                    {errorDetail && (
                      <div className="mt-1 text-xs text-muted-foreground">{errorDetail}</div>
                    )}
                  </AlertDescription>
                </Alert>

                <div className="flex items-center gap-2 pt-2">
                  <Button onClick={() => typeof window !== 'undefined' && window.location.reload()} variant="default">
                    Retry
                  </Button>

                  <Link href="/">
                    <Button variant="ghost">Home</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const userImageUrl = getUserImageUrl(user.image);
  const formattedDOB = user.dob ? new Date(user.dob).toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }) : 'N/A';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 sm:p-6">
      <Card className="w-full max-w-md shadow-2xl border-0 overflow-hidden">
        {/* Header with Avatar */}
        <div className="relative bg-gradient-to-br from-primary to-primary/80 h-32 sm:h-40">
          <div className="absolute -bottom-12 sm:-bottom-14 left-1/2 -translate-x-1/2">
            <div className="relative">
              <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                <Image
                  src={userImageUrl || '/placeholder-user.jpg'}
                  height={112}
                  width={112}
                  alt={user.name || 'User'}
                  className="h-full w-full object-cover"
                />
              </div>
              {user.is_verified && (
                <div className="absolute -bottom-1 -right-1 h-7 w-7 sm:h-8 sm:w-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
              )}
            </div>
          </div>
        </div>

        <CardContent className="pt-16 sm:pt-20 pb-6 px-4 sm:px-6">
          {/* Name and Profession */}
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 capitalize mb-1">
              {user.name || 'Unknown User'}
            </h2>
            {user.profession && (
              <p className="text-sm sm:text-base text-muted-foreground capitalize">
                {user.profession}
              </p>
            )}
            <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
              <Badge variant="outline" className="text-xs font-mono">
                ID: {user.user_id}
              </Badge>
              {user.is_verified && (
                <Badge variant="default" className="text-xs bg-green-100 text-green-700 border-green-200">
                  Verified
                </Badge>
              )}
              {user.is_blocked && (
                <Badge variant="destructive" className="text-xs">
                  Blocked
                </Badge>
              )}
            </div>
          </div>

          <Separator className="my-5" />

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email</p>
                <p className="text-sm sm:text-base text-gray-900 break-words">{user.email || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Phone</p>
                <p className="text-sm sm:text-base text-gray-900">{user.phone || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Gender</p>
                <p className="text-sm sm:text-base text-gray-900 capitalize">{user.gender || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Date of Birth</p>
                <p className="text-sm sm:text-base text-gray-900">{formattedDOB}</p>
              </div>
            </div>

            {user.blood_group && (
              <div className="flex items-start gap-3">
                <div className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground mt-0.5 flex-shrink-0 flex items-center justify-center">
                  <span className="text-sm font-bold">🩸</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Blood Group</p>
                  <p className="text-sm sm:text-base text-gray-900 font-semibold">{user.blood_group}</p>
                </div>
              </div>
            )}

            {(user.street || user.city || user.state || user.country) && (
              <>
                <Separator className="my-4" />
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Address</p>
                    <div className="text-sm sm:text-base text-gray-900 space-y-0.5">
                      {user.street && <p>{user.street}</p>}
                      {user.city && <p>{user.city}</p>}
                      {user.state && <p>{user.state}</p>}
                      {user.country && <p>{user.country}</p>}
                      {user.postal_code && <p className="text-muted-foreground">{user.postal_code}</p>}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t text-center">
            <p className="text-xs text-muted-foreground">
              This is an official digital ID card
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IDCardManagement;
