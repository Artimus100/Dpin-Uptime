"use client"


import { useState } from "react"
import Link from "next/link"
import {
  Activity,
  AlertCircle,
  Bell,
  ChevronDown,
  Clock,
  Globe,
  Home,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
} from "lucide-react"

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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock data for websites
const websites = [
  {
    id: "site-1",
    name: "Main Production API",
    url: "api.example.com",
    status: "operational",
    responseTime: 42,
    lastChecked: "2 minutes ago",
    uptime: "99.98%",
    uptimeHistory: [true, true, true, true, true, true, true, true, true, true],
  },
  {
    id: "site-2",
    name: "User Dashboard",
    url: "dashboard.example.com",
    status: "operational",
    responseTime: 187,
    lastChecked: "1 minute ago",
    uptime: "99.95%",
    uptimeHistory: [true, true, true, true, true, true, true, true, true, false],
  },
  {
    id: "site-3",
    name: "Payment Gateway",
    url: "payments.example.com",
    status: "operational",
    responseTime: 156,
    lastChecked: "Just now",
    uptime: "99.99%",
    uptimeHistory: [true, true, true, true, true, true, true, true, true, true],
  },
  {
    id: "site-4",
    name: "Marketing Website",
    url: "www.example.com",
    status: "down",
    responseTime: 0,
    lastChecked: "3 minutes ago",
    uptime: "98.76%",
    uptimeHistory: [false, false, true, true, true, true, true, true, true, true],
  },
  {
    id: "site-5",
    name: "Authentication Service",
    url: "auth.example.com",
    status: "operational",
    responseTime: 89,
    lastChecked: "2 minutes ago",
    uptime: "99.92%",
    uptimeHistory: [true, true, true, true, false, true, true, true, true, true],
  },
  {
    id: "site-6",
    name: "Analytics Platform",
    url: "analytics.example.com",
    status: "degraded",
    responseTime: 342,
    lastChecked: "Just now",
    uptime: "99.87%",
    uptimeHistory: [true, true, true, false, true, true, true, true, false, true],
  },
]

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

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
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700">
                  <Plus className="mr-2 h-4 w-4" /> Add Monitor
                </Button>
              </div>

              {/* Stats overview */}
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { name: "Total Monitors", value: "6", icon: Globe, color: "from-cyan-500 to-cyan-700" },
                  { name: "Operational", value: "4", icon: Activity, color: "from-green-500 to-green-700" },
                  { name: "Degraded", value: "1", icon: AlertCircle, color: "from-yellow-500 to-yellow-700" },
                  { name: "Down", value: "1", icon: AlertCircle, color: "from-red-500 to-red-700" },
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
                          <DropdownMenuItem>Refresh All</DropdownMenuItem>
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
                    <Accordion type="single" collapsible className="space-y-4">
                      {websites.map((website) => (
                        <AccordionItem
                          key={website.id}
                          value={website.id}
                          className="rounded-lg border border-white/10 bg-white/5 px-4"
                        >
                          <AccordionTrigger className="py-4 hover:no-underline">
                            <div className="flex w-full items-center justify-between">
                              <div className="flex items-center gap-4">
                                <StatusIndicator status={website.status} />
                                <div>
                                  <h3 className="text-base font-medium">{website.name}</h3>
                                  <p className="text-sm text-white/60">{website.url}</p>
                                </div>
                              </div>
                              <div className="hidden items-center gap-6 md:flex">
                                <div className="text-right">
                                  <p className="text-sm font-medium">Response Time</p>
                                  <p
                                    className={`text-sm ${
                                      website.status === "down"
                                        ? "text-red-400"
                                        : website.responseTime > 300
                                          ? "text-yellow-400"
                                          : "text-green-400"
                                    }`}
                                  >
                                    {website.status === "down" ? "N/A" : `${website.responseTime}ms`}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium">Uptime</p>
                                  <p className="text-sm text-white/80">{website.uptime}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium">Last Checked</p>
                                  <p className="text-sm text-white/80">{website.lastChecked}</p>
                                </div>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 pt-2">
                            <div className="space-y-6">
                              {/* Mobile view stats */}
                              <div className="grid grid-cols-3 gap-4 md:hidden">
                                <div className="text-center">
                                  <p className="text-xs font-medium text-white/60">Response Time</p>
                                  <p
                                    className={`text-sm ${
                                      website.status === "down"
                                        ? "text-red-400"
                                        : website.responseTime > 300
                                          ? "text-yellow-400"
                                          : "text-green-400"
                                    }`}
                                  >
                                    {website.status === "down" ? "N/A" : `${website.responseTime}ms`}
                                  </p>
                                </div>
                                <div className="text-center">
                                  <p className="text-xs font-medium text-white/60">Uptime</p>
                                  <p className="text-sm">{website.uptime}</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-xs font-medium text-white/60">Last Checked</p>
                                  <p className="text-sm">{website.lastChecked}</p>
                                </div>
                              </div>

                              {/* Uptime timeline */}
                              <div>
                                <div className="mb-2 flex items-center justify-between">
                                  <h4 className="flex items-center text-sm font-medium text-white/80">
                                    <Clock className="mr-2 h-4 w-4" /> Uptime Timeline (Last 30 minutes)
                                  </h4>
                                  <span className="text-xs text-white/60">3-minute intervals</span>
                                </div>
                                <div className="flex gap-1">
                                  {website.uptimeHistory.map((isUp, index) => (
                                    <div
                                      key={index}
                                      className={`h-8 flex-1 rounded ${
                                        isUp
                                          ? "bg-gradient-to-r from-green-600 to-green-700"
                                          : "bg-gradient-to-r from-red-600 to-red-700"
                                      } transition-all duration-300 hover:opacity-90`}
                                      title={`${index * 3} minutes ago: ${isUp ? "Operational" : "Down"}`}
                                    ></div>
                                  ))}
                                </div>
                                <div className="mt-1 flex justify-between text-xs text-white/60">
                                  <span>30 minutes ago</span>
                                  <span>Now</span>
                                </div>
                              </div>

                              {/* Action buttons */}
                              <div className="flex justify-end gap-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                                >
                                  View Details
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700"
                                >
                                  Check Now
                                </Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// Status indicator component
function StatusIndicator({ status }: { status: string }) {
  let statusColor = ""
  let statusText = ""

  switch (status) {
    case "operational":
      statusColor = "bg-green-500"
      statusText = "Operational"
      break
    case "degraded":
      statusColor = "bg-yellow-500"
      statusText = "Degraded"
      break
    case "down":
      statusColor = "bg-red-500"
      statusText = "Down"
      break
    default:
      statusColor = "bg-gray-500"
      statusText = "Unknown"
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`relative flex size-6 items-center justify-center rounded-full ${statusColor}`}>
        <div className={`absolute size-10 animate-ping rounded-full ${statusColor} opacity-30`}></div>
      </div>
      <span className="sr-only">{statusText}</span>
    </div>
  )
}

