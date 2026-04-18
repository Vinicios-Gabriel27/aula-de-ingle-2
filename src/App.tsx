import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Info, 
  BookOpen, 
  Camera, 
  MapPin,
  ExternalLink,
  Github,
  Award,
  Volume2,
  X,
  Menu,
  Navigation as NavigationIcon
} from 'lucide-react';

const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
};

interface Animal {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  images: string[];
  location: string;
  status: 'Endangered' | 'Extinct' | 'Vulnerable' | 'Common' | 'Least Concern';
  diet: string;
  habitat: string;
  conservation: string;
  audio?: string;
  video?: string;
}

const ANIMALS: Animal[] = [
  {
    id: 'jaguar',
    name: 'Jaguar',
    scientificName: 'Panthera onca',
    description: 'The jaguar is the largest cat species in the Americas and the third-largest in the world. It is a powerful predator with a distinctive spotted coat.',
    images: [
      '/jaguar_1.jpeg',
      '/jaguar_2.jpeg',
      '/jaguar_3.jpeg',
      '/jaguar_4.jpeg',
      '/jaguar_5.jpeg',
      '/jaguar_6.jpeg',
      '/jaguar_7.jpeg',
      '/jaguar_8.jpeg',
      '/jaguar_9.jpeg',
      '/jaguar_10.jpeg',
      '/jaguar_11.jpeg',
      '/jaguar_12.jpeg',
      '/jaguar_13.jpeg'
    ],
    location: 'Central & South America',
    status: 'Vulnerable',
    diet: 'Carnivore (Deer, peccaries, caimans, turtles)',
    habitat: 'Tropical rainforests, swamps, and grasslands',
    conservation: 'Protected through wildlife corridors and anti-poaching laws.',
    audio: '/jaguar_audio.mpeg'
  },
  {
    id: 'golden-tamarin',
    name: 'Golden Lion Tamarin',
    scientificName: 'Leontopithecus rosalia',
    description: 'A small New World monkey of the family Callitrichidae. It is native to the Atlantic coastal forests of Brazil and is famous for its vibrant orange-red coat.',
    images: [
      '/tamarin_1.jpeg',
      '/tamarin_2.jpeg'
    ],
    location: 'Brazil (Atlantic Forest)',
    status: 'Endangered',
    diet: 'Omnivore (Fruits, insects, small lizards)',
    habitat: 'Lowland Atlantic coastal forests',
    conservation: 'Intensive captive breeding and reintroduction programs.'
  },
  {
    id: 'giant-panda',
    name: 'Giant Panda',
    scientificName: 'Ailuropoda melanoleuca',
    description: 'Characterized by its bold black-and-white coat and rotund body, the giant panda is a bear native to south central China. It primarily eats bamboo.',
    images: [
      '/panda_1.jpeg',
      '/panda_2.jpeg',
      '/panda_3.jpeg',
      '/panda_4.jpeg',
      '/panda_5.jpeg'
    ],
    location: 'Central China',
    status: 'Vulnerable',
    diet: 'Herbivore (Bamboo shoots and leaves)',
    habitat: 'Cool, wet bamboo forests in mountainous areas',
    conservation: 'Giant Panda National Park establishment and habitat restoration.',
    video: 'https://www.youtube.com/embed/yBruRRLv91s'
  },
  {
    id: 'dodo',
    name: 'Dodo Bird',
    scientificName: 'Raphus cucullatus',
    description: 'The dodo was a flightless bird endemic to the island of Mauritius. It became extinct in the late 17th century after being discovered by sailors.',
    images: [
      '/dodo_1.jpeg',
      '/dodo_2.jpeg',
      '/dodo_3.jpeg'
    ],
    location: 'Mauritius (Extinct)',
    status: 'Extinct',
    diet: 'Frugivore (Fallen fruits, seeds, bulbs)',
    habitat: 'Coastal plains and forests of Mauritius',
    conservation: 'No active effort (Extinct). Used as a symbol of human-induced extinction.'
  },
  {
    id: 'pink-dolphin',
    name: 'Pink River Dolphin',
    scientificName: 'Inia geoffrensis',
    description: 'Also known as the Boto, this is a species of toothed whale classified in the family Iniidae. They are known for their striking pink skin.',
    images: [
      '/boto_1.jpeg'
    ],
    location: 'Amazon & Orinoco Basins',
    status: 'Endangered',
    diet: 'Carnivore (Fish, turtles, crabs)',
    habitat: 'Freshwater rivers and flooded forests',
    conservation: 'Regulations on dam construction and mercury pollution control.'
  },
  {
    id: 'anomalocaris',
    name: 'Anomalocaris',
    scientificName: 'Anomalocaris canadensis',
    description: 'A terrifying prehistoric predator from the Cambrian period. It was one of the first giant predators on Earth, using its circular mouth and segmented arms to hunt.',
    images: [
      '/anomalocaris_1.jpeg',
      '/anomalocaris_2.jpeg',
      '/anomalocaris_3.jpeg'
    ],
    location: 'Ancient Oceans (Prehistoric)',
    status: 'Extinct',
    diet: 'Carnivore (Trilobites and soft-bodied prey)',
    habitat: 'Marine (Benthic and Pelagic zones)',
    conservation: 'Extinct for over 500 million years.'
  },
  {
    id: 'goliath-birdeater',
    name: 'Goliath Birdeater',
    scientificName: 'Theraphosa blondi',
    description: 'The largest spider in the world by mass and size. Despite its name, it rarely eats birds, but it is a formidable hunter of the rainforest floor.',
    images: [
      '/goliath_1.jpg',
      '/goliath_2.jpg'
    ],
    location: 'Northern South America',
    status: 'Common',
    diet: 'Carnivore (Insects, rodents, frogs, lizards)',
    habitat: 'Upland rainforests, living in deep burrows',
    conservation: 'Not currently endangered, but threatened by habitat loss.'
  },
  {
    id: 'kangaroo',
    name: 'Red Kangaroo',
    scientificName: 'Macropus rufus',
    description: 'The Red Kangaroo is the largest of all kangaroos and the largest terrestrial mammal native to Australia. They are iconic for their powerful hind legs, large feet, and long muscular tail used for balance.',
    images: [
      '/kangaroo_1.jpg',
      '/kangaroo_2.jpg'
    ],
    location: 'Australia',
    status: 'Least Concern',
    diet: 'Herbivore (Grasses and other vegetation)',
    habitat: 'Open grasslands and semi-arid plains',
    conservation: 'Stable populations across central Australia. They are well-adapted to the harsh Australian interior.'
  },
  {
    id: 'macaw',
    name: 'Hyacinth Macaw',
    scientificName: 'Anodorhynchus hyacinthinus',
    description: 'The Hyacinth Macaw is the largest macaw and the largest flying parrot species in the world. It is distinguished by its stunning cobalt-blue plumage and bright yellow rings around its eyes and at the base of its beak.',
    images: [
      '/macaw_1.jpeg',
      '/macaw_2.jpeg',
      '/macaw_3.jpeg'
    ],
    location: 'Brazil (Pantanal, Cerrado, and Amazon)',
    status: 'Vulnerable',
    diet: 'Herbivore (Nuts from specific palm trees)',
    habitat: 'Palm groves, gallery forests, and semi-open areas',
    conservation: 'Threatened by habitat loss and the illegal pet trade, though conservation efforts have helped stabilize some populations.'
  }
];

