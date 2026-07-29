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
                ? `rgba(224, 86, 253, ${this.alpha})`
                : `rgba(108, 92, 231, ${this.alpha * 0.7})`;
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
                        ? `rgba(224, 86, 253, ${0.15 * (1 - dist / 120)})`
                        : `rgba(108, 92, 231, ${0.1 * (1 - dist / 120)})`;
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
        nav_projects: "Proyek & Portfolio",
        nav_skills: "Keahlian",
        nav_contact: "Kontak",
        hero_badge: "Spesialis Operasional & Pengendalian",
        hero_title_1: "Mengoptimalkan",
        hero_title_2: "Efisiensi Operasional & Manajemen Keuangan",
        hero_desc: "Spesialis dalam Pengendalian Mutu Produksi, Digitalisasi Kearsipan Administrasi Keuangan, serta Pengendalian Inventaris Berbasis Analisis Risiko (ERM) & Data Real-Time.",
        btn_explore_projects: "Jelajahi Proyek",
        btn_contact_me: "Hubungi Saya",
        stat_projects: "Proyek Utama",
        stat_accuracy: "Akurasi Laporan",
        stat_mitigation: "Mitigasi Risiko Utama",
        profile_role: "Spesialis Operasional & Keuangan",
        badge_erm: "Analisis ERM",
        badge_efficiency: "Efisiensi Evaluasi",
        badge_archiving: "Digitalisasi Arsip",
        badge_lpj: "Akurasi LPJ",
        about_subtitle: "PROFIL PROFESIONAL",
        about_title: "Komitmen Terhadap Kualitas & Presisi Operasional",
        card1_title: "Pengendalian Mutu Produksi",
        card1_desc: "Memiliki keahlian mengawasi dan menganalisis alur produksi dari tahap cutting, penyablonan, penjahitan, hingga finishing dengan metode ERM untuk memetakan dan mengeliminasi risiko operasional.",
        card2_title: "Administrasi & Digitalisasi Arsip",
        card2_desc: "Berpengalaman mengelola administrasi internal instansi pemerintahan, mengklasifikasikan dokumen negara secara digital, dan menyusun Laporan Pertanggungjawaban (LPJ) secara sistematis.",
        card3_title: "Inventory Control & Analytics",
        card3_desc: "Mengendalikan perputaran stok gudang retail secara real-time, meminimalkan selisih nilai opname barang, serta memanfaatkan data analisis transaksi harian untuk pengadaan barang presisi.",
        projects_subtitle: "REKAM JEJAK KERJA",
        projects_title: "Proyek & Hasil Konkret",
        filter_all: "Semua Proyek",
        filter_quality: "Pengendalian Mutu",
        filter_finance: "Keuangan & Arsip",
        filter_inventory: "Inventory Control",
        p1_title: "Pengendalian Mutu & Operasional Produksi",
        p1_summary: "Mengawasi alur produksi garmen (cutting, sablon, penjahitan, finishing) serta memetakan 4 risiko operasional utama menggunakan skema rekapitulasi Excel & metode ERM.",
        p2_title: "Administrasi Keuangan & Digitalisasi Kearsipan",
        p2_summary: "Mengelola administrasi internal instansi, digitalisasi arsip dokumen negara secara sistematis, serta menyusun LPJ Keuangan bulanan hingga tahunan dengan akurasi tinggi.",
        p3_title: "Pengendalian Inventaris & Analisis Penjualan",
        p3_summary: "Mengendalikan perputaran stok gudang retail, memantau transaksi penjualan harian, serta mengoptimalkan manajemen stok real-time guna mencegah rugi opname.",
        btn_detail: "Lihat Detail Proyek",
        skills_subtitle: "KAPABILITAS KERJA",
        skills_title: "Keahlian & Alat Kerja",
        skill_group_1: "Manajemen & Operasional",
        skill_group_2: "Keuangan & Perangkat Lunak",
        s1: "Pengendalian Mutu (Quality Control)",
        s2: "Analisis Risiko ERM (Enterprise Risk Management)",
        s3: "Pengendalian Inventaris (Inventory Control)",
        s4: "Administrasi Keuangan & LPJ",
        s5: "Microsoft Excel & Olah Data Rekapitulasi",
        s6: "Digitalisasi & Manajemen Arsip Negara",
        contact_subtitle: "KONEKSI & KOLABORASI",
        contact_title: "Mari Terhubung & Bekerja Sama",
        contact_info_title: "Informasi Kontak",
        contact_info_desc: "Saya selalu terbuka untuk berdiskusi mengenai peluang kerja, proyek pengendalian operasional, maupun konsultasi manajemen keuangan.",
        c_email: "Email Profesional",
        c_location: "Lokasi",
        lbl_name: "Nama Lengkap",
        lbl_email: "Alamat Email",
        lbl_subject: "Subjek Pesan",
        lbl_message: "Isi Pesan",
        btn_send: "Kirim Pesan"
    },
    en: {
        nav_about: "About",
        nav_projects: "Projects & Portfolio",
        nav_skills: "Skills",
        nav_contact: "Contact",
        hero_badge: "Operations & Control Specialist",
        hero_title_1: "Optimizing",
        hero_title_2: "Operational Efficiency & Financial Management",
        hero_desc: "Specializing in Production Quality Control, Financial Administrative Archiving Digitalization, and Real-Time Risk-Based Inventory Control (ERM).",
        btn_explore_projects: "Explore Projects",
        btn_contact_me: "Contact Me",
        stat_projects: "Key Projects",
        stat_accuracy: "Report Accuracy",
        stat_mitigation: "Primary Risk Mitigations",
        profile_role: "Operational & Finance Specialist",
        badge_erm: "ERM Analysis",
        badge_efficiency: "Evaluation Efficiency",
        badge_archiving: "Archive Digitalization",
        badge_lpj: "LPJ Accuracy",
        about_subtitle: "PROFESSIONAL PROFILE",
        about_title: "Commitment to Operational Quality & Precision",
        card1_title: "Production Quality Control",
        card1_desc: "Expertise in monitoring and analyzing production workflows from fabric cutting, screen printing, sewing, to finishing using ERM methodology to map and eliminate operational risks.",
        card2_title: "Administration & Digital Archiving",
        card2_desc: "Experienced in managing government agency internal administration, classifying state documents digitally, and compiling systematic Financial Accountability Reports (LPJ).",
        card3_title: "Inventory Control & Analytics",
        card3_desc: "Controlling retail warehouse stock turnover in real-time, minimizing stock count variances, and leveraging daily sales analytics data for precision procurement.",
        projects_subtitle: "TRACK RECORD",
        projects_title: "Key Projects & Deliverables",
        filter_all: "All Projects",
        filter_quality: "Quality Control",
        filter_finance: "Finance & Archiving",
        filter_inventory: "Inventory Control",
        p1_title: "Quality Control & Production Operations",
        p1_summary: "Supervised garment production workflow and mapped 4 primary operational risks using Microsoft Excel data summarization and ERM methods.",
        p2_title: "Financial Administration & Digital Archiving",
        p2_summary: "Managed internal agency administration, systematic state document digitalization, and created highly accurate monthly/annual financial accountability reports.",
        p3_title: "Inventory Control & Sales Analytics",
        p3_summary: "Controlled retail warehouse inventory rotation, monitored daily transactions, and optimized real-time stock management to prevent stocktake loss.",
        btn_detail: "View Project Details",
        skills_subtitle: "CAPABILITIES",
        skills_title: "Skills & Toolset",
        skill_group_1: "Management & Operations",
        skill_group_2: "Finance & Software",
        s1: "Quality Control (QC)",
        s2: "Enterprise Risk Management (ERM)",
        s3: "Inventory Control",
        s4: "Financial Administration & LPJ",
        s5: "Microsoft Excel & Data Summarization",
        s6: "State Archive Digitalization",
        contact_subtitle: "CONNECT & COLLABORATE",
        contact_title: "Let's Connect & Collaborate",
        contact_info_title: "Contact Info",
        contact_info_desc: "Always open to discussing career opportunities, operational control initiatives, or financial management consultations.",
        c_email: "Professional Email",
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
                    card.style.display = 'flex';
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
    toast.innerHTML = `<i class='bx bx-check-circle' style='color:#e056fd; font-size:1.4rem;'></i> <span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4000);
}
