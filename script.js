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
            subtitle: 'Designing a student-centred financial management service through research, iteration, and agile delivery',
            tags: ['UX Research', 'Service Design', 'Iterative Design', 'iOS'],
            role: 'Solo Developer',
            timeline: '6 months | Sep 2023 - Mar 2024',
            tools: 'Figma, Swift, SQLite, Trello',
            link: '#',
            screenshots: [],
            caseStudy: {
                problem: {
                    intro: 'Framing a validated user problem',
                    story: 'Financial anxiety among university students is widely reported, but existing digital tools do not adequately support first-time budgeters managing independent living for the first time. Rather than assuming a solution, I treated this as a research problem.',
                    research: 'I conducted informal interviews with university students living independently and distributed a short survey exploring budgeting behaviours and stress triggers. I benchmarked six budgeting apps — MoneyDashboard, Emma, Monzo, Spending Tracker, Daily Budget, and Goodbudget — and evaluated two OCR tools (Klippa, Zoho Expense), building a <strong>synthesis table across seven feature dimensions</strong> relevant to student financial management.',
                    gaps: [
                        '<strong>Friction prevents habit formation.</strong> Manual transaction entry was the primary reason students abandoned budgeting apps.',
                        '<strong>Category-level summaries lack meaning.</strong> Students wanted to understand what they bought, not just which category increased.',
                        '<strong>Awareness without action increases anxiety.</strong> Identifying overspending did not help unless users were given clear guidance on how to improve.',
                        '<strong>Existing tools are not contextually designed for students.</strong> OCR tools are built for business expense reporting; budgeting apps are designed for financially literate adults.'
                    ]
                },
                solution: {
                    tagline: 'A mobile budgeting service structured around three service pillars',
                    description: 'The service needed to minimise friction at the point of logging, provide meaningful item-level visibility, translate insight into actionable guidance, remain accessible to first-time budgeters, and be technically feasible within an MVP scope.',
                    features: [
                        {
                            title: 'Removing Friction — OCR Receipt Scanning',
                            text: '<em>Insight: Manual entry breaks the budgeting habit.</em> The app implements OCR-based receipt capture to extract line items automatically, shifting budgeting from a chore to a lightweight interaction. Logging time reduced significantly during usability testing, increasing likelihood of sustained use.',
                            screenshot: { src: 'Screenshots/Screenshot 2026-01-31 at 22.07.59.png', alt: 'Receipt scanning interface showing a receipt being photographed and OCR extracting items like Beef Supper and Falafel with prices' }
                        },
                        {
                            title: 'Providing Meaningful Visibility — Item-Level Breakdown',
                            text: '<em>Insight: Totals do not build understanding.</em> Every receipt is broken down into individual items rather than categories alone. Users reported improved clarity around impulse purchases and recurring spending patterns — the system supports behavioural learning, not just tracking.',
                            screenshot: { src: 'Screenshots/Screenshot 2026-01-31 at 22.13.04.png', alt: 'Transaction details screen showing a Lidl purchase with itemized products including Orange juice, Eggs, and Sweetcorn with individual prices' }
                        },
                        {
                            title: 'Enabling Action — Personalised Savings Guidance',
                            text: '<em>Insight: Students need direction, not judgement.</em> The app compares prices across stores for frequently purchased items, highlighting potential savings. Users expressed increased confidence in making cost-conscious decisions, moving the service beyond passive reporting into behavioural support.',
                            screenshot: { src: 'Screenshots/Screenshot 2026-01-22 at 22.12.37.png', alt: 'Savings Opportunities screen showing price comparisons across stores with potential savings highlighted in green' }
                        },
                        {
                            title: 'At-a-Glance Budget Control',
                            text: 'The dashboard was designed around how students mentally model money: "How much do I have left?" rather than accounting terminology. This reduced anticipatory anxiety before checking balances.',
                            screenshots: [
                                { src: 'Screenshots/Screenshot 2026-01-31 at 22.11.05.png', alt: 'Home screen showing welcome message, takeaway budget progress with £26.01 remaining, and discover saving opportunities section' },
                                { src: 'Screenshots/Screenshot 2026-01-31 at 22.10.56.png', alt: 'Budgets screen showing Takeaway and Groceries categories with progress bars and remaining amounts' }
                            ]
                        }
                    ]
                },
                process: {
                    intro: 'Agile, Feature-Driven Delivery',
                    description: 'I adopted <strong>Feature Driven Development (FDD)</strong> to simulate real-world agile practice — creating a prioritised MVP feature list in Trello, structuring work into incremental testable features, and designing in Figma from low through to high fidelity. Usability testing was conducted at every stage before development proceeded. The MVP was built in Swift using a client-side SQLite database and released in phases, incorporating structured feedback cycles. Testing methods included direct observation usability sessions, task-based completion exercises, a post-session questionnaire (15 questions), and heuristic evaluation mapped against Nielsen\'s 10 heuristics.',
                    steps: [
                        { step: 1, title: 'Interviews & Survey', description: 'Informal interviews with students living independently; short survey on budgeting behaviours and stress triggers' },
                        { step: 2, title: 'Competitive Analysis', description: 'Benchmarked 6 budgeting apps and 2 OCR tools; built synthesis table across 7 feature dimensions' },
                        { step: 3, title: 'Requirements Definition', description: 'Translated insights into design requirements; prioritised MVP feature list in Trello using FDD' },
                        { step: 4, title: 'Design (Low → High Fidelity)', description: 'Iterative Figma design from wireframes to high fidelity; usability testing at every stage' },
                        { step: 5, title: 'Build (MVP)', description: 'Swift + SQLite, feature-by-feature development; phased releases with structured feedback cycles' },
                        { step: 6, title: 'Evaluate', description: '10 participants, 15-question questionnaire, heuristic evaluation against Nielsen\'s 10 heuristics' }
                    ]
                },
                results: {
                    intro: '10 students participated in structured testing — direct observation usability sessions followed by a post-session questionnaire. Navigation clarity was consistently rated 7–9/10. Likelihood of becoming more budget-conscious rated 7–9 across all participants. OCR usefulness rated 5–8/10, valued as a differentiator with accuracy improvements required.',
                    feedback: 'Working within an academic timeframe required clear MVP prioritisation, deliberate trade-off decisions (logging speed over advanced analytics), careful consideration of OCR reliability, and secure local storage of financial data. The project demonstrates how research-led prioritisation enables delivery under constraint.',
                    conclusion: 'Starting from a validated gap in the market, translating insights into clear design requirements, and building feature-by-feature through an iterative, test-driven process delivered a service that creates measurable behavioural change.',
                    heuristics: {
                        title: 'Heuristic Evaluation — Nielsen\'s 10 Heuristics',
                        insight: 'The app performed well on interaction freedom and consistency. Visibility of system status and recognition versus recall scored moderately. Error prevention and recovery were the clearest priority improvements — directly informing the next iteration roadmap.',
                        categories: [
                            {
                                name: 'Strong Performance',
                                icon: '⭐',
                                type: 'excellent',
                                items: [
                                    { label: 'User Control & Freedom', score: 1, max: 8 },
                                    { label: 'Consistency & Standards', score: 2, max: 8 },
                                    { label: 'Help & Documentation', score: 2, max: 8 },
                                    { label: 'Flexibility & Efficiency of Use', score: 1, max: 8 }
                                ]
                            },
                            {
                                name: 'Moderate Areas',
                                icon: '⚠️',
                                type: 'moderate',
                                items: [
                                    { label: 'Visibility of System Status', score: 4, max: 8 },
                                    { label: 'Match Between System & Real World', score: 3, max: 8 },
                                    { label: 'Recognition Rather than Recall', score: 3, max: 8 }
                                ]
                            },
                            {
                                name: 'Priority Improvements',
                                icon: '🔴',
                                type: 'needs-improvement',
                                items: [
                                    { label: 'Error Prevention', score: 6, max: 8 },
                                    { label: 'Help Users Recognise & Recover from Errors', score: 5, max: 8 }
                                ]
                            }
                        ]
                    }
                },
                nextTime: {
                    intro: 'If I continue on with this project, the next phase would focus on four areas:',
                    improvements: [
                        '<strong>Accessibility & Inclusive Design</strong> — Strengthening compliance with WCAG 2.1 AA and aligning with platform Apple Human Interface guidelines to support users with varying digital literacy.',
                        '<strong>Error Prevention & Recovery</strong> — Introducing clearer system feedback, confirmation patterns, and guided correction flows — particularly within OCR workflows where inconsistent receipt formats caused issues.',
                        '<strong>Service Design Expansion</strong> — Mapping the broader financial ecosystem — bank integrations, shared accommodation expenses, student services — to design a holistic service blueprint rather than a standalone app.',
                        '<strong>Content Design Refinement</strong> — Ensuring tone is supportive, non-judgemental, and accessible to users with limited financial literacy.'
                    ]
                }
            }
        },
        {
            title: 'StepTracker',
            subtitle: 'Redesigning personal activity data into meaningful, shareable experiences through contextual insight and user-centred design',
            tags: ['UX Research', 'Service Design', 'Iterative Design', 'iOS'],
            role: 'Solo Designer & Developer',
            timeline: 'Personal Project · 2024',
            tools: 'Figma, Swift, HealthKit',
            link: '#',
            screenshots: [],
            caseStudy: {
                problem: {
                    intro: 'Framing a validated user problem',
                    story: 'The idea came from a frustration I noticed repeatedly in everyday life. Whenever I went on holiday or a day out, I wanted to look back at how active I had been — compare a beach walk to a city trip, or see whether I moved more during one week away than another. But there was no way to do this in the moment. I would have to note down the figures manually, save them somewhere else, and do the comparison myself.',
                    research: 'The same friction appeared in social contexts. When talking with friends and family after a holiday or a day out — "how many steps did you do?", "let\'s compare" — nobody could actually answer without having pre-emptively noted their numbers down. For what feels like a basic and natural user need, no app seemed to support it. To validate whether this was a wider problem, I audited the existing landscape directly. I downloaded and tested four apps: <strong>StepApps</strong>, <strong>Steps</strong>, <strong>Pacer</strong>, and the native <strong>iOS Health app</strong>. Combined, the three third-party apps held over 100,000 App Store ratings — a significant user base to draw insight from.',
                    gapsHeading: 'Competitive Analysis — Key Findings:',
                    gaps: [
                        '<strong>Data without context.</strong> All four apps display step counts, but none translate raw numbers into meaningful personal narrative. Users can see that they walked 8,000 steps on a Tuesday, but not what that means relative to a holiday, a recovery period, or a goal they set for themselves.',
                        '<strong>Custom period comparison is absent.</strong> The iOS Health app allows users to scroll back through months — but any contextual annotation, any labelling of "this was the week I went to Barcelona", has to happen elsewhere entirely.',
                        '<strong>Paywalls on basic functionality.</strong> All three third-party apps operate on a free/paid split, with comparison and historical insight features locked behind subscription tiers. For users who simply want to understand how much they have walked, this creates unnecessary friction.',
                        '<strong>Information overload through feature creep.</strong> The third-party apps conflate step tracking with full fitness and workout logging, resulting in cluttered home screens where the primary metric — steps — competes with exercises, calories, sleep, and more.'
                    ]
                },
                solution: {
                    tagline: 'A focused activity service structured around three design pillars',
                    description: 'The service needed to support custom period creation, enable meaningful comparison across time, provide social sharing capability, and surface insight at a glance — without replicating the feature overload found in existing apps.',
                    features: [
                        {
                            title: 'Creating Meaningful Periods — Custom Date Ranges',
                            text: '<em>Insight: Users think in experiences, not calendar months.</em> Rather than locking data to fixed daily/weekly/monthly views, the app allows users to define and name custom periods — a holiday, a recovery phase, a challenge week. These periods surface on the home view as named, retrievable snapshots. Logging time reduced significantly during usability testing, increasing likelihood of sustained use.',
                            screenshot: { src: 'Screenshots/Screenshot 2026-03-06 at 15.57.36.png', alt: 'New Period creation screen showing icon selection, period name input for Weekend Hike at Snowdon, and date range picker with start and end dates' }
                        },
                        {
                            title: 'Enabling Comparison — Visual Trend Analysis',
                            text: '<em>Insight: Numbers only become useful when placed alongside other numbers.</em> The app generates visual comparisons across saved periods — bar charts, step averages, and peak days. Users can compare their activity during a holiday against the weeks before and after, or contrast two separate trips. This transforms passive tracking into active reflection.',
                            screenshot: { src: 'Screenshots/Screenshot 2026-03-06 at 15.56.33.png', alt: 'Compare view showing Barcelona Trip versus Recovery Week with daily average, total steps, and peak day bar chart comparisons' }
                        },
                        {
                            title: 'Enabling Social Context — Shared Step Comparison',
                            text: '<em>Insight: Activity is often relational — people want to compare with people they know.</em> The app allows users to share a custom period summary with friends and family, enabling the kind of casual comparison that happens naturally in conversation ("how many steps did you do on holiday?") without requiring manual note-taking or screenshots. This extends the service beyond individual insight into shared experience.',
                            screenshot: { src: 'Screenshots/Screenshot 2026-03-06 at 15.56.42.png', alt: 'Social sharing screen showing Share a Period with selectable periods like Barcelona Trip and Recovery Week with share icons' }
                        },
                        {
                            title: 'At-a-Glance Dashboard',
                            text: 'The home screen was designed around a single priority: today\'s steps, contextualised against your recent history and active periods. No workouts, no calorie rings, no feature overload. The mental model is simple — "how does today compare to what I normally do, and to the periods I care about?"',
                            screenshots: [
                                { src: 'Screenshots/Screenshot 2026-03-07 at 19.41.59.png', alt: 'Home dashboard showing today\'s 4,280 steps with 43% goal progress, weekly bar chart, and recent periods including Barcelona Trip and Recovery Week' },
                                { src: 'Screenshots/Screenshot 2026-03-07 at 19.42.10.png', alt: 'Barcelona Trip detail view showing 98,420 total steps, 12,303 daily average, 18,920 peak day, and daily breakdown bar chart across 8 days' }
                            ]
                        }
                    ]
                },
                process: {
                    intro: 'Research-Led, Requirements-Driven Design',
                    description: 'Following a structured design process, I moved from problem identification through competitive analysis, requirements definition, wireframing, and iterative prototyping. The wireframe phase translated home view requirements into a concrete layout: time-of-day greeting, daily step bar chart with previous days greyed out for context, recent periods surfaced as named cards, and a daily goal progress tracker.',
                    steps: [
                        { step: 1, title: 'Problem Identification', description: 'Personal frustration and social friction identified as design opportunity; hypothesis formed around contextual comparison as an unmet need' },
                        { step: 2, title: 'Competitive Analysis', description: 'Four apps audited across step visibility, comparison features, paywalls, information architecture, and context-setting capability' },
                        { step: 3, title: 'Requirements Definition', description: 'Four minimum requirements established: custom date range input, period comparison, visual trend display, and contextual event-based insights' },
                        { step: 4, title: 'Wireframing', description: 'Low-fidelity layouts produced for home view and comparison view; requirements mapped to UI components' },
                        { step: 5, title: 'Prototyping', description: 'High-fidelity designs iterated in Figma, with HealthKit integration mapped as technical dependency' },
                        { step: 6, title: 'Evaluation', description: 'Design assessed against identified user needs and competitive gaps' }
                    ]
                },
                results: {
                    intro: 'The competitive analysis confirmed a genuine and underserved user need. All four apps — despite a combined 100,000+ App Store ratings — failed to support contextual comparison or user-defined time periods without manual workaround. The wireframes and requirements demonstrate a clear path from identified insight to design response.',
                    feedback: 'The project surfaces an important design principle: tracking data is not the same as understanding it. Moving from passive data display to contextual, comparative insight requires designing for the way people actually think about their activity — in terms of experiences and periods, not calendar units.',
                    conclusion: 'Starting from a personal frustration, validating the gap through competitive analysis, and translating insights into a focused design response demonstrates how user-centred thinking can uncover opportunity in a crowded market.'
                },
                nextTime: {
                    intro: 'If continued, the next iteration would focus on four areas:',
                    improvements: [
                        '<strong>HealthKit Integration</strong> — Live step data pulled directly from HealthKit to populate custom periods without manual input.',
                        '<strong>Social Comparison Feature</strong> — Developing the friend/family sharing model, including privacy controls and comparison presentation.',
                        '<strong>Notification Design</strong> — Contextual prompts that surface period summaries at natural moments (end of a trip, after a week of a new goal).',
                        '<strong>Accessibility & Inclusive Design</strong> — Ensuring visual trends and comparison data remain accessible to users with varying visual abilities, aligned with WCAG 2.1 AA and Apple Human Interface Guidelines.'
                    ]
                }
            }
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
            <h4>${cs.problem.gapsHeading || 'Synthesis — key unmet user needs:'}</h4>
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
