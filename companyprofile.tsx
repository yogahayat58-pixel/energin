import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Menu, X, ChevronRight, ArrowRight, Settings, Users, PenTool, 
  Briefcase, FileText, MessageSquare, MapPin, Phone, Mail, 
  CheckCircle2, Clock, ShieldCheck, Zap, Factory, Award,
  Search, Filter, ChevronLeft, ChevronDown, LayoutDashboard,
  Image as ImageIcon, Globe, Palette, LogOut, Activity, TrendingUp
} from 'lucide-react';

const COMPANY_INFO = {
  name: "PT Industri Nusantara",
  shortDesc: "Solusi Manufaktur & Engineering Presisi Kelas Dunia",
  longDesc: "PT Industri Nusantara adalah pemimpin dalam industri manufaktur, fabrikasi logam, dan otomasi industri di Indonesia. Dengan pengalaman lebih dari 20 tahun, kami berkomitmen menghadirkan solusi engineering presisi tinggi yang inovatif, efisien, dan berstandar internasional.",
  email: "contact@industrinusantara.co.id",
  phone: "+62 21 555 0123",
  address: "Kawasan Industri Terpadu, Jl. Tekno Raya Blok A No. 1, Cikarang, Jawa Barat 17530",
  established: 2003,
  stats: {
    experience: 20,
    projects: 500,
    employees: 120,
    satisfaction: 98
  }
};

