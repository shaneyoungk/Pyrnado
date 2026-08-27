import { motion } from "framer-motion";
import { ZapziveLogo } from "@/components/ui/ZapziveLogo";
import { ArrowRight, Shield, Home, Users, DollarSign, Bell, BarChart2, Zap, LayoutDashboard, Wallet, ShieldCheck, Send, MapPin, Settings, HelpCircle, ChevronDown, Search, ArrowUpRight, Plus, RefreshCw, TrendingUp, AlertCircle, TrendingDown, Clock, Repeat, FileText, ArrowRightLeft, Activity, AlertTriangle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import LiquidityBar from "@/components/dashboard/LiquidityBar";

// Mock Data from Overview.tsx
const totalLiquidity = 12418742.39;

const liquidityBreakdown = [
    { label: "Operating Account", value: 6225100, color: "bg-brand-500", bgColor: "bg-brand-500" },
    { label: "Payroll Liability", value: 3112550, color: "bg-blue-500", bgColor: "bg-blue-500" },
    { label: "Escrow", value: 2490040, color: "bg-amber-500", bgColor: "bg-amber-500" },
    { label: "Reserve", value: 622510, color: "bg-zinc-600", bgColor: "bg-zinc-600" },
];

const operationsFeed = [
    { type: 'Payroll', description: 'Global Eng - Kenya batch', amount: 421870.42, status: 'Settlement pending', id: 'PAY-BATCH-2026-041', rail: 'USDC -> M-Pesa', corridor: 'USD/KES', fx: '151.42', risk: '18', compliance: 'KYC verified', action: 'Track' },
    { type: 'Escrow', description: 'Release: Dev Milestone 2', amount: 15480.00, status: 'Approval required', id: 'ESC-8892-MS-2', rail: 'USDC vault', corridor: 'USDC/USD', fx: '1.00', risk: '24', compliance: 'Audit log synced', action: 'Approve' },
    { type: 'Remittance', description: 'Vendor payout - Lagos ops', amount: 2192.75, status: 'Local payout completed', id: 'RMT-NG-9921', rail: 'USDC -> bank', corridor: 'USD/NGN', fx: '1428.30', risk: '31', compliance: 'Compliance reviewed', action: 'Receipt' },
    { type: 'Compliance', description: 'Counterparty review alert', amount: 0, status: 'Action required', id: 'KYC-INC-442', rail: 'Manual review', corridor: 'EUR/KES', fx: '164.18', risk: '72', compliance: 'Risk review workflow', action: 'Review' },
];

const cashFlow = {
    inflow: 850000,
    outflow: 482000,
    net: 368000
};

const approvalQueue = [
    { id: "BAT-002", type: "Payroll Batch", amount: 148620.25, requestor: "Sarah M.", time: "1h ago" },
];

const complianceQueue = [
    { type: "KYC Review", entity: "Flex J.", risk: "Low", status: "Pending" },
    { type: "AML Flag", entity: "Tx-9932", risk: "High", status: "Urgent" },
];

const corridorTelemetry = [
    { corridor: "USD -> KES", metric: "0.8%", label: "avg fee", tone: "text-brand-400" },
    { corridor: "USD -> NGN", metric: "<3 sec", label: "rail latency", tone: "text-blue-300" },
    { corridor: "USDC -> M-Pesa", metric: "92%", label: "cost reduction", tone: "text-brand-400" },
];

export function HeroSection() {
    const navigate = (path: string) => {
        console.log("Navigating to:", path);
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center pt-32 pb-20 overflow-hidden bg-transparent dark">
            {/* Background Atmosphere - Removed as requested */}

            <div className="container mx-auto relative z-10 px-6 lg:px-8 flex flex-col items-center">

                {/* Text Content */}
                <div className="max-w-5xl text-center mb-20 animate-fade-in">
                    <div className="mx-auto mb-8 w-full max-w-4xl overflow-hidden rounded-lg border border-white/10 bg-[#090c0b]/85 text-left shadow-[0_18px_60px_-42px_rgba(34,197,94,0.65)] backdrop-blur-sm">
                        <div className="relative">
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent" />
                            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-brand-400/50 via-transparent to-transparent" />
                            <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr]">
                                <div className="p-4 sm:p-5 lg:p-6">
                                    <div className="mb-4 flex flex-wrap items-center gap-3">
                                        <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-zinc-400">
                                            <Activity className="h-3.5 w-3.5 text-brand-400" />
                                            Market intelligence
                                        </span>
                                        <span className="h-4 w-px bg-white/10" />
                                        <span className="font-mono text-[10px] text-zinc-600">Updated 09:42 UTC</span>
                                    </div>
                                    <p className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
                                        Reduce payout costs across high-friction corridors
                                    </p>
                                    <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
                                        Save up to <span className="font-mono text-brand-300">92%</span> on settlement costs compared to traditional bank and remittance rails across selected payout corridors.
                                    </p>
                                </div>

                                <div className="border-t border-white/10 lg:border-l lg:border-t-0">
                                    <div className="grid h-full grid-cols-1 divide-y divide-white/[0.07]">
                                        {corridorTelemetry.map((item) => (
                                            <div key={item.corridor} className="grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-3 sm:px-5">
                                                <div>
                                                    <p className="font-mono text-xs text-zinc-300">{item.corridor}</p>
                                                    <p className="mt-1 text-[10px] font-medium tracking-[0.14em] text-zinc-600">{item.label}</p>
                                                </div>
                                                <p className={`font-mono text-sm font-semibold tabular-nums ${item.tone}`}>{item.metric}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                            <div className="grid grid-cols-3 divide-x divide-white/[0.07] bg-white/[0.02] px-1">
                                <div className="flex items-center gap-2 px-3 py-2 font-mono text-[10px] text-zinc-500">
                                    <TrendingDown className="h-3 w-3 text-brand-400" />
                                    FX spread -64bps
                                </div>
                                <div className="flex items-center gap-2 px-3 py-2 font-mono text-[10px] text-zinc-500">
                                    <Clock className="h-3 w-3 text-blue-300" />
                                    T+0 settlement
                                </div>
                                <div className="flex items-center gap-2 px-3 py-2 font-mono text-[10px] text-zinc-500">
                                    <ShieldCheck className="h-3 w-3 text-amber-300" />
                                    Review clear
                                </div>
                            </div>
                        </div>
                    </div>


                    <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold text-zinc-50 leading-[0.95] tracking-tight mb-8">
                        Global payouts, escrow, and <span className="text-brand-400">treasury rails.</span>
                    </h1>

                    <p className="text-xl sm:text-2xl text-zinc-400 mb-10 leading-relaxed max-w-3xl mx-auto font-medium tracking-wide">
                        Zapzive helps businesses pay teams, vendors, and contractors across borders using stablecoin settlement, local cash-out, smart escrow, and real-time treasury visibility.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <Link to="/signup">
                            <Button className="h-14 px-10 rounded-2xl bg-white text-black text-lg font-bold hover:bg-zinc-200 transition-all duration-300">
                                Start Free <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                        <Link to="#platform">
                            <Button variant="outline" className="h-14 px-10 rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 hover:text-white font-medium backdrop-blur-md transition-all duration-300">
                                View Platform
                            </Button>
                        </Link>
                    </div>

                    <p className="mt-6 text-sm text-zinc-500 font-semibold">
                        Built for payroll, escrow, vendor payouts, remittance, and treasury operations.
                    </p>

                    {/* Stats Row - High Contrast */}
                    <div className="mt-20 flex flex-wrap items-center justify-center gap-10 lg:gap-20 border-t border-white/10 pt-10">
                        <div className="text-center group transition-transform duration-300">
                            <p className="text-5xl font-extrabold text-white mb-1 drop-shadow-md">$2.5B+</p>
                            <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] font-bold transition-colors">Projected volume</p>
                        </div>
                        <div className="w-px h-12 bg-white/10 hidden sm:block" />
                        <div className="text-center group transition-transform duration-300">
                            <p className="text-5xl font-extrabold text-white mb-1 drop-shadow-md">120k+</p>
                            <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] font-bold transition-colors">Supported users</p>
                        </div>
                        <div className="w-px h-12 bg-white/10 hidden sm:block" />
                        <div className="text-center group transition-transform duration-300">
                            <p className="text-5xl font-extrabold text-white mb-1 drop-shadow-md">99.9%</p>
                            <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] font-bold transition-colors">Availability target</p>
                        </div>
                    </div>
                </div>

                {/* Main Dashboard UI - Premium Glow (Scaled Down) */}
                <div className="hidden sm:block w-full max-w-7xl perspective-1000 relative z-20 dark text-foreground pointer-events-none select-none">
                    <p className="mb-5 text-center text-[11px] font-black uppercase tracking-[0.28em] text-zinc-500">
                        One operating layer for payouts, escrow, treasury, and compliance.
                    </p>
                    <div className="w-full bg-gradient-to-br from-[#111] via-[#050505] to-black rounded-xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden font-sans scale-[0.95] origin-top flex h-[850px]">

                        {/* SIDEBAR - Matches DashboardLayout.tsx */}
                        <div className="w-64 bg-zinc-950 border-r border-zinc-800/50 flex flex-col shrink-0">
                            {/* Sidebar Header */}
                            <div className="h-16 flex items-center px-6 border-b border-[#262626]">
                                <ZapziveLogo size="sm" />
                            </div>

                            {/* Sidebar Content */}
                            <div className="flex-1 overflow-y-auto py-6 px-4 no-scrollbar">
                                {/* Organization Switcher */}
                                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm mb-8 rounded-lg border border-zinc-800/50 bg-zinc-900/50 hover:bg-zinc-800 transition-all group outline-none cursor-default">
                                    <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold text-xs">
                                        GP
                                    </div>
                                    <div className="flex-1 text-left overflow-hidden">
                                        <span className="block text-sm font-semibold text-zinc-300 truncate">GlobalPay Demo</span>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                                            <span className="text-[10px] text-zinc-600 uppercase tracking-wider font-medium">
                                                Test Mode
                                            </span>
                                        </div>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-zinc-600" />
                                </button>

                                {/* Navigation Groups */}
                                <div className="space-y-8">
                                    {[
                                        {
                                            title: "Dashboard",
                                            items: [
                                                { icon: LayoutDashboard, label: "Overview", active: true },
                                                { icon: BarChart2, label: "Analytics" },
                                            ]
                                        },
                                        {
                                            title: "Operations",
                                            items: [
                                                { icon: Users, label: "Payroll Engine" },
                                                { icon: ShieldCheck, label: "Escrow" },
                                                { icon: Send, label: "Remittance" },
                                            ]
                                        },
                                        {
                                            title: "Finance",
                                            items: [
                                                { icon: Wallet, label: "Treasury" },
                                            ]
                                        },
                                        {
                                            title: "Compliance & Risk",
                                            items: [
                                                { icon: Shield, label: "Compliance" },
                                                { icon: MapPin, label: "Agents" },
                                            ]
                                        }
                                    ].map((group, groupIndex) => (
                                        <div key={groupIndex}>
                                            <h4 className="px-3 mb-3 text-[11px] font-semibold text-zinc-600 uppercase tracking-widest">
                                                {group.title}
                                            </h4>
                                            <div className="space-y-0.5">
                                                {group.items.map((item, i) => (
                                                    <div
                                                        key={i}
                                                        className={cn(
                                                            "flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-all duration-200 group relative cursor-pointer",
                                                            item.active
                                                                ? "text-zinc-100 bg-white/5"
                                                                : "text-zinc-500 hover:text-zinc-300"
                                                        )}
                                                        onClick={() => navigate(item.label)}
                                                    >
                                                        {item.active && (
                                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-brand-500 rounded-r-full" />
                                                        )}
                                                        <item.icon className={cn(
                                                            "w-4 h-4 transition-colors",
                                                            item.active ? "text-brand-400" : "text-zinc-500 group-hover:text-zinc-300"
                                                        )} />
                                                        <span>{item.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sidebar Footer */}
                            <div className="p-4 border-t border-zinc-800">
                                <div className="space-y-1 mb-4">
                                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-colors text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50 cursor-pointer">
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </div>
                                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-colors text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50 cursor-pointer">
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT CONTENT COLUMN */}
                        <div className="flex-1 flex flex-col min-w-0 bg-zinc-950">

                            {/* TOP HEADER (Search, User, Test Mode) */}
                            <header className="h-16 border-b border-zinc-800/50 bg-zinc-950/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
                                <h1 className="text-xl font-bold text-white tracking-tight">Overview</h1>

                                <div className="flex items-center gap-4">
                                    <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                                        <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wider">Test Mode</span>
                                    </div>
                                    <div className="h-6 w-px bg-[#262626] hidden sm:block" />

                                    <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#171717] text-zinc-500 border border-[#262626] text-xs font-semibold shadow-sm">
                                        <Search className="w-3.5 h-3.5" />
                                        <span>Search...</span>
                                        <kbd className="hidden md:inline-flex h-4 items-center gap-1 rounded border border-[#333] bg-[#222] px-1.5 font-mono text-[10px] font-medium text-zinc-500">
                                            <span className="text-xs">⌘</span>K
                                        </kbd>
                                    </div>

                                    <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-white/10 overflow-hidden shadow-sm">
                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="User" />
                                    </div>
                                </div>
                            </header>

                            {/* MAIN DASHBOARD CONTENT (Synced) */}
                            <div className="flex-1 bg-gradient-to-b from-zinc-950 to-zinc-900 p-5 overflow-hidden relative">
                                {/* Only Buttons Header here since Title is in Top Bar now? 
                                    Actually, Overview.tsx has 'Dashboard' in TopBar and 'Treasury Overview' + Buttons in Page.
                                    So we keep the 'Treasury Overview' header block.
                                */}

                                {/* Functional Actions Header */}
                                <header className="flex items-center justify-end pb-3 relative z-10">
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            className="h-8 text-[10px] font-semibold border-zinc-800 bg-[#111] text-zinc-400 hover:text-white hover:bg-[#222] transition-all rounded-xl"
                                        >
                                            <FileText className="w-3 h-3 mr-2" /> Reports
                                        </Button>
                                        <Button
                                            className="h-8 text-[10px] font-bold bg-white text-black hover:bg-zinc-200 transition-all rounded-xl"
                                        >
                                            <Plus className="w-3 h-3 mr-2" /> New Transfer
                                        </Button>
                                    </div>
                                </header>

                                {/* Page Title Section */}
                                <div className="mb-4">
                                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Treasury Overview</h1>
                                    <p className="text-sm text-zinc-500">Real-time financial position across all accounts and operations</p>
                                </div>

                                {/* BENTO GRID: 12-Column Layout */}
                                <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 relative z-10">

                                    {/* --- MAIN COLUMN (8 Span) --- */}
                                    <div className="xl:col-span-8 flex flex-col gap-4">

                                        {/* 1. LIQUIDITY CONSOLE (Allocations) */}
                                        <div className="bg-zinc-950/80 border border-zinc-800/50 rounded-2xl p-5 relative overflow-hidden group hover:border-zinc-700 transition-colors">
                                            <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6">

                                                {/* Left: Balance & Controls */}
                                                <div className="flex-1 space-y-5">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Cash & Cash Equivalents</h2>
                                                            <span className="text-[10px] font-bold text-brand-400 flex items-center gap-1">
                                                                <ArrowUpRight className="w-3 h-3" /> 2.4% (24h)
                                                            </span>
                                                        </div>
                                                        <span className="text-3xl lg:text-4xl font-medium tracking-tighter text-white tabular-nums">
                                                            ${totalLiquidity.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button className="h-8 px-4 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold text-[10px]">
                                                            <ArrowRightLeft className="w-3 h-3 mr-2" /> Convert
                                                        </Button>
                                                        <Button variant="outline" className="h-8 px-4 rounded-xl border-zinc-700 bg-transparent text-white hover:bg-zinc-800 font-bold text-[10px]">
                                                            <Wallet className="w-3 h-3 mr-2" /> Deposit
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* Right: Allocation Visual (Real Finance) */}
                                                <div className="flex-1 w-full max-w-md pb-1">
                                                    <LiquidityBar segments={liquidityBreakdown} total={totalLiquidity} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* 2. OPERATIONS FEED (Batches & Milestones) */}
                                        <div className="bg-zinc-950/80 border border-zinc-800/50 rounded-2xl overflow-hidden flex-1 min-h-[300px]">
                                            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800/50">
                                                <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Live Operations</h2>
                                                <div className="flex gap-2">
                                                    <span className="text-[10px] text-zinc-500 font-medium">Processing: <span className="text-white">1</span></span>
                                                    <span className="text-[10px] text-zinc-500 font-medium">Pending: <span className="text-white">1</span></span>
                                                </div>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left text-xs">
                                                    <thead className="bg-zinc-900/50 text-zinc-500 font-medium uppercase tracking-wider">
                                                        <tr>
                                                            <th className="px-5 py-3 font-medium">Type</th>
                                                            <th className="px-5 py-3 font-medium">Counterparty</th>
                                                            <th className="px-5 py-3 font-medium">Rail</th>
                                                            <th className="px-5 py-3 font-medium">Risk</th>
                                                            <th className="px-5 py-3 font-medium text-right">Amount</th>
                                                            <th className="px-5 py-3 font-medium text-right">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-zinc-800/50">
                                                        {operationsFeed.map((item, i) => (
                                                            <tr
                                                                key={i}
                                                                className="group hover:bg-[#161616] transition-colors cursor-pointer"
                                                            >
                                                                <td className="px-5 py-3">
                                                                    <div className="flex items-center gap-2">
                                                                        {item.type === 'Payroll' && <Users className="w-3.5 h-3.5 text-blue-400" />}
                                                                        {item.type === 'Escrow' && <Shield className="w-3.5 h-3.5 text-amber-400" />}
                                                                        {item.type === 'Remittance' && <Send className="w-3.5 h-3.5 text-brand-400" />}
                                                                        {item.type === 'Compliance' && <AlertTriangle className="w-3.5 h-3.5 text-red-400" />}
                                                                        <span className="font-medium text-zinc-300">{item.type}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-5 py-3">
                                                                    <div className="flex flex-col">
                                                                        <span className="font-medium text-white">{item.description}</span>
                                                                        <span className="text-[9px] text-zinc-500 font-mono">{item.id} / {item.corridor} / FX {item.fx}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-5 py-3 text-zinc-400">
                                                                    <div className="flex flex-col">
                                                                        <span>{item.rail}</span>
                                                                        <span className="text-[9px] text-zinc-500">{item.compliance}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-5 py-3">
                                                                    <span className={cn("rounded-full px-2 py-1 text-[9px] font-bold", Number(item.risk) > 60 ? "bg-red-500/10 text-red-400" : "bg-brand-500/10 text-brand-400")}>
                                                                        {item.risk}
                                                                    </span>
                                                                </td>
                                                                <td className="px-5 py-3 font-mono font-medium text-white text-right">
                                                                    {item.amount > 0 ? `$${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '-'}
                                                                </td>
                                                                <td className="px-5 py-2 text-right">
                                                                    {item.action === 'Approve' ? (
                                                                        <Button
                                                                            size="sm"
                                                                            className="h-6 bg-white text-black hover:bg-zinc-200 text-[9px] font-bold px-3 rounded-lg"
                                                                        >
                                                                            Approve
                                                                        </Button>
                                                                    ) : (
                                                                        <Button size="sm" variant="ghost" className="h-6 text-[10px] text-zinc-500 hover:text-white">
                                                                            {item.action} &rarr;
                                                                        </Button>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- SIDE COLUMN (4 Span) --- */}
                                    <div className="xl:col-span-4 flex flex-col gap-4">

                                        {/* 3. CASH FLOW METRICS (Inflow/Outflow) */}
                                        <div
                                            className="p-5 bg-zinc-950/80 border border-zinc-800/50 rounded-2xl group hover:border-zinc-700 transition-colors cursor-pointer"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Cash Flow (7d)</h2>
                                                <Activity className="w-3.5 h-3.5 text-zinc-600" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <span className="text-[10px] text-zinc-500 uppercase block mb-1">Inflow</span>
                                                    <span className="text-xl font-medium tracking-tight text-brand-400 tabular-nums block">
                                                        +${(cashFlow.inflow / 1000).toFixed(1)}k
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] text-zinc-500 uppercase block mb-1">Outflow</span>
                                                    <span className="text-xl font-medium tracking-tight text-zinc-300 tabular-nums block">
                                                        -${(cashFlow.outflow / 1000).toFixed(1)}k
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-3 border-t border-[#222] flex justify-between items-center">
                                                <span className="text-[10px] text-zinc-500">Net Change</span>
                                                <span className="text-sm font-mono font-bold text-brand-400">
                                                    +${(cashFlow.net / 1000).toFixed(1)}k
                                                </span>
                                            </div>
                                        </div>

                                        {/* 4. APPROVAL QUEUE (Dual Auth) */}
                                        <div className="bg-zinc-950/80 border border-zinc-800/50 rounded-2xl p-5 flex-1">
                                            <div className="flex items-center justify-between mb-4">
                                                <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Approvals</h2>
                                                <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded font-mono">{approvalQueue.length}</span>
                                            </div>
                                            <div className="space-y-3">
                                                {approvalQueue.map((item, i) => (
                                                    <div
                                                        key={i}
                                                        className="p-3 rounded-xl bg-[#161616] border border-[#222] hover:border-zinc-700 transition-colors group cursor-pointer"
                                                    >
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-[9px] font-bold uppercase text-blue-400 tracking-wider">Dual-Auth Required</span>
                                                            <Clock className="w-3 h-3 text-zinc-600" />
                                                        </div>
                                                        <div className="mb-2">
                                                            <p className="text-sm font-medium text-white">{item.type}</p>
                                                            <p className="text-[10px] text-zinc-500">Req: Sarah M. • {item.amount > 0 ? `$${item.amount.toLocaleString()}` : ''}</p>
                                                        </div>
                                                        <Button
                                                            size="sm"
                                                            className="w-full h-6 bg-blue-600 hover:bg-blue-500 text-white text-[9px] font-bold"
                                                        >
                                                            Review & Sign
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 5. COMPLIANCE QUEUE (Review) */}
                                        <div className="bg-zinc-950/80 border border-zinc-800/50 rounded-2xl p-5">
                                            <div className="flex items-center justify-between mb-3">
                                                <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Compliance</h2>
                                                <span className="text-[10px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded font-mono">{complianceQueue.length}</span>
                                            </div>
                                            <div className="space-y-2">
                                                {complianceQueue.map((item, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-center justify-between p-2 pl-3 bg-[#161616] rounded-lg border border-[#222] hover:border-zinc-700 transition-colors cursor-pointer group"
                                                    >
                                                        <div>
                                                            <p className="text-[11px] font-medium text-zinc-200 group-hover:text-white transition-colors">{item.type}</p>
                                                            <p className="text-[9px] text-zinc-500">{item.entity} • {item.risk} Risk</p>
                                                        </div>
                                                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-zinc-500 hover:text-white">
                                                            <ArrowRight className="w-3 h-3" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent z-40 pointer-events-none" />
            </div>
        </section>
    );
}
