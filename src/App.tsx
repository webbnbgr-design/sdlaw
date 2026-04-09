/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Scale, 
  Globe, 
  Briefcase, 
  Gavel, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  Menu, 
  X,
  ArrowUpRight,
  Award,
  ChevronDown
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const REAL_PHONE = "21 0362 6902";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Αρχική', href: '#home' },
    { name: 'Η Εταιρεία', href: '#about' },
    { name: 'Εξειδίκευση', href: '#expertise' },
    { name: 'Επικοινωνία', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-white/80 backdrop-blur-xl py-4 border-b border-navy/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1800px] mx-auto px-8 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-baseline gap-3"
        >
          <div className="flex flex-col">
            <span className={`text-xl font-serif font-bold tracking-tighter ${isScrolled ? 'text-navy' : 'text-white'}`}>
              ΣΩΤΗΡΟΠΟΥΛΟΣ ΔΗΜΟΠΟΥΛΟΥ
            </span>
            <span className="text-[9px] uppercase tracking-[0.5em] text-gold font-bold">
              ΔΙΚΗΓΟΡΙΚΗ ΕΤΑΙΡΙΑ
            </span>
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-12">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`text-[11px] uppercase tracking-[0.2em] font-bold transition-all hover:text-gold ${isScrolled ? 'text-navy/60' : 'text-white/70'}`}
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            href={`tel:${REAL_PHONE.replace(/\s/g, '')}`}
            className="flex items-center gap-2 px-6 py-3 bg-navy text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gold hover:text-navy transition-all rounded-full"
          >
            <Phone size={14} /> {REAL_PHONE}
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`lg:hidden p-2 rounded-full transition-colors ${isScrolled ? 'text-navy hover:bg-navy/5' : 'text-white hover:bg-white/10'}`} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white border-b border-navy/10 overflow-hidden lg:hidden"
          >
            <div className="p-8 flex flex-col space-y-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-navy text-2xl font-serif border-b border-navy/5 pb-4 flex justify-between items-center"
                >
                  {link.name}
                  <ArrowUpRight size={20} className="text-gold" />
                </a>
              ))}
              <a 
                href={`tel:${REAL_PHONE.replace(/\s/g, '')}`}
                className="w-full py-5 bg-navy text-white text-center font-bold uppercase tracking-widest rounded-sm"
              >
                ΚΛΗΣΗ: {REAL_PHONE}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden bg-navy">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/40 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=2000" 
          alt="Modern Office Interior" 
          className="w-full h-full object-cover scale-110"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="relative z-20 w-full max-w-[1800px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-1 bg-gold mb-12"
          />
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] text-white font-serif font-extrabold leading-[0.85] tracking-tighter mb-12">
            Νομική <br />
            <span className="text-gold-light">Αριστεία.</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-end gap-12">
            <p className="text-xl md:text-2xl text-white/60 font-light max-w-xl leading-relaxed">
              Στρατηγική καθοδήγηση στην καρδιά της Αθήνας. Εξειδικευμένες υπηρεσίες με διεθνή προσανατολισμό και ανθρώπινη προσέγγιση.
            </p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-4"
            >
              <a href="#contact" className="group flex items-center gap-4 bg-gold px-10 py-6 text-navy font-bold uppercase tracking-widest hover:bg-white transition-all">
                ΕΠΙΚΟΙΝΩΝΙΑ <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 right-12 z-20 hidden lg:block"
      >
        <div className="flex items-center gap-6 text-white/30 uppercase tracking-[0.4em] text-[10px] font-bold rotate-90 origin-right">
          SCROLL TO EXPLORE <ChevronDown size={14} className="animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 md:py-48 bg-white relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-8">
        <div className="max-w-4xl">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold font-bold uppercase tracking-[0.5em] text-[10px] mb-8 block"
          >
            THE FIRM
          </motion.span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-navy mb-12 leading-[1.0] tracking-tighter">
              Συνδυάζοντας το <span className="text-emerald">Κύρος</span> με την Καινοτομία.
            </h2>
          <div className="space-y-8 text-navy/60 leading-relaxed text-2xl font-light">
            <p>
              Η δικηγορική μας εταιρεία, υπό την καθοδήγηση του <span className="text-navy font-bold">Γεώργιου Σωτηρόπουλου</span> και της <span className="text-navy font-bold">Μαρίας Γεωργίας Δημοπούλου</span>, επαναπροσδιορίζει τη νομική εκπροσώπηση στην Ελλάδα.
            </p>
            <p>
              Με έδρα τη Λεωφόρο Βασιλίσσης Σοφίας, εξυπηρετούμε ένα εκλεκτό πελατολόγιο που περιλαμβάνει πολυεθνικούς ομίλους και ιδιώτες με διεθνή δραστηριότητα.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-12 border-t border-navy/5 pt-16 max-w-2xl">
            <div className="group cursor-default">
              <div className="text-4xl font-serif text-navy mb-2 group-hover:text-gold transition-colors italic">20+</div>
              <div className="text-navy/40 text-[10px] uppercase tracking-widest font-bold">Years of Practice</div>
            </div>
            <div className="group cursor-default">
              <div className="text-4xl font-serif text-navy mb-2 group-hover:text-gold transition-colors italic">5.0</div>
              <div className="text-navy/40 text-[10px] uppercase tracking-widest font-bold">Client Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Expertise = () => {
  const services = [
    {
      title: 'Εμπορικό Δίκαιο',
      tag: 'Corporate',
      description: 'Στρατηγική υποστήριξη επιχειρήσεων, εξαγορές και συγχωνεύσεις με διεθνή εμβέλεια.',
      icon: <Briefcase size={24} />,
    },
    {
      title: 'Διεθνείς Υποθέσεις',
      tag: 'International',
      description: 'Εκπροσώπηση αλλοδαπών εταιρειών και διαχείριση διασυνοριακών νομικών ζητημάτων.',
      icon: <Globe size={24} />,
    },
    {
      title: 'Συμβουλευτική',
      tag: 'Consulting',
      description: 'Προληπτική νομική καθοδήγηση για τη διασφάλιση της επιχειρηματικής ανάπτυξης.',
      icon: <Scale size={24} />,
    },
    {
      title: 'Δικαστηριακή Εκπροσώπηση',
      tag: 'Litigation',
      description: 'Δυναμική υπεράσπιση συμφερόντων σε κάθε βαθμίδα της ελληνικής δικαιοσύνης.',
      icon: <Gavel size={24} />,
    },
  ];

  return (
    <section id="expertise" className="py-32 md:py-48 bg-navy text-white overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-8">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-12">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gold font-bold uppercase tracking-[0.5em] text-[10px] mb-8 block"
            >
              EXPERTISE
            </motion.span>
            <h2 className="text-5xl md:text-8xl font-serif font-bold tracking-tighter leading-[0.9]">
              Τομείς <br /><span className="text-gold italic">Εξειδίκευσης.</span>
            </h2>
          </div>
          <p className="text-white/40 text-xl font-light max-w-sm leading-relaxed border-l border-white/10 pl-8">
            Παρέχουμε ολιστικές νομικές λύσεις προσαρμοσμένες στις απαιτήσεις της σύγχρονης οικονομίας.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/10">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group p-12 bg-navy hover:bg-emerald transition-all duration-700 cursor-default"
            >
              <div className="text-gold group-hover:text-navy transition-colors mb-12">
                {service.icon}
              </div>
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 group-hover:text-navy/40 font-bold mb-4 block">
                {service.tag}
              </span>
              <h3 className="text-3xl font-serif font-bold mb-6 group-hover:text-navy transition-colors">
                {service.title}
              </h3>
              <p className="text-white/50 group-hover:text-navy/70 text-lg font-light leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonial = () => {
  return (
    <section className="py-32 md:py-48 bg-off-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <div className="text-[20rem] font-serif font-bold text-navy whitespace-nowrap -rotate-12 translate-x-[-10%] translate-y-[20%]">
          EXCELLENCE EXCELLENCE EXCELLENCE
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto px-8 relative z-10">
        <div className="flex justify-center gap-2 mb-12">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={24} className="fill-gold text-gold" />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <blockquote className="text-3xl md:text-5xl font-serif font-medium text-navy leading-[1.2] mb-16 tracking-tight">
            "Εξαιρετικοί επαγγελματίες. Καταλαβαίνουν πλήρως τον άνθρωπο, καθοδηγούν με ειλικρίνεια και προσφέρουν σιγουριά σε κάθε βήμα της διαδικασίας."
          </blockquote>
          <div className="flex flex-col items-center">
            <div className="w-12 h-[1px] bg-gold mb-6" />
            <span className="text-navy font-bold uppercase tracking-[0.4em] text-xs">CLIENT TESTIMONIAL</span>
            <span className="text-gold text-[10px] mt-2 uppercase tracking-widest font-bold">Verified Google Review</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 md:py-48 bg-white">
      <div className="max-w-[1800px] mx-auto px-8">
        <div className="max-w-5xl">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold font-bold uppercase tracking-[0.5em] text-[10px] mb-8 block"
          >
            CONTACT
          </motion.span>
          <h2 className="text-5xl md:text-8xl font-serif font-bold text-navy mb-24 tracking-tighter leading-[0.9]">
            Ελάτε σε <br /><span className="text-gold italic">Επαφή.</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-24">
            <div className="space-y-12">
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-navy/40 font-bold">ΔΙΕΥΘΥΝΣΗ</h4>
                <p className="text-2xl text-navy font-light leading-relaxed">
                  Λεωφόρος Βασιλίσσης Σοφίας 137, <br />Αθήνα 115 21
                </p>
                <a href="https://maps.google.com" className="inline-flex items-center gap-2 text-gold text-[10px] font-bold uppercase tracking-widest hover:text-navy transition-colors">
                  VIEW ON MAP <ArrowUpRight size={14} />
                </a>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-navy/40 font-bold">ΤΗΛΕΦΩΝΟ</h4>
                <p className="text-4xl text-navy font-serif font-bold">
                  {REAL_PHONE}
                </p>
                <p className="text-navy/40 text-sm">Δευτέρα - Παρασκευή, 09:00 - 20:00</p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-navy/40 font-bold">EMAIL</h4>
                <p className="text-2xl text-navy font-light">
                  info@sd-law.gr
                </p>
              </div>
              
              <div className="p-12 bg-off-white rounded-sm">
                <MapPin className="text-gold mb-6" size={32} />
                <h5 className="text-navy font-bold uppercase tracking-widest text-xs mb-2">ΤΟΠΟΘΕΣΙΑ</h5>
                <p className="text-navy/60 text-sm">Κέντρο Αθήνας, πλησίον Μεγάρου Μουσικής. Εύκολη πρόσβαση με όλα τα μέσα.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-navy text-white pt-32 pb-12">
      <div className="max-w-[1800px] mx-auto px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-24 mb-32">
          <div className="max-w-xl">
            <div className="flex flex-col mb-12">
              <span className="text-3xl font-serif font-bold tracking-tighter text-white">
                ΣΩΤΗΡΟΠΟΥΛΟΣ ΔΗΜΟΠΟΥΛΟΥ
              </span>
              <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold">
                ΔΙΚΗΓΟΡΙΚΗ ΕΤΑΙΡΙΑ
              </span>
            </div>
            <p className="text-white/40 text-xl font-light leading-relaxed">
              Νομική στρατηγική με επίκεντρο τον άνθρωπο. Δεσμευόμαστε για την παροχή υπηρεσιών υψηλού επιπέδου που ανταποκρίνονται στις προκλήσεις του σύγχρονου κόσμου.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-24">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-8">NAVIGATION</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#home" className="hover:text-gold transition-colors">Αρχική</a></li>
                <li><a href="#about" className="hover:text-gold transition-colors">Η Εταιρεία</a></li>
                <li><a href="#expertise" className="hover:text-gold transition-colors">Εξειδίκευση</a></li>
                <li><a href="#contact" className="hover:text-gold transition-colors">Επικοινωνία</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-8">LEGAL</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Terms of Use</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:row justify-between items-center gap-8 pt-12 border-t border-white/5 text-[9px] uppercase tracking-[0.4em] text-white/20 font-bold">
          <p>© {new Date().getFullYear()} ΣΩΤΗΡΟΠΟΥΛΟΣ ΔΗΜΟΠΟΥΛΟΥ ΔΙΚΗΓΟΡΙΚΗ ΕΤΑΙΡΙΑ</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
            <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="selection:bg-gold selection:text-navy scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
