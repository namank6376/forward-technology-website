/* Configure these with real company details before launch. */
const CONFIG = {
  companyName: "Forward",
  email: "",
  phone: "",
  linkedin: "",
  address: "",
  siteUrl: "",
  formEndpoint: ""
};

const BASE_PATH = new URL(".", document.currentScript.src).pathname.replace(/\/$/, "");
const services = [
  { slug: "software-engineering", name: "Software Engineering", icon: "⌘", accent: "#8d82ff", short: "Custom software, engineered for your business.", description: "We design and develop custom software applications tailored to business requirements—from focused internal tools to scalable digital products.", tags: ["Web applications", "SaaS platforms", "API integrations", "Modernization"], challenges: ["Off-the-shelf software limitations", "Disconnected business applications", "Inefficient manual processes", "Lack of scalable digital infrastructure"], features: ["Custom web application development", "SaaS application development", "Business management systems", "API development and integration", "Backend architecture and database design"], stack: ["React", "Next.js", "Node.js", "Python", "TypeScript", "PostgreSQL", "Firebase", "REST APIs"], benefits: ["Improved operational control", "Workflows designed for your team", "Scalable foundations", "Better-connected systems"] },
  { slug: "business-automation", name: "Business Automation", icon: "⟳", accent: "#55d9c2", short: "Automate processes. Eliminate operational friction.", description: "We streamline repetitive workflows and connect the tools your business already uses, making day-to-day operations more consistent and visible.", tags: ["Workflow automation", "System integrations", "Internal tools", "Reporting"], challenges: ["Repetitive manual tasks", "Spreadsheet-dependent workflows", "Data duplication", "Disconnected applications"], features: ["Workflow automation", "API-based integrations", "Automated reporting and data synchronization", "Custom internal tools", "Notification and approval workflows"], stack: ["Node.js", "Python", "REST APIs", "Webhooks", "PostgreSQL", "Cloud services"], benefits: ["Less repetitive work", "Fewer manual errors", "Better workflow visibility", "More consistent operations"] },
  { slug: "business-intelligence", name: "Business Intelligence", icon: "◉", accent: "#f0ad69", short: "Turn business data into better decisions.", description: "We transform business data into clear, actionable insight through analytics, reporting and intelligent dashboards built around the questions that matter.", tags: ["Analytics dashboards", "KPI monitoring", "Data visualization", "Automated reports"], challenges: ["Data scattered across platforms", "Manual reporting", "Limited business visibility", "Difficulty identifying trends"], features: ["Interactive dashboards", "Business performance analytics", "Data visualization and transformation", "Automated reports", "KPI monitoring"], stack: ["TypeScript", "React", "SQL", "Python", "Data visualization", "PostgreSQL"], benefits: ["Better-informed decisions", "Clearer business visibility", "More consistent reporting", "Data-driven planning"] }
];

const projects = [
  { slug: "operations-dashboard", name: "Operations Dashboard", kind: "Technical Demonstration", category: "Business intelligence", accent: "#f0ad69", description: "A concept dashboard exploring how operational signals can come together in one clear view.", stack: ["React", "TypeScript", "Data visualization"] },
  { slug: "workflow-studio", name: "Workflow Studio", kind: "Concept Project", category: "Business automation", accent: "#55d9c2", description: "A product concept for mapping approval steps and reducing repetitive handoffs.", stack: ["Node.js", "REST APIs", "PostgreSQL"] },
  { slug: "commerce-console", name: "Commerce Console", kind: "Internal Project", category: "Web application", accent: "#8d82ff", description: "A demonstration interface for organizing commerce operations and performance data.", stack: ["Next.js", "TypeScript", "Analytics"] }
];

