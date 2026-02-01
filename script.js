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
            subtitle: 'Helping university students manage money confidently through receipt scanning and smart savings suggestions',
            tags: ['iOS', 'UX Research', 'App Development'],
            role: 'Product Designer & Developer',
            timeline: '6 months | Sep 2023 - Mar 2024',
            tools: 'Swift, SQLite, Figma, Feature-Driven Development',
            link: '#',
            screenshots: [],
            caseStudy: {
                problem: {
                    intro: 'This started as my problem.',
                    story: 'When I moved out for university 3 years ago, I found myself constantly anxious before checking my bank account. I knew I was spending money, but I had no idea <em>where</em> it was going or <em>how</em> to manage it better.',
                    research: 'I asked friends who\'d also moved out—they felt the same way. This led me to research further: <strong>70% of university students feel stressed about their personal finances</strong>, yet current budgeting apps don\'t address student-specific needs.',
                    gaps: [
                        'No way to quickly log purchases (scanning receipts)',
                        'No breakdown of what you actually bought',
                        'No suggestions on where to save money',
                        'Business-focused features that overwhelm students'
                    ]
                },
                solution: {
                    tagline: 'Scan receipts → See spending → Save money',
                    description: 'An iOS app that removes friction from budgeting and provides actionable insights:',
                    features: [
                        {
                            title: 'OCR receipt scanning',
                            text: 'Snap a photo of your receipt and the app automatically extracts all items and prices—no manual entry needed.',
                            screenshot: { src: 'Screenshots/Screenshot 2026-01-31 at 22.07.59.png', alt: 'Receipt scanning interface showing a receipt being photographed and OCR extracting items like Beef Supper and Falafel with prices' }
                        },
                        {
                            title: 'Detailed breakdowns',
                            text: 'See exactly what you bought and where. Every transaction is itemized so you can understand your spending at a granular level.',
                            screenshot: { src: 'Screenshots/Screenshot 2026-01-31 at 22.13.04.png', alt: 'Transaction details screen showing a Lidl purchase with itemized products including Orange juice, Eggs, and Sweetcorn with individual prices' }
                        },
                        {
                            title: 'Money-saving suggestions',
                            text: 'The app compares prices across stores and shows you where you could save money on items you regularly buy.',
                            screenshot: { src: 'Screenshots/Screenshot 2026-01-22 at 22.12.37.png', alt: 'Savings Opportunities screen showing price comparisons across stores with potential savings highlighted in green' }
                        },
                        {
                            title: 'Budget tracking',
                            text: 'Set budgets for different categories and monitor your progress. The home screen gives you an at-a-glance view of where you stand.',
                            screenshots: [
                                { src: 'Screenshots/Screenshot 2026-01-31 at 22.11.05.png', alt: 'Home screen showing welcome message, takeaway budget progress with £26.01 remaining, and discover saving opportunities section' },
                                { src: 'Screenshots/Screenshot 2026-01-31 at 22.10.56.png', alt: 'Budgets screen showing Takeaway and Groceries categories with progress bars and remaining amounts' }
                            ]
                        }
                    ]
                },
                process: {
                    intro: 'With a strict deadline, I followed an <strong>MVP approach</strong>—focusing on getting key features working first, then iterating on design.',
                    description: 'I worked my way up from low-fidelity prototypes to mid-fidelity, then high-fidelity—adding more features that were requested after testing and gathering feedback from users. After each version, real users tested the app, I gathered their insights, made improvements, and released a new version. This cycle continued through to the final release.',
                    steps: [
                        { step: 1, title: 'Low-Fidelity', description: 'Core functionality first' },
                        { step: 2, title: 'Mid-Fidelity', description: 'Test & gather feedback' },
                        { step: 3, title: 'High-Fidelity', description: 'Polish & refine' },
                        { step: 4, title: 'Release', description: 'Final version' }
                    ]
                },
                results: {
                    intro: 'I let university students use the app and gathered their feedback.',
                    feedback: 'Students said this would genuinely help them manage their finances and budget better. They appreciated how the app made tracking spending effortless and highlighted opportunities to save money they wouldn\'t have noticed otherwise.',
                    conclusion: 'This app was able to solve an actual real-life problem—one that I and many other students face every day.',
                    heuristics: {
                        title: 'Usability Performance',
                        insight: 'The app excels in visual design and consistency but needs better error handling and prevention mechanisms.',
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
                    intro: 'If I were to revisit this project, there are several areas I would focus on improving:',
                    improvements: [
                        '<strong>Improve the OCR model</strong> — The current receipt scanning works well but could be more accurate with different receipt formats and lighting conditions.',
                        '<strong>Enhance the design</strong> — With more time, I would refine the visual design and user experience further.',
                        '<strong>Implement Apple Human Interface Guidelines</strong> — Ensuring the app fully adheres to iOS design patterns and conventions for a more native feel.'
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
            <h4>Key gaps in existing apps:</h4>
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
