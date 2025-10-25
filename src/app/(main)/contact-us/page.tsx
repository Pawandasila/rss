"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Clock, Send, Users, Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';


const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // You can add API call or email service here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 lg:py-26 overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
       
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold border border-primary-foreground/20">
                <Users className="w-4 h-4" />
                संपर्क करें
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-primary-foreground">
                हमसे जुड़िए
              </h1>
              
              <p className="text-lg sm:text-xl text-primary-foreground/90 leading-relaxed max-w-2xl">
                राष्ट्रीय सेवा संघ भारतवर्ष के साथ जुड़कर राष्ट्र सेवा में अपना योगदान दें। 
                हमें आपकी सेवा और सहयोग की प्रतीक्षा है।
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="tel:+919429693593">
                    <Phone className="w-4 h-4 mr-2" />
                    तुरंत कॉल करें
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 text-primary hover:bg-primary-foreground hover:text-primary backdrop-blur-sm">
                  <Link href="mailto:help@joinrss.org.in">
                    <Mail className="w-4 h-4 mr-2" />
                    ईमेल भेजें
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent z-10"></div>
                <Image
                  src="https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-06-at-1.21.25-PM-e1756385010760.webp"
                  alt="Temple Service - Devotees at Temple"
                  width={800}
                  height={600}
                  className="w-full h-[350px] sm:h-[450px] lg:h-[550px] object-cover transform hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
             
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-8 lg:h-12 text-background" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,120 C150,60 350,0 600,0 C850,0 1050,60 1200,120 L1200,120 L0,120 Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-20 sm:py-24 lg:py-28 bg-muted/30 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,_var(--primary)_0%,_transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,_var(--primary)_0%,_transparent_50%)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Phone className="w-4 h-4" />
              संपर्क विवरण
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              हमसे कैसे संपर्क करें
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              हमारे कार्यालयों से संपर्क करें या हमारे सामाजिक माध्यमों पर जुड़ें
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Phone Contact */}
            <Card className="group p-8 hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-background to-background/80 backdrop-blur-sm hover:-translate-y-2">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Phone className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">फोन नंबर</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-6 text-lg">सीधे हमसे बात करें</p>
                <Link href="tel:+919429693593" className="text-primary font-bold text-xl hover:underline transition-colors">
                  +91 94296 93593
                </Link>
              </CardContent>
            </Card>

            {/* Email Contact */}
            <Card className="group p-8 hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-background to-background/80 backdrop-blur-sm hover:-translate-y-2">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Mail className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">ईमेल पता</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-6 text-lg">हमें ईमेल भेजें</p>
                <Link href="mailto:help@joinrss.org.in" className="text-primary font-bold text-xl hover:underline transition-colors">
                  help@joinrss.org.in
                </Link>
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className="group p-8 hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-background to-background/80 backdrop-blur-sm hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Clock className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">कार्यालय समय</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4 text-lg">सोमवार - शुक्रवार</p>
                <p className="text-primary font-bold text-xl">9:00 AM - 6:00 PM</p>
              </CardContent>
            </Card>
          </div>

          {/* Office Addresses */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Delhi Office */}
            <Card className="group p-8 hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-background to-background/80 backdrop-blur-sm hover:-translate-y-2">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <MapPin className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <span>दिल्ली कार्यालय</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                  D BLOCK, POCKET-5 (Flat No. 34)<br />
                  DDA Flat, CRPF Flat, Bawana<br />
                  New Delhi – 110040
                </p>
                <Button asChild variant="outline" size="lg" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <a 
                    href="https://maps.google.com/?q=D+BLOCK+POCKET-5+Flat+No+34+DDA+Flat+CRPF+Flat+Bawana+New+Delhi+110040"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    मैप में देखें
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Uttarakhand Office */}
            <Card className="group p-8 hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-background to-background/80 backdrop-blur-sm hover:-translate-y-2">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 text-accent-foreground rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <MapPin className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <span>उत्तराखंड कार्यालय</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                  Bareilly–Nainital Road<br />
                  Near Motahaldu Bus Stop<br />
                  Haldwani, Nainital – 263139
                </p>
                <Button asChild variant="outline" size="lg" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <a 
                    href="https://maps.google.com/?q=Bareilly+Nainital+Road+Near+Motahaldu+Bus+Stop+Haldwani+Nainital+263139"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    मैप में देखें
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 sm:py-24 lg:py-28 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Send className="w-4 h-4" />
              संदेश भेजें
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              हमें अपना संदेश भेजें
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              हमें अपना संदेश भेजें और हम जल्द ही आपसे संपर्क करेंगे
            </p>
          </div>

          <Card className="shadow-2xl border-0 bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
            <CardContent className="p-8 sm:p-12 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3 group">
                    <Label htmlFor="name" className="text-base font-semibold text-foreground flex items-center gap-2">
                      नाम *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="आपका पूरा नाम"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="h-14 border-2 border-border/50 focus:border-primary transition-all duration-300 text-lg rounded-xl bg-background/50 backdrop-blur-sm"
                    />
                  </div>
                  
                  <div className="space-y-3 group">
                    <Label htmlFor="phone" className="text-base font-semibold text-foreground flex items-center gap-2">
                      फोन नंबर
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="h-14 border-2 border-border/50 focus:border-primary transition-all duration-300 text-lg rounded-xl bg-background/50 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="space-y-3 group">
                  <Label htmlFor="email" className="text-base font-semibold text-foreground flex items-center gap-2">
                    ईमेल पता *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-14 border-2 border-border/50 focus:border-primary transition-all duration-300 text-lg rounded-xl bg-background/50 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-3 group">
                  <Label htmlFor="subject" className="text-base font-semibold text-foreground flex items-center gap-2">
                    विषय *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="आपके संदेश का विषय"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="h-14 border-2 border-border/50 focus:border-primary transition-all duration-300 text-lg rounded-xl bg-background/50 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-3 group">
                  <Label htmlFor="message" className="text-base font-semibold text-foreground flex items-center gap-2">
                    संदेश *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="अपना संदेश यहाँ लिखें..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="resize-none border-2 border-border/50 focus:border-primary transition-all duration-300 text-lg rounded-xl bg-background/50 backdrop-blur-sm"
                  />
                </div>

                <div className="pt-6">
                  <Button type="submit" size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 px-12 py-4 text-lg font-semibold rounded-xl">
                    <Send className="w-5 h-5 mr-3" />
                    संदेश भेजें
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Media Links */}
      <section className="py-20 sm:py-24 bg-gradient-to-br from-muted/30 via-muted/20 to-muted/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,_var(--primary)_0%,_transparent_50%)]"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_50%,_var(--secondary)_0%,_transparent_50%)]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <Users className="w-4 h-4" />
            सामाजिक माध्यम
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            सामाजिक माध्यमों पर जुड़ें
          </h2>
          <p className="text-lg text-muted-foreground mb-16 leading-relaxed max-w-2xl mx-auto">
            हमारे सामाजिक माध्यमों पर फॉलो करें और नवीनतम अपडेट प्राप्त करें
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Button asChild variant="outline" size="lg" className="h-16 group border-2 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <a href="https://facebook.com/joinrss" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2">
                <Facebook className="w-6 h-6 group-hover:text-blue-600 transition-colors" />
                <span className="font-semibold">Facebook</span>
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-16 group border-2 hover:border-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <a href="https://twitter.com/joinrss" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2">
                <Twitter className="w-6 h-6 group-hover:text-sky-500 transition-colors" />
                <span className="font-semibold">Twitter</span>
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-16 group border-2 hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-950 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <a href="https://instagram.com/joinrss" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2">
                <Instagram className="w-6 h-6 group-hover:text-pink-600 transition-colors" />
                <span className="font-semibold">Instagram</span>
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-16 group border-2 hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <a href="https://linkedin.com/company/joinrss" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2">
                <Linkedin className="w-6 h-6 group-hover:text-blue-700 transition-colors" />
                <span className="font-semibold">LinkedIn</span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-24 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="relative overflow-hidden border-0 shadow-2xl">
            {/* Enhanced gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90"></div>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/5 rounded-full blur-3xl"></div>
            
            <CardContent className="relative z-10 p-8 sm:p-16 text-center">
              <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold mb-8">
                <Users className="w-4 h-4" />
                राष्ट्र सेवा
              </div>
              
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-primary-foreground leading-tight">
                राष्ट्र सेवा में हमारे साथ जुड़ें
              </h3>
              
              <p className="text-lg sm:text-xl mb-12 text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
                आपका छोटा सा योगदान भी राष्ट्र निर्माण में महत्वपूर्ण भूमिका निभा सकता है। 
                आज ही हमसे जुड़कर धर्म और संस्कृति की रक्षा में भागीदार बनें।
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 px-8 py-4 text-lg font-semibold rounded-xl">
                  <Link href="/founders-team-members">
                    <Users className="w-5 h-5 mr-3" />
                    हमारी टीम देखें
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-primary-foreground/30 text-primary hover:bg-primary-foreground hover:text-primary backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 px-8 py-4 text-lg font-semibold rounded-xl">
                  <Link href="/donate-now">
                    <Heart className="w-5 h-5 mr-3" />
                    दान करें
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
