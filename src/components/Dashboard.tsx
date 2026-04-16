"use client";

import React, { useState, useEffect } from "react";
import { 
  Building2, Zap, Cpu, Database, Server,
  Activity, ArrowUpRight, ArrowDownRight, MoreHorizontal,
  Bot, FileText, CheckCircle2, ShieldAlert,
  LayoutDashboard, Globe, BarChart3, Search, Play, ArrowRightLeft
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, ReferenceLine, ComposedChart, Line
} from 'recharts';
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Dashboard.module.css";

// --- MOCK CASH FLOW DATA ---
const baseForecast = [
  { date: '05/01', actual: 145000, aiBase: 145000, aiHigh: 145000, aiLow: 145000 },
  { date: '05/08', actual: 132000, aiBase: 132500, aiHigh: 133000, aiLow: 130000 },
  { date: '05/15', actual: 148000, aiBase: 147500, aiHigh: 150000, aiLow: 145000 },
  { date: '05/22', actual: 125000, aiBase: 124000, aiHigh: 128000, aiLow: 121000 },
  { date: '05/29', actual: 110000, aiBase: 110000, aiHigh: 110000, aiLow: 110000 }, // Today
  { date: '06/05', aiBase: 95000,  aiHigh: 102000, aiLow: 88000  },
  { date: '06/12', aiBase: 82000,  aiHigh: 96000,  aiLow: 71000  }, // Crunch
  { date: '06/19', aiBase: 105000, aiHigh: 120000, aiLow: 95000  },
  { date: '06/26', aiBase: 130000, aiHigh: 155000, aiLow: 115000 },
  { date: '07/04', aiBase: 120000, aiHigh: 148000, aiLow: 105000 },
];

const extendedForecast = [
  ...baseForecast,
  { date: '08/01', aiBase: 135000, aiHigh: 168000, aiLow: 105000 },
  { date: '09/01', aiBase: 150000, aiHigh: 198000, aiLow: 95000 },
  { date: '10/01', aiBase: 165000, aiHigh: 228000, aiLow: 85000 },
  { date: '11/01', aiBase: 190000, aiHigh: 278000, aiLow: 75000 },
];

const unpaidInvoices = [
  { id: 'INV-1091', client: 'Smith Plumbing', risk: 'high', score: 92, amount: 45200, statusText: 'Escalated to Follow-Up', latency: '24 Days Late', initial: 'SP' },
  { id: 'INV-1092', client: 'Main Street Cafe', risk: 'high', score: 88, amount: 18500, statusText: 'Auto-SMS Reminder Sent', latency: '12 Days Late', initial: 'MS' },
  { id: 'INV-1094', client: 'Johnson Roofing', risk: 'med', score: 65, amount: 8200, statusText: 'Email Sequence Active', latency: '4 Days Late', initial: 'JR' },
  { id: 'INV-1097', client: 'Apex Construction', risk: 'low', score: 14, amount: 32000, statusText: 'Waiting for Due Date', latency: 'Due in 8 Days', initial: 'AC' },
];

const initialTransactions = [
  { id: 'TRX-101', entity: 'Amazon Web Services', type: 'Software', amt: -14204, status: 'completed', flag: 'Cost increased 42%!' },
  { id: 'TRX-102', entity: 'Stripe Bank Payout', type: 'Income', amt: 84500, status: 'processing', flag: '-' },
  { id: 'TRX-103', entity: 'Employee Payroll', type: 'Team', amt: -42100, status: 'completed', flag: '-' },
  { id: 'TRX-104', entity: 'Zoom Meetings', type: 'Software', amt: -1840, status: 'failed', flag: 'Paused by System' },
];