const SERVICES = [
  { id: 'fabrikasi-logam', icon: Factory, title: "Fabrikasi Logam", desc: "Pemotongan, pembentukan, dan perakitan logam presisi untuk berbagai kebutuhan industri berat maupun ringan.", image: "https://images.unsplash.com/photo-1565439390234-fc0ce9f182f2?auto=format&fit=crop&q=80&w=800" },
  { id: 'cnc-machining', icon: Settings, title: "CNC Machining", desc: "Layanan pemesinan CNC presisi tinggi untuk komponen kompleks dengan toleransi ketat.", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" },
  { id: 'laser-cutting', icon: Zap, title: "Laser Cutting", desc: "Pemotongan presisi menggunakan teknologi laser mutakhir untuk plat besi, stainless, dan aluminium.", image: "https://images.unsplash.com/photo-1504917595217-d4bf06332d73?auto=format&fit=crop&q=80&w=800" },
  { id: 'welding-assembly', icon: PenTool, title: "Welding & Assembly", desc: "Pengelasan bersertifikat (MIG/TIG/Argon) dan perakitan struktur mesin atau pabrik.", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800" },
  { id: 'industrial-automation', icon: Activity, title: "Industrial Automation", desc: "Integrasi sistem robotika dan PLC untuk meningkatkan efisiensi dan kapasitas produksi lini pabrik Anda.", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" },
  { id: 'design-engineering', icon: FileText, title: "Design Engineering", desc: "Perancangan 3D CAD/CAM dan simulasi engineering untuk memastikan produk akhir sempurna sebelum diproduksi.", image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800" },
  { id: 'custom-machine', icon: Briefcase, title: "Custom Machine", desc: "Pembuatan mesin khusus (custom) yang disesuaikan dengan kebutuhan unik proses manufaktur klien.", image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80&w=800" },
  { id: 'maintenance', icon: ShieldCheck, title: "Maintenance & Overhaul", desc: "Perawatan berkala, perbaikan mesin industri, dan rekondisi untuk memperpanjang usia pakai aset.", image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=800" },
];

const PROJECTS = [
  { id: 'otomasi-pabrik-otomotif', category: 'Automation', title: "Sistem Otomasi Pabrik Otomotif", location: "Karawang, Indonesia", image: "https://images.unsplash.com/photo-1563906648771-cd2a39396263?auto=format&fit=crop&q=80&w=800", client: "PT Auto Makmur", year: "2023", challenge: "Mengurangi bottleneck di lini perakitan chassis.", solution: "Implementasi 12 unit lengan robot terintegrasi PLC.", results: "Peningkatan produksi 35% dan nihil kecelakaan kerja." },
  { id: 'fabrikasi-tangki-kimia', category: 'Fabrication', title: "Fabrikasi Tangki Penyimpanan Kimia", location: "Cilegon, Indonesia", image: "https://images.unsplash.com/photo-1585869382218-c0b8529f79b6?auto=format&fit=crop&q=80&w=800", client: "ChemCo Ltd.", year: "2022", challenge: "Material khusus tahan korosi tinggi.", solution: "Penggunaan Stainless Steel 316L dengan pengelasan TIG.", results: "Tangki tersertifikasi ASME dan tahan hingga 15 tahun." },
  { id: 'komponen-turbin', category: 'CNC Machining', title: "Manufaktur Komponen Turbin Gas", location: "Batam, Indonesia", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800", client: "AeroPower Inc.", year: "2024", challenge: "Toleransi ukuran mikro dan material titanium.", solution: "Penggunaan Mesin CNC 5-Axis presisi tinggi.", results: "Presisi mencapai 0.001mm dengan zero defect." },
  { id: 'sistem-conveyor', category: 'Custom Machine', title: "Sistem Conveyor Pintar", location: "Surabaya, Indonesia", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800", client: "Logistik Cepat", year: "2023", challenge: "Penyortiran ribuan paket per jam.", solution: "Conveyor modular dengan sensor optik.", results: "Kapasitas sortir meningkat menjadi 10.000 paket/jam." },
];

const ARTICLES = [
  { id: 'masa-depan-manufaktur', title: "Masa Depan Manufaktur: Era Industri 4.0", date: "15 Sep 2023", author: "Budi Santoso", category: "Teknologi", summary: "Bagaimana integrasi IoT dan AI mengubah wajah industri manufaktur di Indonesia menjadi lebih pintar dan efisien.", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" },
  { id: 'pentingnya-cnc', title: "Mengapa CNC Machining Penting untuk Presisi?", date: "02 Okt 2023", author: "Hendra Wijaya", category: "Edukasi", summary: "Mengenal lebih dalam teknologi CNC dan mengapa ia menjadi standar emas untuk produksi komponen yang membutuhkan presisi tinggi.", image: "https://images.unsplash.com/photo-1565439390234-fc0ce9f182f2?auto=format&fit=crop&q=80&w=800" },
  { id: 'tips-perawatan-mesin', title: "5 Tips Perawatan Mesin Industri Jangka Panjang", date: "20 Nov 2023", author: "Tim Maintenance", category: "Panduan", summary: "Panduan lengkap merawat mesin industri agar memiliki umur pakai yang panjang dan mengurangi risiko downtime tak terduga.", image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=800" },
];

const TESTIMONIALS = [
  { name: "Andi Permana", company: "Direktur, PT Auto Makmur", text: "Kualitas fabrikasi dari PT Industri Nusantara sangat luar biasa. Tepat waktu dan presisi." },
  { name: "Sarah Wijaya", company: "Manager Operasional, ChemCo", text: "Solusi otomasi mereka meningkatkan efisiensi pabrik kami hingga 40%. Sangat direkomendasikan!" },
  { name: "Budi Gunawan", company: "CEO, Logistik Cepat", text: "Profesional, komunikatif, dan hasil kerja mesin custom-nya melampaui ekspektasi kami." }
];

const useHashRouter = () => {
  const [hash, setHash] = useState(window.location.hash || '#home');
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || '#home');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  return hash.replace('#', '');
};

const navigateTo = (path) => {
  window.location.hash = path;
  window.scrollTo(0, 0);
};

const SEO = ({ title, description }) => {
  useEffect(() => {
    document.title = `${title} | ${COMPANY_INFO.name}`;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description || COMPANY_INFO.shortDesc;
  }, [title, description]);
  return null;
};

const Button = ({ children, variant = 'primary', className = '', onClick, icon: Icon }) => {
  const baseStyle = "inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all duration-300 transform active:scale-95";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30",
    secondary: "bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30",
    outline: "border-2 border-slate-200 text-slate-700 hover:border-blue-600 hover:text-blue-600 bg-transparent",
    ghost: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm",
  };
  
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
      {Icon && <Icon size={18} className="group-hover:translate-x-1 transition-transform" />}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, alignment = 'center', light = false }) => (
  <div className={`mb-16 ${alignment === 'center' ? 'text-center' : 'text-left'}`}>
    <motion.span 
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className={`text-sm font-bold tracking-wider uppercase mb-3 block ${light ? 'text-blue-400' : 'text-blue-600'}`}
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
      className={`text-3xl md:text-5xl font-bold tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}
    >
      {title}
    </motion.h2>
    <div className={`h-1 w-20 bg-orange-500 rounded-full mt-6 ${alignment === 'center' ? 'mx-auto' : ''}`} />
  </div>
);

const AnimatedCounter = ({ value, label, suffix = "+" }) => {
  return (
    <div className="text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-2 drop-shadow-sm"
      >
        {value}{suffix}
      </motion.div>
      <div className="text-sm md:text-base font-medium text-slate-500 uppercase tracking-wide">{label}</div>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', path: 'home' },
    { name: 'Tentang Kami', path: 'about' },
    { name: 'Layanan', path: 'services' },
    { name: 'Proyek', path: 'projects' },
    { name: 'Artikel', path: 'articles' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <Factory className="text-white" size={24} />
          </div>
          <span className={`font-bold text-xl md:text-2xl tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
            Indo<span className="text-orange-500">Nusa</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.path}`}
              className={`font-medium transition-colors hover:text-orange-500 ${isScrolled ? 'text-slate-600' : 'text-slate-200'}`}
            >
              {link.name}
            </a>
          ))}
          <Button onClick={() => navigateTo('contact')} variant={isScrolled ? 'primary' : 'ghost'} className="ml-4">
            Hubungi Kami
          </Button>
        </div>

        {/* Mobile Nav Toggle */}
        <button className={`md:hidden p-2 ${isScrolled ? 'text-slate-900' : 'text-white'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-xl absolute top-full left-0 w-full overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} href={`#${link.path}`} onClick={() => setMobileMenuOpen(false)}
                  className="font-medium text-slate-800 p-2 hover:bg-slate-50 rounded-lg"
                >
                  {link.name}
                </a>
              ))}
              <Button onClick={() => { navigateTo('contact'); setMobileMenuOpen(false); }} className="w-full mt-2">Hubungi Kami</Button>
              <button onClick={() => { navigateTo('admin'); setMobileMenuOpen(false); }} className="text-xs text-slate-400 mt-4 text-center">Login Admin</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-950 text-slate-300 pt-20 pb-10">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Factory className="text-white" size={24} />
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">
              Indo<span className="text-orange-500">Nusa</span>
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed mb-6">{COMPANY_INFO.longDesc.substring(0, 150)}...</p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold text-lg mb-6">Layanan Kami</h4>
          <ul className="space-y-3">
            {SERVICES.slice(0, 5).map(s => (
              <li key={s.id}><a href={`#service/${s.id}`} className="hover:text-orange-500 transition-colors flex items-center gap-2"><ChevronRight size={14}/> {s.title}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-lg mb-6">Tautan Cepat</h4>
          <ul className="space-y-3">
            <li><a href="#about" className="hover:text-orange-500 transition-colors flex items-center gap-2"><ChevronRight size={14}/> Tentang Kami</a></li>
            <li><a href="#projects" className="hover:text-orange-500 transition-colors flex items-center gap-2"><ChevronRight size={14}/> Portofolio Proyek</a></li>
            <li><a href="#articles" className="hover:text-orange-500 transition-colors flex items-center gap-2"><ChevronRight size={14}/> Berita & Artikel</a></li>
            <li><a href="#contact" className="hover:text-orange-500 transition-colors flex items-center gap-2"><ChevronRight size={14}/> Karir</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-lg mb-6">Hubungi Kami</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-blue-500 shrink-0 mt-1" />
              <span>{COMPANY_INFO.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-blue-500 shrink-0" />
              <span>{COMPANY_INFO.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-blue-500 shrink-0" />
              <span>{COMPANY_INFO.email}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#admin" className="text-sm text-slate-600 hover:text-slate-400">Admin Portal</a>
        </div>
      </div>
    </div>
  </footer>
);

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
);

const HomePage = () => {
  return (
    <MainLayout>
      <SEO title="Beranda" />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000" 
            alt="Factory Background" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 font-medium text-sm mb-6 backdrop-blur-md">
              <Award size={16} /> ISO 9001:2015 Certified Company
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              Solusi Manufaktur <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">Presisi Tinggi</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl leading-relaxed">
              Membangun masa depan industri dengan teknologi canggih, fabrikasi metal berkualitas, dan solusi otomasi cerdas untuk efisiensi bisnis Anda.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => navigateTo('contact')} icon={ArrowRight} className="group">Mulai Konsultasi</Button>
              <Button onClick={() => navigateTo('services')} variant="ghost">Lihat Layanan Kami</Button>
            </div>
          </motion.div>

          <div className="hidden lg:block relative h-full">
             {/* Floating Elements mimicking premium UI */}
             <motion.div 
               animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-10 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl w-64"
             >
               <div className="flex items-center gap-4 mb-3">
                 <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center"><CheckCircle2 className="text-white" /></div>
                 <div>
                   <div className="text-2xl font-bold text-white">98%</div>
                   <div className="text-xs text-slate-300">Client Satisfaction</div>
                 </div>
               </div>
               <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                 <div className="bg-orange-500 w-[98%] h-full rounded-full" />
               </div>
             </motion.div>

             <motion.div 
               animate={{ y: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute bottom-20 left-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl flex items-center gap-4"
             >
               <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">20+</div>
               <div>
                 <div className="font-bold text-white">Tahun Pengalaman</div>
                 <div className="text-xs text-slate-300">Engineering Excellence</div>
               </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Clients Marquee Simulation */}
      <div className="bg-white py-8 border-b border-slate-100 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col items-center">
          <p className="text-sm font-medium text-slate-400 mb-6 uppercase tracking-widest">Dipercaya Oleh Perusahaan Terkemuka</p>
          <div className="flex gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 items-center justify-center flex-wrap">
            {['AutoMakmur', 'ChemCo', 'AeroPower', 'Logistik Cepat', 'IndoSteel'].map(client => (
              <span key={client} className="text-2xl font-black font-serif text-slate-400">{client}</span>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1565439390234-fc0ce9f182f2?auto=format&fit=crop&q=80&w=800" alt="Pabrik" className="w-full object-cover" />
                <div className="absolute inset-0 border-4 border-white/20 rounded-3xl" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <SectionHeading title="Dedikasi pada Presisi & Kualitas" subtitle="Tentang Kami" alignment="left" />
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Kami bukan sekadar bengkel fabrikasi. Kami adalah mitra strategis Anda dalam memecahkan tantangan manufaktur yang kompleks. Dengan kombinasi mesin berteknologi tinggi dan teknisi bersertifikat, kami menjamin hasil akhir yang sempurna.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Fasilitas produksi modern seluas 10,000 m2",
                  "Mesin CNC presisi tinggi berstandar Eropa",
                  "Tim engineering dengan pengalaman global",
                  "Sistem kontrol kualitas yang ketat (ISO 9001)"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="text-orange-500" size={20} /> {item}
                  </li>
                ))}
              </ul>
              <Button onClick={() => navigateTo('about')} variant="outline">Selengkapnya Tentang Kami</Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionHeading title="Layanan Industrial Terpadu" subtitle="Keahlian Kami" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((srv, idx) => (
              <motion.div 
                key={srv.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigateTo(`service/${srv.id}`)}
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <srv.icon size={28} className="text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{srv.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{srv.desc}</p>
                <div className="flex items-center text-orange-500 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Pelajari Lebih Lanjut <ChevronRight size={16} className="ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-blue-800/50">
            <AnimatedCounter value={COMPANY_INFO.stats.experience} label="Tahun Pengalaman" />
            <AnimatedCounter value={COMPANY_INFO.stats.projects} label="Proyek Selesai" />
            <AnimatedCounter value={COMPANY_INFO.stats.employees} label="Tenaga Ahli" />
            <AnimatedCounter value={COMPANY_INFO.stats.satisfaction} label="Kepuasan Klien" suffix="%" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
             <SectionHeading title="Karya & Inovasi Kami" subtitle="Portofolio" alignment="left" />
             <Button onClick={() => navigateTo('projects')} variant="outline" className="mb-8 md:mb-16">Lihat Semua Proyek</Button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.slice(0, 4).map((proj, idx) => (
              <motion.div 
                key={proj.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                onClick={() => navigateTo(`project/${proj.id}`)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all h-80"
              >
                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded mb-3 inline-block uppercase tracking-wide">{proj.category}</span>
                  <h3 className="text-2xl font-bold text-white mb-2">{proj.title}</h3>
                  <p className="text-slate-300 text-sm flex items-center gap-2"><MapPin size={14}/> {proj.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-orange-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Siap Merealisasikan Visi Industri Anda?</h2>
          <p className="text-orange-100 text-lg mb-10 max-w-2xl mx-auto">Diskusikan kebutuhan fabrikasi atau mesin kustom Anda dengan tim engineering kami hari ini. Dapatkan solusi optimal dengan efisiensi maksimal.</p>
          <Button onClick={() => navigateTo('contact')} variant="primary" className="bg-slate-900 hover:bg-slate-800 text-white border-none shadow-xl">
            Hubungi Tim Ahli Kami
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

const ServicesPage = () => {
  return (
    <MainLayout>
      <SEO title="Layanan Kami" />
      <div className="bg-slate-900 pt-32 pb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Layanan Industrial Terpadu</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">Dari desain rekayasa hingga produksi massal, kami menawarkan end-to-end solution untuk kebutuhan manufaktur Anda.</p>
      </div>
      
      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((srv) => (
              <div 
                key={srv.id} 
                onClick={() => navigateTo(`service/${srv.id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-slate-100 group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={srv.image} alt={srv.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-blue-600 shadow-lg">
                    <srv.icon size={20} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{srv.title}</h3>
                  <p className="text-slate-600 text-sm line-clamp-3 mb-4">{srv.desc}</p>
                  <span className="text-blue-600 font-medium text-sm flex items-center group-hover:text-orange-500 transition-colors">
                    Pelajari Detail <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const ServiceDetailPage = ({ id }) => {
  const service = SERVICES.find(s => s.id === id);
  
  if (!service) return <MainLayout><div className="pt-40 pb-20 text-center text-2xl font-bold text-slate-700">Layanan tidak ditemukan.</div></MainLayout>;

  return (
    <MainLayout>
      <SEO title={service.title} description={service.desc} />
      <div className="relative pt-32 pb-24 bg-slate-900 overflow-hidden">
        <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="inline-flex items-center gap-2 text-orange-500 font-bold tracking-wider uppercase text-sm mb-4">
            <service.icon size={18} /> Kategori Layanan
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-3xl">{service.title}</h1>
          <p className="text-xl text-slate-300 max-w-2xl">{service.desc}</p>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Deskripsi Layanan</h2>
            <div className="prose prose-lg text-slate-600 mb-12">
              <p>Layanan {service.title} kami dirancang untuk memenuhi standar industri tertinggi. Dengan peralatan mutakhir dan staf berpengalaman, PT Industri Nusantara berkomitmen untuk memberikan hasil yang tidak hanya memenuhi, tetapi melampaui spesifikasi yang Anda butuhkan.</p>
              <p>Kami menggunakan metodologi terkini untuk memastikan setiap proyek diselesaikan secara efisien, presisi, dan aman. Proses Quality Control kami yang berlapis memastikan zero defect pada setiap produk akhir.</p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-6">Keunggulan Layanan Ini</h3>
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {['Presisi Tinggi (Toleransi Mikro)', 'Efisiensi Waktu Pengerjaan', 'Material Berkualitas Premium', 'Sertifikasi Keamanan & Standar'].map((ben, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="text-orange-500 shrink-0" />
                  <span className="font-medium text-slate-700">{ben}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 sticky top-32 shadow-sm">
              <h4 className="text-xl font-bold text-slate-900 mb-4">Butuh Layanan Ini?</h4>
              <p className="text-slate-600 mb-6 text-sm">Tim engineering kami siap berdiskusi mengenai spesifikasi teknis dan memberikan penawaran terbaik untuk proyek Anda.</p>
              <Button onClick={() => navigateTo('contact')} className="w-full justify-center mb-4">Minta Penawaran</Button>
              <Button onClick={() => navigateTo('services')} variant="outline" className="w-full justify-center">Lihat Layanan Lain</Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const ProjectsPage = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(PROJECTS.map(p => p.category))];
  
  const filteredProjects = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <MainLayout>
      <SEO title="Portofolio Proyek" />
      <div className="bg-slate-900 pt-32 pb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Karya & Inovasi</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">Eksplorasi bagaimana kami memecahkan tantangan manufaktur klien di berbagai sektor industri.</p>
      </div>

      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map(cat => (
              <button 
                key={cat} onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}
                  key={proj.id} 
                  onClick={() => navigateTo(`project/${proj.id}`)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-slate-100 group"
                >
                  <div className="h-56 overflow-hidden relative">
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold rounded shadow-sm uppercase">{proj.category}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{proj.title}</h3>
                    <p className="text-slate-500 text-sm flex items-center gap-1 mb-4"><MapPin size={14}/> {proj.location}</p>
                    <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-sm">
                      <span className="text-slate-600">Klien: <strong className="text-slate-900">{proj.client}</strong></span>
                      <span className="text-blue-600 font-semibold group-hover:text-orange-500 transition-colors">Detail <ArrowRight size={14} className="inline ml-1" /></span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const ProjectDetailPage = ({ id }) => {
  const proj = PROJECTS.find(p => p.id === id);
  if (!proj) return <MainLayout><div className="pt-40 text-center font-bold text-2xl">Project not found</div></MainLayout>;

  return (
    <MainLayout>
      <SEO title={proj.title} />
      <div className="pt-32 pb-20 bg-slate-900">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <span className="px-4 py-1.5 rounded-full bg-orange-500/20 text-orange-400 font-bold text-sm tracking-wide uppercase mb-6 inline-block">{proj.category}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto">{proj.title}</h1>
          <div className="flex flex-wrap justify-center gap-6 text-slate-300">
            <span className="flex items-center gap-2"><Briefcase size={16}/> {proj.client}</span>
            <span className="flex items-center gap-2"><MapPin size={16}/> {proj.location}</span>
            <span className="flex items-center gap-2"><Clock size={16}/> Tahun {proj.year}</span>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <img src={proj.image} alt={proj.title} className="w-full rounded-2xl shadow-xl mb-16 h-[50vh] object-cover" />
            
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-12">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"><LayoutDashboard className="text-blue-600"/> Tantangan Proyek</h3>
                  <p className="text-lg text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-xl border-l-4 border-orange-500">{proj.challenge}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"><Settings className="text-blue-600"/> Solusi Engineering</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">{proj.solution}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"><TrendingUp className="text-blue-600"/> Hasil Akhir</h3>
                  <p className="text-lg text-slate-600 leading-relaxed bg-green-50 p-6 rounded-xl border-l-4 border-green-500">{proj.results}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl h-fit border border-slate-200">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Informasi Proyek</h4>
                <ul className="space-y-4 text-sm">
                  <li className="border-b border-slate-200 pb-2"><span className="block text-slate-500 mb-1">Klien</span><strong className="text-slate-900 text-base">{proj.client}</strong></li>
                  <li className="border-b border-slate-200 pb-2"><span className="block text-slate-500 mb-1">Kategori</span><strong className="text-slate-900 text-base">{proj.category}</strong></li>
                  <li className="border-b border-slate-200 pb-2"><span className="block text-slate-500 mb-1">Lokasi</span><strong className="text-slate-900 text-base">{proj.location}</strong></li>
                  <li className="border-b border-slate-200 pb-2"><span className="block text-slate-500 mb-1">Tahun Selesai</span><strong className="text-slate-900 text-base">{proj.year}</strong></li>
                </ul>
                <Button onClick={() => navigateTo('contact')} className="w-full mt-8">Konsultasikan Proyek Serupa</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const ContactPage = () => {
  return (
    <MainLayout>
      <SEO title="Hubungi Kami" />
      <div className="bg-slate-900 pt-32 pb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Hubungi Kami</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">Tim kami siap membantu merealisasikan kebutuhan manufaktur Anda.</p>
      </div>

      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Informasi Kontak</h2>
            <div className="space-y-6 mb-12">
              <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0"><MapPin /></div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Alamat Kantor & Pabrik</h4>
                  <p className="text-slate-600">{COMPANY_INFO.address}</p>
                </div>
              </div>
              <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0"><Phone /></div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Telepon</h4>
                  <p className="text-slate-600">{COMPANY_INFO.phone}</p>
                </div>
              </div>
              <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0"><Mail /></div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Email</h4>
                  <p className="text-slate-600">{COMPANY_INFO.email}</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-4">Jam Operasional</h3>
            <ul className="space-y-2 text-slate-600 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <li className="flex justify-between border-b border-slate-50 pb-2"><span>Senin - Jumat:</span> <strong>08:00 - 17:00 WIB</strong></li>
              <li className="flex justify-between border-b border-slate-50 pb-2 pt-2"><span>Sabtu:</span> <strong>08:00 - 13:00 WIB</strong></li>
              <li className="flex justify-between pt-2"><span>Minggu / Libur Nasional:</span> <strong className="text-red-500">Tutup</strong></li>
            </ul>
          </div>

          {/* Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Kirim Pesan</h3>
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Pesan berhasil dikirim (Simulasi)"); }}>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap *</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                  <input type="email" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="john@company.com" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Perusahaan</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="PT Maju Jaya" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Telepon / WhatsApp</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="+62 812..." />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Pesan *</label>
                <textarea required rows="5" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none" placeholder="Deskripsikan kebutuhan Anda di sini..."></textarea>
              </div>
              <Button type="submit" className="w-full justify-center py-4 text-lg">Kirim Pesan Sekarang</Button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const AdminLayout = ({ children, activeMenu, setActiveMenu }) => {
  const [isDark, setIsDark] = useState(true); // Default dark for premium admin feel
  const menus = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'profile', icon: Users, label: 'Kelola Profil' },
    { id: 'services', icon: Settings, label: 'Kelola Layanan' },
    { id: 'projects', icon: Briefcase, label: 'Kelola Project' },
    { id: 'articles', icon: FileText, label: 'Kelola Artikel' },
    { id: 'media', icon: ImageIcon, label: 'Media Manager' },
    { id: 'seo', icon: Globe, label: 'SEO Website' },
    { id: 'theme', icon: Palette, label: 'Pengaturan Tema' },
  ];

  return (
    <div className={`flex min-h-screen ${isDark ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
      <SEO title="Admin Dashboard" />
      {/* Sidebar */}
      <aside className={`w-64 fixed inset-y-0 left-0 z-50 border-r transition-colors ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className={`h-16 flex items-center px-6 border-b font-bold text-xl ${isDark ? 'border-slate-800 text-white' : 'border-slate-200 text-slate-900'}`}>
          IndoNusa Admin
        </div>
        <nav className="p-4 space-y-1">
          {menus.map(menu => (
            <button
              key={menu.id}
              onClick={() => setActiveMenu(menu.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeMenu === menu.id ? 'bg-blue-600 text-white' : (isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')}`}
            >
              <menu.icon size={18} />
              {menu.label}
            </button>
          ))}
        </nav>
        <div className={`absolute bottom-0 w-full p-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <button onClick={() => navigateTo('home')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isDark ? 'text-red-400 hover:bg-red-500/10' : 'text-red-600 hover:bg-red-50'}`}>
            <LogOut size={18} /> Keluar (Ke Web)
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        <header className={`h-16 flex items-center justify-between px-8 border-b ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h2 className="font-semibold text-lg">{menus.find(m => m.id === activeMenu)?.label || 'Dashboard'}</h2>
          <div className="flex items-center gap-4">
             <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white">Toggle Theme</button>
             <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">A</div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [servicesData, setServicesData] = useState(SERVICES);

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-6">
              {[{title: 'Total Layanan', val: servicesData.length, color: 'blue'}, {title: 'Total Project', val: PROJECTS.length, color: 'green'}, {title: 'Artikel', val: ARTICLES.length, color: 'orange'}, {title: 'Pesan Baru', val: 5, color: 'red'}].map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
                  <div className="text-slate-400 text-sm font-medium mb-2">{stat.title}</div>
                  <div className={`text-3xl font-bold text-${stat.color}-400`}>{stat.val}</div>
                </div>
              ))}
            </div>
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 min-h-[400px] flex items-center justify-center text-slate-500">
               <span className="flex flex-col items-center gap-3"><Activity size={48} className="text-slate-700"/> Grafik Kunjungan (Simulasi)</span>
            </div>
          </div>
        );
      case 'services':
        return (
          <div className="space-y-6">
             <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Kelola Layanan</h3>
                <Button className="py-2 px-4 text-sm"><PenTool size={16} className="mr-2"/> Tambah Layanan</Button>
             </div>
             <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-sm text-slate-400">
                  <thead className="bg-slate-800/50 text-slate-300">
                    <tr><th className="px-6 py-4">Nama Layanan</th><th className="px-6 py-4">Deskripsi Singkat</th><th className="px-6 py-4">Aksi</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {servicesData.map(s => (
                      <tr key={s.id} className="hover:bg-slate-800/30">
                        <td className="px-6 py-4 font-medium text-white">{s.title}</td>
                        <td className="px-6 py-4 line-clamp-1 max-w-md">{s.desc}</td>
                        <td className="px-6 py-4 space-x-3">
                          <button className="text-blue-400 hover:text-blue-300">Edit</button>
                          <button className="text-red-400 hover:text-red-300">Hapus</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500 gap-4">
             <Settings size={48} className="text-slate-700 opacity-50" />
             <p>Modul <strong className="text-slate-300">{menus.find(m=>m.id === activeMenu)?.label}</strong> sedang dalam pengembangan (Simulasi UI).</p>
          </div>
        );
    }
  };

  const menus = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'profile', label: 'Kelola Profil' },
    { id: 'services', label: 'Kelola Layanan' },
    { id: 'projects', label: 'Kelola Project' },
    { id: 'articles', label: 'Kelola Artikel' },
    { id: 'media', label: 'Media Manager' },
    { id: 'seo', label: 'SEO Website' },
    { id: 'theme', label: 'Pengaturan Tema' },
  ];

  return <AdminLayout activeMenu={activeMenu} setActiveMenu={setActiveMenu}>{renderContent()}</AdminLayout>;
};

export default function App() {
  const currentPath = useHashRouter();

  // Simple Router Switcher
  const renderPage = () => {
    if (currentPath === 'home' || currentPath === '') return <HomePage />;
    if (currentPath === 'services') return <ServicesPage />;
    if (currentPath.startsWith('service/')) {
      const id = currentPath.split('/')[1];
      return <ServiceDetailPage id={id} />;
    }
    if (currentPath === 'projects') return <ProjectsPage />;
    if (currentPath.startsWith('project/')) {
      const id = currentPath.split('/')[1];
      return <ProjectDetailPage id={id} />;
    }
    if (currentPath === 'contact') return <ContactPage />;
    if (currentPath === 'admin') return <AdminDashboard />;
    
    // Placeholder for routes not explicitly requested to be fully coded to save space
    // but demonstrating routing exists for About, Articles, etc.
    if (currentPath === 'about') return (
      <MainLayout>
        <div className="pt-40 pb-20 text-center container mx-auto">
          <SectionHeading title="Sejarah & Visi Kami" subtitle="Tentang Perusahaan" />
          <p className="max-w-2xl mx-auto text-slate-600 mb-8">{COMPANY_INFO.longDesc}</p>
          <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200" alt="Team" className="rounded-3xl shadow-2xl w-full h-[400px] object-cover" />
        </div>
      </MainLayout>
    );

    if (currentPath === 'articles') return (
      <MainLayout>
         <div className="pt-40 pb-20 container mx-auto px-6 text-center">
            <SectionHeading title="Artikel & Berita Industri" subtitle="Insights" />
            <div className="grid md:grid-cols-3 gap-8 text-left mt-12">
              {ARTICLES.map(art => (
                <div key={art.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer hover:shadow-xl transition-all">
                   <img src={art.image} alt={art.title} className="w-full h-48 object-cover" />
                   <div className="p-6">
                      <div className="flex justify-between text-xs font-semibold text-slate-500 mb-3 uppercase"><span>{art.category}</span><span>{art.date}</span></div>
                      <h3 className="font-bold text-xl mb-3 text-slate-900 leading-tight">{art.title}</h3>
                      <p className="text-slate-600 text-sm line-clamp-3 mb-4">{art.summary}</p>
                      <span className="text-blue-600 font-medium text-sm">Baca Selengkapnya &rarr;</span>
                   </div>
                </div>
              ))}
            </div>
         </div>
      </MainLayout>
    );

    // Fallback 404
    return (
      <MainLayout>
        <div className="pt-40 pb-20 text-center min-h-[70vh] flex flex-col justify-center items-center">
          <h1 className="text-9xl font-black text-slate-200">404</h1>
          <h2 className="text-3xl font-bold text-slate-800 mt-4 mb-6">Halaman Tidak Ditemukan</h2>
          <Button onClick={() => navigateTo('home')}>Kembali ke Beranda</Button>
        </div>
      </MainLayout>
    );
  };

  return (
    <div className="font-sans antialiased text-slate-800">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPath}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}