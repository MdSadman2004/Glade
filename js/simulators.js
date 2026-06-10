/* ==========================================================================
   GLADE AGENT SIMULATOR - INTERACTIVE PIPELINE LOGIC (JAVASCRIPT)
   ========================================================================== */

// Simulated Documents Database
const SIMULATOR_DOCUMENTS = {
  terratrace: [
    {
      id: "oakridge",
      name: "Oakridge Block 7 Deeds (PDF)",
      preview: `DEED OF TRANSFER (1984)\nSeller: Thomas Sterling\nBuyer: Oakridge Land Dev Corporation\nPrice: $285,000\nDescription: Parcel B-7 of Oakridge Subdivision.\nCovenants: Reserving a public utilities easement on the eastern 10 feet. Residential building height limited to 30 feet. No commercial operations permitted.`,
      visualData: [
        { year: "1962", owner: "Sterling Family Estates", event: "Original Grant", details: "Unrestricted agricultural zoning." },
        { year: "1984", owner: "Thomas Sterling", event: "Ownership Transfer", details: "Acquired via inheritance." },
        { year: "1984", owner: "Oakridge Land Dev Corp", event: "Purchase Sale ($285k)", details: "Easements created: Utility access (eastern 10ft), 30ft height restriction, no commercial use." }
      ],
      logs: [
        { type: "system", text: "Initializing TerraTrace Agent..." },
        { type: "info", text: "Ingesting document: Oakridge Block 7 Deeds (PDF)" },
        { type: "info", text: "Running OCR deconstruction and clean-up..." },
        { type: "agent-step", text: "[Agent: OCR Cleaner] Enhancement score: 96.8%. Clean text buffer generated." },
        { type: "info", text: "Executing entity extraction LangGraph nodes..." },
        { type: "agent-step", text: "[Agent: Entity Abstractor] Extracted Grantor: 'Thomas Sterling', Grantee: 'Oakridge Land Dev Corporation'." },
        { type: "agent-step", text: "[Agent: Entity Abstractor] Extracted transaction price: $285,000, date: 1984-11-12." },
        { type: "info", text: "Checking deed registry and title transition chain..." },
        { type: "agent-step", text: "[Agent: Title Resolver] Ownership transfers resolved chronologically: 1962 -> 1984 (Thomas Sterling) -> 1984 (Oakridge Corp)." },
        { type: "agent-step", text: "[Agent: Title Resolver] Verification check successful: chain of title is complete." },
        { type: "info", text: "Scanning for easements and municipal covenants..." },
        { type: "warn", text: "[Agent: Covenant Evaluator] Flagged utility easement: Eastern 10 feet reserved." },
        { type: "warn", text: "[Agent: Covenant Evaluator] Flagged height restriction: Building height limit 30 feet max." },
        { type: "warn", text: "[Agent: Covenant Evaluator] Flagged usage restriction: No commercial operations permitted." },
        { type: "success", text: "Land deed chain resolved. Generational map constructed." }
      ]
    },
    {
      id: "willow",
      name: "Willow Creek Easement Declaration (TXT)",
      preview: `EASEMENT DECLARATION (2002)\nGrantor: Arthur Pendelton\nGrantee: City Water Works\nRight-of-Way: Unlimited access for underground water pipeline maintenance.\nRestricted: Grantor may not erect permanent structures or plant deep-root trees over easement zone.`,
      visualData: [
        { year: "1998", owner: "Arthur Pendelton", event: "Land Acquisition", details: "Acquired 40 acres off Willow Creek." },
        { year: "2002", owner: "City Water Works", event: "Easement Grant", details: "Permanent right-of-way for underground main pipe." }
      ],
      logs: [
        { type: "system", text: "Initializing TerraTrace Agent..." },
        { type: "info", text: "Ingesting document: Willow Creek Easement Declaration (TXT)" },
        { type: "agent-step", text: "[Agent: OCR Cleaner] Parsed raw TXT. Token size: 382." },
        { type: "info", text: "Executing entity extraction..." },
        { type: "agent-step", text: "[Agent: Entity Abstractor] Extracted Grantor: 'Arthur Pendelton', Grantee: 'City Water Works'." },
        { type: "info", text: "Checking title registry and restrictions..." },
        { type: "warn", text: "[Agent: Covenant Evaluator] Flagged restriction: No permanent building or deep-root planting over pipeline zone." },
        { type: "success", text: "Easement mapping complete." }
      ]
    }
  ],
  
  lexisclear: [
    {
      id: "saas",
      name: "SaaS Vendor Agreement (PDF)",
      preview: `SERVICES AGREEMENT\n\nSection 8. LIMITATION OF LIABILITY\nIn no event shall Vendor's aggregate liability exceed ten times (10x) the annual contract value.\n\nSection 12. INDEMNIFICATION\nCustomer shall indemnify, defend, and hold harmless Vendor against all third-party claims, patent infringements, or data breaches without limitation.\n\nSection 15. GOVERNING LAW\nThis Agreement is governed by the laws of England and Wales.`,
      deviations: [
        {
          section: "Section 8. Limitation of Liability",
          type: "Critical Deviation",
          class: "danger",
          desc: "Vendor liability cap (10x) exceeds standard company playbook limit (1x to 2x contract value). Risks substantial financial exposure.",
          proposed: "In no event shall Vendor's aggregate liability exceed the total amount paid by Customer in the twelve (12) months preceding the claim."
        },
        {
          section: "Section 12. Indemnification",
          type: "Unbalanced Clause",
          class: "danger",
          desc: "Unilateral indemnification. Client must not indemnify vendor against patent infringement or vendor-side data breaches.",
          proposed: "Each party shall indemnify, defend, and hold harmless the other party from third-party claims arising from gross negligence or willful misconduct."
        },
        {
          section: "Section 15. Governing Law",
          type: "Jurisdiction Alert",
          class: "info",
          desc: "England & Wales is a valid, but non-standard jurisdiction. Standard playbook requires Delaware, USA law.",
          proposed: "This Agreement is governed by, and construed in accordance with, the laws of the State of Delaware, USA."
        }
      ],
      logs: [
        { type: "system", text: "Initializing LexisClear Playbook Auditor..." },
        { type: "info", text: "Ingesting contract file: SaaS Vendor Agreement (PDF)" },
        { type: "info", text: "Deconstructing contract into sectional clauses..." },
        { type: "agent-step", text: "[Agent: Playbook Matcher] Structured 12 distinct clauses. Querying local playbook vector space..." },
        { type: "info", text: "Analyzing clauses against standard B2B compliance playbooks..." },
        { type: "warn", text: "[Agent: Risk Detector] Flagged Clause: Section 8 (Limitation of Liability) - Liability cap of 10x is excessive. Max recommended: 1-2x." },
        { type: "warn", text: "[Agent: Risk Detector] Flagged Clause: Section 12 (Indemnification) - Unilateral clause requires customer to indemnify vendor for data breaches. High risk." },
        { type: "info", text: "[Agent: Risk Detector] Flagged Clause: Section 15 (Governing Law) - Non-standard jurisdiction (England & Wales). Standard: Delaware, USA." },
        { type: "info", text: "Generating compromise redlines..." },
        { type: "agent-step", text: "[Agent: Redline Generator] Compiled 3 playbook-compliant replacement drafts." },
        { type: "success", text: "Audit complete. 2 critical deviations, 1 minor alert identified." }
      ]
    },
    {
      id: "nda",
      name: "Mutual NDA Agreement (TXT)",
      preview: `MUTUAL CONFIDENTIALITY AGREEMENT\n\nSection 5. TERM OF DISCLOSURE\nThe obligations of confidentiality under this Agreement shall expire one (1) year from the date of disclosure.`,
      deviations: [
        {
          section: "Section 5. Term of Disclosure",
          type: "Policy Warning",
          class: "danger",
          desc: "Confidentiality duration of 1 year is too short. Standard company playbook requires a minimum of 3 years (5 years preferred for trade secrets).",
          proposed: "The obligations of confidentiality under this Agreement shall survive for a period of three (3) years from the date of disclosure."
        }
      ],
      logs: [
        { type: "system", text: "Initializing LexisClear Playbook Auditor..." },
        { type: "info", text: "Ingesting NDA contract (TXT)" },
        { type: "agent-step", text: "[Agent: Playbook Matcher] Found confidentiality term definition." },
        { type: "warn", text: "[Agent: Risk Detector] Section 5 term (1 year) deviates from standard policy (3-5 years)." },
        { type: "info", text: "Generating redlines..." },
        { type: "success", text: "Audit complete. 1 deviation flagged." }
      ]
    }
  ],
  
  vanguard: [
    {
      id: "erp",
      name: "ERP Transaction Export Q1 2026 (CSV)",
      preview: `TRANSACTION_ID,DATE,ACCOUNT,DESCRIPTION,AMOUNT,QTY\nTX-00918,2026-01-15,6020-Utility,Grid Power usage,3250.00,12500 kWh\nTX-00922,2026-02-10,6110-Travel,Flights (London-NY),4500.00,3 tickets\nTX-00945,2026-03-01,6240-Logistics,Diesel freight,8900.00,420 gallons`,
      dashboard: {
        totalEmissions: 8.42, // Metric Tons CO2e
        scope1: 4.25, // Diesel
        scope2: 2.12, // Grid power
        scope3: 2.05  // Flights
      },
      logs: [
        { type: "system", text: "Initializing Vanguard Compliance Engine..." },
        { type: "info", text: "Ingesting data file: ERP Transaction Export Q1 2026 (CSV)" },
        { type: "info", text: "Parsing CSV headers and cleaning values..." },
        { type: "agent-step", text: "[Agent: Data Synthesizer] Extracted 3 line items. Mapped date formats and currency strings." },
        { type: "info", text: "Running ESG classification mapping..." },
        { type: "agent-step", text: "[Agent: ESG Classifier] TX-00918: 'Grid Power usage (12500 kWh)' mapped to SCOPE 2 (Indirect Emissions). Em factor: 0.00017 MT/kWh." },
        { type: "agent-step", text: "[Agent: ESG Classifier] TX-00922: 'Flights (London-NY)' mapped to SCOPE 3 (Value Chain - Business Travel). Em factor: 0.68 MT/ticket." },
        { type: "agent-step", text: "[Agent: ESG Classifier] TX-00945: 'Diesel freight (420 gallons)' mapped to SCOPE 1 (Direct Emissions - Mobile Combustion). Em factor: 0.0101 MT/gallon." },
        { type: "info", text: "Calculating cumulative carbon equivalents..." },
        { type: "agent-step", text: "[Agent: Regulatory Auditor] ESG metrics successfully calculated. Scope 1: 4.25 MT, Scope 2: 2.12 MT, Scope 3: 2.05 MT." },
        { type: "success", text: "Regulatory compliance audit complete. Carbon equivalent dashboard updated." }
      ]
    },
    {
      id: "shipping",
      name: "Global Shipping Ledger (CSV)",
      preview: `LEDGER_ENTRY,VENDOR,CATEGORY,METRIC_TONS,EMISSIONS_ZONE\nLG-102,Maersk,Ocean Shipping,420 tons,Scope 3\nLG-105,DHL,Air Cargo,85 tons,Scope 3\nLG-110,Local Fleet,Road Delivery,15 tons,Scope 1`,
      dashboard: {
        totalEmissions: 142.15,
        scope1: 15.00,
        scope2: 0.00,
        scope3: 127.15
      },
      logs: [
        { type: "system", text: "Initializing Vanguard Compliance Engine..." },
        { type: "info", text: "Ingesting shipping logs..." },
        { type: "agent-step", text: "[Agent: Data Synthesizer] Normalizing weight tonnage." },
        { type: "agent-step", text: "[Agent: ESG Classifier] Mapped Maersk Ocean shipping & DHL Cargo to Scope 3." },
        { type: "success", text: "Shipping ledger metrics aggregated." }
      ]
    }
  ]
};