const iconSvg = (symbol) => `<span aria-hidden="true">${symbol}</span>`;
const pathFor = (path) => {
  const withoutBase = BASE_PATH && (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`))
    ? path.slice(BASE_PATH.length) || "/"
    : path;
  return withoutBase === "/" ? "/" : withoutBase.replace(/\/+$/, "");
};
const routeLink = (path, label, cls = "") => `<a class="${cls}" href="${BASE_PATH}${path}" data-link>${label}</a>`;
const serviceUrl = (slug) => `/services/${slug}`;
const projectUrl = (slug) => `/portfolio/${slug}`;

function header() {
  const links = [
    ["/", "Home"], ["/about", "About"], ["/services", "Services"], ["/portfolio", "Portfolio"], ["/contact", "Contact"]
  ];
  return `<header class="site-header"><div class="wrap nav-inner">
    ${routeLink("/", '<span class="brand-mark">F</span><span>forward<span style="color:var(--cyan)">.</span></span>', "brand")}
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">Menu</button>
    <ul class="nav-links" id="primary-nav">${links.map(([href, text]) => `<li class="${text === "Services" ? "nav-services" : ""}">${text === "Services"
      ? `<button type="button" data-services-toggle aria-expanded="false">${text}</button><div class="service-menu">${services.map(s => routeLink(serviceUrl(s.slug), s.name)).join("")}${routeLink("/services", "All services")}</div>`
      : routeLink(href, text)}</li>`).join("")}</ul>
    <div class="nav-right">${routeLink("/contact", 'Discuss your project <span class="arrow">↗</span>', "button small")}</div>
  </div></header>`;
}

function footer() {
  const contact = CONFIG.email ? `<a href="mailto:${escapeAttr(CONFIG.email)}">${escapeHtml(CONFIG.email)}</a>` : `<span>Business email — to be configured</span>`;
  const linkedIn = CONFIG.linkedin ? `<a href="${escapeAttr(CONFIG.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>` : "";
  return `<footer class="site-footer"><div class="wrap">
    <div class="footer-top">
      <div class="footer-brand">${routeLink("/", '<span class="brand-mark">F</span><span>forward<span style="color:var(--cyan)">.</span></span>', "brand")}<p>Building technology that moves businesses forward. Software, automation and intelligence engineered around real business needs.</p></div>
      <div class="footer-col"><h4>Explore</h4>${routeLink("/about", "About us")}${routeLink("/services", "Services")}${routeLink("/portfolio", "Portfolio")}${routeLink("/contact", "Contact")}</div>
      <div class="footer-col"><h4>Capabilities</h4>${services.map(s => routeLink(serviceUrl(s.slug), s.name)).join("")}</div>
      <div class="footer-col"><h4>Get in touch</h4>${contact}${linkedIn}${routeLink("/privacy-policy", "Privacy policy")}</div>
    </div>
    <div class="footer-bottom"><span>© <span data-year></span> ${escapeHtml(CONFIG.companyName)}. All rights reserved.</span></div>
  </div></footer>`;
}

function serviceCard(s) {
  return `<article class="card service-card fade-in" style="--card-accent:${s.accent}"><div class="card-icon">${iconSvg(s.icon)}</div><h3>${s.name}</h3><p>${s.short}</p><ul class="tag-list">${s.tags.map(tag => `<li>${tag}</li>`).join("")}</ul>${routeLink(serviceUrl(s.slug), 'Explore service <span class="arrow">↗</span>', "card-link")}</article>`;
}

function dashboard() {
  return `<div class="hero-visual" aria-label="Illustrative business intelligence dashboard">
    <div class="orbit"></div><div class="orbit-glow"></div>
    <div class="dashboard"><div class="dash-top"><div class="dash-title"><span class="dash-icon">◈</span> Business overview</div><span class="dash-kebab">•••</span></div>
      <div class="dash-body"><div class="dash-label">PERFORMANCE SNAPSHOT</div><div class="dash-value">Clearer signals<span class="dash-change">↗ In focus</span></div>
        <div class="chart"><svg viewBox="0 0 400 134" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#747bff" stop-opacity=".24"/><stop offset="1" stop-color="#747bff" stop-opacity="0"/></linearGradient></defs><path class="chart-fill" d="M0 108 C28 104 35 82 66 91 S105 72 132 83 S168 45 202 63 S248 44 274 54 S318 20 345 37 S375 17 400 13 V134 H0Z"/><path class="chart-line" d="M0 108 C28 104 35 82 66 91 S105 72 132 83 S168 45 202 63 S248 44 274 54 S318 20 345 37 S375 17 400 13"/></svg></div>
        <div class="chart-caption"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span></div>
        <div class="dash-bottom"><div class="dash-stat"><span class="dash-label">OPERATIONS</span><strong>In sync <em>●</em></strong></div><div class="dash-stat"><span class="dash-label">WORKFLOWS</span><strong>Connected <em>↗</em></strong></div></div>
      </div>
    </div>
    <div class="float-card one"><span class="float-symbol">⌘</span><span><strong>Systems connected</strong><small>One clearer picture</small></span></div>
    <div class="float-card two"><span class="float-symbol">↗</span><span><strong>Less manual work</strong><small>More room to move</small></span></div>
  </div>`;
}

function projectCard(p) {
  return `<article class="card project-card fade-in" style="--card-accent:${p.accent}"><div class="project-art" aria-hidden="true"><div class="mini-window"><div class="mini-top"><i></i><i></i><i></i></div><div class="mini-content"><div class="mini-sidebar"></div><div class="mini-main"><div class="mini-kpis"><i></i><i></i><i></i></div><div class="mini-chart"></div></div></div></div></div><div class="project-info"><div class="project-meta"><span class="pill">${p.kind}</span><span class="dash-label">${p.category}</span></div><h3>${p.name}</h3><p>${p.description}</p><div class="tech-row">${p.stack.map(x => `<span class="pill">${x}</span>`).join("")}</div><div style="margin-top:17px">${routeLink(projectUrl(p.slug), 'View demonstration <span class="arrow">↗</span>', "card-link")}</div></div></article>`;
}

function cta() {
  return `<section class="section compact"><div class="wrap"><div class="cta-band"><div><div class="kicker">Let's build what's next</div><h2>Have a business challenge? Let's engineer the solution.</h2><p>Tell us what you want to build, improve, or automate.</p></div>${routeLink("/contact", 'Start a project <span class="arrow">↗</span>', "button")}</div></div></section>`;
}

function home() {
  return `<main id="main" class="fade-in">
    <section class="wrap hero"><div class="hero-copy"><div class="eyebrow">Software · Automation · Intelligence</div><h1>Building technology that <span class="gradient-text">moves businesses forward.</span></h1><p>We engineer custom software, automate business operations and develop intelligent digital solutions that help businesses grow.</p><div class="hero-actions">${routeLink("/contact", 'Discuss your project <span class="arrow">↗</span>', "button")}${routeLink("/services", 'Explore our solutions <span class="arrow">→</span>', "button ghost")}</div><div class="hero-note"><span class="status-dot"></span> Thoughtful engineering for real business needs</div></div>${dashboard()}</section>
    <section class="section compact"><div class="wrap"><div class="eyebrow">What we bring together</div><div class="capability-strip"><div class="capability"><span class="cap-icon">⌘</span><span><strong>Software engineering</strong><small>Purpose-built digital tools</small></span></div><div class="capability"><span class="cap-icon">⟳</span><span><strong>Business automation</strong><small>Connected, efficient workflows</small></span></div><div class="capability"><span class="cap-icon">◉</span><span><strong>Business intelligence</strong><small>Insight you can act on</small></span></div></div></div></section>
    <section class="section"><div class="wrap"><div class="section-head"><div><div class="kicker">Our capabilities</div><h2>Technology that works<br>the way your business does.</h2><p>From a specific operational bottleneck to a new digital product, our work starts with understanding what needs to change.</p></div>${routeLink("/services", 'All services <span class="arrow">↗</span>', "button text")}</div><div class="cards">${services.map(serviceCard).join("")}</div></div></section>
    <section class="section"><div class="wrap split"><div class="split-copy"><div class="kicker">Why Forward</div><h2>Business-first thinking.<br>Engineering that lasts.</h2><p>Good technology is more than code. It should make work simpler today and leave room for what comes next.</p><ul class="list-check"><li><span class="check">✳</span>Solutions shaped around your real requirements</li><li><span class="check">✳</span>Scalable architecture without unnecessary complexity</li><li><span class="check">✳</span>Transparent collaboration from first conversation to delivery</li><li><span class="check">✳</span>Practical innovation, built for long-term usefulness</li></ul></div><div class="benefit-grid"><div class="benefit interactive-surface"><span>01 / Understand</span><h3>Business-first engineering</h3><p>We start with your operating reality, not a one-size-fits-all tool.</p></div><div class="benefit interactive-surface"><span>02 / Design</span><h3>Tailored solutions</h3><p>The right-sized approach for your workflows and goals.</p></div><div class="benefit interactive-surface"><span>03 / Build</span><h3>Scalable foundations</h3><p>Thoughtful technical choices keep future options open.</p></div><div class="benefit interactive-surface"><span>04 / Partner</span><h3>Clear communication</h3><p>Shared understanding and support throughout the journey.</p></div></div></div></section>
    <section class="section"><div class="wrap"><div class="section-head"><div><div class="kicker">Selected work</div><h2>Ideas made tangible.</h2><p>Explorations and demonstrations of the problems we enjoy solving. These are not representations of paid client engagements.</p></div>${routeLink("/portfolio", 'Explore portfolio <span class="arrow">↗</span>', "button text")}</div><div class="cards">${projects.map(projectCard).join("")}</div></div></section>
    <section class="section"><div class="wrap"><div class="section-head"><div><div class="kicker">How we work</div><h2>A considered process, from idea to impact.</h2></div></div><div class="workflow">${[["01","Discover","Understand the challenge, people and desired outcomes."],["02","Design","Shape the requirements and solution direction together."],["03","Develop","Build with focus, clear communication and iteration."],["04","Validate","Test quality, usability and real-world fit."],["05","Support","Deploy thoughtfully and help you move forward."]].map(([n,t,d]) => `<div class="step"><span class="step-num">${n}</span><h3>${t}</h3><p>${d}</p></div>`).join("")}</div></div></section>
    ${cta()}
  </main>`;
}

function pageHero(eyebrow, title, description, crumbs = []) {
  return `<section class="page-hero"><div class="wrap">${crumbs.length ? `<div class="breadcrumbs">${crumbs.map((c,i) => `${i ? "<span>/</span>" : ""}${c[1] ? routeLink(c[1], c[0]) : `<span>${c[0]}</span>`}`).join("")}</div>` : ""}<div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${description}</p></div></section>`;
}

function about() {
  return `<main id="main" class="fade-in">${pageHero("About Forward", "Technology built around <span class='gradient-text'>real business needs.</span>", "We bring technical expertise, practical problem-solving and business understanding together to deliver reliable, scalable and purpose-driven solutions.")}<section class="section compact"><div class="wrap content-grid"><div class="content-panel"><div class="kicker">Who we are</div><h3>A technology-focused partner</h3><p>We help small and medium-sized businesses overcome operational challenges through software engineering, automation and digital innovation. Our focus is on building technology that is useful, reliable and aligned with the way businesses work.</p></div><div class="content-panel"><div class="kicker">Our approach</div><h3>Practical by design</h3><p>Every engagement begins with understanding the people, processes and constraints behind a challenge. We collaborate closely, communicate clearly and choose technology to suit the problem—not the other way around.</p></div></div></section><section class="section compact"><div class="wrap cards"><div class="content-panel"><div class="kicker">Our mission</div><h3>Empower businesses to move forward.</h3><p>To empower businesses with practical, reliable and scalable technology solutions that simplify operations and accelerate growth.</p></div><div class="content-panel"><div class="kicker">Our vision</div><h3>Build technology with lasting impact.</h3><p>To become a trusted technology company building impactful software products and digital platforms for businesses worldwide.</p></div><div class="content-panel"><div class="kicker">Our philosophy</div><h3>Clear thinking. Useful outcomes.</h3><p>We believe the best solutions are thoughtfully engineered, straightforward to use and designed to evolve as needs change.</p></div></div></section>${cta()}</main>`;
}

function serviceOverview() {
  return `<main id="main" class="fade-in">${pageHero("What we do", "The right technology for <span class='gradient-text'>what's next.</span>", "We bring software engineering, business automation and business intelligence together to solve practical challenges and create room for growth.")}<section class="section compact"><div class="wrap cards">${services.map(serviceCard).join("")}</div></section>${cta()}</main>`;
}

function serviceDetail(s) {
  const relatedProjectSlug = {
    "software-engineering": "commerce-console",
    "business-automation": "workflow-studio",
    "business-intelligence": "operations-dashboard"
  }[s.slug];
  const relatedProject = projects.find(project => project.slug === relatedProjectSlug);
  return `<main id="main" class="fade-in">${pageHero(s.name, s.name === "Software Engineering" ? "Custom software. <span class='gradient-text'>Engineered for your business.</span>" : s.name === "Business Automation" ? "Automate processes. <span class='gradient-text'>Eliminate operational friction.</span>" : "Turn business data into <span class='gradient-text'>better decisions.</span>", s.description, [["Home","/"],["Services","/services"],[s.name,null]])}
    <section class="section compact"><div class="wrap content-grid"><div class="content-panel"><div class="kicker">The challenge</div><h3>What gets in the way</h3><ul class="bullet-list">${s.challenges.map(x=>`<li>${x}</li>`).join("")}</ul></div><div class="content-panel"><div class="kicker">Our solution</div><h3>Built around your operation</h3><p>We work with you to understand the underlying need, then design and deliver an appropriately scoped solution that fits your people, processes and systems.</p><ul class="bullet-list">${s.features.map(x=>`<li>${x}</li>`).join("")}</ul></div></div></section>
    <section class="section compact"><div class="wrap split"><div><div class="kicker">Designed for outcomes</div><h2>Useful now.<br>Ready for what's next.</h2><p class="section-intro">The right solution should address today's friction and provide a solid foundation for the needs ahead.</p><div class="stack">${s.stack.map(x=>`<span class="pill">${x}</span>`).join("")}</div></div><div class="benefit-grid">${s.benefits.map((x,i)=>`<div class="benefit outcome-card interactive-surface"><span>0${i+1} / Outcome</span><h3>${x}</h3></div>`).join("")}</div></div></section>
    ${relatedProject ? `<section class="section compact"><div class="wrap"><div class="section-head"><div><div class="kicker">Explore the idea</div><h2>A related demonstration.</h2><p>This concept illustrates one possible application of ${s.name.toLowerCase()}.</p></div></div><div class="cards">${projectCard(relatedProject)}</div></div></section>` : ""}
    <section class="section compact"><div class="wrap"><div class="section-head"><div><div class="kicker">Frequently asked</div><h2>Questions, answered.</h2></div></div><div class="faq"><details><summary>How do we get started?</summary><p>Share a little about the challenge through our contact form. We can discuss your goals, constraints and possible next steps.</p></details><details><summary>Can you work with our existing tools?</summary><p>Often, yes. We first review your current systems and integration options, then recommend an approach based on what is practical and maintainable.</p></details><details><summary>How is a project scoped?</summary><p>Scope depends on your requirements. We clarify the outcomes and priorities together before agreeing on a suitable path forward.</p></details><details><summary>Do you support the solution after launch?</summary><p>Ongoing support can be discussed as part of the project, based on the solution and your team's needs.</p></details></div></div></section>${cta()}</main>`;
}

function portfolio() {
  return `<main id="main" class="fade-in">${pageHero("Portfolio", "Demonstrating what <span class='gradient-text'>thoughtful engineering can do.</span>", "A selection of internal explorations and technical demonstrations. Each project is clearly labeled; none are presented as verified client engagements.")}<section class="section compact"><div class="wrap"><div class="cards">${projects.map(projectCard).join("")}</div></div></section>${cta()}</main>`;
}

function projectDetail(p) {
  return `<main id="main" class="fade-in">${pageHero(p.name, `<span class='gradient-text'>A closer look at the concept.</span>`, p.description, [["Home","/"],["Portfolio","/portfolio"],[p.name,null]])}<section class="section compact"><div class="wrap"><div class="section-head"><div><div class="kicker">Interface exploration</div><h2>A visual starting point.</h2><p>This illustrative interface is part of the concept only; it is not a live product screenshot.</p></div></div><figure class="project-art" style="min-height:290px;margin:0;border:1px solid var(--line);border-radius:11px"><div class="mini-window" style="width:min(72%,650px)"><div class="mini-top"><i></i><i></i><i></i></div><div class="mini-content" style="padding:18px"><div class="mini-sidebar" style="min-height:140px"></div><div class="mini-main"><div class="mini-kpis"><i></i><i></i><i></i></div><div class="mini-chart" style="height:90px;margin-top:12px"></div></div></div></div></figure></div></section><section class="section compact"><div class="wrap content-grid"><div class="content-panel"><div class="kicker">${p.kind}</div><h3>Project overview</h3><p>This concept explores an approach to ${p.category.toLowerCase()}. It is not a paid client engagement and does not claim measured business outcomes.</p></div><div class="content-panel"><div class="kicker">Problem statement</div><h3>Make complexity easier to navigate</h3><p>The concept considers how teams could improve visibility, reduce scattered manual work and access the information needed for everyday decisions.</p></div><div class="content-panel"><div class="kicker">Solution architecture</div><h3>Designed as a working concept</h3><p>The proposed direction includes a responsive interface, clearly separated application logic and integration boundaries. Production integrations, hosting and persistent data would be selected only after validating requirements.</p></div><div class="content-panel"><div class="kicker">Implementation</div><h3>Concept capabilities</h3><ul class="bullet-list"><li>Clear, accessible interface patterns</li><li>Responsive layouts for everyday use</li><li>Structured, maintainable application design</li><li>Room to adapt as requirements evolve</li></ul></div><div class="content-panel"><div class="kicker">Concept stack</div><h3>Technology direction</h3><div class="stack">${p.stack.map(x=>`<span class="pill">${x}</span>`).join("")}</div></div><div class="content-panel"><div class="kicker">Availability</div><h3>Demonstration status</h3><p>Live demo and public source code are not available for this concept.</p></div></div></section>${cta()}</main>`;
}

function contact() {
  const contactDetails = [
    ["Business email", CONFIG.email ? `<a href="mailto:${escapeAttr(CONFIG.email)}">${escapeHtml(CONFIG.email)}</a>` : "To be configured"],
    ["Phone", CONFIG.phone ? `<a href="tel:${escapeAttr(CONFIG.phone)}">${escapeHtml(CONFIG.phone)}</a>` : "To be configured"],
    ["LinkedIn", CONFIG.linkedin ? `<a href="${escapeAttr(CONFIG.linkedin)}" target="_blank" rel="noopener noreferrer">Company page ↗</a>` : "To be configured"],
    ["Address", CONFIG.address ? escapeHtml(CONFIG.address) : "To be configured, if applicable"]
  ];
  return `<main id="main" class="fade-in">${pageHero("Contact", "Let's discuss what <span class='gradient-text'>you want to build.</span>", "Whether you need custom software, business automation or better visibility into operations, we'd like to understand your requirements.")}<section class="section compact"><div class="wrap contact-grid"><aside class="contact-side"><div class="kicker">Start a conversation</div><h3>A good place to begin.</h3><p>Tell us what is slowing your team down or what you would like to make possible. We can explore the right next step together.</p>${contactDetails.map(([label,value])=>`<div class="contact-item"><small>${label}</small><strong>${value}</strong></div>`).join("")}</aside><form class="form-shell" id="inquiry-form" novalidate><div class="kicker">Project inquiry</div><div class="form-grid">
      <div class="field"><label for="name">Full name *</label><input id="name" name="name" autocomplete="name" required minlength="2" placeholder="Your name"></div>
      <div class="field"><label for="email">Business email *</label><input id="email" name="email" type="email" autocomplete="email" required placeholder="you@company.com"></div>
      <div class="field"><label for="company">Company name *</label><input id="company" name="company" autocomplete="organization" required placeholder="Your company"></div>
      <div class="field"><label for="phone">Phone number <span>(optional)</span></label><input id="phone" name="phone" type="tel" autocomplete="tel" placeholder="Your phone"></div>
      <div class="field"><label for="service">Service required *</label><select id="service" name="service" required><option value="">Select a service</option><option>Software Engineering</option><option>Business Automation</option><option>Business Intelligence</option><option>Custom Solution</option><option>Other</option></select></div>
      <div class="field"><label for="budget">Estimated budget <span>(optional)</span></label><select id="budget" name="budget"><option value="">Select a range</option><option>Not sure yet</option><option>Under $5,000</option><option>$5,000–$15,000</option><option>$15,000–$50,000</option><option>$50,000+</option></select></div>
      <div class="field"><label for="timeline">Project timeline *</label><select id="timeline" name="timeline" required><option value="">Select a timeline</option><option>As soon as practical</option><option>Within 1–3 months</option><option>Within 3–6 months</option><option>Exploring options</option></select></div>
      <div class="field full"><label for="description">Project description *</label><textarea id="description" name="description" required minlength="20" placeholder="What are you looking to build, improve, or automate?"></textarea></div>
      <div class="honeypot" aria-hidden="true"><label for="website">Leave this field empty</label><input id="website" name="website" tabindex="-1" autocomplete="off"></div>
    </div><div class="form-foot"><span class="form-help">${CONFIG.formEndpoint ? "Your inquiry will be securely sent to our team." : "The inquiry form is ready, but the submission service has not yet been configured."}</span><button class="button" type="submit">Send project inquiry <span class="arrow">↗</span></button></div><div class="form-status" role="status" aria-live="polite"></div></form></div></section></main>`;
}

function privacy() {
  return `<main id="main" class="fade-in">${pageHero("Privacy policy", "Your information, handled <span class='gradient-text'>with care.</span>", "This policy explains how information may be used when you visit this website or contact us.")}<section class="section compact"><article class="wrap privacy-copy"><h2>Information you provide</h2><p>If you submit a project inquiry, the information you enter—including your name, business email and project details—will be sent to the configured form service so we can respond. Do not include sensitive personal information in the form.</p><h2>How information is used</h2><p>Inquiry information is used to understand your request and communicate with you. It is not sold. Any third-party form processor must be reviewed and configured by the site operator before the form is enabled.</p><h2>Cookies and analytics</h2><p>This starter site does not include analytics or advertising trackers. Hosting providers or a configured form service may process technical data under their own privacy policies.</p><h2>Data retention and your choices</h2><p>Contact us using the business contact details published on this website to ask about information you have submitted. Actual contact details and any applicable jurisdiction-specific requirements should be added before launch.</p><h2>Changes to this policy</h2><p>This policy may be updated when the website or its data practices change. The site operator should review it for accuracy before publishing.</p><p><strong>Last updated:</strong> <span data-date></span></p></article></section></main>`;
}

function notFound() {
  return `<main id="main" class="fade-in">${pageHero("404 · Page not found", "This path doesn't lead <span class='gradient-text'>anywhere yet.</span>", "The page may have moved or the link may be incorrect.")}<section class="section compact"><div class="wrap">${routeLink("/", "Return to home →", "button")}</div></section></main>`;
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));
}
function escapeAttr(text) { return escapeHtml(text); }