const Lightbox = ({ images, initialIndex, onClose }: { images: string[], initialIndex: number, onClose: () => void }) => {
  const [index, setIndex] = useState(initialIndex);

  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((i) => (i + 1) % images.length);
  };
  
  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((i) => (i - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-[110]"
      >
        <X size={32} />
      </button>

      <button 
        onClick={prev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all z-[110]"
      >
        <ChevronLeft size={24} className="md:w-10 md:h-10" />
      </button>

      <button 
        onClick={next}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all z-[110]"
      >
        <ChevronRight size={24} className="md:w-10 md:h-10" />
      </button>

      <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 font-medium text-lg">
        {index + 1} / {images.length}
      </div>
    </motion.div>
  );
};

const Carousel = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    if (isLightboxOpen) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isLightboxOpen]);

  return (
    <>
      <div 
        className="relative w-full h-[300px] md:h-[450px] group overflow-hidden rounded-2xl bg-black/20 cursor-zoom-in"
        onClick={() => setIsLightboxOpen(true)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        
        <button 
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all opacity-0 group-hover:opacity-100 z-10"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all opacity-0 group-hover:opacity-100 z-10"
        >
          <ChevronRight size={24} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <div 
              key={i}
              className={`h-1 rounded-full transition-all ${i === index ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
            />
          ))}
        </div>

        <div className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <Camera size={18} />
        </div>
      </div>

      <AnimatePresence>
        {isLightboxOpen && (
          <Lightbox 
            images={images} 
            initialIndex={index} 
            onClose={() => setIsLightboxOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

const DetailsModal = ({ animal, onClose }: { animal: Animal, onClose: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup: stop audio when component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playSound = () => {
    if (animal.audio) {
      // If already playing, stop it
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
        setIsPlaying(false);
        return;
      }

      const audio = new Audio(animal.audio);
      audioRef.current = audio;
      setIsPlaying(true);
      
      audio.play().catch(err => {
        console.error("Error playing audio:", err);
        setIsPlaying(false);
      });

      audio.onended = () => {
        setIsPlaying(false);
        audioRef.current = null;
      };
    } else {
      speak(animal.name);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10"
        >
          <ChevronRight className="rotate-90 md:rotate-0" size={20} />
        </button>

        <div className="p-6 md:p-8 space-y-6 md:space-y-8">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">{animal.name}</h2>
              <p className="text-base md:text-lg italic text-white/50">{animal.scientificName}</p>
            </div>
            <button 
              onClick={playSound}
              className={`p-3 md:p-4 rounded-2xl transition-all shadow-xl flex items-center gap-2 group ${
                isPlaying 
                  ? 'bg-white text-black scale-105' 
                  : 'bg-white/5 hover:bg-white text-white hover:text-black'
              }`}
              title={animal.audio ? "Play animal sound" : "Listen to pronunciation"}
            >
              <Volume2 size={20} className={`md:w-6 md:h-6 ${isPlaying ? "animate-pulse" : ""}`} />
              {isPlaying && <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Playing</span>}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold flex items-center gap-2">Dietary Habits</span>
                <p className="text-white/80">{animal.diet}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold flex items-center gap-2">Natural Habitat</span>
                <p className="text-white/80">{animal.habitat}</p>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold flex items-center gap-2">Conservation Efforts</span>
              <p className="text-white/80 leading-relaxed text-sm">{animal.conservation}</p>
            </div>
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <h4 className="flex items-center gap-2 font-semibold mb-4 text-white/60 uppercase text-xs tracking-wider">
              <Info size={16} /> Extended Description
            </h4>
            <p className="text-white/70 leading-relaxed italic">
              "The {animal.name.toLowerCase()} plays a crucial role in its ecosystem. Understanding its {animal.diet.split(' ')[0].toLowerCase()} behavior and {animal.habitat.split(' ')[0].toLowerCase()} dependence is key to its survival."
            </p>
          </div>

          {animal.video && (
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 font-semibold text-white/60 uppercase text-xs tracking-wider">
                <Camera size={16} /> Featured Video
              </h4>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <iframe
                  src={animal.video}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all font-sans"
            >
              Close Explorer
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    if (selectedAnimal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedAnimal]);

  return (
    <div className="min-h-screen pb-20 selection:bg-white selection:text-black shadow-2xl relative">
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-y-0 right-0 w-full sm:w-80 bg-black/95 backdrop-blur-2xl z-[60] border-l border-white/10 p-6 md:p-8 shadow-2xl overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-serif font-bold italic">Gallery Menu</h2>
              <button 
                onClick={() => setIsNavOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="space-y-4">
              {ANIMALS.map((animal) => (
                <button
                  key={animal.id}
                  onClick={() => {
                    const el = document.getElementById(animal.id);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setIsNavOpen(false);
                  }}
                  className="w-full text-left p-4 rounded-xl border border-transparent hover:border-white/20 hover:bg-white/5 transition-all group flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <span className="block font-medium group-hover:text-white text-white/70">{animal.name}</span>
                    <span className="block text-[10px] uppercase tracking-widest text-white/30">{animal.scientificName}</span>
                  </div>
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </button>
              ))}
            </nav>

            <div className="absolute bottom-8 left-8 right-8">
              <div className="pt-8 border-t border-white/5 text-white/20 text-[10px] uppercase tracking-[0.2em] font-bold">
                Navigating through wild wonders
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsNavOpen(true)}
        className="fixed top-4 right-4 md:top-8 md:right-8 z-[50] p-3 md:p-4 bg-white/5 hover:bg-white text-white hover:text-black backdrop-blur-xl rounded-2xl transition-all shadow-2xl flex items-center gap-2 md:gap-3 border border-white/10 group flex-row-reverse"
      >
        <Menu size={20} className="md:w-6 md:h-6 group-hover:rotate-180 transition-transform duration-500" />
        <span className="font-bold uppercase tracking-widest text-[10px] md:text-xs pl-2 border-l border-current/20">Explore All</span>
        <span className="text-[10px] opacity-40 hidden sm:inline">{ANIMALS.length} Species</span>
      </button>

      <AnimatePresence>
        {selectedAnimal && (
          <DetailsModal animal={selectedAnimal} onClose={() => setSelectedAnimal(null)} />
        )}
      </AnimatePresence>

      <header className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-8">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=2000" 
            className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/80 to-brand-950" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="uppercase tracking-[0.3em] text-[10px] sm:text-sm font-semibold mb-4 block text-white/60">
              English Presentation Project
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold mb-6 leading-tight">
              Wild <span className="italic text-white/40">Wonders</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed px-4">
              Explore the fascinating world of exotic and endangered species. 
              Improve your vocabulary while discovering nature's secrets.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Quick Access Menu Bar */}
      <div className="sticky top-0 z-40 bg-brand-950/80 backdrop-blur-lg border-b border-white/5 py-3 md:py-4 mb-12 md:mb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="flex items-center gap-4 md:gap-6 min-w-max">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold border-r border-white/10 pr-4 md:pr-6 mr-1 md:mr-2">Quick Jump</span>
            {ANIMALS.map((animal) => (
              <button
                key={`quick-${animal.id}`}
                onClick={() => {
                  const el = document.getElementById(animal.id);
                  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="text-xs uppercase tracking-tighter text-white/60 hover:text-white transition-all font-semibold flex items-center gap-2 group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-all" />
                {animal.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-6 space-y-16 md:space-y-32">
        {ANIMALS.map((animal, idx) => (
          <motion.section 
            key={animal.id}
            id={animal.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center`}
          >
            <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-last' : ''}`}>
              <Carousel images={animal.images} />
            </div>
            
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/40 text-sm font-medium uppercase tracking-widest">
                  <MapPin size={14} />
                  {animal.location}
                </div>
                <div className="flex items-center gap-3 group/name">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold">{animal.name}</h3>
                  <button 
                    onClick={() => speak(animal.name)}
                    className="p-2 bg-white/5 hover:bg-white text-white hover:text-black rounded-lg transition-all opacity-40 group-hover/name:opacity-100"
                    title="Listen to pronunciation"
                  >
                    <Volume2 size={18} />
                  </button>
                </div>
                <p className="text-xl italic text-white/50 font-serif">{animal.scientificName}</p>
              </div>

              <p className="text-lg text-white/70 leading-relaxed font-light">
                {animal.description}
              </p>

              <div className="pt-4 flex flex-wrap gap-3">
                <div className={`px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider ${
                  animal.status === 'Extinct' ? 'border-red-500/50 text-red-500 bg-red-500/10' :
                  animal.status === 'Endangered' ? 'border-orange-500/50 text-orange-500 bg-orange-500/10' :
                  'border-yellow-500/50 text-yellow-500 bg-yellow-500/10'
                }`}>
                  Status: {animal.status}
                </div>
              </div>

              <div className="pt-4">
                <motion.button 
                  whileHover={{ x: 10 }}
                  onClick={() => setSelectedAnimal(animal)}
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                >
                  <span className="font-semibold uppercase tracking-widest text-sm">View Full Explorer</span>
                  <div className="p-2 bg-white/5 group-hover:bg-white/10 rounded-full transition-all">
                    <ChevronRight size={18} />
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.section>
        ))}
      </main>

      <footer className="mt-20 md:mt-40 pt-20 border-t border-white/5 bg-brand-900 px-6 pb-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 text-white/30 text-xs">
          <p className="text-center md:text-left">© 2026 Wild Wonders Educational Project.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
              <Github size={14} /> View Code
            </a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
