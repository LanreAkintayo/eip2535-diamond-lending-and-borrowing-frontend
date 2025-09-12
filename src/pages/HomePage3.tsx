import React from "react";
import { motion, easeInOut } from "framer-motion";
import {
  CheckCircle,
  Shield,
  TrendingUp,
  Zap,
  Users,
  Lock,
  Star,
} from "lucide-react";

/**
 * UltraSleekTokenLanding.tsx
 *
 * A single-file React (.tsx) landing page component styled with Tailwind CSS.
 * - Deep dark theme with deep-orange accent
 * - Glassy cards, floating 3D-like shapes (SVG + CSS), framer-motion animations
 * - Modular sections matching the screenshot layout with creative upgrades
 *
 * Usage:
 * 1. Ensure Tailwind CSS is configured in your project and you have Open Sans available.
 *    (You can add `@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap');` in your global CSS.)
 * 2. Install framer-motion and lucide-react: `npm i framer-motion lucide-react`.
 * 3. Drop this file into your React app and import it where needed.
 */

const Accent = "#FF7A2D"; // deep orange
const AccentLight = "#FF9A54";

const floatingVariants = {
  float: {
    y: [0, -12, 0],
    transition: { duration: 6, repeat: Infinity, ease: easeInOut },
  },
};

export default function HomePage3() {
  return (
    <div className="min-h-screen bg-[#05060a] text-white font-sans antialiased">
      {/* Decorative background grid */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-30">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="160" height="160" patternUnits="userSpaceOnUse">
              <path d="M160 0 L0 0 0 160" fill="none" stroke="#0b0c10" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Navbar */}
      <nav className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff7a2d] to-[#ff9a54] flex items-center justify-center shadow-2xl">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 3L21 9.5L12 16L3 9.5L12 3Z" fill="#0B0B0B" />
            </svg>
          </div>
          <div className="text-lg font-semibold tracking-wide">TokenFlow</div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <a className="hover:text-white">Product</a>
          <a className="hover:text-white">Pricing</a>
          <a className="hover:text-white">Docs</a>
          <a className="hover:text-white">Security</a>
          <button className="ml-2 rounded-full bg-gradient-to-r from-[#ff7a2d] to-[#ff9a54] px-4 py-2 text-black font-semibold">Launch App</button>
        </div>
        <div className="md:hidden">
          <button className="p-2 rounded-lg bg-white/5">Menu</button>
        </div>
      </nav>

      {/* HERO */}
      <header className="container mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
            >
              Onchain token distribution that’s <span style={{ color: Accent }}>secure</span>,
              automated and beautifully simple.
            </motion.h1>

            <p className="text-gray-300 max-w-2xl text-lg">
              Deploy audited vesting schedules, create advanced airdrops, and manage allocations with real-time
              analytics — all onchain. Designed for founders, DAOs and token teams who care about precision.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl bg-gradient-to-r from-[#ff7a2d] to-[#ff9a54] px-6 py-3 font-semibold text-black shadow-xl"
              >
                Get Started
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-gray-300"
              >
                Read the Docs
              </motion.a>

              <div className="ml-3 inline-flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle className="w-4 h-4 text-[#7ef5a6]" />
                <span>Audited & Enterprise-ready</span>
              </div>
            </div>

            {/* Mini stats */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-300">
              <div className="bg-white/3 backdrop-blur-md rounded-2xl px-4 py-3">$1.2B+ distributed</div>
              <div className="bg-white/3 backdrop-blur-md rounded-2xl px-4 py-3">120+ projects</div>
              <div className="bg-white/3 backdrop-blur-md rounded-2xl px-4 py-3">Multi-chain support</div>
            </div>
          </div>

          {/* Right hero visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Floating token cluster */}
            <div className="w-full max-w-md">
              <motion.div
                variants={floatingVariants}
                animate="float"
                className="relative w-full h-[420px] rounded-3xl bg-gradient-to-br from-white/3 to-white/2 overflow-hidden shadow-2xl"
              >
                {/* Glass panel */}
                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="text-xs text-gray-300">Vesting Contract</div>
                      <div className="text-lg font-semibold">TEAM - 15% · Cliff 6m</div>
                    </div>
                    <div className="text-sm text-gray-300">Chain: Ethereum</div>
                  </div>

                  <div className="flex items-center justify-center relative mt-2">
                    {/* big token */}
                    <svg viewBox="0 0 200 200" className="w-48 h-48 -mt-4 filter drop-shadow-2xl">
                      <defs>
                        <radialGradient id="g1" cx="30%" cy="30%">
                          <stop offset="0%" stopColor="#ff9a54" />
                          <stop offset="70%" stopColor="#ff7a2d" />
                          <stop offset="100%" stopColor="#c84309" />
                        </radialGradient>
                      </defs>
                      <circle cx="100" cy="100" r="52" fill="url(#g1)" />
                    </svg>

                    {/* small orbiting tokens */}
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                      className="absolute w-64 h-64 flex items-center justify-center"
                    >
                      {[0, 60, 120].map((deg, i) => (
                        <motion.div
                          key={i}
                          initial={{ x: 0, y: 0, scale: 0.9 }}
                          animate={{ x: Math.cos((deg / 180) * Math.PI) * 80, y: Math.sin((deg / 180) * Math.PI) * 30 }}
                          transition={{ duration: 3 + i }}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/10 border border-white/10"
                        />
                      ))}
                    </motion.div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-400">Next unlock in 4d 12h</div>
                    <div className="text-sm font-semibold text-white">0xAb...3e9</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* subtle glow */}
            <div className="absolute -bottom-10 right-6 w-44 h-24 rounded-full opacity-30 blur-3xl" style={{ background: "linear-gradient(90deg,#ff7a2d,#ff9a54)" }} />
          </div>
        </div>
      </header>

      {/* Trusted by */}
      <section className="container mx-auto px-6 py-8">
        <div className="bg-white/3 backdrop-blur-md rounded-2xl px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-300">Trusted by leading projects & funds</div>
          <div className="flex items-center gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-20 h-8 bg-gradient-to-r from-white/8 to-white/4 rounded-md flex items-center justify-center text-xs text-gray-300">Logo</div>
            ))}
          </div>
        </div>
      </section>

      {/* Why people use us */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xl font-bold" style={{ color: Accent }}>
              What do people use TokenFlow for?
            </h3>
            <p className="text-gray-300">From token sales to team vesting — manage everything with a single interface and onchain guarantees.</p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard title="Airdrops & Funnels" desc="Create targetted airdrops with onchain merkle proofs and whitelists." icon={<Zap className="w-6 h-6" />} />
            <FeatureCard title="Vesting Schedules" desc="Flexible cliffs, linear vesting and manual release options." icon={<Lock className="w-6 h-6" />} />
            <FeatureCard title="Governance Grants" desc="Grant tokens to DAOs or contributors with transparent history." icon={<Users className="w-6 h-6" />} />
          </div>
        </div>
      </section>

      {/* Cards and charts section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatCard title="Onchain records" value="100% verifiable" />
              <StatCard title="Avg gas cost" value="~$2" />
              <StatCard title="Integrations" value="Etherscan, TheGraph" />
              <StatCard title="Avg setup" value="< 10 minutes" />
            </div>

            <div className="bg-white/3 backdrop-blur-md rounded-2xl p-6">
              <h4 className="font-semibold">Distribution timeline</h4>
              <p className="text-sm text-gray-300 mt-2">Visualize your token unlocks and cliffs across multiple epochs.</p>

              <div className="mt-6 h-44 bg-gradient-to-b from-white/3 to-transparent rounded-xl p-4">
                {/* simple chart placeholder */}
                <svg className="w-full h-full">
                  <polyline
                    fill="none"
                    stroke="#FF7A2D"
                    strokeWidth="3"
                    points="0,120 60,90 120,70 180,50 240,55 300,35 360,45"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.95}
                  />
                </svg>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-gradient-to-br from-[#ff7a2d]/10 to-[#ff9a54]/6 p-4 rounded-2xl">
              <h5 className="font-semibold">Secure by design</h5>
              <p className="text-sm text-gray-300">Audited frameworks, timelocks and multi-sig compatibility.</p>
              <div className="mt-4 flex gap-2">
                <Badge>Audited</Badge>
                <Badge>Multi-sig</Badge>
                <Badge>Open-source</Badge>
              </div>
            </div>

            <div className="bg-white/3 backdrop-blur-md rounded-2xl p-4">
              <h5 className="font-semibold">Integrations</h5>
              <p className="text-sm text-gray-300">Connect with analytics, wallets and explorer tooling.</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Working with us / process */}
      <section className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-white/3 to-transparent rounded-2xl p-8 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <h4 className="text-xl font-bold">Working with TokenFlow</h4>
            <p className="text-gray-300 mt-2">Fast setup, predictable unlocks, and clear ownership records. Integrates with your CI and infra easily.</p>
          </div>

          <div className="space-y-4 md:col-span-2">
            <ProcessStep step={1} title="Draft allocation" desc="Define token buckets and owners." />
            <ProcessStep step={2} title="Deploy schedule" desc="Deploy audited contract to chosen chain." />
            <ProcessStep step={3} title="Monitor & release" desc="Track unlocks, revoke or accelerate when needed." />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold">Pricing</h3>
          <p className="text-gray-300">Transparent pricing — pick what matches your project size.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          <div className="p-6 rounded-2xl bg-white/3 backdrop-blur-md">
            <div className="text-lg font-semibold">Starter</div>
            <div className="mt-2 text-4xl font-extrabold">Free</div>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>Basic vesting</li>
              <li>One deploy</li>
              <li>Email support</li>
            </ul>
            <button className="mt-6 w-full rounded-xl bg-white/5 py-3">Get Started</button>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#ff7a2d]/12 to-[#ff9a54]/8 border border-white/6 shadow-xl">
            <div className="text-lg font-semibold">Team</div>
            <div className="mt-2 text-4xl font-extrabold">$199</div>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>Unlimited vesting</li>
              <li>Priority support</li>
              <li>Audit assistance</li>
            </ul>
            <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#ff7a2d] to-[#ff9a54] py-3 font-semibold text-black">Start Trial</button>
          </div>

          <div className="p-6 rounded-2xl bg-white/3 backdrop-blur-md">
            <div className="text-lg font-semibold">Enterprise</div>
            <div className="mt-2 text-4xl font-extrabold">Custom</div>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>On-premise options</li>
              <li>SLAs & SSO</li>
              <li>Dedicated support</li>
            </ul>
            <button className="mt-6 w-full rounded-xl bg-white/5 py-3">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* Backed by & footer */}
      <section className="container mx-auto px-6 py-12">
        <div className="text-center text-gray-300 mb-6">Backed by top funds</div>
        <div className="flex items-center justify-center gap-6 flex-wrap mb-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-36 h-10 bg-white/4 rounded-md flex items-center justify-center text-sm text-gray-300">Investor</div>
          ))}
        </div>

        <footer className="bg-black/60 py-10 rounded-2xl p-6 text-gray-400">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="text-white font-semibold mb-3">TokenFlow</div>
              <div className="text-sm">Build, deploy and manage token distributions with confidence.</div>
            </div>

            <div>
              <div className="font-semibold mb-3">Product</div>
              <div className="text-sm space-y-2">
                <div>Features</div>
                <div>Pricing</div>
                <div>Integrations</div>
              </div>
            </div>

            <div>
              <div className="font-semibold mb-3">Company</div>
              <div className="text-sm space-y-2">
                <div>About</div>
                <div>Careers</div>
                <div>Blog</div>
              </div>
            </div>

            <div>
              <div className="font-semibold mb-3">Security</div>
              <div className="text-sm space-y-2">
                <div>Audits</div>
                <div>Compliance</div>
                <div>Whitepaper</div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">© {new Date().getFullYear()} TokenFlow. All rights reserved.</div>
        </footer>
      </section>
    </div>
  );
}

/* -------------------------- Small helper components ------------------------- */
function FeatureCard({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white/3 backdrop-blur-md rounded-2xl p-5 flex flex-col gap-3">
      <div className="rounded-md w-10 h-10 bg-white/5 flex items-center justify-center">{icon}</div>
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-gray-300">{desc}</div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white/4 rounded-2xl p-4">
      <div className="text-sm text-gray-300">{title}</div>
      <div className="text-xl font-semibold mt-2">{value}</div>
    </div>
  );
}

function ProcessStep({ step, title, desc }: { step: number; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-full w-10 h-10 bg-gradient-to-br from-[#ff7a2d] to-[#ff9a54] flex items-center justify-center font-bold">{step}</div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-gray-300">{desc}</div>
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="text-xs bg-white/5 rounded-full px-3 py-1">{children}</span>;
}
