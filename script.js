// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const navLinks = document.querySelectorAll('.nav-link');

const toggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.querySelector(".theme-text");

// Toggle mobile menu
mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
});

// Close menu when clicking overlay
overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// Close sidebar when clicking nav links on mobile
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    });
});

// Active navigation link on click
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


// ===================================
// CERTIFICATES MODAL FUNCTIONALITY
// ===================================

const viewAllBtn = document.getElementById('viewAllCertificates');
const modal = document.getElementById('certificatesModal');
const closeModalBtn = document.getElementById('closeModal');

// Open modal
if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close modal
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===================================
// BARANGAY DOCUMENTATION MODAL
// ===================================

const viewBarangayBtn = document.getElementById('viewBarangayDocs');
const barangayModal = document.getElementById('barangayDocsModal');
const closeBarangayBtn = document.getElementById('closeBarangayModal');

// Open Barangay modal
if (viewBarangayBtn) {
    viewBarangayBtn.addEventListener('click', () => {
        barangayModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close Barangay modal
function closeBarangayModal() {
    barangayModal.classList.remove('active');
    document.body.style.overflow = '';
}

if (closeBarangayBtn) {
    closeBarangayBtn.addEventListener('click', closeBarangayModal);
}

// Close modal when clicking outside
barangayModal.addEventListener('click', (e) => {
    if (e.target === barangayModal) {
        closeBarangayModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (lightbox.classList.contains('active')) {
            closeLightbox();
        }
        if (barangayModal.classList.contains('active')) {
            closeBarangayModal();
        }
        if (docLightbox.classList.contains('active')) {
            closeDocLightbox();
        }
    }
});

// ===================================
// IMAGE LIGHTBOX FUNCTIONALITY
// ===================================

const lightbox = document.getElementById('imageLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxCounter = document.getElementById('lightboxCounter');
const closeLightboxBtn = document.getElementById('closeLightbox');
const prevBtn = document.getElementById('prevCert');
const nextBtn = document.getElementById('nextCert');

// Certificate data
const certificates = [
    {
        src: 'Assets/by11.png',
        title: '11th Bicol Youth Congress in Information Technology',
        date: 'April 20-21, 2023'
    },
    {
        src: 'Assets/by-12.png',
        title: '12th Bicol Youth Congress in Information Technology',
        date: 'April 18-19, 2024'
    },
    {
        src: 'Assets/by-13.png',
        title: '13th Bicol Youth Congress in Information Technology',
        date: 'April 10-11, 2025'
    },
    {
        src: 'Assets/by11-2.png',
        title: '11th Bicol Youth Congress in Information Technology - Special Recognition',
        date: 'April 20-21, 2023'
    }
];

let currentCertIndex = 0;

// Open lightbox
function openLightbox(index) {
    currentCertIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Update lightbox content
function updateLightboxContent() {
    const cert = certificates[currentCertIndex];
    lightboxImage.src = cert.src;
    lightboxCaption.textContent = `${cert.title} - ${cert.date}`;
    lightboxCounter.textContent = `${currentCertIndex + 1} / ${certificates.length}`;
}

// Navigate to previous certificate
function showPrevCert() {
    currentCertIndex = (currentCertIndex - 1 + certificates.length) % certificates.length;
    updateLightboxContent();
}

// Navigate to next certificate
function showNextCert() {
    currentCertIndex = (currentCertIndex + 1) % certificates.length;
    updateLightboxContent();
}

// Event listeners for lightbox
closeLightboxBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrevCert);
nextBtn.addEventListener('click', showNextCert);

// Click on lightbox background to close
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            showPrevCert();
        } else if (e.key === 'ArrowRight') {
            showNextCert();
        }
    }
});

// Add click listeners to certificate previews
document.querySelectorAll('.certificate-preview').forEach((preview, index) => {
    preview.addEventListener('click', () => {
        openLightbox(index);
    });
});

// Add click listeners to "View Certificate" buttons
document.querySelectorAll('.view-cert-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(btn.getAttribute('data-cert-index'));
        openLightbox(index);
    });
});

// ===================================
// DOCUMENTATION LIGHTBOX FUNCTIONALITY
// ===================================