function currentPage(path) {
  if (path === "/") return { title:"Forward — Technology that moves business forward", description:"We engineer custom software, automate business operations and develop intelligent digital solutions that help businesses grow.", body:home() };
  if (path === "/about") return { title:"About — Forward", description:"Learn about our practical, business-first approach to software engineering and digital innovation.", body:about() };
  if (path === "/services") return { title:"Services — Forward", description:"Explore custom software engineering, business automation and business intelligence.", body:serviceOverview() };
  const s = services.find(item => path === serviceUrl(item.slug));
  if (s) return { title:`${s.name} — Forward`, description:s.description, body:serviceDetail(s) };
  if (path === "/portfolio") return { title:"Portfolio — Forward", description:"Explore internal projects and technical demonstrations from Forward.", body:portfolio() };
  const p = projects.find(item => path === projectUrl(item.slug));
  if (p) return { title:`${p.name} — Forward`, description:p.description, body:projectDetail(p) };
  if (path === "/contact") return { title:"Contact — Forward", description:"Tell us what you want to build, improve or automate.", body:contact() };
  if (path === "/privacy-policy") return { title:"Privacy Policy — Forward", description:"Learn how information is handled when you use the Forward website.", body:privacy() };
  return { title:"Page not found — Forward", description:"The requested page could not be found.", body:notFound() };
}

