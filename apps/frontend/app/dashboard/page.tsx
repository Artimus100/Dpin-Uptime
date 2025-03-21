"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import {
  Activity,
  AlertCircle,
  Bell,
  ChevronDown,
  ChevronUp,
  Clock,
  Globe,
  Home,
  Menu,
  Moon,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Sun,
} from "lucide-react"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { API_BACKEND_URL } from "@/config"

// API backend URL - replace with your actual API URL
// const API_BACKEND_URL = "https://api.dpinuptime.com"

// Type definitions
type UptimeStatus = "good" | "bad" | "unknown"

interface WebsiteTick {
  status: string
  createdAt: string
}

interface Website {
  id: string
  url: string
  ticks: WebsiteTick[]
}

interface ProcessedWebsite {
  id: string
  url: string
  status: UptimeStatus
  uptimePercentage: number
  lastChecked: string
  uptimeTicks: UptimeStatus[]
  responseTime?: number
}

// Add this mock data back in
const mockWebsites: Website[] = [
  {
    id: "site-1",
    url: "api.example.com",
    ticks: Array(50)
      .fill(null)
      .map((_, i) => ({
        status: Math.random() > 0.1 ? "Good" : "Bad",
        createdAt: new Date(Date.now() - i * 60000).toISOString(),
      })),
  },
  {
    id: "site-2",
    url: "dashboard.example.com",
    ticks: Array(50)
      .fill(null)
      .map((_, i) => ({
        status: Math.random() > 0.05 ? "Good" : "Bad",
        createdAt: new Date(Date.now() - i * 60000).toISOString(),
      })),
  },
  {
    id: "site-3",
    url: "payments.example.com",
    ticks: Array(50)
      .fill(null)
      .map((_, i) => ({
        status: Math.random() > 0.01 ? "Good" : "Bad",
        createdAt: new Date(Date.now() - i * 60000).toISOString(),
      })),
  },
  {
    id: "site-4",
    url: "www.example.com",
    ticks: Array(50)
      .fill(null)
      .map((_, i) => ({
        status: i < 10 ? "Bad" : "Good",
        createdAt: new Date(Date.now() - i * 60000).toISOString(),
      })),
  },
]

// Auth hook (mock implementation)
function useAuth() {
  const getToken = async () => {
    // In a real app, this would get the token from localStorage, cookies, or an auth provider
    return "mock-auth-token"
  }

  return { getToken }
}

// Replace the useWebsites hook with this implementation
function useWebsites() {
  const [websites, setWebsites] = useState<Website[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { getToken } = useAuth()

  const refreshWebsites = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Get authentication token
      const token = await getToken()
      
      // Fetch websites from API using the correct URL
      const res = await fetch(`${API_BACKEND_URL}/api/v1/websites`, {
        headers: {
          Authorization: token,
        },
      })

      if (!res.ok) {
        throw new Error(`Failed to fetch websites: ${res.status} ${res.statusText}`)
      }

      const data = await res.json()
      console.log("Fetched Websites:", data)

      // Ensure we have an array of websites
      if (Array.isArray(data)) {
        setWebsites(data)
      } else if (data && typeof data === "object" && Array.isArray(data.websites)) {
        // Handle case where API returns { websites: [...] }
        setWebsites(data.websites)
      } else {
        console.error("Unexpected data format:", data)
        setWebsites([])
      }
    } catch (error) {
      console.error("Error fetching websites:", error)
      setError(error instanceof Error ? error.message : String(error))
      
      // Fallback to mock data for development
      console.log("Falling back to mock data")
      setWebsites(mockWebsites)
    } finally {
      setIsLoading(false)
    }
  }

  const addWebsite = async (url: string) => {
    try {
      // Get authentication token
      const token = await getToken()
      
      // Create a temporary website with a temporary ID
      const tempId = `temp-${Date.now()}`
      const newWebsite: Website = {
        id: tempId,
        url,
        ticks: [],
      }

      // Optimistically update UI
      setWebsites((prev) => [...prev, newWebsite])

      // Make the actual API call
      await fetch(`${API_BACKEND_URL}/api/v1/website`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ url }),
      })

      // Refresh to get the actual data from the server
      await refreshWebsites()
    } catch (error) {
      console.error("Error adding website:", error)
      // Still refresh to ensure we have the latest data
      refreshWebsites()
    }
  }

  useEffect(() => {
    refreshWebsites()
  }, [])

  return { websites, isLoading, error, refreshWebsites, addWebsite }
}

// Status indicator component
function StatusCircle({ status }: { status: UptimeStatus }) {
  let statusColor = ""

  switch (status) {
    case "good":
      statusColor = "bg-green-500"
      break
    case "bad":
      statusColor = "bg-red-500"
      break
    default:
      statusColor = "bg-gray-500"
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`relative flex size-6 items-center justify-center rounded-full ${statusColor}`}>
        <div className={`absolute size-10 animate-ping rounded-full ${statusColor} opacity-30`}></div>
      </div>
    </div>
  )
}