const docLightbox = document.getElementById('docLightbox');
const docLightboxImage = document.getElementById('docLightboxImage');
const docLightboxCaption = document.getElementById('docLightboxCaption');
const docLightboxCounter = document.getElementById('docLightboxCounter');
const closeDocLightboxBtn = document.getElementById('closeDocLightbox');
const prevDocBtn = document.getElementById('prevDoc');
const nextDocBtn = document.getElementById('nextDoc');

// Documentation data
const documentationPages = [
    { src: 'Assets/barangay/user/usertype.png', title: 'Page 1', subtitle: 'User Type' },
    { src: 'Assets/barangay/user/user.png', title: 'Page 2', subtitle: 'User Login' },
    { src: 'Assets/barangay/user/register.png', title: 'Page 3', subtitle: 'Resgister Account' },
    { src: 'Assets/barangay/user/dashboard.png', title: 'Page 4', subtitle: 'User Dashboard' },
    { src: 'Assets/barangay/user/document.png', title: 'Page 5', subtitle: 'Types of Documents' },
    { src: 'Assets/barangay/user/request.png', title: 'Page 6', subtitle: 'Request Documents' },
    { src: 'Assets/barangay/user/track.png', title: 'Page 7', subtitle: 'Track Application Request' },
    { src: 'Assets/barangay/user/profile.png', title: 'Page 8', subtitle: 'Users Profile' },
    { src: 'Assets/barangay/admin/admin.png', title: 'Page 9', subtitle: 'Admin Login' },
    { src: 'Assets/barangay/admin/admin-dashboard.png', title: 'Page 10', subtitle: 'Admin Dashboard' },
    { src: 'Assets/barangay/admin/admin-request.png', title: 'Page 11', subtitle: 'Interface for Request Documents' },
    { src: 'Assets/barangay/admin/admin-approve.png', title: 'Page 12', subtitle: 'Interface for Approve Documents' },
    { src: 'Assets/barangay/admin/admin-reject.png', title: 'Page 13', subtitle: 'Interface for Rejected Documents' },
    { src: 'Assets/barangay/admin/admin-userregister.png', title: 'Page 14', subtitle: 'Registered User' },
    { src: 'Assets/barangay/admin/admin-viewinfo.png', title: 'Page 15', subtitle: 'View Users Information' }
];

let currentDocIndex = 0;

// Open documentation lightbox
function openDocLightbox(index) {
    currentDocIndex = index;
    updateDocLightboxContent();
    docLightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close documentation lightbox
function closeDocLightbox() {
    docLightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Update documentation lightbox content
function updateDocLightboxContent() {
    const doc = documentationPages[currentDocIndex];
    docLightboxImage.src = doc.src;
    docLightboxCaption.textContent = `${doc.title} - ${doc.subtitle}`;
    docLightboxCounter.textContent = `${currentDocIndex + 1} / ${documentationPages.length}`;
}

// Navigate to previous documentation page
function showPrevDoc() {
    currentDocIndex = (currentDocIndex - 1 + documentationPages.length) % documentationPages.length;
    updateDocLightboxContent();
}

// Navigate to next documentation page
function showNextDoc() {
    currentDocIndex = (currentDocIndex + 1) % documentationPages.length;
    updateDocLightboxContent();
}

// Event listeners for documentation lightbox
closeDocLightboxBtn.addEventListener('click', closeDocLightbox);
prevDocBtn.addEventListener('click', showPrevDoc);
nextDocBtn.addEventListener('click', showNextDoc);

// Click on lightbox background to close
docLightbox.addEventListener('click', (e) => {
    if (e.target === docLightbox) {
        closeDocLightbox();
    }
});

// Keyboard navigation for documentation
document.addEventListener('keydown', (e) => {
    if (docLightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            showPrevDoc();
        } else if (e.key === 'ArrowRight') {
            showNextDoc();
        }
    }
});

// Add click listeners to documentation previews
document.querySelectorAll('.documentation-preview').forEach((preview, index) => {
    preview.addEventListener('click', () => {
        openDocLightbox(index);
    });
});

// Add click listeners to "View Full Page" buttons
document.querySelectorAll('.view-doc-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(btn.getAttribute('data-doc-index'));
        openDocLightbox(index);
    });
});