const initialLogs = [
  { tag: 'SYSTEM', msg: 'Dashboard and AI securely connected.', time: '08:00:12', type: '' },
  { tag: 'BANKING', msg: 'Checked for new bank transactions.', time: '08:00:15', type: '' },
  { tag: 'FORECAST', msg: 'Updated 90-day cash flow predictions.', time: '08:00:18', type: 'active' },
];

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState<string>('hub');
  const [logs, setLogs] = useState(initialLogs);
  
  // App States for Interactions
  const [scenTriggered, setScenTriggered] = useState(false);
  const [scenMsg, setScenMsg] = useState("");
  const [scenInput, setScenInput] = useState("");
  const [timeHorizon, setTimeHorizon] = useState('90d');
  const [actionDone, setActionDone] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [txGrid, setTxGrid] = useState(initialTransactions);
  const [currency, setCurrency] = useState('$');

  // Multiplier for INR conversion
  const rate = currency === '₹' ? 83 : 1;
  const fmt = (val: number, hideSign: boolean = false) => {
    const isNegative = val < 0;
    const absVal = Math.abs(val);
    const converted = Math.round(absVal * rate);
    const prefix = isNegative && !hideSign ? '-' : (val > 0 && !hideSign ? '+' : '');
    return `${prefix}${currency}${converted.toLocaleString()}`;
  };

  // Simulated Terminal AI Stream
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      if (count === 1) addLog('ALERT', 'Main Street Cafe is repeatedly paying late. Risk score slightly worse.', 'warning');
      if (count === 3) addLog('COLLECTIONS', 'Sent automatic SMS reminder to Main Street Cafe.', 'active');
      if (count === 6) addLog('SYSTEM', 'Cleared temporary cache.', '');
      if (count === 8) addLog('BANKING', 'Connected to accounting software successfully. 14 new records.', 'success');
      if (count > 9) clearInterval(interval);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const addLog = (tag: string, msg: string, type: string) => {
    const time = new Date().toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit'});
    setLogs(prev => [{tag, msg, time, type}, ...prev].slice(0, 10));
  };

  const handleScenarioSubmit = () => {
    if (!scenInput.trim()) return;
    setScenTriggered(true);
    setScenMsg(scenInput);
    addLog('SCENARIO', `Testing idea: ${scenInput}`, 'active');
    setScenInput("");
    
    // Simulate delay for AI response
    setTimeout(() => {
      addLog('RESULT', 'This would reduce your available cash runway by 1.4 months. Proceed with caution.', 'warning');
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleScenarioSubmit();
  };

  // Execute AI Recovery Action
  const handleSuspendAction = () => {
    if(actionDone) return;
    setActionDone(true);
    addLog('ACTION', 'Paused unused software accounts. Saved money for this month.', 'active');
    
    // Update grid data realistically
    setTxGrid(prev => prev.map(tx => 
      tx.id === 'TRX-101' ? { ...tx, flag: 'Issue fixed automatically', status: 'completed' } : tx
    ));
  };

  // Process data based on UI states
  const filteredInvoices = unpaidInvoices.filter(invoice => 
    invoice.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const chartData = timeHorizon === '90d' ? baseForecast : extendedForecast;

  // Render Tabs conditionally
  if (activeNav !== 'hub') {
    return (
      <div className={styles.layout}>
        {/* REUSED SIDEBAR FOR OTHER MENUS */}
        <nav className={styles.sidebarNav}>
          <div className={styles.logoIcon}><Building2 size={22} /></div>
          <div className={cx(styles.navItem, (activeNav as string) === 'hub' && styles.active)} onClick={()=>setActiveNav('hub')}><LayoutDashboard size={20} /></div>
          <div className={cx(styles.navItem, (activeNav as string) === 'ai' && styles.active)} onClick={()=>setActiveNav('ai')}><Cpu size={20} /><div className={styles.navBadge}>3</div></div>
          <div className={cx(styles.navItem, (activeNav as string) === 'ar' && styles.active)} onClick={()=>setActiveNav('ar')}><Activity size={20} /></div>
          <div className={cx(styles.navItem, (activeNav as string) === 'doc' && styles.active)} onClick={()=>setActiveNav('doc')}><FileText size={20} /></div>
        </nav>
        <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', background: 'var(--bg-main)'}}>
           <LayoutDashboard size={64} style={{color: 'var(--border-strong)', marginBottom: '1rem'}} />
           <h2 style={{color: 'var(--text-secondary)'}}>System View: {activeNav.toUpperCase()}</h2>
           <p style={{color: 'var(--text-tertiary)'}}>This page is currently under construction. Please return to Overview.</p>
           <button onClick={()=>setActiveNav('hub')} style={{marginTop: '1rem', padding: '0.5rem 1rem', background: 'var(--accent)', color: 'white', borderRadius: '8px', cursor: 'pointer', border: 'none'}}>Return to Overview</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      
      {/* 1. COMPACT SIDEBAR */}
      <nav className={styles.sidebarNav}>
        <div className={styles.logoIcon}>
          <Building2 size={22} />
        </div>
        
        <div className={cx(styles.navItem, activeNav === 'hub' && styles.active)} onClick={()=>setActiveNav('hub')} title="Overview">
          <LayoutDashboard size={20} />
        </div>
        <div className={cx(styles.navItem, (activeNav as string) === 'ai' && styles.active)} onClick={()=>setActiveNav('ai')} title="AI Tools">
          <Cpu size={20} />
          <div className={styles.navBadge}>3</div>
        </div>
        <div className={cx(styles.navItem, (activeNav as string) === 'ar' && styles.active)} onClick={()=>setActiveNav('ar')} title="Collections">
          <Activity size={20} />
        </div>
        <div className={cx(styles.navItem, (activeNav as string) === 'doc' && styles.active)} onClick={()=>setActiveNav('doc')} title="Reports">
          <FileText size={20} />
        </div>
      </nav>

      {/* 2. DYNAMIC TERMINAL / AI STREAM SIDEBAR */}
      <aside className={styles.sidebarTerminal}>
        <div className={styles.terminalHeader}>
          Cash Co-Pilot
          <div className={styles.statusIndicator}>
            <div className={styles.pulseDot}></div> Online
          </div>
        </div>
        
        <div className={styles.terminalStream}>
          <div className={styles.terminalSectionTitle}>Latest System Activity</div>
          <AnimatePresence initial={false}>
            {logs.map((log, i) => (
              <motion.div 
                key={i + log.time}
                initial={{ opacity: 0, x: -10, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                className={cx(styles.logEntry, log.type && styles[log.type as keyof typeof styles])}
              >
                <div className={styles.logMeta}>
                  <span className={styles.logTag}>[{log.tag}]</span>
                  <span>{log.time}</span>
                </div>
                {log.msg}
              </motion.div>
            ))}
          </AnimatePresence>

          <div style={{marginTop: 'auto', paddingTop: '1rem'}}>
            <div className={styles.terminalSectionTitle}>Suggested Action</div>
            <div className={styles.aiActionCard}>
              <div className={styles.aiActionTitle}><Zap size={14} color="#3B82F6" /> Rising Software Costs</div>
              <div className={styles.aiActionDesc}>Your Amazon Web Services bill Increased 42% suddenly. Stop unused testing servers to save {fmt(3200, true)}.</div>
              <button 
                className={styles.execBtn} 
                onClick={handleSuspendAction}
                disabled={actionDone}
                style={actionDone ? {background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', border: '1px solid currentColor', boxShadow: 'none'} : {}}
              >
                {actionDone ? <><CheckCircle2 size={16}/> Fixed Successfully</> : "Pause Unused Servers"}
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* 3. MAIN WORKSPACE */}
      <main className={styles.mainContent}>
        
        {/* TOP BAR */}
        <header className={styles.topBar}>
          <div className={styles.topBreadcrumbs}>
            <LayoutDashboard size={24} color="var(--accent)" />
            Overview
          </div>
          
          <div className={styles.sysMetrics}>
            <div className={styles.metricChunk}><Server size={14}/> Connection: Secure</div>
            <div className={cx(styles.metricChunk, styles.highlight)}><Database size={14}/> Records Analyzed: 1.2M</div>
          </div>

          <div className={styles.actionsRight}>
             <button 
                onClick={() => setCurrency(c => c === '$' ? '₹' : '$')}
                style={{display: 'flex', alignItems: 'center', gap: '5px', padding: '0.4rem 0.8rem', background: 'var(--accent-light)', color: 'var(--accent)', border: '1px solid currentColor', borderRadius: '8px', cursor: 'pointer', fontWeight: 800, fontSize: '0.85rem'}}
              >
               <ArrowRightLeft size={14} /> Currency ({currency})
             </button>
            <div className={styles.searchBox}>
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Search clients (e.g. Smith)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* DATA GRID AREA */}
        <div className={styles.dashboardGrid}>
          
          {/* HIGH LEVEL METRICS */}
          <div className={styles.metricNodes}>
             <div className={styles.metricNode}>
               <div className={styles.nodeDecor}></div>
               <div className={styles.nodeCat}><Database size={14}/> Total Cash Available</div>
               <div className={styles.nodeVal}>{fmt(110034, true)}</div>
               <div className={styles.nodeDelta}>
                 <ArrowDownRight size={14} className={styles.deltaNeg} />
                 <span className={styles.deltaNeg}>8.2%</span>
                 <span className={styles.deltaLabel}>less than last month</span>
               </div>
             </div>

             <div className={styles.metricNode}>
               <div className={styles.nodeDecor}></div>
               <div className={styles.nodeCat}><Activity size={14}/> Cash Runway</div>
               <div className={styles.nodeVal}>4.2 Mo</div>
               <div className={styles.nodeDelta}>
                 <ShieldAlert size={14} className={styles.deltaNeg} />
                 <span className={styles.deltaNeg}>Risk Found</span>
                 <span className={styles.deltaLabel}>Funds empty by September</span>
               </div>
             </div>

             <div className={styles.metricNode}>
               <div className={styles.nodeDecor}></div>
               <div className={styles.nodeCat}><Database size={14}/> Total Outstanding Invoices</div>
               <div className={styles.nodeVal}>{fmt(103900, true)}</div>
               <div className={styles.nodeDelta}>
                 <Activity size={14} className={styles.deltaNeg} />
                 <span className={styles.deltaNeg}>{fmt(63000, true)}</span>
                 <span className={styles.deltaLabel}>Flagged as High-Risk</span>
               </div>
             </div>

             <div className={styles.metricNode}>
               <div className={styles.nodeDecor}></div>
               <div className={styles.nodeCat}><Cpu size={14}/> Auto-Collected This Month</div>
               <div className={styles.nodeVal}>{fmt(42500, true)}</div>
               <div className={styles.nodeDelta}>
                 <ArrowUpRight size={14} className={styles.deltaPos} />
                 <span className={styles.deltaPos}>Active</span>
                 <span className={styles.deltaLabel}>via automatic reminders</span>
               </div>
             </div>
          </div>

          {/* MAIN CHART CANVAS: AI Predictive Tunnel */}
          <div className={cx(styles.glassCard, styles.neuralCanvas)}>
             <div className={styles.glassCardHeader}>
                <div className={styles.glassCardTitle}>
                  <BarChart3 size={20} color="var(--accent)" />
                  Cash Flow Forecast
                </div>
                <div className={styles.segControl}>
                  <div 
                    className={cx(styles.segItem, timeHorizon === '90d' && styles.active)}
                    onClick={() => setTimeHorizon('90d')}
                  >
                    Next 90 Days
                  </div>
                  <div 
                    className={cx(styles.segItem, timeHorizon === '1Yr' && styles.active)}
                    onClick={() => setTimeHorizon('1Yr')}
                  >
                    1-Year Setup
                  </div>
                </div>
             </div>
             
             <div className={styles.chartWrapper}>
               <ResponsiveContainer width="100%" height="100%">
                 <ComposedChart data={chartData} margin={{top: 10, right: 10, left: 10, bottom: 0}}>
                    <defs>
                      <linearGradient id="aiConfidence" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.15}/>
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: 'var(--text-tertiary)', fontSize: 11, fontFamily: 'monospace'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-tertiary)', fontSize: 11, fontFamily: 'monospace'}} tickFormatter={(v)=>`${currency}${((v * rate) / 1000).toFixed(0)}k`} />
                    <Tooltip 
                      contentStyle={{background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', border: '1px solid var(--border)', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                      labelStyle={{fontFamily: 'monospace', fontWeight: 800, color: 'var(--text-primary)'}}
                      formatter={(value: any, name: any) => [fmt(Number(value), true), name === 'actual' ? 'Bank Balance' : name === 'aiBase' ? 'Expected Balance' : 'Prediction Match']}
                    />
                    
                    <ReferenceLine x="05/29" stroke="var(--accent)" strokeDasharray="3 3" label={{ position: 'top', value: 'Today', fill: 'var(--accent)', fontSize: 11, fontFamily: 'monospace' }} />
                    <ReferenceLine y={90000} stroke="var(--danger)" strokeDasharray="2 2" />
                    
                    <Area type="monotone" dataKey="aiHigh" stackId="1" stroke="none" fill="url(#aiConfidence)" />
                    <Line type="monotone" dataKey="aiBase" stroke="#8B5CF6" strokeWidth={3} dot={{r: 0}} activeDot={{r: 6, strokeWidth: 0}} />
                    {timeHorizon === '90d' && <Line type="monotone" dataKey="actual" stroke="var(--text-primary)" strokeWidth={2} dot={{r: 4}} />}
                 </ComposedChart>
               </ResponsiveContainer>
             </div>
             
             {!scenTriggered && timeHorizon === '90d' && (
               <div style={{position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.75rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem', backdropFilter: 'blur(10px)'}}>
                  <div style={{background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '5px', borderRadius: '50%'}}><ShieldAlert size={16} /></div>
                  <div style={{flex: 1}}>
                    <div style={{fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)'}}>Cash Deficit Zone Expected</div>
                    <div style={{fontSize: '0.75rem', color: 'var(--text-secondary)'}}>System calculates 84% chance of dropping below safety limit by June 12th.</div>
                  </div>
               </div>
             )}
          </div>

          {/* RIGHT SIDE: Intelligent AR Collections */}
          <div className={cx(styles.glassCard, styles.arGrid)}>
            <div className={styles.glassCardHeader}>
              <div className={styles.glassCardTitle}>
                <Database size={20} color="var(--accent)" />
                Unpaid Invoices & Collections
              </div>
              <MoreHorizontal size={18} color="var(--text-tertiary)" />
            </div>

            <div className={styles.arMetrics}>
              <div className={styles.arScore}>
                <div className={styles.arLabel}>Avg Risk Score</div>
                <div className={styles.arBig}>68/100</div>
              </div>
              <div className={styles.arScore}>
                <div className={styles.arLabel}>Recovered by AI</div>
                <div className={styles.arBig}>14%</div>
              </div>
            </div>

            <div className={styles.arList}>
              {filteredInvoices.length > 0 ? filteredInvoices.map(client => (
                <div key={client.id} className={styles.arItem}>
                  <div className={styles.arClientInfo}>
                    <div className={styles.arAvatar}>{client.initial}</div>
                    <div className={styles.arMeta}>
                      <div className={styles.arName}>{client.client} <span className={cx(styles.arRisk, styles[client.risk as keyof typeof styles])}>{client.score} RISK</span></div>
                      <div className={styles.arDunningStatus}>
                        {client.risk === 'high' ? <ShieldAlert size={10} color="var(--danger)"/> : <CheckCircle2 size={10} color="var(--success)"/>}
                        {client.statusText}
                      </div>
                    </div>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <div style={{fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)'}}>{fmt(client.amount, true)}</div>
                    <div style={{fontSize: '0.65rem', color: 'var(--text-tertiary)', fontFamily: 'monospace'}}>{client.latency}</div>
                  </div>
                </div>
              )) : (
                <div style={{padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.8rem'}}>No clients found.</div>
              )}
            </div>
          </div>

          {/* BOTTOM FULL WIDTH: Ledger / Expense Intercept */}
          <div className={cx(styles.glassCard, styles.dataGridCard)}>
            <div className={styles.glassCardHeader}>
              <div className={styles.glassCardTitle}>
                <LayoutDashboard size={20} color="var(--accent)" />
                Recent Transactions & Alerts
              </div>
            </div>
            
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Trans. ID</th>
                  <th>Vendor / Company</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Payment Status</th>
                  <th>System Alert</th>
                </tr>
              </thead>
              <tbody>
                {txGrid.map(tx => (
                  <tr key={tx.id}>
                    <td style={{fontFamily: 'monospace', color: 'var(--text-tertiary)'}}>{tx.id}</td>
                    <td style={{fontWeight: 700, color: 'var(--text-primary)'}}>{tx.entity}</td>
                    <td>{tx.type}</td>
                    <td style={{fontWeight: 800, color: tx.amt > 0 ? 'var(--success)' : 'var(--text-primary)'}}>{fmt(tx.amt)}</td>
                    <td>
                      <div className={cx(styles.statusPill, styles[tx.status as keyof typeof styles])}>
                        <div style={{width: 6, height: 6, borderRadius: '50%', background: 'currentColor'}}></div>
                        {tx.status}
                      </div>
                    </td>
                    <td>
                      {tx.flag !== '-' ? (
                        <span style={{
                          color: tx.status === 'completed' && tx.flag.includes('fixed') ? 'var(--success)' : 'var(--danger)', 
                          fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px'
                        }}>
                           {tx.status === 'completed' && tx.flag.includes('fixed') ? <CheckCircle2 size={12} /> : <ShieldAlert size={12} />} 
                           {tx.flag}
                        </span>
                      ) : (
                        <span style={{color: 'var(--text-tertiary)'}}>-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* IMMERSIVE SCENARIO COMMAND INPUT */}
          <div className={styles.scenarioBar}>
            <Bot size={28} className={styles.scenIcon} />
            <input 
              type="text" 
              className={styles.scenInput} 
              placeholder="Type an idea (e.g., What if we hire 2 more people next month?)..." 
              value={scenInput}
              onChange={(e) => setScenInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button className={styles.scenBtn} onClick={handleScenarioSubmit} disabled={!scenInput.trim()} style={{opacity: scenInput.trim() ? 1 : 0.6}}>
               <Play size={16} style={{display:'flex', margin:'auto'}} />
            </button>
          </div>

          {scenTriggered && (
             <motion.div 
               initial={{opacity: 0, y: -10}} animate={{opacity: 1, y: 0}}
               style={{gridColumn: '1 / -1', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '1rem', borderRadius: '12px', marginTop: '-0.5rem', display: 'flex', alignItems: 'center', gap: '1rem'}}
             >
                <div style={{background: 'var(--accent)', color: 'white', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800}}>ACTIVE SCENARIO TEST</div>
                <div style={{color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600}}>"{scenMsg}"</div>
                <button onClick={()=>setScenTriggered(false)} style={{marginLeft: 'auto', background: 'transparent', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700}}>Clear Scenario</button>
             </motion.div>
          )}

        </div>
      </main>

    </div>
  );
}

// Utility function
function cx(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
