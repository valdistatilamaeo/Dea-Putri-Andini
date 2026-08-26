/* ==========================================================================
   DEA PUTRI ANDINI - WEB PORTFOLIO SCRIPT
   Concept: 60 FPS Dynamic Data Analytics Canvas & Smooth Scroll Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initAnalyticsCanvas60FPS();
    initTheme();
    initLanguage();
    initNavigation();
    initScrollReveal();
    initProjectFilter();
    initModals();
    initContactForm();
    initLanyardCard3D();
    initPhotoLightbox();
    initFloatingScatterAssembleEngine();
});

/* --------------------------------------------------------------------------
   1. 60 FPS Dynamic Auto Rising-Falling Data Analytics Bar Chart & Particle Engine
   -------------------------------------------------------------------------- */
function initAnalyticsCanvas60FPS() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Fine Cyber Ambient Particle Dust (~90 - 105 small subtle floating dots)
    let particles = [];
    const particleCount = Math.floor((width * height) / 10500);

    // Dynamic Auto Rising & Falling Data Analytics Bar Chart Pillars (8 - 10 bars)
    let barCharts = [];
    const barCount = Math.min(10, Math.max(6, Math.floor(width / 130)));
    for (let i = 0; i < barCount; i++) {
        barCharts.push({
            x: (width / barCount) * i + (width / (barCount * 3)),
            minHeight: Math.random() * 40 + 25,
            maxHeight: Math.random() * 110 + 65,
            currentHeight: 40,
            speed: Math.random() * 0.02 + 0.01,
            phase: Math.random() * Math.PI * 2,
            width: Math.random() * 14 + 10
        });
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.45;
            this.vy = (Math.random() - 0.5) * 0.45;
            this.radius = Math.random() * 1.2 + 0.7; // Micro cyber particle
            this.alpha = Math.random() * 0.28 + 0.12;
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
            ctx.fillStyle = `rgba(44, 39, 36, ${this.alpha * 0.5})`;
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // 60 FPS Locked Animation Loop
    let lastTime = performance.now();
    const fpsInterval = 1000 / 60; // 16.66ms per frame for locked 60 FPS

    function render(currentTime) {
        requestAnimationFrame(render);

        const elapsed = currentTime - lastTime;
        if (elapsed < fpsInterval) return; // Skip frame to enforce steady 60 FPS
        lastTime = currentTime - (elapsed % fpsInterval);

        ctx.clearRect(0, 0, width, height);

        // 1. Draw Dynamic Auto Rising & Falling Data Analytics Bar Charts (60 FPS Sine Oscillation)
        ctx.save();
        for (let i = 0; i < barCharts.length; i++) {
            const bar = barCharts[i];
            
            // Smooth Sine Oscillation for automatic rising and falling motion
            bar.phase += bar.speed;
            const progress = (Math.sin(bar.phase) + 1) / 2; // Normalized 0..1
            bar.currentHeight = bar.minHeight + progress * (bar.maxHeight - bar.minHeight);

            // Raised baseline position (+75px from screen bottom)
            const barY = height - bar.currentHeight - 75;

            // Soft Gradient Fill for the Bar Body
            const barGrad = ctx.createLinearGradient(bar.x, barY + bar.currentHeight, bar.x, barY);
            barGrad.addColorStop(0, 'rgba(44, 39, 36, 0.01)');
            barGrad.addColorStop(1, 'rgba(44, 39, 36, 0.07)');
            ctx.fillStyle = barGrad;
            ctx.fillRect(bar.x, barY, bar.width, bar.currentHeight);

            // Top Cap Accent Line (moves up and down dynamically)
            ctx.fillStyle = 'rgba(44, 39, 36, 0.22)';
            ctx.fillRect(bar.x, barY - 3, bar.width, 3);

            // Floating Cyber Node Dot hovering 8px above the top cap
            const dotY = barY - 9;
            const dotX = bar.x + bar.width / 2;
            ctx.beginPath();
            ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(44, 39, 36, 0.32)';
            ctx.fill();
        }
        ctx.restore();

        // 2. Draw 1 Single Gentle Undulating Data Analytics Line Graph Wave Silhouette (Y = height * 0.56)
        ctx.save();
        ctx.beginPath();
        const waveTime = currentTime * 0.0008;
        for (let x = 0; x < width; x += 15) {
            const y = (height * 0.56) + Math.sin(x * 0.004 + waveTime) * 25;
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.strokeStyle = 'rgba(44, 39, 36, 0.11)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.stroke();
        ctx.restore();

        // 3. Draw Fine Connecting Ambient Grid Nodes (Clean & Faint Network Lines)
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 95) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(44, 39, 36, ${0.07 * (1 - dist / 95)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        // Update & Draw Fine Micro Particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });
    }

    requestAnimationFrame(render);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
}

/* --------------------------------------------------------------------------
   2. Theme Engine (Locks to Soft Warm Cream Canvas & Dark Header)
   -------------------------------------------------------------------------- */
function initTheme() {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('dpa_theme', 'light');
}

/* --------------------------------------------------------------------------
   3. Bilingual Engine (100% Comprehensive Indonesian / English Coverage)
   -------------------------------------------------------------------------- */
const translations = {
    id: {
        nav_about: "Tentang",
        nav_education: "Pendidikan & Sertifikasi",
        nav_experience: "Pengalaman",
        nav_skills: "Keahlian",
        nav_contact: "Kontak",
        hero_headline_new: "Lulusan Manajemen | Operasi & Rantai Pasok | Manajemen Keuangan & Produksi | Analisis Data | Pengendalian Mutu",
        btn_download_cv: "Unduh CV PDF",
        btn_contact_me: "Hubungi Saya",
        stat_projects: "Pengalaman Utama",
        stat_gpa: "IPK Kelulusan (S1)",
        stat_cert: "Sertifikat Lisensi",
        about_subtitle: "PROFIL PROFESIONAL",
        about_title: "Lulusan Manajemen | Operasi & Rantai Pasok | Manajemen Keuangan & Produksi | Analisis Data | Pengendalian Mutu",
        about_full_summary: "Lulusan Sarjana Manajemen Operasi dengan pengalaman magang dalam administrasi keuangan, pengelolaan data karyawan, pengarsipan dokumen, dan penyusunan laporan. Memiliki pengalaman observasi proses produksi garment, pemantauan kualitas, identifikasi risiko operasional, serta membantu proses QC dari produksi hingga finishing. Komunikatif, teliti, detail, dan mampu bekerja individu maupun tim.",
        tech_stack_subtitle: "PERANGKAT LUNAK & ANALISIS TOOLS",
        tech_stack_title: "Keahlian Perangkat Lunak & Tools",
        tool_excel_desc: "Analisis Data, VLOOKUP, Pivot Table & Laporan Produksi",
        tool_powerbi_desc: "Visualisasi Business Intelligence & Dashboard Interaktif",
        tool_sheets_desc: "Pengolahan Data Cloud & Sistem Pengarsipan Digital",
        tool_word_desc: "Penyusunan LPJ Keuangan & Dokumentasi Perkantoran",
        tool_canva_desc: "Desain Visual, Tata Letak Produksi & Media Visual",
        tool_risk_desc: "Standar K3 Lingkungan Kerja & Manajemen Mutu (QC)",
        commitment_title: "KOMITMEN TERHADAP KUALITAS & PRESISI OPERASIONAL",
        card1_title: "QC & Pengendalian Mutu",
        card1_desc: "Mengobservasi alur produksi garmen (cutting, sablon, jahit, QC, finishing) & identifikasi risiko operasional.",
        card1_title_full: "Pengendalian Mutu & QC Garmen",
        card1_desc_full: "Mengobservasi alur produksi garmen (cutting, sablon/bordir, jahit, QC, finishing), memantau kualitas produk, dan mengidentifikasi risiko operasional seperti bahan cacat dan kerusakan mesin.",
        card2_title: "Keuangan & Arsip",
        card2_desc: "Mengelola administrasi penggajian, penyusunan LPJ Keuangan bulanan/tahunan, serta kearsipan digital.",
        card2_title_full: "Keuangan & Digitalisasi Kearsipan",
        card2_desc_full: "Mengelola administrasi penggajian & tunjangan (PNS, PPPK, Honorarium), menyusun LPJ Keuangan bulanan, triwulan, dan tahunan, serta mengelola kearsipan & digitalisasi dokumen.",
        card3_title: "Inventory & Admin",
        card3_desc: "Mengelola stok toko, pencatatan keluar-masuk barang, input data administrasi & analisis penjualan.",
        card3_title_full: "Inventory Control & Data Admin",
        card3_desc_full: "Mengelola stok dan inventaris toko secara efisien, melakukan pencatatan keluar-masuk barang, menginput data administrasi, dan menganalisis data penjualan harian.",
        edu_subtitle: "KUALIFIKASI AKADEMIK & LISENSI RESMI",
        edu_title: "Pendidikan Formal & Sertifikasi Resmi",
        edu_card_title: "Pendidikan Formal",
        edu_degree: "S1 Manajemen (Manajemen Operasi) | IPK 3.70 / 4.00",
        courses_title: "Fokus 10 Mata Kuliah Utama:",
        course_1: "1. Manajemen Operasional",
        course_2: "2. Supply Chain Management",
        course_3: "3. Perencanaan & Pengendalian",
        course_4: "4. Manajemen Risiko",
        course_5: "5. Keuangan & Akuntansi",
        course_6: "6. Manajemen SDM",
        course_7: "7. Analisis Bisnis & Statistika",
        course_8: "8. Sistem Informasi Mgt",
        course_9: "9. Riset Operasional",
        course_10: "10. Pengambilan Keputusan",
        cert_card_title: "Sertifikasi Resmi",
        cert_badge_count: "7 Lisensi PDF",
        cert1_desc: "Sertifikat Kompetensi Standard",
        cert2_desc: "Klaster Pengelolaan Produksi",
        cert3_desc: "K3 Lingkungan Kerja & Risk ID",
        cert4_desc: "Bursa Efek Indonesia Certification",
        cert5_desc: "Discover Data Analysis",
        cert6_desc: "Building with Power BI",
        cert7_desc: "Skor Resmi 463",
        cert_view_btn: "Lihat PDF",
        projects_subtitle: "REKAM JEJAK MAGANG & OPERASIONAL",
        projects_title: "Pengalaman Magang & Kerja",
        filter_all: "Semua Pengalaman",
        filter_quality: "Pengendalian Mutu",
        filter_finance: "Keuangan & Arsip",
        filter_inventory: "Inventory Control",
        exp1_title: "Asisten Kepala Produksi",
        exp1_bullet_1: "Mengobservasi & menganalisis alur produksi garmen (cutting, sablon/bordir, jahit, QC, finishing).",
        exp1_bullet_2: "Memantau kualitas produk & melakukan QC sesuai standar perusahaan.",
        exp1_bullet_3: "Mengidentifikasi risiko operasional (cacat bahan, kerusakan mesin, keterlambatan).",
        exp1_bullet_4: "Mengolah data produksi dengan MS Excel & berkoordinasi dalam evaluasi operasional.",
        exp2_title: "Unit Kepegawaian",
        exp2_bullet_1: "Mengelola administrasi penggajian & tunjangan (PNS, PPPK, Honorarium).",
        exp2_bullet_2: "Menyusun LPJ keuangan bulanan, triwulan, & tahunan.",
        exp2_bullet_3: "Mengelola kearsipan, klasifikasi, penataan, & digitalisasi dokumen.",
        exp2_bullet_4: "Pelayanan & sosialisasi perlindungan perempuan & anak secara empatik.",
        exp2_bullet_5: "Membantu pemeliharaan inventaris & pencatatan Barang Milik Daerah (BMD).",
        exp3_title: "Admin",
        exp3_bullet_1: "Mengelola stok dan inventaris toko secara efisien.",
        exp3_bullet_2: "Pencatatan & monitoring keluar-masuk barang serta kesesuaian stok.",
        exp3_bullet_3: "Menginput & memperbarui data administrasi serta laporan penjualan.",
        exp3_bullet_4: "Menganalisis data penjualan untuk mendukung pengambilan keputusan.",
        btn_detail: "Rincian Lengkap",
        skills_subtitle: "KAPABILITAS OPERASIONAL & MANAJEMEN",
        skills_title: "Keahlian (Skills & Toolset)",
        skills_hard_title: "Hard Skills",
        skills_soft_title: "Soft Skills",
        skill_h1: "Data Analysis (Excel, Power BI, Google Sheets)",
        skill_h2: "Data Processing & Visualization (Pivot Table, Lookup, Reporting)",
        skill_h3: "Supply Chain & Production Management",
        skill_h4: "K3 Lingkungan Kerja & Risk Identification",
        skill_h5: "Microsoft Office, Canva & CorelDraw",
        skill_s1: "Kemampuan Analitis & Operational Risk",
        skill_s2: "Teliti & Detail (High Precision)",
        skill_s3: "Komunikasi Profesional & Empati",
        skill_s4: "Kolaborasi & Kerja Sama Tim (Cross-Functional)",
        contact_subtitle: "INFORMASI KONEKSI PROFESIONAL",
        contact_title: "Mari Terhubung & Bekerja Sama",
        contact_info_title: "Informasi Kontak & Kolaborasi",
        contact_info_desc: "Saya terbuka untuk peluang karir, posisi manajemen operasi, administrasi keuangan, quality control, maupun kerja sama profesional.",
        badge_scm: "Supply Chain Management",
        badge_fin_mgmt: "Manajemen Keuangan",
        badge_prod_mgmt: "Production Management",
        badge_data_analysis: "Data Analysis",
        badge_qc: "Quality Control (QC)",
        badge_risk_mgmt: "Risk Management",
        badge_office_admin: "Administrasi Perkantoran",
        badge_asset_doc: "Manajemen Asset & Dokumentasi",
        c_location: "Lokasi",
        c_location_val: "Bandung, Jawa Barat",
        footer_rights: "Hak cipta dilindungi undang-undang.",
        modal1_tag: "CV Indogarment Pasir Honje Lamping – Bandung (Nov 2025 – Feb 2026)",
        modal2_tag: "DP3A Kota Bandung (Februari – Juli 2025)",
        modal3_tag: "PT. Sumber Alfaria Trijaya Tbk – Bengkulu (Januari – April 2019)",
        modal_desc_label: "Deskripsi & Tanggung Jawab:",
        preloader_text: "Memuat Portofolio...",
        preloader_subtitle: "Memuat Web Portofolio...",
        exp1_gallery_title: "Dokumentasi Kegiatan QC & Produksi (2 Foto):",
        exp2_gallery_title: "Dokumentasi Kepegawaian & Kearsipan (5 Foto):",
        journal_badge: "Jurnal Nasional Terakreditasi (Vol. 6 No. 1 2026)",
        journal_status: "Terbit Februari 2026",
        journal_title: "Analisis Risiko Operasional Pada Proses Produksi Melalui Penerapan Enterprise Risk Management (ERM) (Studi Kasus: UMKM Indogarment Pasir Honje Lamping)",
        journal_author_label: "Penulis & Peneliti:",
        journal_affiliation: "Program Studi Manajemen, Universitas Ekuitas Indonesia",
        journal_abstract_label: "Abstrak Hasil Penelitian:",
        journal_abstract: "Penelitian kuantitatif ini menganalisis 14 risiko operasional pada alur produksi garmen menggunakan kerangka Enterprise Risk Management (ERM). Ditemukan 4 risiko kategori High Risk (keterlambatan pesanan, kain cacat rol, kesalahan sablon/bordir, & penundaan stok) serta merumuskan strategi mitigasi operasional berbasis risk scoring & pemetaan matriks risiko.",
        btn_journal_pdf: "Unduh Artikel Jurnal (PDF)",
        btn_journal_loa: "Lihat Surat LOA (Diterima)",
        btn_journal_cert: "Sertifikat Penulis",
        nav_publication: "Publikasi Jurnal",
        journal_sec_subtitle: "KARYA ILMIAH & PUBLIKASI NASIONAL",
        journal_sec_title: "Publikasi Jurnal & Riset Operasional"
    },
    en: {
        nav_about: "About",
        nav_education: "Education & Certifications",
        nav_experience: "Experience",
        nav_skills: "Skills",
        nav_contact: "Contact",
        hero_headline_new: "Management Graduate | Operations & Supply Chain | Financial & Production Management | Data Analysis | Quality Control",
        btn_download_cv: "Download CV PDF",
        btn_contact_me: "Contact Me",
        stat_projects: "Key Experiences",
        stat_gpa: "Graduation GPA (S1)",
        stat_cert: "Official Licenses",
        about_subtitle: "PROFESSIONAL PROFILE",
        about_title: "Management Graduate | Operations & Supply Chain | Financial & Production Management | Data Analysis | Quality Control",
        about_full_summary: "Bachelor's graduate in Operations Management with internship experience in financial administration, employee data management, document archiving, and report preparation. Possesses experience observing garment production workflows, quality monitoring, operational risk identification, and assisting QC from production to finishing. Communicative, detail-oriented, and able to work independently or in a team.",
        tech_stack_subtitle: "SOFTWARE & ANALYTICAL TOOLS",
        tech_stack_title: "Software & Toolset Expertise",
        tool_excel_desc: "Data Analysis, VLOOKUP, Pivot Tables & Production Reporting",
        tool_powerbi_desc: "Interactive Business Intelligence & Dashboard Visualization",
        tool_sheets_desc: "Cloud Data Processing & Digital Archiving Systems",
        tool_word_desc: "Financial Accountability & Official Documentation",
        tool_canva_desc: "Visual Design, Production Layouts & Media Assets",
        tool_risk_desc: "Workplace HSE, Risk ID & Quality Control Standards",
        commitment_title: "COMMITMENT TO QUALITY & OPERATIONAL PRECISION",
        card1_title: "QC & Quality Control",
        card1_desc: "Observed garment production processes (cutting, printing, sewing, QC, finishing) & identified operational risks.",
        card1_title_full: "Quality Control & Garment QC",
        card1_desc_full: "Observing garment production workflows (cutting, printing/embroidery, sewing, QC, finishing), monitoring product quality, and identifying operational risks such as material defects and machine breakdown.",
        card2_title: "Finance & Archiving",
        card2_desc: "Managed payroll administration, prepared monthly/annual financial LPJ reports, and managed digital archiving.",
        card2_title_full: "Finance & Digital Archiving",
        card2_desc_full: "Managing payroll & allowance administration (PNS, PPPK, Honorarium), preparing monthly, quarterly, and annual financial accountability reports (LPJ), and managing document archiving & digitalization.",
        card3_title: "Inventory & Admin",
        card3_desc: "Managed store inventory, monitored stock movements, updated administrative data & analyzed sales records.",
        card3_title_full: "Inventory Control & Data Admin",
        card3_desc_full: "Managing store stock & inventory efficiently, recording & monitoring inbound/outbound goods, entering administrative data, and analyzing daily sales records.",
        edu_subtitle: "ACADEMIC QUALIFICATIONS & OFFICIAL LICENSES",
        edu_title: "Formal Education & Certifications",
        edu_card_title: "Formal Education",
        edu_degree: "Bachelor in Management (Operations) | GPA 3.70 / 4.00",
        courses_title: "Key Focus 10 Core Courses:",
        course_1: "1. Operational Management",
        course_2: "2. Supply Chain Management",
        course_3: "3. Planning & Control",
        course_4: "4. Risk Management",
        course_5: "5. Finance & Accounting",
        course_6: "6. HR Management",
        course_7: "7. Business Analytics & Statistics",
        course_8: "8. Management Information Systems",
        course_9: "9. Operations Research",
        course_10: "10. Decision Making",
        cert_card_title: "Official Certifications",
        cert_badge_count: "7 PDF Licenses",
        cert1_desc: "Standard Occupational Competency Certificate",
        cert2_desc: "Production Management Cluster",
        cert3_desc: "Workplace HSE & Risk Identification",
        cert4_desc: "Indonesia Stock Exchange Certification",
        cert5_desc: "Discover Data Analysis",
        cert6_desc: "Building with Power BI",
        cert7_desc: "Official Score 463",
        cert_view_btn: "View PDF",
        projects_subtitle: "INTERNSHIP & WORK TRACK RECORD",
        projects_title: "Internship & Work Experience",
        filter_all: "All Experiences",
        filter_quality: "Quality Control",
        filter_finance: "Finance & Archiving",
        filter_inventory: "Inventory Control",
        exp1_title: "Assistant Production Manager",
        exp1_bullet_1: "Observed & analyzed garment production workflows (cutting, printing/embroidery, sewing, QC, finishing).",
        exp1_bullet_2: "Monitored product quality & performed QC according to company standards.",
        exp1_bullet_3: "Identified operational risks (material defects, machine breakdown, delay risks).",
        exp1_bullet_4: "Processed production data with MS Excel & coordinated in operational evaluations.",
        exp2_title: "Staffing & Personnel Unit",
        exp2_bullet_1: "Managed payroll & allowance administration (PNS, PPPK, Honorarium).",
        exp2_bullet_2: "Prepared monthly, quarterly, & annual financial accountability reports (LPJ).",
        exp2_bullet_3: "Managed document archiving, classification, arrangement, & digitalization.",
        exp2_bullet_4: "Provided empathetic service & public outreach for women & child protection.",
        exp2_bullet_5: "Assisted in inventory maintenance & Regional Asset (BMD) record keeping.",
        exp3_title: "Administrative Staff",
        exp3_bullet_1: "Managed store stock & inventory efficiently.",
        exp3_bullet_2: "Recorded & monitored inbound/outbound goods & stock balance.",
        exp3_bullet_3: "Entered & updated administrative data & sales reports.",
        exp3_bullet_4: "Analyzed sales data to support data-driven decision making.",
        btn_detail: "View Full Details",
        skills_subtitle: "OPERATIONAL & MANAGEMENT CAPABILITIES",
        skills_title: "Skills & Toolset",
        skills_hard_title: "Hard Skills",
        skills_soft_title: "Soft Skills",
        skill_h1: "Data Analysis (Excel, Power BI, Google Sheets)",
        skill_h2: "Data Processing & Visualization (Pivot Table, Lookup, Reporting)",
        skill_h3: "Supply Chain & Production Management",
        skill_h4: "Workplace HSE & Risk Identification",
        skill_h5: "Microsoft Office, Canva & CorelDraw",
        skill_s1: "Analytical Skills & Operational Risk",
        skill_s2: "Detail-Oriented & High Precision",
        skill_s3: "Professional Communication & Empathy",
        skill_s4: "Cross-Functional Team Collaboration",
        contact_subtitle: "PROFESSIONAL CONNECT INFO",
        contact_title: "Contact Info & Collaboration",
        contact_info_title: "Contact Info & Collaboration",
        contact_info_desc: "Open for career opportunities in operations management, financial administration, quality control, or professional collaboration.",
        badge_scm: "Supply Chain Management",
        badge_fin_mgmt: "Financial Management",
        badge_prod_mgmt: "Production Management",
        badge_data_analysis: "Data Analysis",
        badge_qc: "Quality Control (QC)",
        badge_risk_mgmt: "Risk Management",
        badge_office_admin: "Office Administration",
        badge_asset_doc: "Asset & Document Management",
        c_location: "Location",
        c_location_val: "Bandung, West Java",
        footer_rights: "All rights reserved.",
        modal1_tag: "CV Indogarment Pasir Honje Lamping – Bandung (Nov 2025 – Feb 2026)",
        modal2_tag: "DP3A Bandung City (February – July 2025)",
        modal3_tag: "PT. Sumber Alfaria Trijaya Tbk – Bengkulu (January – April 2019)",
        modal_desc_label: "Description & Responsibilities:",
        preloader_text: "Loading Portfolio...",
        preloader_subtitle: "Loading Web Portfolio...",
        exp1_gallery_title: "QC & Production Activity Documentation (2 Photos):",
        exp2_gallery_title: "Personnel & Archiving Activity Documentation (5 Photos):",
        journal_badge: "Accredited National Journal (Vol. 6 No. 1 2026)",
        journal_status: "Published February 2026",
        journal_title: "Implementation Of Enterprise Risk Management (ERM) In Analyzing Operational Risks In The Production Process: A Case Study Of UMKM Indogarment Pasir Honje Lamping",
        journal_author_label: "Authors & Researchers:",
        journal_affiliation: "Study Program of Management, Universitas Ekuitas Indonesia",
        journal_abstract_label: "Research Abstract:",
        journal_abstract: "This quantitative study analyzes 14 operational risks in the garment production workflow using the Enterprise Risk Management (ERM) framework. Identified 4 High Risk categories (order completion delays, defective fabric rolls, printing/embroidery errors, & raw material shortages) and formulated operational mitigation strategies based on risk scoring & matrix mapping.",
        btn_journal_pdf: "Download Journal PDF",
        btn_journal_loa: "View LOA Letter",
        btn_journal_cert: "Author Certificate",
        nav_publication: "Publications",
        journal_sec_subtitle: "SCIENTIFIC RESEARCH & NATIONAL PUBLICATION",
        journal_sec_title: "Journal Publications & Operational Research"
    }
};

function initPreloader() {
    const preloader = document.getElementById('preloader');
    const bar = document.getElementById('preloaderBar');
    const percentTxt = document.getElementById('preloaderPercent');
    if (!preloader) return;

    let currentPercent = 0;
    const startTime = performance.now();
    const totalDuration = 2400; // 2.4 seconds smooth loading duration

    function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / totalDuration, 1);
        
        // Smooth Cubic Ease-Out
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        currentPercent = Math.floor(easeProgress * 100);

        if (bar) bar.style.width = currentPercent + '%';
        if (percentTxt) percentTxt.textContent = currentPercent + '%';

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            if (bar) bar.style.width = '100%';
            if (percentTxt) percentTxt.textContent = '100%';

            setTimeout(() => {
                preloader.classList.add('fade-out');
                // Trigger Hero Stat Counters Count-Up AFTER Preloader Starts Sliding Up!
                setTimeout(() => {
                    initStatCounters();
                }, 200);

                setTimeout(() => {
                    if (preloader.parentNode) {
                        preloader.style.display = 'none';
                    }
                }, 800);
            }, 350);
        }
    }

    requestAnimationFrame(step);
}