function render() {
  const path = pathFor(location.pathname);
  const page = currentPage(path);
  document.title = page.title;
  document.querySelector('meta[name="description"]').setAttribute("content", page.description);
  document.querySelector('meta[property="og:title"]').setAttribute("content", page.title);
  document.querySelector('meta[property="og:description"]').setAttribute("content", page.description);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (CONFIG.siteUrl) {
    const link = canonical || Object.assign(document.createElement("link"), { rel: "canonical" });
    link.href = `${CONFIG.siteUrl.replace(/\/$/, "")}${path}`;
    if (!canonical) document.head.append(link);
  } else if (canonical) canonical.remove();
  document.getElementById("app").innerHTML = `${header()}${page.body}${footer()}`;
  document.querySelectorAll(".card, .benefit, .content-panel, .dashboard").forEach(surface => surface.classList.add("interactive-surface"));
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
  document.querySelectorAll("[data-date]").forEach(el => el.textContent = new Intl.DateTimeFormat("en", { year:"numeric", month:"long" }).format(new Date()));
  document.querySelectorAll(".nav-links a[data-link]").forEach(a => {
    const linkPath = pathFor(a.getAttribute("href"));
    if (path === linkPath || (linkPath !== "/" && path.startsWith(linkPath + "/"))) a.classList.add("active");
  });
  window.scrollTo(0, 0);
}

