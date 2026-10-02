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
    initEmailChooserModal();
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

    // Dynamic Auto Rising & Falling Data Analytics Bar Chart Pillars (Spans 100% Full Width across Page)
    let barCharts = [];
    function createFullWidthBarCharts() {
        barCharts = [];
        const barCount = Math.max(12, Math.floor(width / 75));
        const spacing = width / barCount;
        for (let i = 0; i < barCount; i++) {
            const barWidth = Math.min(spacing * 0.48, Math.random() * 16 + 12);
            barCharts.push({
                x: i * spacing + (spacing - barWidth) / 2,
                minHeight: Math.random() * 45 + 30,
                maxHeight: Math.random() * 140 + 75,
                currentHeight: 45,
                speed: Math.random() * 0.018 + 0.008,
                phase: Math.random() * Math.PI * 2,
                width: barWidth
            });
        }
    }
    createFullWidthBarCharts();

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
            barGrad.addColorStop(1, 'rgba(44, 39, 36, 0.075)');
            ctx.fillStyle = barGrad;
            ctx.fillRect(bar.x, barY, bar.width, bar.currentHeight);

            // Top Cap Accent Line (moves up and down dynamically)
            ctx.fillStyle = 'rgba(44, 39, 36, 0.25)';
            ctx.fillRect(bar.x, barY - 3, bar.width, 3);

            // Floating Cyber Node Dot hovering 8px above the top cap
            const dotY = barY - 9;
            const dotX = bar.x + bar.width / 2;
            ctx.beginPath();
            ctx.arc(dotX, dotY, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(44, 39, 36, 0.35)';
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
        createFullWidthBarCharts();
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
        nav_publication: "Publikasi Jurnal",
        nav_experience: "Pengalaman",
        nav_skills: "Keahlian",
        nav_contact: "Kontak",

        preloader_subtitle: "Memuat Web Portofolio...",
        preloader_opt: "Operasi",
        preloader_analytics: "Analisis Data",
        preloader_quality: "Kualitas & QC",
        preloader_risk: "Manajemen Risiko",

        badge_top_title: "MANAJEMEN OPERASI",

        hero_headline_new: "Lulusan Manajemen | Operasi & Rantai Pasok | Manajemen Keuangan & Produksi | Analisis Data | Pengendalian Mutu",
        btn_download_cv: "Unduh CV PDF",
        btn_contact_me: "Hubungi Saya",
        stat_projects: "Pengalaman Utama",
        stat_gpa: "IPK Kelulusan (S1)",
        stat_cert: "Sertifikat Lisensi",
        about_subtitle: "PROFIL PROFESIONAL",
        about_title: "Lulusan Manajemen | Operasi & Rantai Pasok | Manajemen Keuangan & Produksi | Analisis Data | Pengendalian Mutu",
        about_full_summary: "Lulusan Sarjana Manajemen (Konsentrasi Manajemen Operasi) dengan pengalaman dalam administrasi keuangan, pengelolaan data kepegawaian, alur produksi garmen, Quality Control (QC), dan mitigasi risiko operasional. Terampil dalam pelaporan keuangan (LPJ), analisis data bisnis, supply chain management, serta evaluasi proses. Memiliki minat karir yang kuat di bidang Manajemen Operasi, Keuangan, SDM, Rantai Pasok, Produksi, dan Quality Control. Pribadi komunikatif, berintegritas tinggi, teliti, adaptif, serta siap berkontribusi secara kolaboratif.",

        tech_stack_subtitle: "PERANGKAT LUNAK & ANALISIS TOOLS",
        tech_stack_title: "Keahlian Perangkat Lunak & Tools",
        tool_excel_title: "Microsoft Excel",
        tool_excel_desc: "Analisis Data, VLOOKUP, Pivot Table & Laporan Produksi",
        tool_powerbi_title: "Microsoft Power BI",
        tool_powerbi_desc: "Visualisasi Business Intelligence & Dashboard Interaktif",
        tool_sheets_title: "Google Sheets & Drive",
        tool_sheets_desc: "Pengolahan Data Cloud & Sistem Pengarsipan Digital",
        tool_word_title: "MS Word & Pelaporan LPJ",
        tool_word_desc: "Penyusunan LPJ Keuangan & Dokumentasi Perkantoran",
        tool_canva_title: "Canva Visual Design",
        tool_canva_desc: "Desain Visual, Tata Letak Produksi & Media Visual",
        tool_risk_title: "Alat Manajemen Risiko & QC",
        tool_risk_desc: "Standar K3 Lingkungan Kerja & Pengendalian Mutu (QC)",

        commitment_title: "KOMITMEN TERHADAP KUALITAS & PRESISI OPERASIONAL",
        card1_title_full: "Pengendalian Mutu & QC Garmen",
        card1_desc_full: "Mengobservasi alur produksi garmen (cutting, sablon/bordir, jahit, QC, finishing), memantau kualitas produk sesuai standar perusahaan, dan mengidentifikasi risiko operasional seperti bahan cacat dan kerusakan mesin.",
        card2_title_full: "Keuangan & Digitalisasi Kearsipan",
        card2_desc_full: "Mengelola administrasi penggajian & tunjangan (PNS, PPPK, Honorarium), menyusun LPJ Keuangan bulanan, triwulan, dan tahunan secara akuntabel, serta mengelola kearsipan & digitalisasi dokumen.",
        card3_title_full: "Pengendalian Inventaris & Data Admin",
        card3_desc_full: "Mengelola stok dan inventaris toko secara efisien, melakukan pencatatan keluar-masuk barang, menginput data administrasi, dan menganalisis laporan data penjualan harian.",

        edu_subtitle: "KUALIFIKASI AKADEMIK & LISENSI RESMI",
        edu_title: "Pendidikan Formal & Sertifikasi Resmi",
        edu_card_title: "Pendidikan Formal",
        edu_degree: "S1 Manajemen (Manajemen Operasi) | IPK 3.70 / 4.00",
        courses_title: "Fokus 10 Mata Kuliah Utama:",
        course_1: "1. Manajemen Operasional",
        course_2: "2. Manajemen Rantai Pasok (SCM)",
        course_3: "3. Perencanaan & Pengendalian Produksi",
        course_4: "4. Manajemen Risiko Operasional",
        course_5: "5. Keuangan & Akuntansi",
        course_6: "6. Manajemen Sumber Daya Manusia",
        course_7: "7. Analisis Bisnis & Statistika",
        course_8: "8. Sistem Informasi Manajemen",
        course_9: "9. Riset Operasional",
        course_10: "10. Pengambilan Keputusan Manajerial",

        cert_card_title: "Sertifikasi Resmi",
        cert_badge_count: "7 Sertifikat Lisensi PDF",
        cert1_title: "BNSP – Supply Chain & Produksi",
        cert1_desc: "Sertifikasi Kompetensi BNSP (Supply Chain & Production)",
        cert2_title: "PBK – Pengelolaan Produksi",
        cert2_desc: "Sertifikat Pelatihan Klaster Pengelolaan Produksi (Kemnaker)",
        cert3_title: "K3 Lingkungan Kerja",
        cert3_desc: "Sertifikasi K3 Lingkungan Kerja & Identifikasi Risiko",
        cert4_title: "Pasar Modal (IDX SPM)",
        cert4_desc: "Sertifikasi Sekolah Pasar Modal (SPM) Bursa Efek Indonesia",
        cert5_title: "Microsoft Data Analysis",
        cert5_desc: "Sertifikasi Microsoft – Discover Data Analysis",
        cert6_title: "Microsoft Power BI",
        cert6_desc: "Sertifikasi Microsoft – Getting Started with Power BI",
        cert7_title: "TOEFL Bahasa Inggris",
        cert7_desc: "Skor Resmi 633 (Tingkat Mahir / Advanced)",
        cert_view_btn: "Lihat PDF",

        journal_sec_subtitle: "KARYA ILMIAH & PUBLIKASI NASIONAL",
        journal_sec_title: "Publikasi Jurnal & Riset Operasional",
        journal_name: "Jurnal Fokus Manajemen",
        journal_badge: "Jurnal Nasional Terakreditasi SINTA 5",
        journal_sinta: "Terakreditasi SINTA 5",
        journal_publisher: "Penerbit: Fakultas Ekonomi & Bisnis, Universitas Dehasen Bengkulu (UNIVED)",
        journal_vol: "Vol. 6 No. 1 (2026)",
        journal_status: "Terbit Februari 2026",
        journal_title: "Analisis Risiko Operasional Pada Proses Produksi Melalui Penerapan Enterprise Risk Management (ERM) (Studi Kasus: UMKM Indogarment Pasir Honje Lamping)",
        journal_author_label: "Penulis & Peneliti:",
        journal_affiliation: "Program Studi Manajemen, Universitas Ekuitas Indonesia",
        journal_abstract_label: "Abstrak Hasil Penelitian:",
        journal_abstract: "Penelitian kuantitatif ini menganalisis 14 risiko operasional pada alur produksi garmen menggunakan kerangka Enterprise Risk Management (ERM). Ditemukan 4 risiko kategori High Risk (keterlambatan pesanan, kain cacat rol, kesalahan sablon/bordir, & penundaan stok) serta merumuskan strategi mitigasi operasional berbasis risk scoring & pemetaan matriks risiko.",
        journal_kw1: "Enterprise Risk Management (ERM)",
        journal_kw2: "Risiko Operasional",
        journal_kw3: "Proses Produksi Garmen",
        journal_kw4: "Risk Scoring & Matrix",
        btn_journal_pdf: "Unduh Artikel Jurnal (PDF)",
        btn_journal_loa: "Lihat Surat LOA (Diterima)",
        btn_journal_cert: "Sertifikat Penulis",

        projects_subtitle: "REKAM JEJAK MAGANG & OPERASIONAL",
        projects_title: "Pengalaman Magang & Kerja",
        filter_all: "Semua Pengalaman",
        filter_quality: "Pengendalian Mutu",
        filter_finance: "Keuangan & Arsip",
        filter_inventory: "Kontrol Inventaris",

        exp1_date: "November 2025 – Februari 2026",
        exp1_company: "CV Indogarment Pasir Honje Lamping – Bandung",
        exp1_title: "Asisten Kepala Produksi",
        exp1_bullet_1: "Mengobservasi & menganalisis alur produksi garmen (cutting, sablon/bordir, jahit, QC, finishing).",
        exp1_bullet_2: "Memantau kualitas produk & melakukan QC sesuai standar ketat perusahaan.",
        exp1_bullet_3: "Mengidentifikasi risiko operasional (cacat bahan, kerusakan mesin, dan potensi keterlambatan).",
        exp1_bullet_4: "Mengolah data produksi dengan MS Excel & berkoordinasi dalam evaluasi efisiensi operasional.",
        exp1_gallery_title: "Dokumentasi Kegiatan QC & Produksi (2 Foto):",

        exp2_date: "Februari – Juli 2025",
        exp2_company: "Dinas Pemberdayaan Perempuan Dan Perlindungan Anak – Bandung",
        exp2_title: "Unit Kepegawaian & Administrasi",
        exp2_bullet_1: "Mengelola administrasi penggajian & tunjangan (PNS, PPPK, Honorarium).",
        exp2_bullet_2: "Menyusun LPJ keuangan bulanan, triwulan, & tahunan secara akuntabel.",
        exp2_bullet_3: "Mengelola kearsipan, klasifikasi, penataan, & digitalisasi berkas dokumen perkantoran.",
        exp2_bullet_4: "Memberikan pelayanan & sosialisasi perlindungan perempuan & anak secara empatik & komunikatif.",
        exp2_bullet_5: "Membantu pemeliharaan inventaris & pencatatan Barang Milik Daerah (BMD).",
        exp2_gallery_title: "Dokumentasi Kepegawaian & Kearsipan (5 Foto):",

        exp3_date: "Januari – April 2019",
        exp3_company: "PT. Sumber Alfaria Trijaya Tbk – Bengkulu",
        exp3_title: "Staf Administrasi & Inventaris",
        exp3_bullet_1: "Mengelola stok dan inventaris toko secara efisien dan sistematis.",
        exp3_bullet_2: "Pencatatan & pemantauan keluar-masuk barang serta rekonsiliasi kesesuaian fisik stok.",
        exp3_bullet_3: "Menginput & memperbarui data administrasi transaksi serta laporan penjualan harian.",
        exp3_bullet_4: "Menganalisis data tren penjualan untuk mendukung pengambilan keputusan toko.",

        skills_subtitle: "KAPABILITAS OPERASIONAL & MANAJEMEN",
        skills_title: "Keahlian (Skills & Toolset)",
        skills_hard_title: "Hard Skills",
        skills_soft_title: "Soft Skills",
        skill_h1: "Analisis Data (Excel, Power BI, Google Sheets)",
        skill_h2: "Pengolahan & Visualisasi Data (Pivot Table, Lookup, Pelaporan)",
        skill_h3: "Manajemen Operasi & Rantai Pasok (SCM)",
        skill_h4: "K3 Lingkungan Kerja & Identifikasi Risiko Operasional",
        skill_h5: "Microsoft Office, Canva & Aplikasi Desain/Kantor",
        skill_s1: "Kemampuan Analitis & Evaluasi Risiko Operasional",
        skill_s2: "Ketelitian Tinggi & Presisi Detail (High Precision)",
        skill_s3: "Komunikasi Profesional, Empati & Pelayanan Publik",
        skill_s4: "Kolaborasi Tim Lintas Fungsi (Cross-Functional)",

        contact_sec_subtitle: "KONTAK & KOMUNIKASI PROFESIONAL",
        contact_sec_title: "Informasi Kontak",
        contact_info_title: "Informasi Kontak & Kolaborasi",
        contact_info_desc: "Saya terbuka untuk peluang karir, posisi manajemen operasi, administrasi keuangan, quality control, rantai pasok, maupun kolaborasi profesional.",

        badge_scm: "Manajemen Rantai Pasok (SCM)",
        badge_fin_mgmt: "Manajemen Keuangan",
        badge_prod_mgmt: "Manajemen Produksi",
        badge_data_analysis: "Analisis Data",
        badge_qc: "Pengendalian Mutu (QC)",
        badge_risk_mgmt: "Manajemen Risiko (ERM)",
        badge_office_admin: "Administrasi Perkantoran",
        badge_asset_doc: "Manajemen Aset & Dokumen",

        c_location: "Lokasi",
        c_location_val: "Bandung, Jawa Barat, Indonesia",
        footer_rights: "Hak cipta dilindungi undang-undang.",

        modal1_tag: "CV Indogarment Pasir Honje Lamping – Bandung (Nov 2025 – Feb 2026)",
        modal2_tag: "DP3A Kota Bandung (Februari – Juli 2025)",
        modal3_tag: "PT. Sumber Alfaria Trijaya Tbk – Bengkulu (Januari – April 2019)",
        modal_desc_label: "Deskripsi & Tanggung Jawab:",

        email_modal_title: "Hubungi via Email",
        email_modal_subtitle: "Pilih aplikasi atau peramban favorit Anda untuk mengirim pesan ke <strong>deaandini83@gmail.com</strong>:",
        email_opt_gmail_desc: "Buka langsung di tab peramban Gmail",
        email_opt_outlook_desc: "Buka di Outlook Web Mail",
        email_opt_yahoo_desc: "Buka di Yahoo Mail Web",
        email_opt_default_title: "Aplikasi Email Bawaan",
        email_opt_default_desc: "Buka via Apple Mail, Windows Mail, Thunderbird, dll.",
        email_copy_btn: "Salin Email",
        email_copied_btn: "Tersalin!",
        email_copied_toast: "Alamat email deaandini83@gmail.com berhasil disalin ke clipboard!"
    },
    en: {
        nav_about: "About",
        nav_education: "Education & Certifications",
        nav_publication: "Publications",
        nav_experience: "Experience",
        nav_skills: "Skills",
        nav_contact: "Contact",

        preloader_subtitle: "Loading Web Portfolio...",
        preloader_opt: "Operations",
        preloader_analytics: "Analytics",
        preloader_quality: "Quality",
        preloader_risk: "Risk Mgt",

        badge_top_title: "OPERATIONS MANAGEMENT",

        hero_headline_new: "Management Graduate | Operations & Supply Chain | Financial & Production Management | Data Analysis | Quality Control",
        btn_download_cv: "Download CV PDF",
        btn_contact_me: "Contact Me",
        stat_projects: "Key Experiences",
        stat_gpa: "Graduation GPA (S1)",
        stat_cert: "Official Licenses",
        about_subtitle: "PROFESSIONAL PROFILE",
        about_title: "Management Graduate | Operations & Supply Chain | Financial & Production Management | Data Analysis | Quality Control",
        about_full_summary: "Bachelor of Management graduate (Operations Management concentration) with proven experience in financial administration, personnel data management, garment production workflows, Quality Control (QC), and operational risk mitigation. Skilled in financial accountability reporting (LPJ), business data analysis, supply chain management, and operational process evaluation. Strong career interests in Operations, Finance, Human Resources, Supply Chain, Production, and Quality Control. Highly communicative, meticulous, adaptable, and collaborative.",

        tech_stack_subtitle: "SOFTWARE & ANALYTICAL TOOLS",
        tech_stack_title: "Software & Analytical Tools",
        tool_excel_title: "Microsoft Excel",
        tool_excel_desc: "Data Analysis, VLOOKUP, Pivot Tables & Production Reports",
        tool_powerbi_title: "Microsoft Power BI",
        tool_powerbi_desc: "Interactive Business Intelligence & Dashboard Visualization",
        tool_sheets_title: "Google Sheets & Drive",
        tool_sheets_desc: "Cloud Data Processing & Digital Archiving Systems",
        tool_word_title: "MS Word & LPJ Reporting",
        tool_word_desc: "Financial Accountability Reports & Office Documentation",
        tool_canva_title: "Canva Visual Design",
        tool_canva_desc: "Visual Design, Production Layouts & Media Assets",
        tool_risk_title: "Risk & QC Tools",
        tool_risk_desc: "Workplace HSE Standards & Quality Control (QC)",

        commitment_title: "COMMITMENT TO QUALITY & OPERATIONAL PRECISION",
        card1_title_full: "Quality Control & Garment QC",
        card1_desc_full: "Observing garment production workflows (cutting, printing/embroidery, sewing, QC, finishing), monitoring product quality to company standards, and identifying operational risks such as fabric flaws and machinery downtime.",
        card2_title_full: "Finance & Digital Archiving",
        card2_desc_full: "Managing payroll & allowance administration (Civil Servants, Contract Staff, Honoraria), drafting monthly, quarterly, and annual financial accountability reports (LPJ), and managing digital record archiving.",
        card3_title_full: "Inventory Control & Data Admin",
        card3_desc_full: "Managing retail store stock and inventory efficiently, tracking inbound/outbound goods, updating administrative databases, and analyzing daily sales performance records.",

        edu_subtitle: "ACADEMIC QUALIFICATIONS & OFFICIAL LICENSES",
        edu_title: "Formal Education & Official Certifications",
        edu_card_title: "Formal Education",
        edu_degree: "Bachelor of Management (Operations) | GPA 3.70 / 4.00",
        courses_title: "10 Core Focus Courses:",
        course_1: "1. Operations Management",
        course_2: "2. Supply Chain Management",
        course_3: "3. Production Planning & Control",
        course_4: "4. Operational Risk Management",
        course_5: "5. Finance & Accounting",
        course_6: "6. Human Resource Management",
        course_7: "7. Business Analytics & Statistics",
        course_8: "8. Management Information Systems",
        course_9: "9. Operations Research",
        course_10: "10. Managerial Decision Making",

        cert_card_title: "Official Certifications",
        cert_badge_count: "7 Official Licenses (PDF)",
        cert1_title: "BNSP – Supply Chain & Production",
        cert1_desc: "BNSP National Competency Certification (Supply Chain & Production)",
        cert2_title: "PBK – Production Management",
        cert2_desc: "Competency-Based Training: Production Management Cluster",
        cert3_title: "Workplace Safety (HSE / K3)",
        cert3_desc: "Workplace HSE & Risk Identification Certification",
        cert4_title: "Capital Market (IDX SPM)",
        cert4_desc: "Indonesia Stock Exchange (IDX) SPM Certification",
        cert5_title: "Microsoft Data Analysis",
        cert5_desc: "Microsoft Certification – Discover Data Analysis",
        cert6_title: "Microsoft Power BI",
        cert6_desc: "Microsoft Certification – Getting Started with Power BI",
        cert7_title: "TOEFL English Proficiency",
        cert7_desc: "Official Score 633 (Advanced Proficiency)",
        cert_view_btn: "View PDF",

        journal_sec_subtitle: "SCIENTIFIC RESEARCH & NATIONAL PUBLICATION",
        journal_sec_title: "Journal Publications & Operational Research",
        journal_name: "Jurnal Fokus Manajemen",
        journal_badge: "Nationally Accredited Journal (SINTA 5)",
        journal_sinta: "Accredited SINTA 5",
        journal_publisher: "Publisher: Faculty of Economics & Business, Universitas Dehasen Bengkulu (UNIVED)",
        journal_vol: "Vol. 6 No. 1 (2026)",
        journal_status: "Published February 2026",
        journal_title: "Implementation Of Enterprise Risk Management (ERM) In Analyzing Operational Risks In The Production Process: A Case Study Of UMKM Indogarment Pasir Honje Lamping",
        journal_author_label: "Authors & Researchers:",
        journal_affiliation: "Department of Management, Universitas Ekuitas Indonesia",
        journal_abstract_label: "Research Abstract:",
        journal_abstract: "This quantitative study analyzes 14 operational risks in the garment production workflow using the Enterprise Risk Management (ERM) framework. Identified 4 High Risk categories (order completion delays, defective fabric rolls, printing/embroidery errors, & raw material shortages) and formulated operational mitigation strategies based on risk scoring & matrix mapping.",
        journal_kw1: "Enterprise Risk Management (ERM)",
        journal_kw2: "Operational Risk",
        journal_kw3: "Garment Production Process",
        journal_kw4: "Risk Scoring & Matrix",
        btn_journal_pdf: "Download Journal PDF",
        btn_journal_loa: "View LOA Letter",
        btn_journal_cert: "Author Certificate",

        projects_subtitle: "INTERNSHIP & WORK TRACK RECORD",
        projects_title: "Internship & Work Experience",
        filter_all: "All Experiences",
        filter_quality: "Quality Control",
        filter_finance: "Finance & Archiving",
        filter_inventory: "Inventory Control",

        exp1_date: "November 2025 – February 2026",
        exp1_company: "CV Indogarment Pasir Honje Lamping – Bandung",
        exp1_title: "Assistant Production Manager",
        exp1_bullet_1: "Observed & analyzed garment production workflows (cutting, printing/embroidery, sewing, QC, finishing).",
        exp1_bullet_2: "Monitored product quality & conducted rigorous QC to company standards.",
        exp1_bullet_3: "Identified operational risks (material defects, machine breakdown, and schedule delays).",
        exp1_bullet_4: "Processed production metrics with MS Excel & collaborated in operational efficiency evaluations.",
        exp1_gallery_title: "QC & Production Activity Documentation (2 Photos):",

        exp2_date: "February – July 2025",
        exp2_company: "Department of Women Empowerment & Child Protection (DP3A) Bandung City",
        exp2_title: "Staffing & Administration Unit",
        exp2_bullet_1: "Managed payroll & allowance administration (Civil Servants, Contract Staff, Honoraria).",
        exp2_bullet_2: "Drafted accurate monthly, quarterly, & annual financial accountability reports (LPJ).",
        exp2_bullet_3: "Managed records archiving, classification, organization, & document digitalization.",
        exp2_bullet_4: "Provided empathetic, professional public service & outreach for women & child protection.",
        exp2_bullet_5: "Assisted in municipal asset management and Regional Property (BMD) record keeping.",
        exp2_gallery_title: "Personnel & Archiving Activity Documentation (5 Photos):",

        exp3_date: "January – April 2019",
        exp3_company: "PT. Sumber Alfaria Trijaya Tbk – Bengkulu",
        exp3_title: "Administrative & Inventory Staff",
        exp3_bullet_1: "Managed store stock and inventory systematically and efficiently.",
        exp3_bullet_2: "Recorded & monitored inbound/outbound goods and reconciled stock discrepancies.",
        exp3_bullet_3: "Entered & updated transaction data and daily sales operational records.",
        exp3_bullet_4: "Analyzed sales trend data to support store managerial decision making.",

        skills_subtitle: "OPERATIONAL & MANAGEMENT CAPABILITIES",
        skills_title: "Skills & Toolset",
        skills_hard_title: "Hard Skills",
        skills_soft_title: "Soft Skills",
        skill_h1: "Data Analysis (Excel, Power BI, Google Sheets)",
        skill_h2: "Data Processing & Visualization (Pivot Table, Lookup, Reporting)",
        skill_h3: "Supply Chain & Production Management",
        skill_h4: "Workplace HSE & Operational Risk Identification",
        skill_h5: "Microsoft Office, Canva & Digital Applications",
        skill_s1: "Analytical Skills & Operational Risk Evaluation",
        skill_s2: "High Precision & Detail-Oriented Execution",
        skill_s3: "Professional Communication & Empathetic Outreach",
        skill_s4: "Cross-Functional Team Collaboration",

        contact_sec_subtitle: "PROFESSIONAL CONTACT & CONNECT",
        contact_sec_title: "Contact Information",
        contact_info_title: "Contact Info & Collaboration",
        contact_info_desc: "I am open to career opportunities, operations management, financial administration, quality control, supply chain positions, or professional collaboration.",

        badge_scm: "Supply Chain Management",
        badge_fin_mgmt: "Financial Management",
        badge_prod_mgmt: "Production Management",
        badge_data_analysis: "Data Analysis",
        badge_qc: "Quality Control (QC)",
        badge_risk_mgmt: "Risk Management (ERM)",
        badge_office_admin: "Office Administration",
        badge_asset_doc: "Asset & Document Management",

        c_location: "Location",
        c_location_val: "Bandung, West Java, Indonesia",
        footer_rights: "All rights reserved.",

        modal1_tag: "CV Indogarment Pasir Honje Lamping – Bandung (Nov 2025 – Feb 2026)",
        modal2_tag: "DP3A Bandung City (February – July 2025)",
        modal3_tag: "PT. Sumber Alfaria Trijaya Tbk – Bengkulu (January – April 2019)",
        modal_desc_label: "Responsibilities & Key Deliverables:",

        email_modal_title: "Choose Email Service",
        email_modal_subtitle: "Choose your preferred app or webmail to send a message to <strong>deaandini83@gmail.com</strong>:",
        email_opt_gmail_desc: "Compose directly in Gmail Web",
        email_opt_outlook_desc: "Compose directly in Outlook / Hotmail Web",
        email_opt_yahoo_desc: "Compose directly in Yahoo Mail Web",
        email_opt_default_title: "Default Email App",
        email_opt_default_desc: "Open via Apple Mail, Windows Mail, Thunderbird, etc.",
        email_copy_btn: "Copy Email",
        email_copied_btn: "Copied!",
        email_copied_toast: "Email address deaandini83@gmail.com copied to clipboard!"
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
        document.documentElement.setAttribute('lang', lang);
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
        { id: 'publication', selector: '.nav-item[href="#publication"]' },
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
    const revealElements = document.querySelectorAll('.slide-card-box, .timeline-box-card, .contact-wide-card, .contact-tile, .skills-single-card, .stat-card-item, .hero-photo-card, .quote-full-card, .pillar-card-tile, .tech-tool-card, .tech-stack-showcase-section, .journal-pub-card, .sec-publication .section-header-title, #contact .section-header-title, .journal-abstract-box, .btn-journal-action');

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
   8b. Interactive Email Client Chooser Engine
   -------------------------------------------------------------------------- */
function initEmailChooserModal() {
    const emailTile = document.getElementById('emailContactTile');
    const emailLink = document.getElementById('emailContactLink');
    const emailModal = document.getElementById('emailChooserModal');
    const copyBtn = document.getElementById('btnCopyEmail');
    const copyLabel = document.getElementById('copyEmailLabel');
    const copyIcon = document.getElementById('copyEmailIcon');
    const optionCards = document.querySelectorAll('.email-option-card');
    const targetEmail = 'deaandini83@gmail.com';

    function openEmailModal(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (emailModal) {
            emailModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    if (emailTile) {
        emailTile.addEventListener('click', openEmailModal);
        emailTile.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                openEmailModal(e);
            }
        });
    }

    if (emailLink) {
        emailLink.addEventListener('click', openEmailModal);
    }

    // Auto-close modal when an option is selected so the UI feels responsive
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            setTimeout(() => {
                if (emailModal) {
                    emailModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }, 300);
        });
    });

    if (copyBtn) {
        copyBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const currentLang = localStorage.getItem('dpa_lang') || 'en';
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(targetEmail);
                } else {
                    const tempInput = document.createElement('input');
                    tempInput.value = targetEmail;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempInput);
                }

                copyBtn.classList.add('copied');
                if (copyIcon) copyIcon.className = 'bx bx-check';
                if (copyLabel) copyLabel.textContent = translations[currentLang]?.email_copied_btn || (currentLang === 'id' ? 'Tersalin!' : 'Copied!');

                const toastMsg = translations[currentLang]?.email_copied_toast || (currentLang === 'id' ? 'Alamat email deaandini83@gmail.com berhasil disalin ke clipboard!' : 'Email address deaandini83@gmail.com copied to clipboard!');
                showToast(toastMsg);

                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    if (copyIcon) copyIcon.className = 'bx bx-copy';
                    if (copyLabel) copyLabel.textContent = translations[currentLang]?.email_copy_btn || (currentLang === 'id' ? 'Salin Email' : 'Copy Email');
                }, 2500);
            } catch (err) {
                console.error('Failed to copy email:', err);
            }
        });
    }
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

    // Observer for Job Description Bullets (GPU Hardware-Accelerated 60/120 FPS Smooth Slide-Fade)
    // and Photos (Magnetic Scatter & Assemble) in Work Experience Cards
    const expTimelineCards = document.querySelectorAll('.timeline-box-card');
    if (expTimelineCards.length && 'IntersectionObserver' in window) {
        expTimelineCards.forEach((card) => {
            const expPhotos = card.querySelectorAll('.exp-photo-thumb');

            // Apply magnetic scatter setup for photos
            if (expPhotos.length) {
                applyScatter(expPhotos);
            }

            // Observe Card to Trigger Animations
            const expObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
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