let activeProjectId = null;
let selectedDocIndex = 0;
let simulationInterval = null;
let currentLogIndex = 0;
let currentTab = "terminal";

// Launch Sandbox
function launchAgentSandbox(projectId) {
  activeProjectId = projectId;
  selectedDocIndex = 0;
  currentLogIndex = 0;
  currentTab = "terminal";
  
  if (simulationInterval) {
    clearInterval(simulationInterval);
    simulationInterval = null;
  }
  
  const documents = SIMULATOR_DOCUMENTS[projectId];
  if (!documents || documents.length === 0) return;
  
  // Set Modal Title
  const titleMap = {
    terratrace: "TerraTrace — Real Estate Title Agent",
    lexisclear: "LexisClear — Contract Playbook Auditor",
    vanguard: "Vanguard — ESG Compliance Engine"
  };
  document.getElementById("sandbox-agent-title").innerText = titleMap[projectId] || "Agent Sandbox";
  
  // Populate Document Select
  const select = document.getElementById("sandbox-input-doc");
  select.innerHTML = "";
  documents.forEach((doc, index) => {
    const opt = document.createElement("option");
    opt.value = index;
    opt.innerText = doc.name;
    select.appendChild(opt);
  });
  
  // Update Preview Text
  updateSelectedDocument();
  
  // Reset logs window
  const logContainer = document.getElementById("terminal-log");
  logContainer.innerHTML = `<div class="log-line system">Ready. Select a document and click "Run Agent Pipeline" above.</div>`;
  
  // Reset Visualization Window
  const vizOutput = document.getElementById("visualization-output");
  vizOutput.innerHTML = `<div class="empty-state"><p>Run the agent pipeline to view generated layout outputs...</p></div>`;
  
  // Set tab buttons state
  switchSandboxTab("terminal");
  
  // Enable Run Button
  document.getElementById("run-agent-btn").removeAttribute("disabled");
  document.getElementById("run-agent-btn").innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
    <span>Run Agent Pipeline</span>
  `;
  
  // Open modal
  document.getElementById("sandbox-modal").classList.add("active");
}

// Close Sandbox
function closeSandboxModal() {
  document.getElementById("sandbox-modal").classList.remove("active");
  if (simulationInterval) {
    clearInterval(simulationInterval);
    simulationInterval = null;
  }
  activeProjectId = null;
}

// Update selected document preview
function updateSelectedDocument() {
  const select = document.getElementById("sandbox-input-doc");
  selectedDocIndex = parseInt(select.value);
  const doc = SIMULATOR_DOCUMENTS[activeProjectId][selectedDocIndex];
  
  if (doc) {
    document.getElementById("sandbox-document-preview").innerText = doc.preview;
  }
}

// Switch tabs
function switchSandboxTab(tabName) {
  currentTab = tabName;
  const terminalBtn = document.getElementById("tab-btn-terminal");
  const vizBtn = document.getElementById("tab-btn-visualization");
  
  const terminalTab = document.getElementById("tab-terminal");
  const vizTab = document.getElementById("tab-visualization");
  
  if (tabName === "terminal") {
    terminalBtn.classList.add("active");
    vizBtn.classList.remove("active");
    terminalTab.classList.remove("hidden");
    vizTab.classList.add("hidden");
  } else {
    terminalBtn.classList.remove("active");
    vizBtn.classList.add("active");
    terminalTab.classList.add("hidden");
    vizTab.classList.remove("hidden");
  }
}

// Start Agent Simulation
function startAgentSimulation() {
  const runBtn = document.getElementById("run-agent-btn");
  runBtn.setAttribute("disabled", "true");
  runBtn.innerHTML = `
    <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
    </svg>
    <span>Processing...</span>
  `;
  
  // Inject spinner animation style if not exists
  if (!document.getElementById("spin-style")) {
    const style = document.createElement("style");
    style.id = "spin-style";
    style.innerHTML = "@keyframes spin { to { transform: rotate(360deg); } }";
    document.head.appendChild(style);
  }
  
  // Switch to terminal tab
  switchSandboxTab("terminal");
  
  const doc = SIMULATOR_DOCUMENTS[activeProjectId][selectedDocIndex];
  const logs = doc.logs;
  currentLogIndex = 0;
  
  const logContainer = document.getElementById("terminal-log");
  logContainer.innerHTML = "";
  
  // Add log step-by-step
  simulationInterval = setInterval(() => {
    if (currentLogIndex < logs.length) {
      const log = logs[currentLogIndex];
      const timeStr = new Date().toLocaleTimeString();
      const line = document.createElement("div");
      line.className = `log-line ${log.type}`;
      line.innerHTML = `<span style="opacity: 0.4;">[${timeStr}]</span> ${log.text}`;
      logContainer.appendChild(line);
      logContainer.scrollTop = logContainer.scrollHeight;
      currentLogIndex++;
    } else {
      // Finished simulation
      clearInterval(simulationInterval);
      simulationInterval = null;
      
      // Render visualization
      renderProjectVisualization(activeProjectId, doc);
      
      // Switch tab to visualization
      setTimeout(() => {
        switchSandboxTab("visualization");
        
        // Restore run button
        runBtn.removeAttribute("disabled");
        runBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span>Run Agent Pipeline</span>
        `;
      }, 800);
    }
  }, 700);
}