function navigate(path) {
  if (pathFor(path) === pathFor(location.pathname)) return;
  history.pushState({}, "", path);
  render();
}

document.addEventListener("click", event => {
  const link = event.target.closest("a[data-link]");
  if (link && link.origin === location.origin && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
    event.preventDefault();
    navigate(link.getAttribute("href"));
  }
  const menuButton = event.target.closest(".menu-toggle");
  if (menuButton) {
    const nav = document.getElementById("primary-nav");
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  }
  const servicesButton = event.target.closest("[data-services-toggle]");
  if (servicesButton) {
    const parent = servicesButton.closest(".nav-services");
    const open = parent.classList.toggle("open");
    servicesButton.setAttribute("aria-expanded", String(open));
  }
});
window.addEventListener("popstate", render);
const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
  && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const interactiveSelector = ".card, .benefit, .content-panel, .dashboard";
let activeSurface = null;
let activeScene = null;
let pointerFrame = 0;
let latestPointer = null;

function resetSurface(surface) {
  if (!surface) return;
  for (const property of ["--tilt-x", "--tilt-y", "--surface-x", "--surface-y"]) surface.style.removeProperty(property);
}

document.addEventListener("pointermove", event => {
  if (!hasFinePointer || event.pointerType === "touch") return;
  latestPointer = event;
  if (pointerFrame) return;
  pointerFrame = requestAnimationFrame(() => {
    pointerFrame = 0;
    const pointer = latestPointer;
    if (!pointer) return;
    document.documentElement.style.setProperty("--pointer-x", `${pointer.clientX}px`);
    document.documentElement.style.setProperty("--pointer-y", `${pointer.clientY}px`);

    const surface = pointer.target instanceof Element ? pointer.target.closest(interactiveSelector) : null;
    if (activeSurface !== surface) {
      resetSurface(activeSurface);
      activeSurface = surface;
    }
    if (surface) {
      const bounds = surface.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (pointer.clientX - bounds.left) / bounds.width));
      const y = Math.max(0, Math.min(1, (pointer.clientY - bounds.top) / bounds.height));
      surface.style.setProperty("--surface-x", `${x * 100}%`);
      surface.style.setProperty("--surface-y", `${y * 100}%`);
      surface.style.setProperty("--tilt-y", `${((x - 0.5) * 9).toFixed(2)}deg`);
      surface.style.setProperty("--tilt-x", `${((0.5 - y) * 7).toFixed(2)}deg`);
    }

    const scene = pointer.target instanceof Element ? pointer.target.closest(".hero-visual") : null;
    if (activeScene !== scene && activeScene) {
      for (const property of ["--scene-x", "--scene-y", "--scene-x-reverse", "--scene-y-reverse", "--scene-x-soft", "--scene-y-soft"]) {
        activeScene.style.removeProperty(property);
      }
    }
    activeScene = scene;
    if (scene) {
      const bounds = scene.getBoundingClientRect();
      const x = (pointer.clientX - bounds.left) / bounds.width - 0.5;
      const y = (pointer.clientY - bounds.top) / bounds.height - 0.5;
      scene.style.setProperty("--scene-x", `${(x * 16).toFixed(2)}px`);
      scene.style.setProperty("--scene-y", `${(y * 16).toFixed(2)}px`);
      scene.style.setProperty("--scene-x-reverse", `${(-x * 13).toFixed(2)}px`);
      scene.style.setProperty("--scene-y-reverse", `${(-y * 13).toFixed(2)}px`);
      scene.style.setProperty("--scene-x-soft", `${(x * 7).toFixed(2)}px`);
      scene.style.setProperty("--scene-y-soft", `${(y * 7).toFixed(2)}px`);
    }
  });
}, { passive: true });

