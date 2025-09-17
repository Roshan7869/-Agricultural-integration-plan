"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Leaf,
  Package,
  Truck,
  Store,
  QrCode,
  Shield,
  Users,
  MapPin,
  CheckCircle,
  Clock,
  Search,
  Plus,
} from "lucide-react"

// Mock data for demonstration
const mockBatches = [
  {
    id: "GS-2025-001",
    product: "Organic Tomatoes",
    farm: "Green Valley Farm",
    status: "In Transit",
    progress: 75,
    milestones: [
      { stage: "Harvested", date: "2025-01-15", org: "Green Valley Farm", completed: true },
      { stage: "Washed", date: "2025-01-15", org: "Green Valley Farm", completed: true },
      { stage: "Packed", date: "2025-01-16", org: "Fresh Pack Co.", completed: true },
      { stage: "Shipped", date: "2025-01-17", org: "Swift Logistics", completed: false },
      { stage: "Received", date: "", org: "Market Fresh", completed: false },
    ],
    qrGenerated: true,
  },
  {
    id: "GS-2025-002",
    product: "Premium Lettuce",
    farm: "Sunrise Organics",
    status: "Ready to Ship",
    progress: 60,
    milestones: [
      { stage: "Harvested", date: "2025-01-16", org: "Sunrise Organics", completed: true },
      { stage: "Washed", date: "2025-01-16", org: "Sunrise Organics", completed: true },
      { stage: "Packed", date: "2025-01-17", org: "Fresh Pack Co.", completed: true },
      { stage: "Shipped", date: "", org: "Swift Logistics", completed: false },
      { stage: "Received", date: "", org: "Market Fresh", completed: false },
    ],
    qrGenerated: false,
  },
]

const organizationTypes = [
  { id: "farm", name: "Farm", icon: Leaf, color: "bg-green-100 text-green-800" },
  { id: "packing", name: "Packing House", icon: Package, color: "bg-blue-100 text-blue-800" },
  { id: "distributor", name: "Distributor", icon: Truck, color: "bg-orange-100 text-orange-800" },
  { id: "retailer", name: "Retailer", icon: Store, color: "bg-purple-100 text-purple-800" },
]