// Render project visual output
function renderProjectVisualization(projectId, doc) {
  const vizOutput = document.getElementById("visualization-output");
  vizOutput.innerHTML = "";
  
  if (projectId === "terratrace") {
    // Render Land Deed transition graph
    const container = document.createElement("div");
    container.className = "terratrace-graph";
    
    doc.visualData.forEach((node, index) => {
      if (index > 0) {
        const arrow = document.createElement("div");
        arrow.className = "graph-arrow";
        arrow.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        `;
        container.appendChild(arrow);
      }
      
      const el = document.createElement("div");
      el.className = `graph-node ${index === doc.visualData.length - 1 ? "active" : ""}`;
      el.innerHTML = `
        <div class="graph-node-header">
          <span>${node.year}</span>
          <span>${node.event}</span>
        </div>
        <div class="graph-node-title">${node.owner}</div>
        <div class="graph-node-desc">${node.details}</div>
      `;
      container.appendChild(el);
    });
    
    vizOutput.appendChild(container);
    
  } else if (projectId === "lexisclear") {
    // Render side-by-side contract auditor
    const columns = document.createElement("div");
    columns.className = "lexisclear-columns";
    
    // Left column: contract text
    const textPane = document.createElement("div");
    textPane.className = "contract-pane";
    textPane.innerHTML = `<div class="pane-title">SaaS_Contract_Draft.txt</div>`;
    
    // Format doc text with deviations highlighted
    let formattedText = doc.preview;
    doc.deviations.forEach(dev => {
      // Simple match replacement for highlighting
      const phrase = dev.section.split(".")[1] || dev.section;
      const cleanPhrase = phrase.trim().split(" ")[0]; // Take first word for match safety
      const regex = new RegExp(`(${cleanPhrase}[^\\n]*)`, "i");
      formattedText = formattedText.replace(regex, `<span class="deviation-highlight" title="${dev.type}">${phrase}</span>`);
    });
    
    const pre = document.createElement("pre");
    pre.style.whiteSpace = "pre-wrap";
    pre.style.margin = "0";
    pre.innerHTML = formattedText;
    textPane.appendChild(pre);
    
    // Right column: playbook alerts
    const alertsPane = document.createElement("div");
    alertsPane.className = "contract-pane";
    alertsPane.innerHTML = `<div class="pane-title">Playbook Violations & Redlines</div>`;
    
    doc.deviations.forEach(dev => {
      const alertCard = document.createElement("div");
      alertCard.className = `playbook-card ${dev.class === "info" ? "info" : ""}`;
      alertCard.innerHTML = `
        <div class="card-label ${dev.class === "info" ? "info" : ""}">${dev.type}</div>
        <div class="card-title">${dev.section}</div>
        <div class="card-text">${dev.desc}</div>
        <div class="card-proposed">
          <strong style="display:block; margin-bottom:4px; font-size:0.7rem; text-transform:uppercase;">Proposed Amendment:</strong>
          ${dev.proposed}
        </div>
      `;
      alertsPane.appendChild(alertCard);
    });
    
    columns.appendChild(textPane);
    columns.appendChild(alertsPane);
    vizOutput.appendChild(columns);
    
  } else if (projectId === "vanguard") {
    // Render ESG dashboard metrics
    const db = doc.dashboard;
    const container = document.createElement("div");
    container.className = "vanguard-dashboard";
    
    // Left Chart: Radial chart for total
    const leftChart = document.createElement("div");
    leftChart.className = "chart-box";
    
    // Normalize percentage (e.g. max 150 metric tons)
    const maxVal = projectId === "vanguard" && doc.id === "shipping" ? 200 : 20;
    const pct = Math.min((db.totalEmissions / maxVal) * 100, 100);
    const radius = 60;
    const circ = 2 * Math.PI * radius;
    const offset = circ - (pct / 100) * circ;
    
    leftChart.innerHTML = `
      <div class="chart-title">Cumulative Q1 footprint</div>
      <div class="radial-progress">
        <svg class="radial-svg" width="150" height="150">
          <circle class="radial-bg" cx="75" cy="75" r="${radius}"></circle>
          <circle class="radial-bar" cx="75" cy="75" r="${radius}" stroke-dasharray="${circ}" stroke-dashoffset="${offset}"></circle>
        </svg>
        <div class="radial-text">
          <span class="radial-val">${db.totalEmissions.toFixed(2)}</span>
          <span class="radial-lbl">Metric Tons</span>
        </div>
      </div>
      <p style="font-size:0.8rem; color:var(--sb-text-muted); margin-top:20px;">aggregated CO2e equivalents</p>
    `;
    
    // Right Chart: Scope breakdown bars
    const rightChart = document.createElement("div");
    rightChart.className = "chart-box";
    rightChart.style.alignItems = "stretch";
    
    const scope1Pct = (db.scope1 / db.totalEmissions) * 100;
    const scope2Pct = (db.scope2 / db.totalEmissions) * 100;
    const scope3Pct = (db.scope3 / db.totalEmissions) * 100;
    
    rightChart.innerHTML = `
      <div class="chart-title" style="text-align:center;">Emissions Breakdown</div>
      <div class="scope-bar-list">
        <div class="scope-row">
          <div class="scope-meta">
            <span class="scope-name">Scope 1 (Direct Fuel)</span>
            <span class="scope-val">${db.scope1.toFixed(2)} MT (${scope1Pct.toFixed(0)}%)</span>
          </div>
          <div class="scope-track">
            <div class="scope-bar" style="width: ${scope1Pct}%; background-color:#ef4444;"></div>
          </div>
        </div>
        
        <div class="scope-row">
          <div class="scope-meta">
            <span class="scope-name">Scope 2 (Electricity)</span>
            <span class="scope-val">${db.scope2.toFixed(2)} MT (${scope2Pct.toFixed(0)}%)</span>
          </div>
          <div class="scope-track">
            <div class="scope-bar" style="width: ${scope2Pct}%; background-color:#eab308;"></div>
          </div>
        </div>
        
        <div class="scope-row">
          <div class="scope-meta">
            <span class="scope-name">Scope 3 (Supply/Travel)</span>
            <span class="scope-val">${db.scope3.toFixed(2)} MT (${scope3Pct.toFixed(0)}%)</span>
          </div>
          <div class="scope-track">
            <div class="scope-bar" style="width: ${scope3Pct}%; background-color:#3b82f6;"></div>
          </div>
        </div>
      </div>
    `;
    
    container.appendChild(leftChart);
    container.appendChild(rightChart);
    vizOutput.appendChild(container);
  }
}