function initLanguage() {
    const langBtns = document.querySelectorAll('.lang-pill-btn');
    let currentLang = localStorage.getItem('dpa_lang') || 'en';

    applyLanguage(currentLang);

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            currentLang = lang;
            localStorage.setItem('dpa_lang', currentLang);
            applyLanguage(currentLang);
        });
    });

    function applyLanguage(lang) {
        langBtns.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        const cvBtn = document.getElementById('btnDownloadCv');
        if (cvBtn) {
            if (lang === 'id') {
                cvBtn.href = 'Source/CV%20Resume/CV-Dea_Putri_Andini-IN.pdf';
                cvBtn.setAttribute('download', 'CV-Dea_Putri_Andini-IN.pdf');
            } else {
                cvBtn.href = 'Source/CV%20Resume/CV-Dea_Putri_Andini-EN.pdf';
                cvBtn.setAttribute('download', 'CV-Dea_Putri_Andini-EN.pdf');
            }
        }
    }
}

/* --------------------------------------------------------------------------
   4. Navigation & Natural ScrollSpy
   -------------------------------------------------------------------------- */
function initNavigation() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    const menuIcon = document.getElementById('menu-icon');
    const navItems = document.querySelectorAll('.nav-item');

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                menuIcon.className = 'bx bx-x';
            } else {
                menuIcon.className = 'bx bx-menu';
            }
        });
    }

    navItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
            if (menuIcon) menuIcon.className = 'bx bx-menu';

            navItems.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });

    const sectionMap = [
        { id: 'about', selector: '.nav-item[href="#about"]' },
        { id: 'education', selector: '.nav-item[href="#education"]' },
        { id: 'experience', selector: '.nav-item[href="#experience"]' },
        { id: 'skills', selector: '.nav-item[href="#skills"]' },
        { id: 'contact', selector: '.nav-item[href="#contact"]' }
    ];

    function handleScrollSpy() {
        const scrollPos = window.scrollY + 200;
        let activeLink = null;

        for (let i = sectionMap.length - 1; i >= 0; i--) {
            const sec = document.getElementById(sectionMap[i].id);
            if (sec) {
                const top = sec.offsetTop;
                if (scrollPos >= top) {
                    activeLink = document.querySelector(sectionMap[i].selector);
                    break;
                }
            }
        }

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 60) {
            activeLink = document.querySelector('.nav-item[href="#contact"]');
        }

        if (activeLink) {
            navItems.forEach(item => item.classList.remove('active'));
            activeLink.classList.add('active');
        }
    }

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
}

