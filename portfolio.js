// Portfolio Main Page JavaScript

// Sample projects data
const projects = [
  {
    id: "satellite-acu-001",
    title: "Antenna Control Unit Redesign",
    description: "Redesigned marine satellite ACU with industrial sensors and modular firmware architecture",
    image: "images/price_1.png",
    link: "project.html",
    tech: ["STM32", "C/C++", "FreeRTOS", "PCB Design", "EKF"],
    category: "Embedded Systems"
  },
  {
    id: "satellite-comm-002",
    title: "Satellite Communication System",
    description: "High-reliability communication system for remote monitoring applications",
    image: "images/project2.jpg",
    link: "#",
    tech: ["LoRa", "ESP32", "C++", "Mesh Networking"],
    category: "IoT"
  },
  {
    id: "marine-nav-003",
    title: "Marine Navigation Computer",
    description: "Rugged navigation system with sensor fusion for precise positioning",
    image: "images/project3.jpg",
    link: "#",
    tech: ["ARM Cortex-M7", "RTOS", "GPS", "IMU"],
    category: "Navigation"
  },
  {
    id: "power-monitor-004",
    title: "Industrial Power Monitor",
    description: "Real-time power monitoring system with predictive maintenance",
    image: "images/project4.jpg",
    link: "#",
    tech: ["STM32", "Modbus", "ADC", "WiFi"],
    category: "Industrial"
  },
  {
    id: "drone-flight-005",
    title: "Drone Flight Controller",
    description: "Custom flight controller with advanced stabilization algorithms",
    image: "images/project5.jpg",
    link: "#",
    tech: ["STM32F4", "C++", "PID", "IMU"],
    category: "Robotics"
  },
  {
    id: "smart-sensor-006",
    title: "Smart Sensor Network",
    description: "Wireless sensor network for environmental monitoring",
    image: "images/project6.jpg",
    link: "#",
    tech: ["Zephyr OS", "BLE", "LoRa", "Sensors"],
    category: "IoT"
  }
];

// DOM Elements
const projectsGrid = document.getElementById('projectsGrid');
const contactForm = document.getElementById('contactForm');

// Render Projects
function renderProjects() {
  projectsGrid.innerHTML = projects.map(project => `
    <a href="${project.link}" class="project-card">
      <div class="project-image">
        <i class="fas fa-microchip"></i>
      </div>
      <div class="project-content">
        <h3>${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
          ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <div class="project-link">
          View Project <i class="fas fa-arrow-right"></i>
        </div>
      </div>
    </a>
  `).join('');
}

// Form Submission
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! I\'ll get back to you soon.');
    this.reset();
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  renderProjects();
  
  // Update current year in footer
  const yearElement = document.querySelector('.footer-bottom p');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
  }
});