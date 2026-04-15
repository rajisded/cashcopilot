"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Hexagon, Search, Bell, Download, Target, 
  TrendingUp, Users, Megaphone, Star, ArrowUpRight, 
  Map, MessageCircle, BarChart2, Cpu, Activity, 
  Database, GitBranch, LayoutDashboard, Settings, Mic, Send,
  CheckCircle2, RefreshCw, AlertTriangle, Check
} from "lucide-react";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Dashboard.module.css";

// MOCK DATA
const pricingData = [
  { name: 'Jan', current: 100, competitor: 95 },
  { name: 'Feb', current: 100, competitor: 110 },
  { name: 'Mar', current: 100, competitor: 140 },
  { name: 'Apr', current: 100, competitor: 190 },
];

const hiringData = [
  { name: 'Sales', count: 45 },
  { name: 'Eng', count: 30 },
  { name: 'Enterprise', count: 85 },
  { name: 'Support', count: 20 },
];

const adData = [
  { name: 'W1', meta: 400, linkedin: 300 },
  { name: 'W2', meta: 350, linkedin: 500 },
  { name: 'W3', meta: 300, linkedin: 800 },
  { name: 'W4', meta: 200, linkedin: 1200 },
];

const sentimentData = [
  { name: 'Oct', score: 4.8 },
  { name: 'Nov', score: 4.5 },
  { name: 'Dec', score: 4.1 },
  { name: 'Jan', score: 3.8 },
];

const logsSequence = [
  "INITIALIZING NEURAL NET...",
  "ACCESSING G2 GRAPH...",
  "SCRAPING LINKEDIN TALENT POOL...",
  "ANALYZING AD SPEND TELEMETRY...",
  "CROSS-REFERENCING PRICING ARCHIVES...",
  "SYNTHESIZING VERDICT...",
  "BOARD-READY REPORT GENERATED."
];

