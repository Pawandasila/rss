"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { donationData } from './DonationInfo';
import { 
  Heart, 
  QrCode, 
  CreditCard, 
  Copy, 
  Check,
  Banknote,
  Building2
} from 'lucide-react';

const Donation = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20">
            <Heart className="w-4 h-4 mr-2" />
            दान सेवा
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            {donationData.title}
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {donationData.description}
          </p>
        </div>

        {/* Donation Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          
          {/* QR Code Card */}
          <Card className="group overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-card/80 backdrop-blur-sm border-2 border-primary/10 hover:border-primary/20">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center gap-3 mb-2">
                <QrCode className="w-6 h-6 text-primary" />
                <CardTitle className="text-xl md:text-2xl font-bold text-foreground">
                  QR Code से दान करें
                </CardTitle>
              </div>
              <CardDescription className="text-base text-muted-foreground">
                {donationData.qrCode.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="text-center">
              <div className="relative w-64 h-64 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg bg-white p-4">
                <Image
                  src={donationData.qrCode.image}
                  alt={donationData.qrCode.alt}
                  fill
                  className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-xl p-4">
                <p className="text-sm md:text-base text-muted-foreground font-medium">
                  📱 अपने फोन का कैमरा या UPI ऐप से स्कैन करें
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Bank Details Card */}
          <Card className="group overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-card/80 backdrop-blur-sm border-2 border-primary/10 hover:border-primary/20">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Building2 className="w-6 h-6 text-primary" />
                <CardTitle className="text-xl md:text-2xl font-bold text-foreground text-center">
                  बैंक विवरण
                </CardTitle>
              </div>
              <CardDescription className="text-base text-muted-foreground text-center">
                सीधे बैंक खाते में स्थानांतरण करें
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Account Name */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">खाता धारक</p>
                      <p className="text-base font-semibold text-foreground">{donationData.bankDetails.accountName}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Name */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">बैंक नाम</p>
                      <p className="text-base font-semibold text-foreground">{donationData.bankDetails.bankName}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Number */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Banknote className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">खाता संख्या</p>
                      <p className="text-base font-semibold text-foreground font-mono">{donationData.bankDetails.accountNumber}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(donationData.bankDetails.accountNumber, 'account')}
                    className="p-2 hover:bg-muted rounded-md transition-colors"
                    title="कॉपी करें"
                  >
                    {copiedField === 'account' ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              {/* IFSC Code */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">IFSC कोड</p>
                      <p className="text-base font-semibold text-foreground font-mono">{donationData.bankDetails.ifscCode}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(donationData.bankDetails.ifscCode, 'ifsc')}
                    className="p-2 hover:bg-muted rounded-md transition-colors"
                    title="कॉपी करें"
                  >
                    {copiedField === 'ifsc' ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Message */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              आपका सहयोग अमूल्य है
            </h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              आपके द्वारा दिया गया प्रत्येक दान राष्ट्र निर्माण और समाज सेवा के पवित्र कार्य में योगदान देता है। 
              हम आपके उदार हृदय के लिए कृतज्ञ हैं।
            </p>
            <div className="mt-6 text-primary font-semibold">
              🙏 धन्यवाद 🙏
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;