/* ==========================================================================
   DEA PUTRI ANDINI - WEB PORTFOLIO SCRIPT
   Features: Particles, Theme & Language Toggles, Modals, Filter, Counters
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initTheme();
    initLanguage();
    initNavigation();
    initStatCounters();
    initProjectFilter();
    initModals();
    initContactForm();
});

/* --------------------------------------------------------------------------
   1. Particle Canvas System
   -------------------------------------------------------------------------- */
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = Math.floor((width * height) / 18000);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 2 + 1;
            this.alpha = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
            ctx.fillStyle = isDark
                ? `rgba(56, 189, 248, ${this.alpha})`
                : `rgba(37, 99, 235, ${this.alpha * 0.7})`;
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
                    ctx.strokeStyle = isDark
                        ? `rgba(56, 189, 248, ${0.15 * (1 - dist / 120)})`
                        : `rgba(37, 99, 235, ${0.1 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
}

/* --------------------------------------------------------------------------
   2. Theme Switcher (Dark / Light)
   -------------------------------------------------------------------------- */
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const savedTheme = localStorage.getItem('dpa_theme') || 'dark';

    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('dpa_theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.className = 'bx bx-moon';
        } else {
            themeIcon.className = 'bx bx-sun';
        }
    }
}

/* --------------------------------------------------------------------------
   3. Bilingual Engine (Indonesian / English)
   -------------------------------------------------------------------------- */
const translations = {
    id: {
        nav_about: "Tentang",
        nav_education: "Pendidikan & Sertifikasi",
        nav_experience: "Pengalaman",
        nav_skills: "Keahlian",
        nav_contact: "Kontak",
        hero_badge: "S1 Manajemen Operasi | IPK 3.70",
        hero_title_1: "Mengoptimalkan",
        hero_title_2: "Efisiensi Operasional & Manajemen Keuangan",
        hero_desc: "Lulusan Sarjana Manajemen Operasi dengan pengalaman magang dalam administrasi keuangan, pengelolaan data karyawan, pengarsipan dokumen, dan penyusunan laporan. Memiliki pengalaman observasi proses produksi garment, pemantauan kualitas, identifikasi risiko operasional, serta membantu proses QC dari produksi hingga finishing. Komunikatif, teliti, detail, dan mampu bekerja individu maupun tim.",
        btn_download_cv: "Unduh CV PDF",
        btn_contact_me: "Hubungi Saya",
        stat_projects: "Pengalaman Utama",
        stat_cert: "Sertifikat Lisensi",
        about_subtitle: "PROFIL PROFESIONAL",
        about_title: "Komitmen Terhadap Kualitas & Presisi Operasional",
        about_full_summary: "Lulusan Sarjana Manajemen Operasi dengan pengalaman magang dalam administrasi keuangan, pengelolaan data karyawan, pengarsipan dokumen, dan penyusunan laporan. Memiliki pengalaman observasi proses produksi garment, pemantauan kualitas, identifikasi risiko operasional, serta membantu proses QC dari produksi hingga finishing. Komunikatif, teliti, detail, dan mampu bekerja individu maupun tim.",
        card1_title: "Pengendalian Mutu & QC Garmen",
        card1_desc: "Mengobservasi alur produksi garmen (cutting, sablon/bordir, jahit, QC, finishing), memantau kualitas produk, dan mengidentifikasi risiko operasional seperti bahan cacat dan kerusakan mesin.",
        card2_title: "Keuangan & Digitalisasi Kearsipan",
        card2_desc: "Mengelola administrasi penggajian & tunjangan (PNS, PPPK, Honorarium), menyusun LPJ Keuangan bulanan, triwulan, dan tahunan, serta mengelola kearsipan & digitalisasi dokumen.",
        card3_title: "Inventory Control & Data Admin",
        card3_desc: "Mengelola stok dan inventaris toko secara efisien, melakukan pencatatan keluar-masuk barang, menginput data administrasi, dan menganalisis data penjualan harian.",
        projects_subtitle: "PENGALAMAN KERJA",
        projects_title: "Pengalaman Magang & Kerja",
        filter_all: "Semua Pengalaman",
        filter_quality: "Pengendalian Mutu",
        filter_finance: "Keuangan & Arsip",
        filter_inventory: "Inventory Control",
        btn_detail: "Rincian Lengkap",
        skills_subtitle: "KAPABILITAS KERJA",
        skills_title: "Keahlian (Skills)",
        contact_subtitle: "KONEKSI & KOLABORASI",
        contact_title: "Mari Terhubung & Bekerja Sama",
        contact_info_title: "Informasi Kontak",
        contact_info_desc: "Saya terbuka untuk peluang karir, posisi manajemen operasi, administrasi keuangan, quality control, maupun kerja sama profesional.",
        c_location: "Lokasi",
        lbl_name: "Nama Lengkap",
        lbl_email: "Alamat Email",
        lbl_subject: "Subjek Pesan",
        lbl_message: "Isi Pesan",
        btn_send: "Kirim Pesan"
    },
    en: {
        nav_about: "About",
        nav_education: "Education & Certifications",
        nav_experience: "Experience",
        nav_skills: "Skills",
        nav_contact: "Contact",
        hero_badge: "Bachelor in Operations Management | GPA 3.70",
        hero_title_1: "Optimizing",
        hero_title_2: "Operational Efficiency & Financial Management",
        hero_desc: "Bachelor's graduate in Operations Management with internship experience in financial administration, employee data management, document archiving, and report preparation. Possesses experience observing garment production workflows, quality monitoring, operational risk identification, and assisting QC from production to finishing. Communicative, detail-oriented, and able to work independently or in a team.",
        btn_download_cv: "Download CV PDF",
        btn_contact_me: "Contact Me",
        stat_projects: "Key Experiences",
        stat_cert: "Certifications",
        about_subtitle: "PROFESSIONAL PROFILE",
        about_title: "Commitment to Operational Quality & Precision",
        about_full_summary: "Bachelor's graduate in Operations Management with internship experience in financial administration, employee data management, document archiving, and report preparation. Possesses experience observing garment production workflows, quality monitoring, operational risk identification, and assisting QC from production to finishing. Communicative, detail-oriented, and able to work independently or in a team.",
        card1_title: "Quality Control & Garment QC",
        card1_desc: "Observed garment production processes (cutting, printing/embroidery, sewing, QC, finishing), monitored product quality, and identified operational risks such as material defects and machinery downtime.",
        card2_title: "Finance & Digital Archiving",
        card2_desc: "Managed payroll and allowance administration (PNS, PPPK, Honorarium), prepared monthly/quarterly/annual LPJ reports, and managed document archiving & digitalization.",
        card3_title: "Inventory Control & Data Admin",
        card3_desc: "Managed store stock and inventory efficiently, monitored stock movements, updated administrative data, and analyzed daily sales records.",
        projects_subtitle: "WORK TRACK RECORD",
        projects_title: "Internship & Work Experience",
        filter_all: "All Experiences",
        filter_quality: "Quality Control",
        filter_finance: "Finance & Archiving",
        filter_inventory: "Inventory Control",
        btn_detail: "View Full Details",
        skills_subtitle: "CAPABILITIES",
        skills_title: "Skills & Toolset",
        contact_subtitle: "CONNECT & COLLABORATE",
        contact_title: "Let's Connect & Collaborate",
        contact_info_title: "Contact Info",
        contact_info_desc: "Open for career opportunities in operations management, financial administration, quality control, or professional collaboration.",
        c_location: "Location",
        lbl_name: "Full Name",
        lbl_email: "Email Address",
        lbl_subject: "Subject",
        lbl_message: "Message",
        btn_send: "Send Message"
    }
};

function initLanguage() {
    const langBtn = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');
    let currentLang = localStorage.getItem('dpa_lang') || 'id';

    applyLanguage(currentLang);

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'id' ? 'en' : 'id';
        localStorage.setItem('dpa_lang', currentLang);
        applyLanguage(currentLang);
    });

    function applyLanguage(lang) {
        langText.textContent = lang.toUpperCase();
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
    }
}

/* --------------------------------------------------------------------------
   4. Navigation & Scroll Handling
   -------------------------------------------------------------------------- */
function initNavigation() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    const menuIcon = document.getElementById('menu-icon');

    hamburgerBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            menuIcon.className = 'bx bx-x';
        } else {
            menuIcon.className = 'bx bx-menu';
        }
    });

    // Close menu when clicking nav items
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.className = 'bx bx-menu';
        });
    });
}

/* --------------------------------------------------------------------------
   5. Stat Counters Animation
   -------------------------------------------------------------------------- */
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let started = false;

    window.addEventListener('scroll', () => {
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;
        const rect = heroSection.getBoundingClientRect();
        
        if (rect.bottom >= 0 && !started) {
            started = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                let current = 0;
                const increment = target / 30;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.ceil(current);
                    }
                }, 40);
            });
        }
    });
}

/* --------------------------------------------------------------------------
   6. Project Category Filter
   -------------------------------------------------------------------------- */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   7. Modal Details Popup
   -------------------------------------------------------------------------- */
function initModals() {
    const openBtns = document.querySelectorAll('.open-modal-btn');
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.modal-close');
    const overlays = document.querySelectorAll('.modal-overlay');

    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal() {
        modals.forEach(m => m.classList.remove('active'));
        document.body.style.overflow = '';
    }

    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
    overlays.forEach(ov => ov.addEventListener('click', closeModal));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

/* --------------------------------------------------------------------------
   8. Contact Form Handling & Toast Notifications
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        
        showToast(`Terima kasih, ${name}! Pesan Anda telah terkirim.`);
        form.reset();
    });
}

function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class='bx bx-check-circle' style='color:#38bdf8; font-size:1.4rem;'></i> <span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4000);
}
