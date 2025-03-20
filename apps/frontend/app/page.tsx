"use client"
import Link from "next/link"
import { ArrowRight, Check, Github, MessageSquare, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header
      <header className="container z-40 flex h-20 items-center justify-between py-6">
        <div className="flex items-center gap-2 text-xl font-bold">
          <div className="size-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600"></div>
          <span>DPin-Uptime</span>
        </div>
        <nav className="hidden gap-6 md:flex">
          <Link href="#features" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
            How It Works
          </Link>
          <Link href="#testimonials" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
            Testimonials
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
            Pricing
          </Link>
        </nav>
        <Button className="hidden bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700 md:inline-flex">
          Sign In
        </Button>
        <Button variant="outline" size="icon" className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </header> */}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 z-0">
            <div className="animate-pulse-slow absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-3xl"></div>
            <div className="animate-pulse-slow absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-600/20 blur-3xl"></div>
          </div>
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
                Decentralized Uptime Monitoring for{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Web3</span>
              </h1>
              <p className="mb-10 text-xl text-white/70">
                Real-time status tracking for nodes, services, and infrastructure—secure, fast, and reliable.
              </p>
              <Button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-6 text-lg font-medium text-white transition-all hover:shadow-[0_0_25px_rgba(129,140,248,0.5)]">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Powerful Features</h2>
              <p className="mx-auto max-w-2xl text-white/70">
                Built for the decentralized web, designed for reliability and performance.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Trustless Monitoring",
                  description: "No central authority, fully on-chain verification and reporting.",
                  icon: (
                    <div className="flex size-12 items-center justify-center rounded-full bg-cyan-950/50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-cyan-400"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      </svg>
                    </div>
                  ),
                },
                {
                  title: "Real-Time Alerts",
                  description: "Instant notifications for downtime through multiple channels.",
                  icon: (
                    <div className="flex size-12 items-center justify-center rounded-full bg-purple-950/50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-purple-400"
                      >
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                      </svg>
                    </div>
                  ),
                },
                {
                  title: "Multi-Chain Support",
                  description: "Works across all major blockchains and Layer 2 solutions.",
                  icon: (
                    <div className="flex size-12 items-center justify-center rounded-full bg-cyan-950/50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-cyan-400"
                      >
                        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                        <line x1="16" x2="2" y1="8" y2="22" />
                        <line x1="17.5" x2="9" y1="15" y2="15" />
                      </svg>
                    </div>
                  ),
                },
                {
                  title: "Customizable Dashboards",
                  description: "Tailor the UI to your needs with flexible visualization options.",
                  icon: (
                    <div className="flex size-12 items-center justify-center rounded-full bg-purple-950/50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-purple-400"
                      >
                        <rect width="7" height="9" x="3" y="3" rx="1" />
                        <rect width="7" height="5" x="14" y="3" rx="1" />
                        <rect width="7" height="9" x="14" y="12" rx="1" />
                        <rect width="7" height="5" x="3" y="16" rx="1" />
                      </svg>
                    </div>
                  ),
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="group border-white/5 bg-white/5 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/10"
                >
                  <CardHeader>
                    {feature.icon}
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-white/70">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="relative py-20">
          <div className="absolute inset-0 z-0">
            <div className="animate-pulse-slow absolute top-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-3xl"></div>
          </div>
          <div className="container relative z-10">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">How It Works</h2>
              <p className="mx-auto max-w-2xl text-white/70">Get started with DPin-Uptime in three simple steps.</p>
            </div>
            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Connect your wallet",
                  description: "Securely connect your Web3 wallet to get started with DPin-Uptime.",
                },
                {
                  step: "02",
                  title: "Register your node/service",
                  description: "Add your nodes, APIs, or services that you want to monitor.",
                },
                {
                  step: "03",
                  title: "Get real-time monitoring & alerts",
                  description: "Receive instant notifications when issues are detected.",
                },
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                  <p className="text-white/70">{step.description}</p>
                  {index < 2 && (
                    <div className="absolute left-[32px] top-8 hidden h-[calc(100%-32px)] w-px bg-gradient-to-b from-purple-600 to-transparent md:block"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          <div className="container">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Trusted by Web3 Pioneers</h2>
              <p className="mx-auto max-w-2xl text-white/70">
                See how DPin-Uptime is helping developers and projects across the decentralized ecosystem.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "DPin-Uptime has been crucial for maintaining our validator nodes. The real-time alerts have saved us countless times.",
                  name: "Alex Rivera",
                  role: "Blockchain Developer",
                  company: "EtherNodes",
                },
                {
                  quote:
                    "The multi-chain support is exactly what we needed. Now we can monitor all our infrastructure from a single dashboard.",
                  name: "Sarah Chen",
                  role: "CTO",
                  company: "DeFi Protocol",
                },
                {
                  quote:
                    "Setting up monitoring used to take days. With DPin-Uptime, we were up and running in minutes with better insights.",
                  name: "Marcus Johnson",
                  role: "DevOps Lead",
                  company: "NFT Marketplace",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="border-white/5 bg-white/5 backdrop-blur-sm">
                  <CardHeader>
                    <div className="mb-2 text-2xl text-cyan-400"></div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-6 text-white/80">{testimonial.quote}</p>
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600"></div>
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-white/60">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="relative py-20">
          <div className="absolute inset-0 z-0">
            <div className="animate-pulse-slow absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-3xl"></div>
          </div>
          <div className="container relative z-10">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Simple, Transparent Pricing</h2>
              <p className="mx-auto max-w-2xl text-white/70">
                Choose the plan that is right for your project. All plans include core features.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
              {[
                {
                  name: "Free",
                  price: "0",
                  description: "Perfect for personal projects and experimentation.",
                  features: [
                    "Monitor up to 3 endpoints",
                    "5-minute check intervals",
                    "24-hour data retention",
                    "Email alerts",
                  ],
                  cta: "Get Started",
                  highlighted: false,
                },
                {
                  name: "Pro",
                  price: "49",
                  description: "Ideal for growing projects and small teams.",
                  features: [
                    "Monitor up to 20 endpoints",
                    "1-minute check intervals",
                    "30-day data retention",
                    "Email, Discord & Telegram alerts",
                    "Custom status page",
                  ],
                  cta: "Get Started",
                  highlighted: true,
                },
                {
                  name: "Enterprise",
                  price: "199",
                  description: "For large-scale applications and infrastructure.",
                  features: [
                    "Unlimited endpoints",
                    "30-second check intervals",
                    "90-day data retention",
                    "All alert channels + API",
                    "Custom status page",
                    "Dedicated support",
                  ],
                  cta: "Contact Sales",
                  highlighted: false,
                },
              ].map((plan, index) => (
                <Card
                  key={index}
                  className={`relative overflow-hidden border-white/5 backdrop-blur-sm transition-all hover:border-white/10 ${
                    plan.highlighted
                      ? "border-cyan-500/50 bg-gradient-to-b from-cyan-950/50 to-purple-950/50"
                      : "bg-white/5"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -right-12 top-6 rotate-45 bg-gradient-to-r from-cyan-500 to-purple-600 px-12 py-1 text-xs font-medium">
                      Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription className="text-white/70">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-white/70">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="mb-6 space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-cyan-400" />
                          <span className="text-sm text-white/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={`w-full ${
                        plan.highlighted
                          ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black via-purple-950/20 to-cyan-950/20 p-8 backdrop-blur-sm md:p-12">
              <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                <div>
                  <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                    Ready to ensure your Web3 infrastructure never goes down?
                  </h2>
                  <p className="mb-6 text-white/70">
                    Join thousands of developers and teams who trust DPin-Uptime for their critical monitoring needs.
                  </p>
                  <Button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-6 text-lg font-medium text-white transition-all hover:shadow-[0_0_25px_rgba(129,140,248,0.5)]">
                    Get Started Now
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
                <div className="flex flex-col justify-between gap-8">
                  <div>
                    <h3 className="mb-2 text-xl font-bold">Have questions?</h3>
                    <p className="text-white/70">Our team is ready to help you get started with DPin-Uptime.</p>
                    <Link href="#" className="mt-2 inline-block text-cyan-400 hover:text-cyan-300">
                      Contact Support →
                    </Link>
                  </div>
                  <div>
                    <h3 className="mb-4 text-xl font-bold">Connect with us</h3>
                    <div className="flex gap-4">
                      <Link
                        href="#"
                        className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                      >
                        <Twitter className="h-5 w-5" />
                      </Link>
                      <Link
                        href="#"
                        className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                      >
                        <Github className="h-5 w-5" />
                      </Link>
                      <Link
                        href="#"
                        className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                      >
                        <MessageSquare className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 text-xl font-bold">
                <div className="size-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600"></div>
                <span>DPin-Uptime</span>
              </div>
              <p className="mt-4 text-sm text-white/60">
                Decentralized uptime monitoring for the Web3 ecosystem. Secure, reliable, and trustless.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Product</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <Link href="#" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <Link href="#" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Legal</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/60">
            <p>© {new Date().getFullYear()} DPin-Uptime. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

