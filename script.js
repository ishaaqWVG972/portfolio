// Xbox 360 Dashboard Portfolio - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ===== BLOG POST MANAGEMENT =====
    let blogPosts = [];
    let currentPostIndex = null;

    // Format date for display
    function formatBlogDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long' };
        return date.toLocaleDateString('en-US', options);
    }

    // Load blog posts from Vercel API or fallback to static data
    async function loadBlogPosts() {
        try {
            const response = await fetch('/api/posts');
            if (!response.ok) throw new Error('Failed to fetch posts');
            blogPosts = await response.json();
            return blogPosts;
        } catch (error) {
            console.log('Using fallback blog data:', error.message);
            // Fallback to static data for local development
            blogPosts = [
                {
                    slug: 'art-of-service-design',
                    title: 'The Art of Service Design',
                    date: '2026-01-15T12:00:00.000Z',
                    excerpt: 'Exploring how service design bridges digital and physical touchpoints to create seamless user experiences...',
                    body: 'Service design is the practice of designing, aligning, and optimizing an organization\'s operations to better support customer journeys.'
                },
                {
                    slug: 'learning-from-transport',
                    title: 'Learning from Transport Systems',
                    date: '2025-12-10T12:00:00.000Z',
                    excerpt: 'What TfL\'s barrier lighting can teach us about intuitive design and immediate user feedback...',
                    body: 'Living in London, I interact with Transport for London\'s systems daily. What fascinates me most is how small design decisions create clarity in high-stress, high-traffic environments.'
                },
                {
                    slug: 'cybersecurity-to-ux',
                    title: 'From Cybersecurity to UX',
                    date: '2025-11-08T12:00:00.000Z',
                    excerpt: 'My journey transitioning from technical security work to human-centered design thinking...',
                    body: 'My career started in cybersecurity, analyzing threats, building defenses, and understanding how systems fail.'
                },
                {
                    slug: 'progressive-disclosure',
                    title: 'Progressive Disclosure Done Right',
                    date: '2025-10-05T12:00:00.000Z',
                    excerpt: 'Revealing complexity at the right moment - balancing simplicity with power-user features...',
                    body: 'Progressive disclosure is one of the most powerful patterns in UX design, yet it\'s often misunderstood or misapplied.'
                }
            ];
            return blogPosts;
        }
    }

    // Render blog list in modal
    function renderBlogList() {
        const blogList = document.querySelector('.blog-list');
        if (!blogList || blogPosts.length === 0) return;

        blogList.innerHTML = blogPosts.map((post, index) => `
            <article class="blog-post" data-blog="${index}">
                <h3 class="blog-post-title">${post.title}</h3>
                <span class="blog-post-date">${formatBlogDate(post.date)}</span>
                <p class="blog-post-excerpt">${post.excerpt}</p>
            </article>
        `).join('');

        // Add click handlers to blog posts
        blogList.querySelectorAll('.blog-post').forEach(article => {
            article.addEventListener('click', () => {
                const index = parseInt(article.dataset.blog, 10);
                showFullPost(index);
            });
        });
    }

    // Show full blog post
    function showFullPost(index) {
        const post = blogPosts[index];
        if (!post) return;

        currentPostIndex = index;
        const blogList = document.querySelector('.blog-list');
        const modalTitle = document.querySelector('#blog-modal .modal-title');

        // Parse markdown if marked.js is available
        let bodyHtml = post.body;
        if (typeof marked !== 'undefined') {
            bodyHtml = marked.parse(post.body);
        }

        blogList.innerHTML = `
            <div class="blog-full-post">
                <button class="back-to-list">← Back to all posts</button>
                <article class="blog-post-full">
                    <h1 class="blog-full-title">${post.title}</h1>
                    <span class="blog-full-date">${formatBlogDate(post.date)}</span>
                    <div class="blog-full-body">${bodyHtml}</div>
                </article>
            </div>
        `;

        modalTitle.textContent = post.title;

        // Add back button handler
        const backBtn = blogList.querySelector('.back-to-list');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                currentPostIndex = null;
                modalTitle.textContent = 'Thoughts & Ideas';
                renderBlogList();
            });
        }
    }

    // Project data
    const projects = [
        {
            title: 'Expense Explorer',
            subtitle: 'A research-led iOS app that transforms financial anxiety into actionable clarity for university students',
            tags: ['UX Research', 'Service Design', 'Iterative Design', 'iOS'],
            role: 'UX Designer & Researcher',
            timeline: '6 months | Sep 2023 - Mar 2024',
            tools: 'Figma, Miro, Swift, SQLite',
            link: '#',
            screenshots: [],
            caseStudy: {
                problem: {
                    intro: 'A validated user need, not just a personal assumption.',
                    story: 'Moving out for university introduced me to a problem I hadn\'t anticipated: financial anxiety. Before each bank check, there was a knot of uncertainty—spending was happening, but without visibility or control. Rather than treating this as a personal quirk, I began speaking with peers who\'d had the same experience. The response was unanimous: the anxiety was real, and the tools available weren\'t helping.',
                    research: 'To move beyond anecdote, I conducted <strong>user interviews with university students</strong> and performed a competitive analysis of existing budgeting apps, synthesising findings through affinity mapping to identify recurring themes. The research confirmed the scale of the problem: <strong>70% of university students report financial stress</strong>, yet available solutions were built for professionals—dense with features students don\'t need, and missing the ones that would actually change behaviour.',
                    gaps: [
                        'Students need to log purchases quickly and effortlessly—manual entry creates too much friction to sustain as a habit',
                        'High-level spending summaries aren\'t enough: users need granular, item-level breakdowns to understand where money actually goes',
                        'Identifying overspending is not sufficient without clear, actionable guidance on how to change it',
                        'Existing apps assume financial literacy and professional contexts that most students simply don\'t have'
                    ]
                },
                solution: {
                    tagline: 'Research-informed design → Effortless input → Actionable insight',
                    description: 'Each design decision was mapped directly to a user need uncovered in research. The three core service pillars—removing friction, providing meaningful visibility, and enabling action—address the three layers of financial anxiety students described:',
                    features: [
                        {
                            title: 'OCR receipt scanning',
                            text: 'The biggest barrier to consistent budgeting was friction at the point of entry. Rather than expecting users to manually log purchases—a behaviour research showed they repeatedly abandoned—the app removes that friction entirely. Photographing a receipt automatically extracts every line item, making accurate record-keeping effortless and sustainable.',
                            screenshot: { src: 'Screenshots/Screenshot 2026-01-31 at 22.07.59.png', alt: 'Receipt scanning interface showing a receipt being photographed and OCR extracting items like Beef Supper and Falafel with prices' }
                        },
                        {
                            title: 'Granular spending breakdowns',
                            text: 'Research showed that category-level summaries weren\'t enough—students wanted to know exactly what they\'d bought, not just where they\'d spent. Every transaction is itemised at product level, turning abstract totals into concrete, understandable spending patterns that users can genuinely learn from.',
                            screenshot: { src: 'Screenshots/Screenshot 2026-01-31 at 22.13.04.png', alt: 'Transaction details screen showing a Lidl purchase with itemized products including Orange juice, Eggs, and Sweetcorn with individual prices' }
                        },
                        {
                            title: 'Actionable savings guidance',
                            text: 'Awareness alone doesn\'t change behaviour—users needed a clear path to action. The app moves beyond visibility by comparing prices across stores on items a student regularly buys, translating passive awareness into genuine financial agency and giving users a concrete reason to change their habits.',
                            screenshot: { src: 'Screenshots/Screenshot 2026-01-22 at 22.12.37.png', alt: 'Savings Opportunities screen showing price comparisons across stores with potential savings highlighted in green' }
                        },
                        {
                            title: 'At-a-glance budget tracking',
                            text: 'Designed to match how students actually think about money—by category and remaining allowance, not accounting codes. The home screen gives an immediate sense of control and progress, reducing the anxiety of not knowing where you stand before even opening the app.',
                            screenshots: [
                                { src: 'Screenshots/Screenshot 2026-01-31 at 22.11.05.png', alt: 'Home screen showing welcome message, takeaway budget progress with £26.01 remaining, and discover saving opportunities section' },
                                { src: 'Screenshots/Screenshot 2026-01-31 at 22.10.56.png', alt: 'Budgets screen showing Takeaway and Groceries categories with progress bars and remaining amounts' }
                            ]
                        }
                    ]
                },
                process: {
                    intro: 'A <strong>user-centred, iterative process</strong> structured around discovery, synthesis, and repeated cycles of design and testing.',
                    description: 'I began with a discovery phase—user interviews and competitive analysis synthesised through affinity mapping to surface clear, evidence-based user needs. These needs directly shaped the information architecture and core user journeys before a single screen was designed. I then moved through progressive fidelity: low-fidelity sketches to validate structure and flows, mid-fidelity wireframes tested with real users whose structured feedback drove each iteration. Before build, I produced <strong>detailed design specifications</strong>—annotating interaction states, component behaviour, and spacing—to ensure accurate developer handoff. After release, I conducted a heuristic evaluation across Nielsen\'s 10 principles to identify remaining usability gaps and inform the next design cycle.',
                    steps: [
                        { step: 1, title: 'Discovery', description: 'User interviews & competitive analysis' },
                        { step: 2, title: 'Define', description: 'Affinity mapping & user needs synthesis' },
                        { step: 3, title: 'Low-Fidelity', description: 'IA, user flows & early validation' },
                        { step: 4, title: 'Mid-Fidelity', description: 'Usability testing & structured iteration' },
                        { step: 5, title: 'High-Fidelity', description: 'Visual design, specs & developer handoff' },
                        { step: 6, title: 'Evaluate', description: 'Heuristic review & next cycle planning' }
                    ]
                },
                results: {
                    intro: 'Following release, I ran a structured usability testing session with university students—observing task completion, gathering qualitative feedback, and conducting a heuristic evaluation against Nielsen\'s 10 usability principles to systematically identify strengths and gaps.',
                    feedback: 'Participants described the app as genuinely filling a gap that existing tools hadn\'t addressed. Key themes from the feedback highlighted the effortlessness of receipt scanning and the clarity of spending breakdowns as the features most likely to change financial behaviour. All participants said they would use the app as part of their daily routine—a strong signal that the design was solving the right problem in the right way.',
                    conclusion: 'The project demonstrated that a research-grounded, iterative design process can produce tools that create genuine behavioural change—not just feature lists. Starting from a real user need and validating every design decision through testing made the difference.',
                    heuristics: {
                        title: 'Usability Evaluation — Nielsen\'s 10 Heuristics',
                        insight: 'The app performs strongly across the heuristics prioritised during the design phase—visibility, consistency, and aesthetic clarity. Error handling and prevention are clearly identified as the next design priority, with specific interaction patterns planned for the following iteration.',
                        categories: [
                            {
                                name: 'Strong Performance',
                                icon: '⭐',
                                type: 'excellent',
                                items: [
                                    { label: 'Visibility of System Status', score: 1, max: 8 },
                                    { label: 'Match Between System & Real World', score: 1, max: 8 },
                                    { label: 'User Control & Freedom', score: 1, max: 8 },
                                    { label: 'Consistency & Standards', score: 1, max: 8 },
                                    { label: 'Aesthetic & Minimalist Design', score: 1, max: 8 }
                                ]
                            },
                            {
                                name: 'Moderate Performance',
                                icon: '⚠️',
                                type: 'moderate',
                                items: [
                                    { label: 'Recognition Rather than Recall', score: 3, max: 8 },
                                    { label: 'Flexibility & Efficiency of Use', score: 3, max: 8 },
                                    { label: 'Help & Documentation', score: 3, max: 8 }
                                ]
                            },
                            {
                                name: 'Needs Improvement',
                                icon: '🔴',
                                type: 'needs-improvement',
                                items: [
                                    { label: 'Help Users Recognize & Recover from Errors', score: 5, max: 8 },
                                    { label: 'Error Prevention', score: 6, max: 8 }
                                ]
                            }
                        ]
                    }
                },
                nextTime: {
                    intro: 'Reflecting on this project through the lens of professional design practice, the next iteration would focus on four areas:',
                    improvements: [
                        '<strong>Accessibility and inclusive design</strong> — Conduct an audit against WCAG 2.1 AA standards and review all content design with a focus on clarity and simplicity—ensuring the app is usable by students with varying levels of digital and financial literacy.',
                        '<strong>Error prevention and recovery</strong> — The heuristic evaluation clearly identified this as the highest priority gap. The next design cycle would introduce clear recovery paths, confirmation states, and proactive error prevention patterns—particularly around the OCR scanning flow.',
                        '<strong>Service design expansion</strong> — Map the full student financial ecosystem beyond the app itself: bank integrations, student union services, shared household expenses, and seasonal spending patterns. The goal would be to design a holistic service rather than an isolated tool.',
                        '<strong>Content design refinement</strong> — Review all in-app microcopy with a dedicated content design lens. The language used around budgets, savings, and spending patterns should be warm, non-judgemental, and accessible to users who may have limited prior experience managing money.'
                    ]
                }
            }
        },
        {
            title: 'StepTracker',
            subtitle: 'Transforming step data into actionable insights through comparison and saved benchmarks',
            tags: ['iOS', 'Data Visualization', 'Health and Fitness'],
            role: 'Product Designer',
            timeline: '3 months',
            tools: 'Figma, Swift',
            description: 'Users have access to their step data but no way to make sense of it—I designed a service that transforms isolated numbers into actionable insights through comparison and saved benchmarks.',
            link: '#',
            screenshots: [],
            caseStudy: null
        },
        {
            title: 'Security Dashboard',
            subtitle: 'Making cybersecurity data accessible to both professionals and stakeholders',
            tags: ['Data Visualization', 'Dashboard Design', 'B2B'],
            role: 'UX Designer',
            timeline: '4 months',
            tools: 'Figma, D3.js',
            description: 'Translating complex cybersecurity data into actionable insights through thoughtful information architecture. The challenge was making technical security metrics accessible to both security professionals and business stakeholders.',
            link: '#',
            screenshots: [],
            caseStudy: null
        }
    ];

    // DOM Elements
    const navLinks = document.querySelectorAll('.nav-link');
    const views = document.querySelectorAll('.view');
    const blogTile = document.getElementById('blog-tile');
    const blogModal = document.getElementById('blog-modal');
    const projectModal = document.getElementById('project-modal');
    const blogModalClose = blogModal.querySelector('.modal-close');
    const projectModalClose = projectModal.querySelector('.modal-close');
    const projectCards = document.querySelectorAll('.project-card');
    const recentTile = document.querySelector('.tile-recent');

    let lastFocusedElement = null;
    let currentView = 'home';

    // View order for determining slide direction
    const viewOrder = ['home', 'projects'];

    // ===== VIEW SWITCHING WITH SLIDE ANIMATION =====
    function switchView(viewName) {
        if (viewName === currentView) return;

        const currentIndex = viewOrder.indexOf(currentView);
        const newIndex = viewOrder.indexOf(viewName);
        const goingRight = newIndex > currentIndex;

        const currentViewEl = document.getElementById(`${currentView}-view`);
        const newViewEl = document.getElementById(`${viewName}-view`);

        // Update nav links
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.view === viewName);
        });

        // Animate current view out
        currentViewEl.classList.remove('active');
        currentViewEl.classList.add(goingRight ? 'slide-left' : 'slide-right');

        // Position new view for entry
        newViewEl.classList.remove('slide-left', 'slide-right');

        // Force a reflow to ensure the initial position is set
        newViewEl.offsetHeight;

        // Animate new view in
        newViewEl.classList.add('active');

        // Clean up old view after animation
        setTimeout(() => {
            currentViewEl.classList.remove('slide-left', 'slide-right');
        }, 500);

        currentView = viewName;
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchView(link.dataset.view);
        });
    });

    // ===== BLOG MODAL =====
    async function openBlogModal() {
        lastFocusedElement = document.activeElement;
        blogModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Load and render blog posts
        if (blogPosts.length === 0) {
            await loadBlogPosts();
        }
        currentPostIndex = null;
        document.querySelector('#blog-modal .modal-title').textContent = 'Thoughts & Ideas';
        renderBlogList();

        setTimeout(() => {
            blogModalClose.focus();
        }, 100);
    }

    function closeBlogModal() {
        blogModal.classList.remove('active');
        document.body.style.overflow = '';

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    blogTile.addEventListener('click', openBlogModal);
    blogTile.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openBlogModal();
        }
    });

    blogModalClose.addEventListener('click', closeBlogModal);
    blogModal.addEventListener('click', (e) => {
        if (e.target === blogModal) {
            closeBlogModal();
        }
    });

    // ===== PROJECT MODAL =====
    function openProjectModal(projectIndex) {
        const project = projects[projectIndex];
        if (!project) return;

        lastFocusedElement = document.activeElement;

        // Update modal content
        const modalTitle = projectModal.querySelector('.project-modal-title');
        const modalSubtitle = projectModal.querySelector('.project-modal-subtitle');
        const modalTags = projectModal.querySelector('.project-modal-tags');
        const modalDescription = projectModal.querySelector('.project-modal-description');
        const modalScreenshots = projectModal.querySelector('.project-screenshots');
        const modalCta = projectModal.querySelector('.project-cta');
        const caseStudyContent = projectModal.querySelector('.case-study-content');
        const metaRole = projectModal.querySelector('.meta-role');
        const metaTimeline = projectModal.querySelector('.meta-timeline');
        const metaTools = projectModal.querySelector('.meta-tools');

        modalTitle.textContent = project.title;
        modalSubtitle.textContent = project.subtitle || '';
        metaRole.textContent = project.role || '';
        metaTimeline.textContent = project.timeline || '';
        metaTools.textContent = project.tools || '';
        modalCta.href = project.link;

        modalTags.innerHTML = project.tags
            .map(tag => `<span class="tag">${tag}</span>`)
            .join('');

        // Populate screenshots
        if (project.screenshots && project.screenshots.length > 0) {
            modalScreenshots.innerHTML = project.screenshots
                .map(img => `<figure class="screenshot-item">
                    <img src="${img.src}" alt="${img.alt}" loading="lazy">
                </figure>`)
                .join('');
            modalScreenshots.style.display = 'grid';
        } else {
            modalScreenshots.innerHTML = '';
            modalScreenshots.style.display = 'none';
        }

        // Populate case study content or simple description
        if (project.caseStudy) {
            modalDescription.style.display = 'none';
            caseStudyContent.style.display = 'block';
            caseStudyContent.innerHTML = renderCaseStudy(project.caseStudy);
        } else {
            modalDescription.style.display = 'block';
            modalDescription.textContent = project.description || '';
            caseStudyContent.style.display = 'none';
            caseStudyContent.innerHTML = '';
        }

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Scroll modal to top
        projectModal.scrollTop = 0;

        // Initialize scroll spy for sidebar navigation
        if (project.caseStudy) {
            initScrollSpy();
        }

        setTimeout(() => {
            projectModalClose.focus();
        }, 100);
    }

    // Scroll spy for sidebar navigation
    let scrollSpyCleanup = null;

    function initScrollSpy() {
        // Clean up previous scroll spy
        if (scrollSpyCleanup) {
            scrollSpyCleanup();
        }

        const sections = projectModal.querySelectorAll('.cs-section[id]');
        const navLinks = projectModal.querySelectorAll('.cs-nav-link');

        if (sections.length === 0 || navLinks.length === 0) return;

        const handleScroll = () => {
            const scrollTop = projectModal.scrollTop;
            const offset = 150; // Offset for when to trigger

            let currentSection = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - offset;
                const sectionHeight = section.offsetHeight;

                if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            // Update active state
            navLinks.forEach(link => {
                const li = link.parentElement;
                if (link.getAttribute('data-section') === currentSection) {
                    li.classList.add('active');
                } else {
                    li.classList.remove('active');
                }
            });
        };

        // Add click handlers for smooth scrolling
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-section');
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    projectModal.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });

        projectModal.addEventListener('scroll', handleScroll);

        // Initial check
        handleScroll();

        // Store cleanup function
        scrollSpyCleanup = () => {
            projectModal.removeEventListener('scroll', handleScroll);
        };
    }

    function renderCaseStudy(cs) {
        let html = '';

        // Top Sticky Navigation
        const navItems = [
            { id: 'problem', label: 'Problem' },
            { id: 'solution', label: 'Solution' },
            { id: 'process', label: 'Process' },
            { id: 'results', label: 'Results' }
        ];
        if (cs.nextTime) {
            navItems.push({ id: 'next-time', label: 'Next Time' });
        }

        html += `
        <nav class="cs-top-nav">
            <div class="cs-top-nav-inner">
                <ul class="cs-nav-list">
                    ${navItems.map((item, index) => `
                        <li class="cs-nav-item ${index === 0 ? 'active' : ''}">
                            <a href="#cs-${item.id}" class="cs-nav-link" data-section="cs-${item.id}">${item.label}</a>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </nav>`;

        // Problem Section
        html += `
        <section class="cs-section cs-problem" id="cs-problem">
            <h2 class="cs-section-title">The Problem</h2>
            <p class="cs-intro"><strong>${cs.problem.intro}</strong></p>
            <p>${cs.problem.story}</p>
            <p>${cs.problem.research}</p>
            <h4>Synthesis — key unmet user needs:</h4>
            <ul class="cs-list">
                ${cs.problem.gaps.map(gap => `<li>${gap}</li>`).join('')}
            </ul>
        </section>`;

        // Solution Section with embedded screenshots
        html += `
        <section class="cs-section cs-solution" id="cs-solution">
            <h2 class="cs-section-title">The Solution</h2>
            <p class="cs-tagline">${cs.solution.tagline}</p>
            <p>${cs.solution.description}</p>

            <div class="cs-features">
                ${cs.solution.features.map(f => {
                    let screenshotHtml = '';
                    if (f.screenshot) {
                        screenshotHtml = `
                            <figure class="feature-screenshot">
                                <img src="${f.screenshot.src}" alt="${f.screenshot.alt}" loading="lazy">
                            </figure>`;
                    } else if (f.screenshots) {
                        screenshotHtml = `
                            <div class="feature-screenshots-row">
                                ${f.screenshots.map(s => `
                                    <figure class="feature-screenshot">
                                        <img src="${s.src}" alt="${s.alt}" loading="lazy">
                                    </figure>
                                `).join('')}
                            </div>`;
                    }
                    return `
                        <div class="cs-feature-block">
                            <div class="feature-content">
                                <h3 class="feature-title">${f.title}</h3>
                                <p class="feature-text">${f.text}</p>
                            </div>
                            ${screenshotHtml}
                        </div>
                    `;
                }).join('')}
            </div>
        </section>`;

        // Process Section - MVP Approach
        html += `
        <section class="cs-section cs-process" id="cs-process">
            <h2 class="cs-section-title">Process</h2>
            <p class="cs-process-intro">${cs.process.intro}</p>
            <p>${cs.process.description}</p>
            <div class="cs-timeline">
                ${cs.process.steps.map(p => `
                    <div class="timeline-item">
                        <div class="timeline-dot">${p.step}</div>
                        <div class="timeline-label">${p.title}</div>
                        <div class="timeline-description">${p.description}</div>
                    </div>
                `).join('')}
            </div>
        </section>`;

        // Results Section
        html += `
        <section class="cs-section cs-results" id="cs-results">
            <h2 class="cs-section-title">Results & Impact</h2>
            <p>${cs.results.intro}</p>
            <div class="cs-feedback">
                <p>${cs.results.feedback}</p>
            </div>
            ${cs.results.heuristics ? `
                <div class="heuristics-section">
                    <h3 class="heuristics-title">${cs.results.heuristics.title}</h3>
                    ${cs.results.heuristics.categories.map(cat => `
                        <div class="score-category ${cat.type}">
                            <h4>${cat.icon} ${cat.name}</h4>
                            <div class="heuristic-bars">
                                ${cat.items.map(item => {
                                    const percentage = (item.score / item.max) * 100;
                                    let barClass = 'excellent';
                                    if (item.score >= 5) barClass = item.score >= 6 ? 'critical' : 'needs-work';
                                    else if (item.score >= 3) barClass = 'good';
                                    return `
                                        <div class="heuristic-bar">
                                            <span class="heuristic-label">${item.label}</span>
                                            <div class="bar-container">
                                                <div class="bar-fill ${barClass}" style="width: ${percentage}%"></div>
                                            </div>
                                            <span class="heuristic-score">${item.score}/${item.max}</span>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}
                    <div class="heuristics-insight">
                        <p><strong>Key Insight:</strong> ${cs.results.heuristics.insight}</p>
                    </div>
                </div>
            ` : ''}
            <div class="cs-conclusion">
                <p><strong>${cs.results.conclusion}</strong></p>
            </div>
        </section>`;

        // Next Time Section (if exists)
        if (cs.nextTime) {
            html += `
            <section class="cs-section cs-next-time" id="cs-next-time">
                <h2 class="cs-section-title">Next Time</h2>
                <p>${cs.nextTime.intro}</p>
                <ul class="cs-improvements-list">
                    ${cs.nextTime.improvements.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </section>`;
        }

        return html;
    }

    function closeProjectModal(withAnimation = true) {
        if (withAnimation) {
            // Add closing class for green flash effect
            projectModalClose.classList.add('closing');

            // Delay actual close to let animation play
            setTimeout(() => {
                projectModalClose.classList.remove('closing');
                doCloseProjectModal();
            }, 200);
        } else {
            doCloseProjectModal();
        }
    }

    function doCloseProjectModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';

        // Clean up scroll spy
        if (scrollSpyCleanup) {
            scrollSpyCleanup();
            scrollSpyCleanup = null;
        }

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectIndex = parseInt(card.dataset.project, 10);
            openProjectModal(projectIndex);
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const projectIndex = parseInt(card.dataset.project, 10);
                openProjectModal(projectIndex);
            }
        });
    });

    // Recent tile opens first project
    if (recentTile) {
        recentTile.addEventListener('click', () => {
            openProjectModal(0);
        });

        recentTile.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openProjectModal(0);
            }
        });
    }

    projectModalClose.addEventListener('click', closeProjectModal);
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeProjectModal(false); // No animation when clicking outside
        }
    });

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', (e) => {
        // Escape to close modals
        if (e.key === 'Escape') {
            if (blogModal.classList.contains('active')) {
                closeBlogModal();
            }
            if (projectModal.classList.contains('active')) {
                closeProjectModal(false); // No animation on Escape
            }
        }

        // Left/Right arrows to switch views (when no modal is open)
        const anyModalActive = blogModal.classList.contains('active') ||
                               projectModal.classList.contains('active');

        if (!anyModalActive) {
            const currentIndex = viewOrder.indexOf(currentView);

            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                switchView(viewOrder[currentIndex - 1]);
            } else if (e.key === 'ArrowRight' && currentIndex < viewOrder.length - 1) {
                switchView(viewOrder[currentIndex + 1]);
            }
        }
    });

    // Focus trap for modals
    function trapFocus(modal) {
        modal.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;

            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }

    trapFocus(blogModal);
    trapFocus(projectModal);

    // ===== TOUCH GESTURES =====
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        const anyModalActive = blogModal.classList.contains('active') ||
                               projectModal.classList.contains('active');
        if (anyModalActive) return;

        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) < swipeThreshold) return;

        const currentIndex = viewOrder.indexOf(currentView);

        if (diff > 0 && currentIndex < viewOrder.length - 1) {
            // Swipe left - go to next view (Projects)
            switchView(viewOrder[currentIndex + 1]);
        } else if (diff < 0 && currentIndex > 0) {
            // Swipe right - go to previous view (Home)
            switchView(viewOrder[currentIndex - 1]);
        }
    }

    // ===== TILE ENTRANCE ANIMATIONS =====
    function animateTiles() {
        const tiles = document.querySelectorAll('.view.active .tile');
        tiles.forEach((tile, index) => {
            tile.style.opacity = '0';
            tile.style.transform = 'translateY(30px)';

            setTimeout(() => {
                tile.style.transition = 'opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                tile.style.opacity = '1';
                tile.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Initial animation
    animateTiles();
});