/* --------------------------------------------------------------------------
   5. Stat Counters Engine (1.5s for integers, 3.5s ultra-smooth for GPA 3.70)
   -------------------------------------------------------------------------- */
function initStatCounters() {
    const statsContainer = document.querySelector('.stats-counter-grid');
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let animated = false;

    function animateCounters() {
        if (animated) return;
        animated = true;

        const startTime = performance.now();

        function update(now) {
            const elapsed = now - startTime;
            let allCompleted = true;

            statNumbers.forEach(stat => {
                const targetStr = stat.getAttribute('data-target');
                if (!targetStr) return;
                const target = parseFloat(targetStr);

                // Custom duration: 3.5 seconds (3500ms) for decimal float GPA 3.70, 1.5 seconds (1500ms) for integers (3 and 6)
                const duration = targetStr.includes('.') ? 3500 : 1500;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 3); // Smooth Cubic Ease-Out

                if (progress < 1) {
                    allCompleted = false;
                }

                if (targetStr.includes('.')) {
                    // Float Decimal Count-up (e.g. GPA 0.00 -> 3.70 over 3.5s)
                    const current = (target * easeProgress).toFixed(2);
                    stat.textContent = current;
                } else {
                    // Integer Count-up (e.g. 0 -> 3 / 0 -> 6 over 1.5s)
                    const current = Math.floor(target * easeProgress);
                    stat.textContent = current;
                }
            });

            if (!allCompleted) {
                requestAnimationFrame(update);
            } else {
                statNumbers.forEach(stat => {
                    const target = stat.getAttribute('data-target');
                    if (target) stat.textContent = target;
                });
            }
        }

        requestAnimationFrame(update);
    }

    if (statsContainer && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        observer.observe(statsContainer);
    } else {
        setTimeout(animateCounters, 300);
    }
}

