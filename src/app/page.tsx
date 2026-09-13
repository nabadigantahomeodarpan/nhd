import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Star, Stethoscope, Leaf, HeartPulse, Apple, CheckCircle2, Quote, MapPin, Phone, Mail, Heart, ArrowUpRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { FadeIn, SlideUp, SlideLeft, SlideRight, ScaleIn, StaggerContainer, StaggerItem } from "@/components/animations/motion-wrapper";

export default async function LandingPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  const isLoggedIn = !!session;

  return (
    <main className="w-full bg-background flex flex-col relative overflow-x-hidden text-foreground">
      
      {/* Navbar */}
      <header className="relative z-10 w-full bg-background border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden relative flex items-center justify-center shrink-0">
              <Image 
                src="/logo.webp" 
                alt="Logo" 
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="relative h-6 sm:h-8 w-48 sm:w-64 ml-1">
              <Image 
                src="/text-logo.webp" 
                alt="Nabadiganta Homeo Darpan" 
                fill
                className="object-contain object-left"
                sizes="(max-width: 640px) 192px, 256px"
                priority
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="#" className="text-base font-medium text-foreground hover:text-primary transition-colors">Home</Link>
            <Link href="#" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors">Services</Link>
            <Link href="#" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors">Why Us</Link>
            <Link href="#" className="text-base font-medium text-muted-foreground hover:text-primary transition-colors">Feedback</Link>
          </nav>

          {/* Action Buttons (Right) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {isLoggedIn ? (
              <Link href="/admin/dashboard" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 sm:h-10 sm:px-6 gap-2 shrink-0 whitespace-nowrap text-sm sm:text-base font-medium transition-colors">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/admin/login" className="inline-flex items-center justify-center rounded-md h-9 px-4 sm:h-10 sm:px-6 gap-2 shrink-0 whitespace-nowrap hover:bg-transparent hover:text-primary text-sm sm:text-base font-medium transition-colors hidden sm:inline-flex text-muted-foreground">
                  Sign in
                </Link>
                <Link href="/admin/login" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 sm:h-10 sm:px-6 gap-2 shrink-0 whitespace-nowrap text-sm sm:text-base font-medium transition-colors">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 xl:gap-12 items-center">
            
            {/* Left Column (Text & Buttons) */}
            <StaggerContainer className="space-y-6 md:space-y-8 z-10 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
              <StaggerItem>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.15]">
                  Smart choice<br />
                  is health <span className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-foreground text-background rounded-full mx-1 md:mx-2 -translate-y-1"><ArrowRight className="w-4 h-4 md:w-5 md:h-5 -rotate-45" /></span> <br className="hidden md:block" />
                  <span className="font-[family-name:--font-playfair] italic text-primary">over everything</span>
                </h1>
              </StaggerItem>
              
              <StaggerItem>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md mx-auto lg:mx-0">
                  Choosing health above all is a smart investment in your future. When you prioritize your well-being more smoothly.
                </p>
              </StaggerItem>
              
              <StaggerItem>
                <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 sm:gap-4 pt-2 w-full">
                  <Button className="h-12 px-8 text-base rounded-lg gap-2 shrink-0 whitespace-nowrap group w-full sm:w-auto">
                    Get Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" className="h-12 px-8 text-base rounded-lg gap-2 shrink-0 whitespace-nowrap group bg-transparent border-primary/20 hover:bg-primary/10 w-full sm:w-auto">
                    Learn More <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* Right Column (Image Container) */}
            <ScaleIn delay={0.2} className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] rounded-2xl md:rounded-3xl bg-[url('/hero-bg.webp')] bg-cover bg-center bg-no-repeat z-0 border border-border shadow-sm">
              
              {/* Top-Left Spinning SVG Stamp */}
              <div className="absolute -top-4 -left-2 sm:-top-8 sm:-left-8 md:-top-12 md:-left-12 lg:-top-16 lg:-left-16 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 z-20 pointer-events-none select-none">
                <div className="w-full h-full animate-spin-slow relative">
                  {/* Center graphic inside the stamp */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Star className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 fill-primary/20 text-primary/30" />
                  </div>
                  {/* Circular Text */}
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-foreground font-medium text-[10px] md:text-[11px] tracking-[0.2em] uppercase">
                    <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                    <text>
                      <textPath href="#circlePath">
                        Nabadiganta Homeo Darpan • Explore More •
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>

              {/* Bottom-Right Avatar Card */}
              <SlideLeft delay={0.5} className="absolute -bottom-4 right-2 sm:-bottom-8 sm:-right-4 lg:-bottom-10 lg:-right-10 bg-card/95 backdrop-blur-md rounded-xl p-3 md:p-4 lg:p-5 shadow-lg border border-border/60 max-w-[180px] sm:max-w-[200px] md:max-w-[240px] z-20">
                <h3 className="text-[11px] sm:text-xs md:text-sm font-semibold mb-2 md:mb-3 leading-tight">Latest Visited Patients</h3>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="flex -space-x-2 md:-space-x-3">
                    <Avatar className="w-7 h-7 md:w-9 md:h-9 border-2 border-card">
                      <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="Patient 1" />
                      <AvatarFallback>P1</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-7 h-7 md:w-9 md:h-9 border-2 border-card">
                      <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="Patient 2" />
                      <AvatarFallback>P2</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-7 h-7 md:w-9 md:h-9 border-2 border-card">
                      <AvatarImage src="https://i.pravatar.cc/150?img=47" alt="Patient 3" />
                      <AvatarFallback>P3</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-[10px] md:text-xs font-medium text-muted-foreground whitespace-nowrap">
                    +5k more
                  </div>
                </div>
              </SlideLeft>
              
            </ScaleIn>
          </div>
        </div>
      </section>
    
      {/* Services Section */}
      <section className="w-full py-16 md:py-24 bg-muted/30 border-y border-border/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
              How we can help you
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              We offer a range of natural treatments to help you feel your best. Here is what you can expect when you visit our clinic.
            </p>
          </SlideUp>
          
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Card 1 */}
            <StaggerItem>
              <div className="bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md hover:border-primary/40 transition-all group h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Stethoscope className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Expert Consultations</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sit down with our experienced doctors to talk about your health. We take the time to understand your unique needs and find the root cause of your problems.
                </p>
              </div>
            </StaggerItem>

            {/* Card 2 */}
            <StaggerItem>
              <div className="bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md hover:border-primary/40 transition-all group h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Natural Medicines</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Get safe, high-quality homeopathic medicines directly from our clinic. We use natural remedies that work with your body, not against it.
                </p>
              </div>
            </StaggerItem>

            {/* Card 3 */}
            <StaggerItem>
              <div className="bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md hover:border-primary/40 transition-all group h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <HeartPulse className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Long-term Care</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Chronic illnesses need time and patience. We offer steady, ongoing support to help you manage long-term conditions and improve your quality of life.
                </p>
              </div>
            </StaggerItem>

            {/* Card 4 */}
            <StaggerItem>
              <div className="bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md hover:border-primary/40 transition-all group h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Apple className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Diet & Lifestyle</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Medicine is just one part of healing. We will guide you on the right food and daily habits to keep you healthy and energized naturally.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <SlideRight className="order-2 lg:order-1 relative h-[350px] md:h-[450px] lg:h-[550px] rounded-3xl overflow-hidden border border-border/50 bg-muted flex items-center justify-center">
              {/* Optional: We can use a different image or a solid pattern here. For now, we reuse the hero image as a placeholder */}
              <Image src="/about-bg.webp" alt="Clinic Environment" fill className="object-cover opacity-80" />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" /> */}
            </SlideRight>

            <StaggerContainer className="order-1 lg:order-2 space-y-6 md:space-y-8">
              <StaggerItem>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                  Healing <span className="font-[family-name:--font-playfair] italic text-primary">Naturally</span>
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  We believe that true healing comes from within. Instead of just masking your symptoms with temporary fixes, our approach focuses on curing the illness at its root. We are here to listen, understand, and guide you on your journey to better health.
                </p>
              </StaggerItem>
              
              <StaggerItem>
                <ul className="space-y-4 pt-2">
                  {[
                    "Experienced doctors who listen to your concerns.",
                    "100% natural and safe treatments with zero side effects.",
                    "A modern clinic with easy digital records for your convenience.",
                    "Personalized care plans made just for your body type."
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground font-medium text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </StaggerItem>

              <StaggerItem className="pt-4">
                <Button className="h-12 px-8 text-base rounded-lg gap-2">
                  Know More About Us
                </Button>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="w-full py-16 md:py-24 bg-primary/5 border-y border-primary/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
              What our patients say
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Don't just take our word for it. Read the real stories from people who have found relief and better health at our clinic.
            </p>
          </SlideUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Review 1 */}
            <StaggerItem>
              <div className="bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col relative h-full">
                <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-1 mb-6">
                  "I have been visiting Nabadiganta for a year now. The doctors are incredibly patient and my chronic migraines are almost completely gone. Highly recommended!"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border border-border">
                    <AvatarImage src="https://i.pravatar.cc/150?img=11" />
                    <AvatarFallback>RD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Rahul D.</h4>
                    <p className="text-xs text-muted-foreground">Regular Patient</p>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Review 2 */}
            <StaggerItem>
              <div className="bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col relative h-full">
                <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-1 mb-6">
                  "The clinic is very clean, and the staff makes you feel at home. I love how they explain exactly what the medicine does instead of just handing out pills."
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border border-border">
                    <AvatarImage src="https://i.pravatar.cc/150?img=35" />
                    <AvatarFallback>PM</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Priya M.</h4>
                    <p className="text-xs text-muted-foreground">First-time Visitor</p>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Review 3 */}
            <StaggerItem>
              <div className="bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col relative h-full">
                <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-1 mb-6">
                  "Finally found a place that treats the root cause. The natural medicines have worked wonders for my son's allergies when nothing else did."
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border border-border">
                    <AvatarImage src="https://i.pravatar.cc/150?img=68" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Amit S.</h4>
                    <p className="text-xs text-muted-foreground">Parent</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-card border-t border-border pt-16 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
            
            {/* Brand */}
            <StaggerItem className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden relative border border-border">
                  <Image src="/logo.webp" alt="Logo" fill className="object-cover" sizes="32px" />
                </div>
                <span className="font-semibold text-lg tracking-tight">
                  Nabadiganta Homeo Darpan
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                Your trusted partner in natural and holistic healing. We provide expert homeopathic care tailored to your unique body and lifestyle.
              </p>
            </StaggerItem>

            {/* Quick Links */}
            <StaggerItem>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Services</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Why Choose Us</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Patient Feedback</Link></li>
              </ul>
            </StaggerItem>

            {/* Contact Info */}
            <StaggerItem>
              <h4 className="font-semibold text-foreground mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Beldanga New Hospital Road , 742133</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm text-muted-foreground">+91 9876543210</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm text-muted-foreground">nhd@gmail.com</span>
                </li>
              </ul>
            </StaggerItem>
          </StaggerContainer>
          
          <SlideUp delay={0.3} className="border-t border-border/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Nabadiganta Homeo Darpan. All rights reserved.
            </p>
            <div className="flex items-center">
              <Link 
                href="https://dgisight.oxzeen.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center cursor-pointer"
              >
                <div className="flex items-center h-8 px-4 rounded-full bg-primary/10 hover:bg-primary/15 border border-primary/20 text-xs font-medium text-foreground transition-colors z-10 relative">
                  Build with <Heart className="w-3.5 h-3.5 mx-1.5 text-primary fill-primary animate-pulse" /> dgisight
                </div>
                <div className="flex items-center justify-center h-8 bg-primary text-primary-foreground rounded-full transition-all duration-300 w-0 opacity-0 overflow-hidden group-hover:w-8 group-hover:opacity-100 group-hover:ml-1 shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </SlideUp>
        </div>
      </footer>
      
    </main>
  );
}