// NAV ITEMS
const navItems = [
  { id: 'command', label: 'Command Center', icon: LayoutDashboard, section: 'System' },
  { id: 'nodes', label: 'Intelligence Nodes', icon: Activity, section: 'System' },
  { id: 'mapping', label: 'Neural Mapping', icon: GitBranch, section: 'System' },
  { id: 'genome', label: 'Competitor Genome', icon: Target, section: 'Datasets' },
  { id: 'signal', label: 'Signal Matrix', icon: Database, section: 'Datasets' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('command');
  
  // COMMAND CENTER STATES
  const [loading, setLoading] = useState(false);
  const [queryStarted, setQueryStarted] = useState(false);
  const [activeLog, setActiveLog] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // INTERACTION STATES
  const [isListening, setIsListening] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isAlertActive, setIsAlertActive] = useState(false);
  
  // POPOVER STATES
  const [showSysMenu, setShowSysMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setActiveLog(prev => (prev < logsSequence.length - 1 ? prev + 1 : prev));
      }, 400); // Quick log progression
    } else {
      setActiveLog(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const simulateAnalysis = (query?: string) => {
    const val = query || inputValue;
    if (!val.trim()) return;
    if (query) setInputValue(query);
    
    setLoading(true);
    setQueryStarted(false);
    setTimeout(() => {
      setLoading(false);
      setQueryStarted(true);
      setInputValue("");
    }, 2800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      simulateAnalysis();
    }
  };

  const handleVoice = () => {
    setIsListening(true);
    setInputValue("");
    setTimeout(() => {
      setInputValue("Analyze competitor pivot strategy...");
      setTimeout(() => {
        setIsListening(false);
        simulateAnalysis("Analyze competitor pivot strategy...");
      }, 1000);
    }, 2000);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 2000);
  };

  // RENDER CONTENT BASED ON TAB
  const renderContent = () => {
    if (activeTab === 'command') {
      return (
        <AnimatePresence mode="wait">
          {!loading && !queryStarted && (
            <motion.div 
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={styles.heroContainer}
            >
              <Hexagon size={64} className={styles.heroIcon} />
              <h1 className={styles.heroTitle}>Omni Core Agent</h1>
              <p className={styles.heroSubtitle}>
                Stop Googling. Initiate deep-market queries across 6 signal matrices. We synthesize millions of data points into board-ready analysis in seconds.
              </p>
              <div className={styles.suggestedQueries}>
                <div className={styles.suggestedChip} onClick={() => simulateAnalysis("Analyze Competitor X's Q3 market pivot.")}>
                  Competitor X Q3 Pivot
                </div>
                <div className={styles.suggestedChip} onClick={() => simulateAnalysis("Map entry-level pricing changes across top 3 rivals.")}>
                  Entry Pricing Shifts
                </div>
                <div className={styles.suggestedChip} onClick={() => simulateAnalysis("Detect enterprise AE hiring spikes in US.")}>
                  Enterprise Hiring Radar
                </div>
              </div>
            </motion.div>
          )}

          {loading && (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.loaderContainer}
            >
              <div className={styles.hexSpinner}>
                <Hexagon className={styles.hexIcon} />
              </div>
              <div className={styles.loadText}>Processing Signal Matrix</div>
              <div className={styles.loadLogs}>{logsSequence[activeLog]}</div>
            </motion.div>
          )}

          {queryStarted && !loading && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.dashboardGrid}
            >
              {/* DASHBOARD MAIN (LEFT) */}
              <div className={styles.dashboardMain}>
                <div className={styles.insightHeaderCard}>
                  <div className={styles.sysInfoRow}>
                    <div className={styles.sysBadge}><div className={styles.dot}></div> SYSTEM: ONLINE</div>
                    <div className={styles.sysBadge}><Activity size={14}/> LATENCY: 14ms</div>
                    <div className={styles.sysBadge}><Database size={14}/> 6.4K QUERIES COMPLETED</div>
                  </div>
                  
                  <h2 className={styles.verdictTitle}>Pivoting Upmarket</h2>
                  <p className={styles.verdictText}>
                    Competitor X is definitively repositioning to target enterprise accounts, abandoning their SMB core functionality. Action required within 30 days to defend midline market share.
                  </p>

                  <div className={styles.equationGrid}>
                    <div className={styles.eqNode}>
                      <span className={styles.eqNodeLabel}>Signal Alpha • Pricing</span>
                      <span className={styles.eqNodeValue}>+90% MSRP Shift</span>
                    </div>
                    <div className={styles.eqNode}>
                      <span className={styles.eqNodeLabel}>Signal Beta • Hiring</span>
                      <span className={styles.eqNodeValue}>Enterprise Boom</span>
                    </div>
                    <div className={cx(styles.eqNode, styles.result)}>
                      <span className={styles.eqNodeLabel}>Omni Synthesis</span>
                      <span className={styles.eqNodeValue}>Strategic Pivot Verified</span>
                    </div>
                  </div>
                </div>

                <div className={styles.matrixHeader}>
                  <span className={styles.matrixTitle}>Signal Matrix Breakdown</span>
                </div>

                <div className={styles.signalsGrid}>
                  {/* Signal 1 */}
                  <div className={styles.signalCard}>
                    <div className={styles.sigTop}>
                      <div className={styles.sigTitleGroup}>
                        <div className={styles.sigIconBlock}><TrendingUp size={18} /></div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <span className={styles.sigTitle}>Pricing Structure</span>
                          <span className={styles.sigMeta}>CONFIDENCE: 99.1%</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.sigChart}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={pricingData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-tertiary)', fontSize: 11}} dy={5} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-tertiary)', fontSize: 11}} />
                          <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)' }} />
                          <Line type="monotone" dataKey="competitor" stroke="var(--accent)" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className={styles.sigInsight}>
                      <strong>Observation:</strong> Tiered structures consolidated. Entry-level pricing removed completely in April.
                    </div>
                  </div>

                  {/* Signal 2 */}
                  <div className={styles.signalCard}>
                    <div className={styles.sigTop}>
                      <div className={styles.sigTitleGroup}>
                        <div className={styles.sigIconBlock}><Users size={18} /></div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <span className={styles.sigTitle}>Senior Hire Patterns</span>
                          <span className={styles.sigMeta}>CONFIDENCE: 97.4%</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.sigChart}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={hiringData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-tertiary)', fontSize: 11}} dy={5} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-tertiary)', fontSize: 11}} />
                          <Tooltip cursor={{fill: 'var(--bg-surface-hover)'}} contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)' }} />
                          <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={28} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className={styles.sigInsight}>
                      <strong>Observation:</strong> 85 open reqs for Enterprise AEs. Zero SMB roles posted in Q1.
                    </div>
                  </div>

                  {/* Signal 3 */}
                  <div className={styles.signalCard}>
                    <div className={styles.sigTop}>
                      <div className={styles.sigTitleGroup}>
                        <div className={styles.sigIconBlock}><Megaphone size={18} /></div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <span className={styles.sigTitle}>Ad Spend Movement</span>
                          <span className={styles.sigMeta}>CONFIDENCE: 92.5%</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.sigChart}>
                        <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={adData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-tertiary)', fontSize: 11}} dy={5} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-tertiary)', fontSize: 11}} />
                          <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)' }} />
                          <Area type="monotone" dataKey="linkedin" stackId="1" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.2} />
                          <Area type="monotone" dataKey="meta" stackId="1" stroke="var(--text-tertiary)" fill="var(--text-tertiary)" fillOpacity={0.1} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className={styles.sigInsight}>
                      <strong>Observation:</strong> Reallocating Meta spend heavily to LinkedIn ABM campaigns.
                    </div>
                  </div>

                  {/* Signal 4 */}
                  <div className={styles.signalCard}>
                    <div className={styles.sigTop}>
                      <div className={styles.sigTitleGroup}>
                        <div className={styles.sigIconBlock}><MessageCircle size={18} /></div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <span className={styles.sigTitle}>Review Sentiment</span>
                          <span className={styles.sigMeta}>CONFIDENCE: 98.8%</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.sigChart}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sentimentData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-tertiary)', fontSize: 11}} dy={5} />
                          <YAxis domain={[3, 5]} axisLine={false} tickLine={false} tick={{fill: 'var(--text-tertiary)', fontSize: 11}} />
                          <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)' }} />
                          <Line type="monotone" dataKey="score" stroke="var(--danger)" strokeWidth={3} dot={{r: 4, fill: 'var(--danger)'}} activeDot={{r: 6}} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className={styles.sigInsight}>
                      <strong>Observation:</strong> SMB customers complaining about neglected support and "forced upgrades".
                    </div>
                  </div>
                </div>
              </div>

              {/* DASHBOARD RIGHT (META DATA) */}
              <aside className={styles.dashboardRight}>
                <div className={styles.metaPanel}>
                  <div className={styles.metaHeader}>Omni Diagnostic Score</div>
                  
                  <div className={styles.scoreCircle}>
                    <div className={styles.scoreValue}>96%</div>
                    <div className={styles.scoreLabel}>Action Confidence</div>
                  </div>

                  <div className={styles.dataList}>
                    <div className={styles.dataRow}>
                      <span className={styles.dataLabel}><Database size={14}/> Sources Checked</span>
                      <span className={styles.dataVal}>1,402</span>
                    </div>
                    <div className={styles.dataRow}>
                      <span className={styles.dataLabel}><GitBranch size={14}/> Data Nodes</span>
                      <span className={styles.dataVal}>6</span>
                    </div>
                    <div className={styles.dataRow}>
                      <span className={styles.dataLabel}><Activity size={14}/> Volatility Index</span>
                      <span className={styles.dataVal} style={{color: 'var(--danger)'}}>High</span>
                    </div>
                  </div>

                  <button 
                    className={cx(styles.actionBtnBig, downloadSuccess && styles.downloadSuccess)} 
                    onClick={handleDownload}
                    disabled={isDownloading || downloadSuccess}
                  >
                    {downloadSuccess ? (
                      <><CheckCircle2 size={18} /> Saved to Drive</>
                    ) : isDownloading ? (
                      <><RefreshCw size={18} className={styles.pulseMic} /> Compiling PDF...</>
                    ) : (
                      <><Download size={18} /> Board-Ready PDF</>
                    )}
                  </button>
                  <button 
                    className={cx(styles.actionBtnBig, isAlertActive ? styles.alertActive : '')} 
                    style={(!isAlertActive) ? {background: 'var(--bg-surface-hover)', color: 'var(--text-primary)', boxShadow: 'none'} : {}}
                    onClick={() => setIsAlertActive(!isAlertActive)}
                  >
                    {isAlertActive ? <><Check size={18} /> Tracking Active</> : <><Target size={18} /> Set Tracking Alert</>}
                  </button>
                </div>
              </aside>
            </motion.div>
          )}
        </AnimatePresence>
      );
    }
    
    // OTHER TABS
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.tabContent}
      >
        <h1 className={styles.tabTitle}>{navItems.find(n => n.id === activeTab)?.label}</h1>
        <p className={styles.tabSubtitle}>Live enterprise telemetry and subsystem mapping.</p>
        
        <div className={styles.gridCards}>
          {[1,2,3,4,5,6].map((i) => (
             <div key={i} className={styles.card}>
               <div className={styles.cardHeader}>
                 <div className={styles.cardIcon}><Activity size={20} /></div>
                 <span>Sync Node Alpha-{i}</span>
               </div>
               <div className={styles.cardValue}>{Math.floor(Math.random() * 40) + 60}%</div>
               <div className={styles.cardLabel}>Operational Efficiency</div>
               <div className={styles.sysBadge} style={{width: 'fit-content'}}>
                 <div className={styles.dot}></div> ONLINE
               </div>
             </div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div className={styles.layout}>
      {/* SIDEBAR LEFT */}
      <aside className={styles.sidebarLeft}>
        <div className={styles.logoArea} onClick={() => setActiveTab('command')}>
          <Hexagon className={styles.logoIcon} size={28} />
          Omni Core
        </div>
        <div className={styles.navSection}>
          <div className={styles.navLabel}>System</div>
          {navItems.filter(i => i.section === 'System').map((item) => (
            <div 
              key={item.id}
              className={cx(styles.navItem, activeTab === item.id && styles.active)}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon size={18} className={styles.navItemIcon} />
              {item.label}
            </div>
          ))}
          
          <div className={styles.navLabel} style={{marginTop: '2rem'}}>Datasets</div>
          {navItems.filter(i => i.section === 'Datasets').map((item) => (
            <div 
              key={item.id}
              className={cx(styles.navItem, activeTab === item.id && styles.active)}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon size={18} className={styles.navItemIcon} />
              {item.label}
            </div>
          ))}
        </div>
        
        <div className={styles.userArea}>
          <div className={styles.avatar}>SJ</div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>Sarah Jenkins</div>
            <div className={styles.userRole}>Head of Strategy | Pro</div>
          </div>
          <Settings 
            size={18} 
            color="var(--text-tertiary)" 
            style={{cursor: 'pointer'}} 
            onClick={() => setShowSettingsMenu(!showSettingsMenu)}
          />

          {/* Settings Popover */}
          <AnimatePresence>
            {showSettingsMenu && (
              <motion.div 
                initial={{opacity: 0, y: 10}} 
                animate={{opacity: 1, y: 0}} 
                exit={{opacity: 0, y: 10}}
                className={cx(styles.popover, styles.settingsPopover)}
              >
                <div className={styles.popoverHeader}>Account Setup</div>
                <div className={styles.popoverItem} onClick={() => setShowSettingsMenu(false)}>
                  <Settings size={16} className={styles.popoverItemIcon} /> Preferences
                </div>
                <div className={styles.popoverItem} onClick={() => setShowSettingsMenu(false)}>
                  <Database size={16} className={styles.popoverItemIcon} /> API Keys
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>

      {/* MAIN WRAPPER */}
      <div className={styles.mainWrapper}>
        
        {/* HEADER */}
        <header className={styles.header}>
          <div className={styles.breadcrumbs}>
            Omni Core <span style={{margin: '0 0.5rem', opacity: 0.5}}>/</span> 
            <span className={styles.breadcrumbActive}>
              {navItems.find(n => n.id === activeTab)?.label}
            </span>
          </div>
          <div className={styles.headerActions}>
            <button className={cx(styles.iconBtn, showSysMenu && styles.active)} onClick={() => {setShowSysMenu(!showSysMenu); setShowNotifMenu(false);}}>
              <Cpu size={20} />
            </button>
            <button className={cx(styles.iconBtn, showNotifMenu && styles.active)} onClick={() => {setShowNotifMenu(!showNotifMenu); setShowSysMenu(false);}}>
              <Bell size={20} />
              <span className={styles.notifBadge}></span>
            </button>

            {/* System Popover */}
            <AnimatePresence>
            {showSysMenu && (
              <motion.div 
                initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 10}}
                className={cx(styles.popover, styles.systemPopover)}
              >
                <div className={styles.popoverHeader}><span>System Status</span> <div className={styles.sysBadge}><div className={styles.dot}></div></div></div>
                <div className={styles.popoverItem}><Activity size={16} className={styles.popoverItemIcon}/> Cluster Alpha: Online</div>
                <div className={styles.popoverItem}><GitBranch size={16} className={styles.popoverItemIcon}/> Neural Mapping: 14ms ping</div>
                <div className={styles.popoverItem}><Database size={16} className={styles.popoverItemIcon}/> DB Sync: Connected</div>
              </motion.div>
            )}
            </AnimatePresence>

            {/* Notif Popover */}
            <AnimatePresence>
            {showNotifMenu && (
              <motion.div 
                initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 10}}
                className={styles.popover}
              >
                <div className={styles.popoverHeader}>Notifications</div>
                <div className={styles.popoverItem} style={{alignItems: 'flex-start'}}>
                  <AlertTriangle size={16} className={styles.popoverItemIcon} style={{color: 'var(--warning)', marginTop: '2px'}}/> 
                  <div>
                    <div style={{fontWeight: 700, color: 'var(--text-primary)'}}>Competitor X Alert</div>
                    <div>Pricing anomaly detected in EMEA region.</div>
                  </div>
                </div>
                <div className={styles.popoverItem} style={{alignItems: 'flex-start'}}>
                  <Target size={16} className={styles.popoverItemIcon} style={{marginTop: '2px'}}/> 
                  <div>
                    <div style={{fontWeight: 700, color: 'var(--text-primary)'}}>Goal Reached</div>
                    <div>Quarterly scrape quota has completed.</div>
                  </div>
                </div>
              </motion.div>
            )}
            </AnimatePresence>

          </div>
        </header>

        {/* CONTENT AREA */}
        <div className={styles.contentArea}>
          {renderContent()}
        </div>

        {/* FLOATING CHATBOT BAR */}
        {activeTab === 'command' && (
          <div className={styles.chatbotWrapper}>
            <div className={styles.chatbotInner}>
              <div className={styles.chatInputArea}>
                <textarea 
                  ref={inputRef}
                  className={styles.chatInput} 
                  placeholder={isListening ? "Listening..." : "Type your strategic query to Omni Core..."}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading || isListening}
                  rows={1}
                />
                <div className={styles.chatActions}>
                  <button className={styles.voiceBtn} onClick={handleVoice}>
                    <Mic size={18} className={isListening ? styles.pulseMic : ""} />
                  </button>
                  <button 
                    className={cx(styles.sendBtn, inputValue.trim() ? styles.active : '')}
                    onClick={() => simulateAnalysis()}
                    disabled={!inputValue.trim() || loading || isListening}
                  >
                    {loading ? <RefreshCw size={16} className={styles.pulseMic} style={{color: 'white'}} /> : <Send size={16} style={{marginLeft: '2px'}} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Utility for concatenating classes
function cx(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