// Uptime ticks component
function UptimeTicks({ ticks }: { ticks: UptimeStatus[] }) {
  return (
    <div className="flex gap-1">
      {ticks.map((tick, index) => (
        <div
          key={index}
          className={`h-8 flex-1 rounded ${
            tick === "good"
              ? "bg-gradient-to-r from-green-600 to-green-700"
              : tick === "bad"
                ? "bg-gradient-to-r from-red-600 to-red-700"
                : "bg-gradient-to-r from-gray-600 to-gray-700"
          } transition-all duration-300 hover:opacity-90`}
          title={`${index * 3} minutes ago: ${tick === "good" ? "Operational" : tick === "bad" ? "Down" : "Unknown"}`}
        ></div>
      ))}
    </div>
  )
}

// Create website modal component
function CreateWebsiteModal({ isOpen, onClose }: { isOpen: boolean; onClose: (url: string | null) => void }) {
  const [url, setUrl] = useState("")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-black border border-white/10 rounded-lg p-6 w-full max-w-md backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-4 text-white">Add New Website</h2>
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">URL</label>
          <Input
            type="url"
            className="w-full bg-white/5 border-white/10"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <Button
            variant="outline"
            onClick={() => onClose(null)}
            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onClose(url)}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700"
          >
            Add Website
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { websites, isLoading, error, refreshWebsites, addWebsite } = useWebsites()
  const { getToken } = useAuth()

  // Process websites data for display
  const processedWebsites = useMemo(() => {
    return websites.map((website) => {
      // Sort ticks by creation time
      const sortedTicks = [...website.ticks].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )

      // Get the most recent 30 minutes of ticks
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000)
      const recentTicks = sortedTicks.filter((tick) => new Date(tick.createdAt) > thirtyMinutesAgo)

      // Aggregate ticks into 3-minute windows (10 windows total)
      const windows: UptimeStatus[] = []

      for (let i = 0; i < 10; i++) {
        const windowStart = new Date(Date.now() - (i + 1) * 3 * 60 * 1000)
        const windowEnd = new Date(Date.now() - i * 3 * 60 * 1000)

        const windowTicks = recentTicks.filter((tick) => {
          const tickTime = new Date(tick.createdAt)
          return tickTime >= windowStart && tickTime < windowEnd
        })

        // Window is considered up if majority of ticks are up
        const upTicks = windowTicks.filter((tick) => tick.status === "Good").length
        windows[9 - i] = windowTicks.length === 0 ? "unknown" : upTicks / windowTicks.length >= 0.5 ? "good" : "bad"
      }

      // Calculate overall status and uptime percentage
      const totalTicks = sortedTicks.length
      const upTicks = sortedTicks.filter((tick) => tick.status === "Good").length
      const uptimePercentage = totalTicks === 0 ? 100 : (upTicks / totalTicks) * 100

      // Get the most recent status
      const currentStatus = windows[windows.length - 1]

      // Format the last checked time
      const lastChecked = sortedTicks[0] ? new Date(sortedTicks[0].createdAt).toLocaleTimeString() : "Never"

      // Mock response time based on status
      const responseTime =
        currentStatus === "good"
          ? Math.floor(Math.random() * 200) + 20
          : currentStatus === "bad"
            ? 0
            : Math.floor(Math.random() * 300) + 200

      return {
        id: website.id,
        url: website.url,
        status: currentStatus,
        uptimePercentage,
        lastChecked,
        uptimeTicks: windows,
        responseTime,
      }
    })
  }, [websites])

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // Calculate stats
  const stats = {
    total: processedWebsites.length,
    operational: processedWebsites.filter((site) => site.status === "good").length,
    degraded: processedWebsites.filter((site) => site.status === "unknown").length,
    down: processedWebsites.filter((site) => site.status === "bad").length,
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar - Desktop */}
      <div
        className={`fixed inset-y-0 z-50 flex w-64 flex-col border-r border-white/10 bg-black/95 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0`}
      >
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
          <div className="size-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600"></div>
          <span className="text-xl font-bold">DPin-Uptime</span>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="space-y-1 px-2">
            {[
              { name: "Dashboard", icon: Home, current: true },
              { name: "Monitors", icon: Activity, current: false },
              { name: "Alerts", icon: Bell, current: false },
              { name: "Settings", icon: Settings, current: false },
            ].map((item) => (
              <Link
                key={item.name}
                href="#"
                className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  item.current
                    ? "bg-gradient-to-r from-cyan-950 to-purple-950 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    item.current ? "text-cyan-400" : "text-white/70 group-hover:text-white"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-8 px-4">
            <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-white/50">Recent Incidents</h3>
            <div className="mt-2 space-y-1">
              {[
                { name: "API Outage", time: "2h ago", status: "resolved" },
                { name: "Database Slowdown", time: "1d ago", status: "resolved" },
                { name: "CDN Issues", time: "3d ago", status: "resolved" },
              ].map((incident) => (
                <Link
                  key={incident.name}
                  href="#"
                  className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white"
                >
                  <span
                    className={`mr-2 size-2 rounded-full ${
                      incident.status === "resolved" ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  <span className="truncate">{incident.name}</span>
                  <span className="ml-auto text-xs text-white/50">{incident.time}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white">
                <div className="flex items-center">
                  <div className="size-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600"></div>
                  <span className="ml-3">Alex Morgan</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile sidebar backdrop */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 lg:hidden" onClick={() => setIsMobileSidebarOpen(false)}></div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Top navigation */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-black/95 px-4 backdrop-blur-sm sm:px-6">
          <button
            type="button"
            className="text-white/70 hover:text-white lg:hidden"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="hidden text-white/70 hover:text-white lg:block"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <span className="sr-only">Toggle sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-white/40" aria-hidden="true" />
                </div>
                <Input
                  id="search"
                  name="search"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-10 pr-3 text-white placeholder:text-white/40 focus:bg-white/10 sm:text-sm sm:leading-6"
                  placeholder="Search monitors..."
                  type="search"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="rounded-full bg-white/5 p-1 text-white/70 hover:bg-white/10 hover:text-white"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              <span className="sr-only">Toggle dark mode</span>
              {isDarkMode ? (
                <Sun className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Moon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              className="rounded-full bg-white/5 p-1 text-white/70 hover:bg-white/10 hover:text-white"
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" className="flex rounded-full bg-white/5 text-sm hover:bg-white/10">
                  <span className="sr-only">Open user menu</span>
                  <div className="size-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600"></div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-white">Uptime Dashboard</h1>
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Monitor
                </Button>
              </div>

              {/* Stats overview */}
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    name: "Total Monitors",
                    value: stats.total.toString(),
                    icon: Globe,
                    color: "from-cyan-500 to-cyan-700",
                  },
                  {
                    name: "Operational",
                    value: stats.operational.toString(),
                    icon: Activity,
                    color: "from-green-500 to-green-700",
                  },
                  {
                    name: "Degraded",
                    value: stats.degraded.toString(),
                    icon: AlertCircle,
                    color: "from-yellow-500 to-yellow-700",
                  },
                  { name: "Down", value: stats.down.toString(), icon: AlertCircle, color: "from-red-500 to-red-700" },
                ].map((stat) => (
                  <Card key={stat.name} className="border-white/5 bg-white/5 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-white/70">{stat.name}</CardTitle>
                      <div className={`rounded-full bg-gradient-to-r ${stat.color} p-1 text-white`}>
                        <stat.icon className="h-4 w-4" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Website list with accordions */}
              <div className="mt-8">
                <Card className="border-white/5 bg-white/5 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Monitored Websites</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white/70 hover:bg-white/10 hover:text-white"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={refreshWebsites}>Refresh All</DropdownMenuItem>
                          <DropdownMenuItem>Export Data</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Settings</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription className="text-white/60">
                      Monitor status and uptime for your websites and services
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="py-8 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                        <p className="mt-4 text-white/70">Loading websites...</p>
                      </div>
                    ) : error ? (
                      <div className="py-8 text-center">
                        <AlertCircle className="mx-auto h-10 w-10 text-red-500" />
                        <p className="mt-4 text-white/70">Error loading websites: {error}</p>
                        <Button
                          onClick={refreshWebsites}
                          variant="outline"
                          size="sm"
                          className="mt-4 border-white/10 bg-white/5 text-white hover:bg-white/10"
                        >
                          Try Again
                        </Button>
                      </div>
                    ) : processedWebsites.length === 0 ? (
                      <div className="py-8 text-center">
                        <Globe className="mx-auto h-10 w-10 text-white/40" />
                        <p className="mt-4 text-white/70">No websites added yet</p>
                        <Button
                          onClick={() => setIsModalOpen(true)}
                          className="mt-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700"
                        >
                          Add Your First Website
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {processedWebsites.map((website) => (
                          <WebsiteCard key={website.id} website={website} />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add website modal */}
      <CreateWebsiteModal
        isOpen={isModalOpen}
        onClose={async (url) => {
          if (url === null) {
            setIsModalOpen(false)
            return
          }

          try {
            const token = await getToken()
            setIsModalOpen(false)

            // First add the website optimistically to the UI
            addWebsite(url)

            // Then make the API call
            await axios.post(
              `${API_BACKEND_URL}/api/v1/website`,
              {
                url,
              },
              {
                headers: {
                  Authorization: token,
                },
              },
            )

            // Refresh to get the latest data
            refreshWebsites()
          } catch (error) {
            console.error("Error adding website:", error)
            // Still refresh to ensure we have the latest data
            refreshWebsites()
          }
        }}
      />
    </div>
  )
}

// Website card component
function WebsiteCard({ website }: { website: ProcessedWebsite }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div
        className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-4">
          <StatusCircle status={website.status} />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{website.url}</h3>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {website.uptimePercentage.toFixed(1)}% uptime
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          )}
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700">
          <div className="mt-3">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Last 30 minutes status:</p>
            <UptimeTicks ticks={website.uptimeTicks} />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Last checked: {website.lastChecked}
          </p>
        </div>
      )}
    </div>
  );
}