export default function GreenSightPlatform() {
  const [selectedOrg, setSelectedOrg] = useState("farm")
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null)
  const [newBatchForm, setNewBatchForm] = useState({
    product: "",
    quantity: "",
    field: "",
    harvestDate: "",
  })

  const currentOrg = organizationTypes.find((org) => org.id === selectedOrg)

  const handleCreateBatch = () => {
    console.log("Creating new batch:", newBatchForm)
    // Here you would integrate with the blockchain API
    setNewBatchForm({ product: "", quantity: "", field: "", harvestDate: "" })
  }

  const handleRecordMilestone = (batchId: string, milestone: string) => {
    console.log("Recording milestone:", { batchId, milestone })
    // Here you would integrate with the blockchain API
  }

  const handleGenerateQR = (batchId: string) => {
    console.log("Generating QR code for batch:", batchId)
    // Here you would integrate with the QR service
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-primary">GreenSight</h1>
              </div>
              <Badge variant="secondary" className="ml-2">
                Blockchain Powered
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {organizationTypes.map((org) => (
                    <SelectItem key={org.id} value={org.id}>
                      <div className="flex items-center gap-2">
                        <org.icon className="h-4 w-4" />
                        {org.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="batches">Batch Management</TabsTrigger>
            <TabsTrigger value="traceability">Traceability</TabsTrigger>
            <TabsTrigger value="public">Public Query</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-balance">{currentOrg?.name} Dashboard</h2>
                <p className="text-muted-foreground">Monitor your supply chain operations and blockchain records</p>
              </div>
              <div className={`p-3 rounded-lg ${currentOrg?.color}`}>
                {currentOrg && <currentOrg.icon className="h-8 w-8" />}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Batches</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+2 from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blockchain Records</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">100% verified</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">QR Codes Generated</CardTitle>
                  <QrCode className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Transit Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.2d</div>
                  <p className="text-xs text-muted-foreground">-0.5d improvement</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Blockchain Activity</CardTitle>
                <CardDescription>Latest supply chain milestones recorded on the blockchain</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBatches.map((batch) => (
                    <div key={batch.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{batch.product}</p>
                          <p className="text-sm text-muted-foreground">Batch ID: {batch.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={batch.status === "In Transit" ? "default" : "secondary"}>{batch.status}</Badge>
                        <Progress value={batch.progress} className="w-24" />
                        <span className="text-sm text-muted-foreground">{batch.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Batch Management Tab */}
          <TabsContent value="batches" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-balance">Batch Management</h2>
                <p className="text-muted-foreground">Create and manage product batches</p>
              </div>
              <Button onClick={() => setSelectedBatch("new")}>
                <Plus className="h-4 w-4 mr-2" />
                New Batch
              </Button>
            </div>

            {selectedBatch === "new" && (
              <Card>
                <CardHeader>
                  <CardTitle>Create New Batch</CardTitle>
                  <CardDescription>Record a new product batch on the blockchain</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="product">Product Name</Label>
                      <Input
                        id="product"
                        value={newBatchForm.product}
                        onChange={(e) => setNewBatchForm((prev) => ({ ...prev, product: e.target.value }))}
                        placeholder="e.g., Organic Tomatoes"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        value={newBatchForm.quantity}
                        onChange={(e) => setNewBatchForm((prev) => ({ ...prev, quantity: e.target.value }))}
                        placeholder="e.g., 500 lbs"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="field">Field Location</Label>
                      <Input
                        id="field"
                        value={newBatchForm.field}
                        onChange={(e) => setNewBatchForm((prev) => ({ ...prev, field: e.target.value }))}
                        placeholder="e.g., Field A-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="harvestDate">Harvest Date</Label>
                      <Input
                        id="harvestDate"
                        type="date"
                        value={newBatchForm.harvestDate}
                        onChange={(e) => setNewBatchForm((prev) => ({ ...prev, harvestDate: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleCreateBatch}>Create Batch</Button>
                    <Button variant="outline" onClick={() => setSelectedBatch(null)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Existing Batches */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockBatches.map((batch) => (
                <Card key={batch.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{batch.product}</CardTitle>
                        <CardDescription>
                          ID: {batch.id} • {batch.farm}
                        </CardDescription>
                      </div>
                      <Badge variant={batch.status === "In Transit" ? "default" : "secondary"}>{batch.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{batch.progress}%</span>
                      </div>
                      <Progress value={batch.progress} />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Supply Chain Milestones</h4>
                      <div className="space-y-2">
                        {batch.milestones.map((milestone, index) => (
                          <div key={index} className="flex items-center gap-3 text-sm">
                            {milestone.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <Clock className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className={milestone.completed ? "text-foreground" : "text-muted-foreground"}>
                              {milestone.stage}
                            </span>
                            {milestone.date && <span className="text-muted-foreground ml-auto">{milestone.date}</span>}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleRecordMilestone(batch.id, "next")}>
                        Record Milestone
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleGenerateQR(batch.id)}
                        disabled={!batch.qrGenerated}
                      >
                        <QrCode className="h-4 w-4 mr-2" />
                        {batch.qrGenerated ? "View QR" : "Generate QR"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Traceability Tab */}
          <TabsContent value="traceability" className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-balance">Supply Chain Traceability</h2>
              <p className="text-muted-foreground">Track products through the entire supply chain</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Batch Journey Visualization</CardTitle>
                <CardDescription>Complete traceability from farm to consumer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockBatches[0].milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-full ${milestone.completed ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"}`}
                      >
                        {index === 0 && <Leaf className="h-5 w-5" />}
                        {index === 1 && <Package className="h-5 w-5" />}
                        {index === 2 && <Package className="h-5 w-5" />}
                        {index === 3 && <Truck className="h-5 w-5" />}
                        {index === 4 && <Store className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{milestone.stage}</h4>
                            <p className="text-sm text-muted-foreground">{milestone.org}</p>
                          </div>
                          <div className="text-right">
                            {milestone.date && <p className="text-sm font-medium">{milestone.date}</p>}
                            <div className="flex items-center gap-2">
                              {milestone.completed ? (
                                <Badge variant="default" className="bg-green-100 text-green-800">
                                  Completed
                                </Badge>
                              ) : (
                                <Badge variant="secondary">Pending</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Public Query Tab */}
          <TabsContent value="public" className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-balance">Public Product Query</h2>
              <p className="text-muted-foreground">Consumer-facing interface for product verification</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Product Lookup</CardTitle>
                <CardDescription>Enter batch ID or scan QR code to view product journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Enter Batch ID (e.g., GS-2025-001)" className="flex-1" />
                  <Button>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline">
                    <QrCode className="h-4 w-4 mr-2" />
                    Scan QR
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sample Public Result */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Verified Product Information
                </CardTitle>
                <CardDescription>Blockchain-verified supply chain data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Product</Label>
                    <p className="text-lg font-semibold">Organic Tomatoes</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Farm Origin</Label>
                    <p className="text-lg">Green Valley Farm</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Harvest Date</Label>
                    <p className="text-lg">January 15, 2025</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Supply Chain Journey
                  </h4>
                  <div className="space-y-3">
                    {mockBatches[0].milestones
                      .filter((m) => m.completed)
                      .map((milestone, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div className="flex-1">
                            <p className="font-medium">{milestone.stage}</p>
                            <p className="text-sm text-muted-foreground">{milestone.date}</p>
                          </div>
                          <Badge variant="outline">{milestone.org}</Badge>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <Shield className="h-5 w-5 text-green-600" />
                  <p className="text-sm text-green-800">
                    This information is cryptographically secured and verified on the blockchain
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
