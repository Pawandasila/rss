"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Globe,
  MapPin,
  Plus,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useCountryApi } from "@/module/country/hooks";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export default function CountryStateManagementPage() {
  const {
    states,
    districts,
    isLoadingStates,
    isLoadingDistricts,
    statesError,
    districtsError,
    createState,
    createDistrict,
    isCreatingState,
    isCreatingDistrict,
    fetchStates,
    fetchDistricts,
    canCreateState,
    canCreateDistrict,
    deleteState,
    deleteDistrict,
    mandals,
    isLoadingMandals,
    mandalsError,
    createMandal,
    isCreatingMandal,
    fetchMandals,
    canCreateMandal,
    deleteMandal,
    refreshDistricts,
  } = useCountryApi();

  const [newStateName, setNewStateName] = useState("");
  const [newDistrictName, setNewDistrictName] = useState("");
  const [selectedStateForDistrict, setSelectedStateForDistrict] = useState<
    number | null
  >(null);
  const [isStateDialogOpen, setIsStateDialogOpen] = useState(false);
  const [isDistrictDialogOpen, setIsDistrictDialogOpen] = useState(false);
  const [isMandalDialogOpen, setIsMandalDialogOpen] = useState(false);

  const [newMandalName, setNewMandalName] = useState("");
  const [selectedStateForMandal, setSelectedStateForMandal] = useState<
    number | null
  >(null);
  const [selectedDistrictForMandal, setSelectedDistrictForMandal] = useState<
    number | null
  >(null);

  const [statesCurrentPage, setStatesCurrentPage] = useState(1);
  const [districtsCurrentPage, setDistrictsCurrentPage] = useState(1);
  const [mandalsCurrentPage, setMandalsCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleCreateState = async () => {
    if (!newStateName.trim()) {
      toast.error("Please enter a state name");
      return;
    }

    const result = await createState({ name: newStateName.trim() });
    if (result) {
      toast.success(`State "${result.name}" created successfully`);
      setNewStateName("");
      setIsStateDialogOpen(false);
      fetchStates();
    }
  };

  const handleDeleteState = async (id?: number, name?: string) => {
    if (!id) return;
    if (!window.confirm(`Delete state "${name || id}"? This cannot be undone.`))
      return;
    const ok = await deleteState(id);
    if (ok) {
      toast.success(`State "${name || id}" deleted successfully`);
      fetchStates();
    }
  };

  const handleDeleteDistrict = async (id?: number, name?: string) => {
    if (!id) return;
    if (
      !window.confirm(`Delete district "${name || id}"? This cannot be undone.`)
    )
      return;
    const ok = await deleteDistrict(id);
    if (ok) {
      toast.success(`District "${name || id}" deleted successfully`);
      if (selectedStateForDistrict) fetchDistricts(selectedStateForDistrict);
    }
  };

  const handleCreateDistrict = async () => {
    if (!newDistrictName.trim()) {
      toast.error("Please enter a district name");
      return;
    }

    if (!selectedStateForDistrict) {
      toast.error("Please select a state");
      return;
    }

    const result = await createDistrict({
      name: newDistrictName.trim(),
      state: selectedStateForDistrict,
    });

    if (result) {
      toast.success(`District "${result.name}" created successfully`);
      setNewDistrictName("");
      setIsDistrictDialogOpen(false);
      fetchDistricts(selectedStateForDistrict);
    }
  };

  const handleCreateMandal = async () => {
    if (!newMandalName.trim()) {
      toast.error("Please enter a mandal name");
      return;
    }

    if (!selectedDistrictForMandal) {
      toast.error("Please select a district");
      return;
    }

    const result = await createMandal({
      name: newMandalName.trim(),
      district: selectedDistrictForMandal,
    });

    if (result) {
      toast.success(`Mandal "${result.name}" created successfully`);
      setNewMandalName("");
      setIsMandalDialogOpen(false);
      fetchMandals(selectedDistrictForMandal);
    }
  };

  const handleDeleteMandal = async (id?: number, name?: string) => {
    if (!id) return;
    if (
      !window.confirm(`Delete mandal "${name || id}"? This cannot be undone.`)
    )
      return;
    const ok = await deleteMandal(id);
    if (ok) {
      toast.success(`Mandal "${name || id}" deleted successfully`);
      if (selectedDistrictForMandal) fetchMandals(selectedDistrictForMandal);
    }
  };

  if (!canCreateState || !canCreateDistrict || !canCreateMandal) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You don&apos;t have permission to manage states and districts. Only
            admin and staff users can access this page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Globe className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">
            Country, State & District Management
          </h1>
        </div>
        <p className="text-muted-foreground">
          Manage geographical locations for the organization. Add new states and
          districts as needed.
        </p>
      </div>

      {/* Permission Badge */}
      <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800 dark:text-green-200">
          You have admin/staff permissions to create and manage states and
          districts.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="states" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-xl">
          <TabsTrigger value="states" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            States
          </TabsTrigger>
          <TabsTrigger value="districts" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Districts
          </TabsTrigger>
          <TabsTrigger value="mandals" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Mandals
          </TabsTrigger>
        </TabsList>

        {/* States Tab */}
        <TabsContent value="states" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle>States</CardTitle>
                <CardDescription>
                  Manage all states in the system
                </CardDescription>
              </div>
              <Dialog
                open={isStateDialogOpen}
                onOpenChange={setIsStateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add State
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New State</DialogTitle>
                    <DialogDescription>
                      Create a new state in the system. Make sure the name is
                      unique.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="state-name">State Name</Label>
                      <Input
                        id="state-name"
                        placeholder="e.g., Maharashtra"
                        value={newStateName}
                        onChange={(e) => setNewStateName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !isCreatingState) {
                            handleCreateState();
                          }
                        }}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsStateDialogOpen(false)}
                      disabled={isCreatingState}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateState}
                      disabled={isCreatingState || !newStateName.trim()}
                    >
                      {isCreatingState ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Create State
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {statesError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{statesError}</AlertDescription>
                </Alert>
              )}

              {isLoadingStates ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : states.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No states found. Add your first state to get started.</p>
                </div>
              ) : (
                <>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {/* <TableHead className="w-[100px]">ID</TableHead> */}
                          <TableHead>State Name</TableHead>
                          <TableHead className="w-[150px]">Districts</TableHead>
                          <TableHead className="w-[120px] text-right">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {states
                          .slice(
                            (statesCurrentPage - 1) * itemsPerPage,
                            statesCurrentPage * itemsPerPage
                          )
                          .map((state) => (
                            <TableRow key={state.id}>
                              {/* <TableCell className="font-medium">{state.id}</TableCell> */}
                              <TableCell>{state.name}</TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedStateForDistrict(
                                      state.id || null
                                    );
                                    fetchDistricts(state.id);
                                  }}
                                >
                                  {state.district_count ?? 0} Districts
                                </Button>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() =>
                                    handleDeleteState(state.id, state.name)
                                  }
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                  {Math.ceil(states.length / itemsPerPage) > 1 && (
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Showing {(statesCurrentPage - 1) * itemsPerPage + 1} to{" "}
                        {Math.min(
                          statesCurrentPage * itemsPerPage,
                          states.length
                        )}{" "}
                        of {states.length} states
                      </p>
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() =>
                                setStatesCurrentPage((p) => Math.max(1, p - 1))
                              }
                              className={
                                statesCurrentPage === 1
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                          {Array.from(
                            { length: Math.ceil(states.length / itemsPerPage) },
                            (_, i) => i + 1
                          ).map((page) => {
                            const totalPages = Math.ceil(
                              states.length / itemsPerPage
                            );
                            if (
                              page === 1 ||
                              page === totalPages ||
                              (page >= statesCurrentPage - 1 &&
                                page <= statesCurrentPage + 1)
                            ) {
                              return (
                                <PaginationItem key={page}>
                                  <PaginationLink
                                    onClick={() => setStatesCurrentPage(page)}
                                    isActive={statesCurrentPage === page}
                                    className="cursor-pointer"
                                  >
                                    {page}
                                  </PaginationLink>
                                </PaginationItem>
                              );
                            } else if (
                              page === statesCurrentPage - 2 ||
                              page === statesCurrentPage + 2
                            ) {
                              return (
                                <PaginationItem key={page}>
                                  <PaginationEllipsis />
                                </PaginationItem>
                              );
                            }
                            return null;
                          })}
                          <PaginationItem>
                            <PaginationNext
                              onClick={() =>
                                setStatesCurrentPage((p) =>
                                  Math.min(
                                    Math.ceil(states.length / itemsPerPage),
                                    p + 1
                                  )
                                )
                              }
                              className={
                                statesCurrentPage ===
                                Math.ceil(states.length / itemsPerPage)
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Districts Tab */}
        <TabsContent value="districts" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle>Districts</CardTitle>
                <CardDescription>
                  Manage districts within each state
                </CardDescription>
              </div>
              <Dialog
                open={isDistrictDialogOpen}
                onOpenChange={setIsDistrictDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add District
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New District</DialogTitle>
                    <DialogDescription>
                      Create a new district under a selected state.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="district-state">Select State</Label>
                      <Select
                        value={selectedStateForDistrict?.toString() || ""}
                        onValueChange={(value) =>
                          setSelectedStateForDistrict(Number(value))
                        }
                      >
                        <SelectTrigger id="district-state">
                          <SelectValue placeholder="Choose a state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem
                              key={state.id}
                              value={state.id?.toString() || ""}
                            >
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district-name">District Name</Label>
                      <Input
                        id="district-name"
                        placeholder="e.g., Mumbai"
                        value={newDistrictName}
                        onChange={(e) => setNewDistrictName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !isCreatingDistrict) {
                            handleCreateDistrict();
                          }
                        }}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDistrictDialogOpen(false)}
                      disabled={isCreatingDistrict}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateDistrict}
                      disabled={
                        isCreatingDistrict ||
                        !newDistrictName.trim() ||
                        !selectedStateForDistrict
                      }
                    >
                      {isCreatingDistrict ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Create District
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label htmlFor="filter-state">Filter by State</Label>
                <Select
                  value={selectedStateForDistrict?.toString() || "all"}
                  onValueChange={(value) => {
                    if (value === "all") {
                      setSelectedStateForDistrict(null);
                    } else {
                      const stateId = Number(value);
                      setSelectedStateForDistrict(stateId);
                      fetchDistricts(stateId);
                    }
                  }}
                >
                  <SelectTrigger id="filter-state" className="max-w-xs">
                    <SelectValue placeholder="All states" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {states.map((state) => (
                      <SelectItem
                        key={state.id}
                        value={state.id?.toString() || ""}
                      >
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {districtsError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{districtsError}</AlertDescription>
                </Alert>
              )}

              {isLoadingDistricts ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : !selectedStateForDistrict ? (
                <div className="text-center py-12 text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a state to view its districts.</p>
                </div>
              ) : districts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>
                    No districts found for this state. Add your first district.
                  </p>
                </div>
              ) : (
                <>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {/* <TableHead className="w-[100px]">ID</TableHead> */}
                          <TableHead>District Name</TableHead>
                          <TableHead>State</TableHead>
                          <TableHead className="w-[120px] text-right">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {districts
                          .slice(
                            (districtsCurrentPage - 1) * itemsPerPage,
                            districtsCurrentPage * itemsPerPage
                          )
                          .map((district) => {
                            const stateName = states.find(
                              (s) =>
                                s.id === (district.state || district.state_id)
                            )?.name;
                            return (
                              <TableRow key={district.id}>
                                {/* <TableCell className="font-medium">{district.id}</TableCell> */}
                                <TableCell>{district.name}</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">
                                    {stateName || "Unknown"}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() =>
                                      handleDeleteDistrict(
                                        district.id,
                                        district.name
                                      )
                                    }
                                  >
                                    Delete
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </div>
                  {Math.ceil(districts.length / itemsPerPage) > 1 && (
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Showing {(districtsCurrentPage - 1) * itemsPerPage + 1}{" "}
                        to{" "}
                        {Math.min(
                          districtsCurrentPage * itemsPerPage,
                          districts.length
                        )}{" "}
                        of {districts.length} districts
                      </p>
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() =>
                                setDistrictsCurrentPage((p) =>
                                  Math.max(1, p - 1)
                                )
                              }
                              className={
                                districtsCurrentPage === 1
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                          {Array.from(
                            {
                              length: Math.ceil(
                                districts.length / itemsPerPage
                              ),
                            },
                            (_, i) => i + 1
                          ).map((page) => {
                            const totalPages = Math.ceil(
                              districts.length / itemsPerPage
                            );
                            if (
                              page === 1 ||
                              page === totalPages ||
                              (page >= districtsCurrentPage - 1 &&
                                page <= districtsCurrentPage + 1)
                            ) {
                              return (
                                <PaginationItem key={page}>
                                  <PaginationLink
                                    onClick={() =>
                                      setDistrictsCurrentPage(page)
                                    }
                                    isActive={districtsCurrentPage === page}
                                    className="cursor-pointer"
                                  >
                                    {page}
                                  </PaginationLink>
                                </PaginationItem>
                              );
                            } else if (
                              page === districtsCurrentPage - 2 ||
                              page === districtsCurrentPage + 2
                            ) {
                              return (
                                <PaginationItem key={page}>
                                  <PaginationEllipsis />
                                </PaginationItem>
                              );
                            }
                            return null;
                          })}
                          <PaginationItem>
                            <PaginationNext
                              onClick={() =>
                                setDistrictsCurrentPage((p) =>
                                  Math.min(
                                    Math.ceil(districts.length / itemsPerPage),
                                    p + 1
                                  )
                                )
                              }
                              className={
                                districtsCurrentPage ===
                                Math.ceil(districts.length / itemsPerPage)
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mandals Tab */}
        <TabsContent value="mandals" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle>Mandals</CardTitle>
                <CardDescription>
                  Manage mandals within each district
                </CardDescription>
              </div>
              <Dialog
                open={isMandalDialogOpen}
                onOpenChange={setIsMandalDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Mandal
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Mandal</DialogTitle>
                    <DialogDescription>
                      Create a new mandal under a selected district.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="mandal-state">Select State</Label>
                      <Select
                        value={selectedStateForMandal?.toString() || ""}
                        onValueChange={(value) => {
                          const stateId = Number(value);
                          setSelectedStateForMandal(stateId);
                          setSelectedDistrictForMandal(null); // Reset district
                          refreshDistricts(stateId); // Fetch districts for this state
                        }}
                      >
                        <SelectTrigger id="mandal-state">
                          <SelectValue placeholder="Choose a state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem
                              key={state.id}
                              value={state.id?.toString() || ""}
                            >
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mandal-district">Select District</Label>
                      <Select
                        value={selectedDistrictForMandal?.toString() || ""}
                        onValueChange={(value) =>
                          setSelectedDistrictForMandal(Number(value))
                        }
                        disabled={!selectedStateForMandal}
                      >
                        <SelectTrigger id="mandal-district">
                          <SelectValue placeholder="Choose a district" />
                        </SelectTrigger>
                        <SelectContent>
                          {districts.map((district) => (
                            <SelectItem
                              key={district.id}
                              value={district.id?.toString() || ""}
                            >
                              {district.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mandal-name">Mandal Name</Label>
                      <Input
                        id="mandal-name"
                        placeholder="e.g., Sadar"
                        value={newMandalName}
                        onChange={(e) => setNewMandalName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !isCreatingMandal) {
                            handleCreateMandal();
                          }
                        }}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsMandalDialogOpen(false)}
                      disabled={isCreatingMandal}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateMandal}
                      disabled={
                        isCreatingMandal ||
                        !newMandalName.trim() ||
                        !selectedDistrictForMandal
                      }
                    >
                      {isCreatingMandal ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Create Mandal
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <Label htmlFor="filter-mandal-state">Filter by State</Label>
                  <Select
                    value={selectedStateForMandal?.toString() || "all"}
                    onValueChange={(value) => {
                      if (value === "all") {
                        setSelectedStateForMandal(null);
                        setSelectedDistrictForMandal(null);
                      } else {
                        const stateId = Number(value);
                        setSelectedStateForMandal(stateId);
                        setSelectedDistrictForMandal(null);
                        refreshDistricts(stateId);
                      }
                    }}
                  >
                    <SelectTrigger id="filter-mandal-state">
                      <SelectValue placeholder="All states" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      {states.map((state) => (
                        <SelectItem
                          key={state.id}
                          value={state.id?.toString() || ""}
                        >
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="filter-mandal-district">
                    Filter by District
                  </Label>
                  <Select
                    value={selectedDistrictForMandal?.toString() || "all"}
                    onValueChange={(value) => {
                      if (value === "all") {
                        setSelectedDistrictForMandal(null);
                      } else {
                        const districtId = Number(value);
                        setSelectedDistrictForMandal(districtId);
                        fetchMandals(districtId);
                      }
                    }}
                    disabled={!selectedStateForMandal}
                  >
                    <SelectTrigger id="filter-mandal-district">
                      <SelectValue placeholder="All districts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Districts</SelectItem>
                      {districts.map((district) => (
                        <SelectItem
                          key={district.id}
                          value={district.id?.toString() || ""}
                        >
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {mandalsError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{mandalsError}</AlertDescription>
                </Alert>
              )}

              {isLoadingMandals ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : !selectedDistrictForMandal ? (
                <div className="text-center py-12 text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a district to view its mandals.</p>
                </div>
              ) : mandals.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>
                    No mandals found for this district. Add your first mandal.
                  </p>
                </div>
              ) : (
                <>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mandal Name</TableHead>
                          <TableHead>District</TableHead>
                          <TableHead className="w-[120px] text-right">
                            Actions
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mandals
                          .slice(
                            (mandalsCurrentPage - 1) * itemsPerPage,
                            mandalsCurrentPage * itemsPerPage
                          )
                          .map((mandal) => {
                            const districtName = districts.find(
                              (d) =>
                                d.id === (mandal.district || mandal.district_id)
                            )?.name;
                            return (
                              <TableRow key={mandal.id}>
                                <TableCell>{mandal.name}</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">
                                    {districtName || "Unknown"}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() =>
                                      handleDeleteMandal(mandal.id, mandal.name)
                                    }
                                  >
                                    Delete
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </div>
                  {/* Pagination for Mandals */}
                  {Math.ceil(mandals.length / itemsPerPage) > 1 && (
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Showing {(mandalsCurrentPage - 1) * itemsPerPage + 1} to{" "}
                        {Math.min(
                          mandalsCurrentPage * itemsPerPage,
                          mandals.length
                        )}{" "}
                        of {mandals.length} mandals
                      </p>
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() =>
                                setMandalsCurrentPage((p) => Math.max(1, p - 1))
                              }
                              className={
                                mandalsCurrentPage === 1
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                          {Array.from(
                            {
                              length: Math.ceil(mandals.length / itemsPerPage),
                            },
                            (_, i) => i + 1
                          ).map((page) => {
                            const totalPages = Math.ceil(
                              mandals.length / itemsPerPage
                            );
                            if (
                              page === 1 ||
                              page === totalPages ||
                              (page >= mandalsCurrentPage - 1 &&
                                page <= mandalsCurrentPage + 1)
                            ) {
                              return (
                                <PaginationItem key={page}>
                                  <PaginationLink
                                    onClick={() => setMandalsCurrentPage(page)}
                                    isActive={mandalsCurrentPage === page}
                                    className="cursor-pointer"
                                  >
                                    {page}
                                  </PaginationLink>
                                </PaginationItem>
                              );
                            } else if (
                              page === mandalsCurrentPage - 2 ||
                              page === mandalsCurrentPage + 2
                            ) {
                              return (
                                <PaginationItem key={page}>
                                  <PaginationEllipsis />
                                </PaginationItem>
                              );
                            }
                            return null;
                          })}
                          <PaginationItem>
                            <PaginationNext
                              onClick={() =>
                                setMandalsCurrentPage((p) =>
                                  Math.min(
                                    Math.ceil(mandals.length / itemsPerPage),
                                    p + 1
                                  )
                                )
                              }
                              className={
                                mandalsCurrentPage ===
                                Math.ceil(mandals.length / itemsPerPage)
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