document.addEventListener("pointerout", event => {
  if (!hasFinePointer || !(event.target instanceof Element)) return;
  const next = event.relatedTarget instanceof Element ? event.relatedTarget : null;
  const nextSurface = next?.closest(interactiveSelector) ?? null;
  if (activeSurface && nextSurface !== activeSurface) {
    resetSurface(activeSurface);
    activeSurface = nextSurface;
  }
  const nextScene = next?.closest(".hero-visual") ?? null;
  if (activeScene && nextScene !== activeScene) {
    for (const property of ["--scene-x", "--scene-y", "--scene-x-reverse", "--scene-y-reverse", "--scene-x-soft", "--scene-y-soft"]) {
      activeScene.style.removeProperty(property);
    }
    activeScene = nextScene;
  }
}, { passive: true });

window.addEventListener("scroll", () => {
  const scrollOffset = `${Math.min(window.scrollY * 0.08, 36).toFixed(1)}px`;
  document.querySelector(".site-header")?.classList.toggle("scrolled", window.scrollY > 10);
  document.querySelector(".hero-visual")?.style.setProperty("--scroll-parallax", scrollOffset);
  document.querySelector(".page-hero")?.style.setProperty("--scroll-parallax", scrollOffset);
}, { passive: true });

document.addEventListener("submit", async event => {
  if (event.target.id !== "inquiry-form") return;
  event.preventDefault();
  const form = event.target;
  const status = form.querySelector(".form-status");
  status.classList.remove("error");
  if (!form.reportValidity()) return;
  if (form.elements.website.value) {
    status.textContent = "Unable to submit this inquiry.";
    status.classList.add("error");
    return;
  }
  if (!CONFIG.formEndpoint) {
    status.textContent = "Inquiry service is not configured. Please configure CONFIG.formEndpoint before accepting submissions.";
    status.classList.add("error");
    return;
  }
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = "Sending…";
  status.textContent = "Sending your inquiry…";
  try {
    const response = await fetch(CONFIG.formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    if (!response.ok) throw new Error(`Submission failed (${response.status}).`);
    form.reset();
    status.textContent = "Thank you. Your inquiry has been sent.";
  } catch (error) {
    status.textContent = error instanceof Error ? `${error.message} Please try again later.` : "Unable to send your inquiry. Please try again later.";
    status.classList.add("error");
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send project inquiry <span class="arrow">↗</span>';
  }
});

render();
