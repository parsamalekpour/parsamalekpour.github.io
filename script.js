// DOM Elements
const elements = {
    projectTitle: document.getElementById('projectTitle'),
    subtitle: document.getElementById('subtitle'),
    projectMeta: document.getElementById('projectMeta'),
    heroImage: document.getElementById('heroImage'),
    overview: document.getElementById('overview'),
    goals: document.getElementById('goals'),
    challengeText: document.getElementById('challengeText'),
    solutionText: document.getElementById('solutionText'),
    roleResponsibilities: document.getElementById('roleResponsibilities'),
    features: document.getElementById('features'),
    tech: document.getElementById('tech'),
    resultsGrid: document.getElementById('resultsGrid'),
    timeline: document.getElementById('timeline'),
    links: document.getElementById('links'),
    gallery: document.getElementById('gallery'),
    modal: document.getElementById('imgModal'),
    modalImage: document.getElementById('modalImage'),
    closeModal: document.querySelector('.close')
};

// Sample data for remaining sections
const projectEnhancements = {
    challenge: "The original antenna control unit struggled with connection stability in harsh marine conditions (up to force 10 winds), used low-grade sensors that failed in high-vibration environments, and had monolithic firmware that was difficult to maintain and scale.",
    solution: "We completely redesigned the system with industrial-grade sensors, implemented a 6-schedule PID loop with deterministic timing, added EKF-based sensor fusion for stability, and created a modular firmware architecture using FreeRTOS for better maintainability and scalability.",
    role: [
        {
            icon: "fas fa-microchip",
            title: "Firmware Architecture",
            description: "Designed modular firmware structure with FreeRTOS, implementing drivers, middleware, and application layers"
        },
        {
            icon: "fas fa-pcb",
            title: "PCB Design & Layout",
            description: "Created multi-layer board with optimized routing, power isolation, and EMC/EMI improvements"
        },
        {
            icon: "fas fa-calculator",
            title: "Sensor Fusion Algorithm",
            description: "Implemented Extended Kalman Filter for gyro + accelerometer fusion in high-vibration conditions"
        },
        {
            icon: "fas fa-vial",
            title: "System Testing",
            description: "Conducted real-world testing in marine environments to validate performance under force 10 conditions"
        }
    ],
    results: [
        { value: "99.2%", label: "Connection Stability" },
        { value: "60%", label: "Performance Improvement" },
        { value: "Force 10", label: "Weather Resistance" },
        { value: "-40%", label: "Power Consumption" }
    ]
};

// Icon and display name mappings
const iconMap = {
    github: 'fab fa-github',
    demo: 'fas fa-external-link-alt',
    pdf_report: 'fas fa-file-pdf',
    documentation: 'fas fa-book',
    website: 'fas fa-globe',
    video: 'fas fa-play-circle',
    download: 'fas fa-download',
    linkedin: 'fab fa-linkedin',
    twitter: 'fab fa-twitter',
    youtube: 'fab fa-youtube'
};

const displayNameMap = {
    github: 'GitHub Repository',
    demo: 'Live Demo',
    pdf_report: 'PDF Report',
    documentation: 'Documentation',
    website: 'Project Website',
    video: 'Video Demo',
    download: 'Download',
    linkedin: 'LinkedIn',
    twitter: 'Twitter',
    youtube: 'YouTube'
};

// Utility Functions
function getIconForLink(key) {
    return iconMap[key] || 'fas fa-link';
}

function getDisplayName(key) {
    return displayNameMap[key] || key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ');
}

function enableImagePopup(img) {
    img.style.cursor = "pointer";
    img.onclick = () => {
        elements.modalImage.src = img.src;
        elements.modal.style.display = 'flex';
    };
}

// Render Functions
function renderProjectMeta(project) {
    const duration = calculateProjectDuration(project.timeline.start, project.timeline.end);
    const metaHtml = `
        <div class="meta-item">
            <i class="fas fa-calendar"></i> ${project.timeline.start} - ${project.timeline.end}
        </div>
        <div class="meta-item">
            <i class="fas fa-clock"></i> ${duration}
        </div>
        <div class="meta-item">
            <i class="fas fa-layer-group"></i> ${project.details.technologies.length} Technologies
        </div>
        <div class="meta-item">
            <i class="fas fa-star"></i> ${project.details.key_features.length} Features
        </div>
    `;
    elements.projectMeta.innerHTML = metaHtml;
}

