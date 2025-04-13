// Welcome Modal functionality
function showWelcomeModal() {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
        document.getElementById('welcomeModal').classList.add('active');
    }
}

function skipWelcome(dontShowAgain) {
    if (dontShowAgain && document.getElementById('dontShowAgain').checked) {
        localStorage.setItem('hasSeenWelcome', 'true');
    }
    document.getElementById('welcomeModal').classList.remove('active');
}

function continueToGuide() {
    skipWelcome(true);
    showHelp();
}

// Show welcome modal on page load
document.addEventListener('DOMContentLoaded', showWelcomeModal);

// Help functionality
function showHelp() {
    document.getElementById('helpModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideHelp() {
    document.getElementById('helpModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modals with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('welcomeModal').classList.remove('active');
        hideHelp();
    }
});

// Close modals when clicking outside
document.getElementById('welcomeModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('welcomeModal')) {
        skipWelcome(false);
    }
});

document.getElementById('helpModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('helpModal')) {
        hideHelp();
    }
});

// Template selection functionality
document.getElementById('template').addEventListener('change', function() {
    const selectedTemplate = this.value;
    // Update thumbnails
    document.querySelectorAll('.template-thumb').forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.dataset.template === selectedTemplate) {
            thumb.classList.add('active');
        }
    });
    generateCoverPage();
});

// Template thumbnail click handlers
document.querySelectorAll('.template-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
        const templateValue = thumb.dataset.template;
        // Update select element
        document.getElementById('template').value = templateValue;
        // Update active state
        document.querySelectorAll('.template-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        // Generate new preview
        generateCoverPage();
    });
});

// Template switching with arrow keys
document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea')) return;
    
    if (e.key === 'ArrowLeft') {
        switchTemplate('prev');
    } else if (e.key === 'ArrowRight') {
        switchTemplate('next');
    }
});

function switchTemplate(direction) {
    const templates = ['classic', 'modern', 'minimal', 'professional'];
    const current = document.getElementById('template').value;
    const currentIndex = templates.indexOf(current);
    let newIndex;

    if (direction === 'next') {
        newIndex = (currentIndex + 1) % templates.length;
    } else {
        newIndex = (currentIndex - 1 + templates.length) % templates.length;
    }

    // Update template selection
    const newTemplate = templates[newIndex];
    document.getElementById('template').value = newTemplate;
    
    // Update thumbnail selection
    document.querySelectorAll('.template-thumb').forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.dataset.template === newTemplate) {
            thumb.classList.add('active');
        }
    });
    
    // Generate new preview
    generateCoverPage();
}