/* --------------------------------------------------------------------------
   6. Scroll Reveal Engine
   -------------------------------------------------------------------------- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.slide-card-box, .timeline-box-card, .contact-wide-card, .skills-single-card, .stat-card-item, .hero-photo-card, .quote-full-card, .pillar-card-tile, .tech-tool-card, .tech-stack-showcase-section, .journal-pub-card, .sec-publication .section-header-title, .journal-abstract-box, .btn-journal-action');

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
}

/* --------------------------------------------------------------------------
   7. Project Category Filter
   -------------------------------------------------------------------------- */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.timeline-item-centered, .project-card');

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
   8. Ultra Smooth & Mobile Friendly Modal Details Popup Engine
   -------------------------------------------------------------------------- */
function initModals() {
    const openBtns = document.querySelectorAll('.open-modal-btn');
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.modal-close');
    const overlays = document.querySelectorAll('.modal-overlay');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
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
   9. Contact Form Toast Handling
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
    toast.innerHTML = `<i class='bx bx-check-circle' style='color:#3D3531; font-size:1.4rem;'></i> <span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4000);
}

/* --------------------------------------------------------------------------
   10. Interactive 3D Lanyard & ID Card Drag, Cursor Tracking & Spring Physics Engine
   -------------------------------------------------------------------------- */
function initLanyardCard3D() {
    const wrapper = document.getElementById('lanyardWrapper');
    const assembly = document.getElementById('lanyardCardAssembly');
    const card = document.getElementById('minimalIdCard');
    const strapLeft = document.querySelector('.strap-ribbon.strap-left');
    const strapRight = document.querySelector('.strap-ribbon.strap-right');
    const glare = document.getElementById('badgeHoloGlare');

    if (!wrapper || !assembly) return;

    let isHovered = false;
    let isDragging = false;
    let dragStartX = 0, dragStartY = 0;
    let startTargetX = 0, startTargetY = 0;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let velocityX = 0, velocityY = 0;
    let animFrameId = null;

    // Smooth Lerp & Spring Oscillation Physics Loop
    function updatePhysics() {
        if (!isHovered && !isDragging) {
            // Spring decay back to center
            const forceX = (0 - currentX) * 0.1;
            const forceY = (0 - currentY) * 0.1;
            velocityX = (velocityX + forceX) * 0.78;
            velocityY = (velocityY + forceY) * 0.78;

            currentX += velocityX;
            currentY += velocityY;

            if (Math.abs(currentX) < 0.005 && Math.abs(currentY) < 0.005 && Math.abs(velocityX) < 0.005) {
                currentX = 0;
                currentY = 0;
                assembly.classList.remove('interactive-mode');
                assembly.style.transform = '';
                if (strapLeft) strapLeft.style.transform = '';
                if (strapRight) strapRight.style.transform = '';
                if (glare) glare.style.opacity = '0';
                return;
            }
        } else {
            currentX += (targetX - currentX) * 0.18;
            currentY += (targetY - currentY) * 0.18;
        }

        // Subtle, Elegant 3D Rotation & Subtle Translation Dynamics
        const rotateX = currentY * -8;
        const rotateY = currentX * 10;
        const rotateZ = currentX * 3;
        const translateX = currentX * 12;
        const translateY = currentY * 8;

        assembly.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translate3d(${translateX}px, ${translateY}px, 15px)`;

        // Flex & stretch strap ribbons dynamically when pulled downward
        if (strapLeft) {
            const leftRot = 24 + currentX * 10;
            const stretchY = 1 + Math.max(0, currentY * 0.45);
            strapLeft.style.transform = `rotate(${leftRot}deg) scaleY(${stretchY})`;
        }
        if (strapRight) {
            const rightRot = -24 + currentX * 10;
            const stretchY = 1 + Math.max(0, currentY * 0.45);
            strapRight.style.transform = `rotate(${rightRot}deg) scaleY(${stretchY})`;
        }

        // Delicate Specular Holographic Glare Sheen Highlight (Kilau Tipis)
        if (glare) {
            const glareX = Math.max(10, Math.min(90, 50 + currentX * 40));
            const glareY = Math.max(10, Math.min(90, 50 + currentY * 40));
            const opacity = (isHovered || isDragging) ? Math.min(0.35, Math.abs(currentX) * 0.3 + Math.abs(currentY) * 0.3 + 0.15) : 0;
            glare.style.opacity = opacity.toString();
            glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.45) 0%, rgba(245, 158, 11, 0.18) 35%, transparent 70%)`;
        }

        animFrameId = requestAnimationFrame(updatePhysics);
    }

    function startPhysics() {
        assembly.classList.add('interactive-mode');
        cancelAnimationFrame(animFrameId);
        updatePhysics();
    }

    const heroCol = wrapper.closest('.hero-photo-col') || wrapper;

    // Mouse Hover Dynamics
    heroCol.addEventListener('mouseenter', () => {
        isHovered = true;
        startPhysics();
    });

    heroCol.addEventListener('mousemove', (e) => {
        if (isDragging) return;
        isHovered = true;
        startPhysics();
        const rect = heroCol.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        targetX = (mouseX / rect.width - 0.5) * 2;
        targetY = (mouseY / rect.height - 0.5) * 2;
    });

    heroCol.addEventListener('mouseleave', () => {
        if (!isDragging) {
            isHovered = false;
            targetX = 0;
            targetY = 0;
        }
    });

    // 3D Interactive Mouse/Touch Drag Physics
    function onPointerDown(e) {
        isDragging = true;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        dragStartX = clientX;
        dragStartY = clientY;
        startTargetX = currentX;
        startTargetY = currentY;

        startPhysics();
        assembly.classList.add('dragging');
    }

    function onPointerMove(e) {
        if (!isDragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const deltaX = (clientX - dragStartX) / 90;
        const deltaY = (clientY - dragStartY) / 90;

        targetX = Math.max(-1.8, Math.min(1.8, startTargetX + deltaX));
        targetY = Math.max(-1.8, Math.min(1.8, startTargetY + deltaY));
    }

    function onPointerUp() {
        if (isDragging) {
            isDragging = false;
            isHovered = false;
            assembly.classList.remove('dragging');
            velocityX = (targetX - currentX) * 0.35;
            velocityY = (targetY - currentY) * 0.35;
            targetX = 0;
            targetY = 0;
        }
    }

    assembly.addEventListener('mousedown', onPointerDown);
    assembly.addEventListener('touchstart', onPointerDown, { passive: true });

    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);
}

/* --------------------------------------------------------------------------
   11. Interactive Activity Photo Lightbox Preview Engine
   -------------------------------------------------------------------------- */
function initPhotoLightbox() {
    const lightbox = document.getElementById('photoLightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxCloseBtn');
    const thumbs = document.querySelectorAll('.exp-photo-thumb');

    if (!lightbox || !thumbs.length) return;

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const currentLang = localStorage.getItem('dpa_lang') || 'en';
            const fullSrc = thumb.getAttribute('data-full');
            const captionID = thumb.getAttribute('data-caption-id');
            const captionEN = thumb.getAttribute('data-caption-en');
            const caption = currentLang === 'id' ? (captionID || captionEN) : (captionEN || captionID);

            if (lightboxImg) lightboxImg.src = fullSrc;
            if (lightboxCaption) lightboxCaption.textContent = caption || '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
}

/* --------------------------------------------------------------------------
   12. Floating Scatter & Magnetic Assembly Engine ("Ngacak Ngambang Lalu Menyatu")
   Applies to:
   - 10 Core Courses under IPK Badge (.course-10-badge)
   - 7 Official Certifications Tiles (.cert-tile-compact)
   - Skills Badges (.skill-chip-pill)
   -------------------------------------------------------------------------- */
function initFloatingScatterAssembleEngine() {
    const courseBadges = document.querySelectorAll('.course-10-grid .course-10-badge');
    const eduCard = document.querySelector('.course-10-grid');

    const certTiles = document.querySelectorAll('.cert-grid-2col .cert-tile-compact');
    const certCard = document.querySelector('.cert-grid-2col');

    const skillChips = document.querySelectorAll('.skills-single-card .skill-chip-pill');
    const skillsCard = document.querySelector('.skills-single-card');

    const scatterOffsets = [
        { x: -65, y: -40, r: -14 },
        { x: 75, y: -45, r: 16 },
        { x: -80, y: 35, r: -18 },
        { x: 85, y: 30, r: 15 },
        { x: -50, y: -50, r: -12 },
        { x: 60, y: -35, r: 14 },
        { x: -70, y: 45, r: -16 },
        { x: 80, y: -40, r: 18 },
        { x: -45, y: 50, r: -10 },
        { x: 65, y: -30, r: 12 }
    ];

    function applyScatter(elements) {
        elements.forEach((el, idx) => {
            const offset = scatterOffsets[idx % scatterOffsets.length];
            el.style.opacity = '0';
            el.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 0) rotate(${offset.r}deg)`;
            el.style.transition = 'opacity 0.75s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.85s cubic-bezier(0.34, 1.56, 0.64, 1)';
            el.style.transitionDelay = `${idx * 0.07}s`;

            const icon = el.querySelector('i');
            if (icon) {
                icon.style.transition = 'transform 0.85s cubic-bezier(0.34, 1.56, 0.64, 1)';
                icon.style.transform = 'scale(0.4) rotate(-30deg)';
            }
        });
    }

    function assembleElements(elements) {
        elements.forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
            const icon = el.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    }

    // Apply initial scattered floating state ("Ngacak ngambang")
    if (courseBadges.length) applyScatter(courseBadges);
    if (certTiles.length) applyScatter(certTiles);
    if (skillChips.length) applyScatter(skillChips);

    // Observer for 10 Core Value Courses under IPK Badge
    if (eduCard && 'IntersectionObserver' in window) {
        const eduObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    assembleElements(courseBadges);
                    eduObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
        eduObserver.observe(eduCard);
    } else if (courseBadges.length) {
        assembleElements(courseBadges);
    }

    // Observer for 7 Official Certifications Tiles
    if (certCard && 'IntersectionObserver' in window) {
        const certObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    assembleElements(certTiles);
                    certObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
        certObserver.observe(certCard);
    } else if (certTiles.length) {
        assembleElements(certTiles);
    }

    // Observer for Skills Badges
    if (skillsCard && 'IntersectionObserver' in window) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    assembleElements(skillChips);
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
        skillObserver.observe(skillsCard);
    } else if (skillChips.length) {
        assembleElements(skillChips);
    }

    // Observer for Job Description Bullets (Smooth Left-to-Right Staggered Slide-Fade Text Animation)
    // and Photos (Magnetic Scatter & Assemble) in Work Experience Cards
    const expTimelineCards = document.querySelectorAll('.timeline-box-card');
    if (expTimelineCards.length && 'IntersectionObserver' in window) {
        expTimelineCards.forEach((card) => {
            const expBullets = card.querySelectorAll('.exp-bullet-list li');
            const expPhotos = card.querySelectorAll('.exp-photo-thumb');

            // Apply smooth slide-fade text animation setup for bullets
            if (expBullets.length) {
                expBullets.forEach((li, idx) => {
                    li.style.opacity = '0';
                    li.style.transform = 'translateX(-22px)';
                    li.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                    li.style.transitionDelay = `${idx * 0.1}s`;

                    const icon = li.querySelector('i');
                    if (icon) {
                        icon.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                        icon.style.transform = 'scale(0.6)';
                    }
                });
            }

            // Apply magnetic scatter setup for photos
            if (expPhotos.length) {
                applyScatter(expPhotos);
            }

            // Observe Card to Trigger Animations
            const expObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (expBullets.length) {
                            expBullets.forEach((li) => {
                                li.style.opacity = '1';
                                li.style.transform = 'translateX(0)';
                                const icon = li.querySelector('i');
                                if (icon) icon.style.transform = 'scale(1)';
                            });
                        }
                        if (expPhotos.length) {
                            assembleElements(expPhotos);
                        }
                        expObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
            expObserver.observe(card);
        });
    }
}