function renderGoals(goals) {
    elements.goals.innerHTML = goals.map(goal => 
        `<li><i class="fas fa-check-circle"></i>${goal}</li>`
    ).join('');
}

function renderChallengeSolution(challenge, solution) {
    elements.challengeText.textContent = challenge;
    elements.solutionText.textContent = solution;
}

function renderRoleResponsibilities(roles) {
    elements.roleResponsibilities.innerHTML = roles.map(role => `
        <div class="responsibility">
            <i class="${role.icon}"></i>
            <h4>${role.title}</h4>
            <p>${role.description}</p>
        </div>
    `).join('');
}

function renderFeatures(features) {
    elements.features.innerHTML = features.map(feature => 
        `<li>${feature}</li>`
    ).join('');
}

function renderTechStack(technologies) {
    elements.tech.innerHTML = technologies.map(tech => 
        `<div class="tech-item">${tech}</div>`
    ).join('');
}

function renderResults(results) {
    elements.resultsGrid.innerHTML = results.map(result => `
        <div class="result-item">
            <div class="result-value">${result.value}</div>
            <div class="result-label">${result.label}</div>
        </div>
    `).join('');
}

function renderTimeline(milestones) {
    elements.timeline.innerHTML = milestones.map(milestone => `
        <div class="milestone">
            <div class="milestone-date">${milestone.date}</div>
            <div class="milestone-title">${milestone.title}</div>
            <div class="milestone-description">${milestone.description}</div>
        </div>
    `).join('');
}

function renderLinks(links) {
    elements.links.innerHTML = Object.keys(links).map(key => `
        <a href="${links[key]}" class="link-item" target="_blank" rel="noopener noreferrer">
            <div class="link-icon">
                <i class="${getIconForLink(key)}"></i>
            </div>
            <div class="link-text">${getDisplayName(key)}</div>
            <i class="fas fa-chevron-right"></i>
        </a>
    `).join('');
}

function renderGallery(images) {
    elements.gallery.innerHTML = images.map(img => {
        const image = document.createElement('img');
        image.src = img;
        image.alt = 'Project image';
        enableImagePopup(image);
        return image.outerHTML;
    }).join('');
}

// Helper Functions
function calculateProjectDuration(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                  (endDate.getMonth() - startDate.getMonth());
    return months <= 1 ? "1 Month" : `${months} Months`;
}

// Main initialization
function initializePage(project) {
    // Basic info
    elements.projectTitle.textContent = project.title;
    elements.subtitle.textContent = project.short_description;
    elements.overview.textContent = project.details.overview;
    
    // Hero image
    elements.heroImage.src = project.thumbnail;
    enableImagePopup(elements.heroImage);
    
    // Render all sections
    renderProjectMeta(project);
    renderGoals(project.details.goals);
    renderChallengeSolution(projectEnhancements.challenge, projectEnhancements.solution);
    renderRoleResponsibilities(projectEnhancements.role);
    renderFeatures(project.details.key_features);
    renderTechStack(project.details.technologies);
    renderResults(projectEnhancements.results);
    renderTimeline(project.timeline.milestones);
    renderLinks(project.links);
    renderGallery(project.details.media.images);
}

// Event Listeners
elements.closeModal.onclick = () => {
    elements.modal.style.display = 'none';
};

elements.modal.onclick = (e) => {
    if (e.target === elements.modal) {
        elements.modal.style.display = 'none';
    }
};

// Fetch and initialize
fetch('project.json')
    .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
    })
    .then(data => initializePage(data.project))
    .catch(err => {
        console.error('Error loading project data:', err);
        elements.projectTitle.textContent = 'Error Loading Project';
        elements.subtitle.textContent = 'Please check the project.json file';
    });