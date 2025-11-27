// DOM Elements
const elements = {
    projectTitle: document.getElementById('projectTitle'),
    subtitle: document.getElementById('subtitle'),
    projectMeta: document.getElementById('projectMeta'),
    heroImage: document.getElementById('heroImage'),
    overview: document.getElementById('overview'),
    goals: document.getElementById('goals'),
    features: document.getElementById('features'),
    tech: document.getElementById('tech'),
    timeline: document.getElementById('timeline'),
    links: document.getElementById('links'),
    gallery: document.getElementById('gallery'),
    modal: document.getElementById('imgModal'),
    modalImage: document.getElementById('modalImage'),
    closeModal: document.querySelector('.close')
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
    const metaHtml = `
        <div class="meta-item">
            <i class="fas fa-calendar"></i> ${project.timeline.start} - ${project.timeline.end}
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
        `<li>${goal}</li>`
    ).join('');
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

// Main initialization
function initializePage(project) {
    // Basic info
    elements.projectTitle.textContent = project.title;
    elements.subtitle.textContent = project.short_description;
    elements.overview.textContent = project.details.overview;
    
    // Hero image
    elements.heroImage.src = project.thumbnail;
    enableImagePopup(elements.heroImage);
    
    // Render sections
    renderProjectMeta(project);
    renderGoals(project.details.goals);
    renderFeatures(project.details.key_features);
    renderTechStack(project.details.technologies);
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