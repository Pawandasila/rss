import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy - Rashtriya Seva Sangh",
  description:
    "Understand our refund policy for donations, contributions, and purchases at Rashtriya Seva Sangh (RSS).",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Refund Policy</span>
        </nav>

        
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Refund Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            RASHTRIYA SEVA SANGH (RSS)
          </p>
        </div>

        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          
          <section className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Refund Policy Overview
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              At RASHTRIYA SEVA SANGH (RSS), we are committed to providing
              high-quality services and products. However, due to the nature of
              our offerings, we regret to inform you that we do not offer
              refunds for any services, donations, or purchases made on our
              website.
            </p>
          </section>

          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Donations and Contributions
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              All donations and contributions made to RSS are{" "}
              <strong className="text-foreground">non-refundable</strong>. We
              appreciate your support, and your contribution goes directly
              towards our mission of promoting and protecting human rights &
              Sanatan Dharma.
            </p>
          </section>

          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Services and Products
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              For any services or products offered on our website, including but
              not limited to memberships, events, or merchandise,{" "}
              <strong className="text-foreground">all sales are final</strong>.
              No refunds will be provided.
            </p>
          </section>

          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Unauthorized Transactions
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              If you believe there has been an unauthorized transaction from
              your account, please contact us immediately so that we can
              investigate and take appropriate action.
            </p>
          </section>

          
          <section className="bg-muted/50 rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Contact Information
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground mb-2">
              If you have any questions or concerns about our refund policy,
              please feel free to contact us at:
            </p>
            <a
              href="mailto:help@joinrss.org.in"
              className="text-primary hover:underline font-medium"
            >
              help@joinrss.org.in
            </a>
            <p className="text-base leading-relaxed text-muted-foreground mt-4">
              Or through our contact page on the website:{" "}
              <Link href="/contact-us" className="text-primary hover:underline">
                joinrss.org.in
              </Link>
            </p>
          </section>

          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Amendments to the Refund Policy
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              RSS reserves the right to amend or update this refund policy at
              any time. Any changes made to the policy will be effective
              immediately upon posting on our website.
            </p>
          </section>

          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Governing Law
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              This refund policy is governed by and construed in accordance with
              the laws of India. Any disputes or claims arising out of or in
              connection with this refund policy will be subject to the
              exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          
          <section className="bg-primary/5 rounded-lg p-6 border border-primary/20">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Acknowledgment
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              By making a donation, contribution, or purchasing
              services/products from RSS, you acknowledge that you have read and
              agree to the terms of this refund policy.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground mt-4">
              We appreciate your understanding and support of our mission.
            </p>
            <p className="text-base font-semibold text-foreground mt-6">
              Thank you,
              <br />
              RASHTRIYA SEVA SANGH (RSS)
              <br />
              <a
                href="http://joinrss.org.in"
                className="text-primary hover:underline"
              >
                joinrss.org.in
              </a>
            </p>
          </section>
        </div>

        
        <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4 justify-center text-sm">
          <Link
            href="/privacy-policy"
            className="text-primary hover:underline font-medium"
          >
            Privacy Policy
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link
            href="/terms-and-conditions"
            className="text-primary hover:underline font-medium"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  );
}
