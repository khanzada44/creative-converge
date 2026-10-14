// components/Footer.jsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const footerLinks = [
  {
    title: "Domain",
    links: [
      "Domain Name",
      "Domain Search",
      "Domain Transfer",
      "Premium Domains",
      "DNS Updation",
    ],
  },
  {
    title: "Website Builder",
    links: ["Wordpress", "Wix", "Square Space", "Tools", "Tutorial"],
  },
  {
    title: "Support",
    links: [
      "Terms & Conditions",
      "Privacy Policy",
      "Payments",
      "Refund",
      "Installation",
    ],
  },
  {
    title: "Company",
    links: ["About Us", "Partner", "Services", "Pricing", "Portfolio"],
  },
];

const socialLinks = [
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaTwitter, label: "Twitter", href: "#" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full font-sans text-gray-300">
      {/* Main Footer */}
      <div
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://creativeconverge.com/mockups/creativemock/wp-content/uploads/2024/08/footer-1.png')",
        }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[#252628]/90" />

        {/* Footer Container */}
        <div className="relative z-10 mx-auto max-w-[1800px] px-6 pt-[60px] pb-[38px] sm:px-10 lg:px-[6%]">
          {/* Top Columns */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.55fr_1.25fr_1.25fr_1.25fr_1.25fr] lg:gap-[45px]">
            {/* Logo Column */}
            <div className="min-w-0">
              <Link
                href="/"
                aria-label="Creative Converge Home"
                className="mb-[22px] inline-block"
              >
                <Image
                  src="https://creativeconverge.com/assets/images/logo-dark.png"
                  alt="Creative Converge"
                  width={340}
                  height={130}
                  className="h-auto w-[315px] max-w-full object-contain object-left"
                  priority
                  unoptimized
                />
              </Link>

              <p className="max-w-[320px] text-[14px] leading-[1.55] text-[#a9adbb]">
                Our digital company of professionals has been developing
                products for 15 years. We&apos;ve got a lot of awards for our
                work and develop applications that become popular in the world.
              </p>
            </div>

            {/* Navigation Columns */}
            {footerLinks.map((column) => (
              <div key={column.title} className="min-w-0">
                <h3 className="mb-[13px] text-[19px]  tracking-[-0.5px] text-white">
                  {column.title}
                </h3>

                <ul className="">
                  {column.links.map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-[13px] text-[#a9adbb] transition-colors duration-200 hover:text-white"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Horizontal Divider */}
          <div className="my-[14px] border-t border-[#454753]" />

          {/* Bottom Information */}
          <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-[1.55fr_1.25fr_1.25fr_1.25fr_1.25fr] lg:gap-[35px]">
            {/* Social Icons */}
            <div className="min-w-0">
              <div className="mb-3.75 flex items-center gap-[20px]">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-full bg-white text-[15px] text-[#252628] transition-colors hover:bg-gray-300"
                  >
                    <Icon />
                  </a>
                ))}
              </div>

              <p className="max-w-[300px] text-[15px] leading-[1.5] text-[#a9adbb]">
                We are Experts in Our Field. We do everything at a high level.
              </p>
            </div>

            {/* Working Hours */}
            <div className="min-w-0">
              <h3 className="mb-3.75 text-[19px]   leading-[1.2] tracking-[-0.5px] text-white">
                Working hours:
              </h3>

              <p className="text-[15px] text-[#a9adbb]">
                Mon - Fri: 9 am - 6 pm
                <br />
                Sat, Sun: Holiday
              </p>
            </div>

            {/* Address */}
            <div className="min-w-0">
              <h3 className="mb-3.75 text-[19px]  tracking-[-0.5px] text-white">
                Address:
              </h3>

              <p className="text-[13px]">
                19002 Mission Park Dr, Richmond, TX 77407
              </p>
            </div>

            {/* Contact */}
            <div className="min-w-0">
              <h3 className="mb-3.75 text-[19px] tracking-[-0.5px] text-white">
                Hit us up:
              </h3>

              <a
                href="mailto:info@websdesignusa.com"
                className="wrap-break-word text-[17px] text-[#a9adbb] transition-colors hover:text-white"
              >
                info@websdesignusa.com
              </a>
            </div>

            {/* Trustpilot */}
            <div className="min-w-0">
              <h3 className="mb-3.75 text-[19px]  tracking-[-0.5px] text-white">
                Trust Pilot
              </h3>

              <a
                href="#"
                className="text-[16px] text-[#079bd3] transition-colors hover:text-sky-300"
              >
                Trustpilot
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="flex min-h-[73px] items-center justify-center bg-[#111218] px-5 py-5 text-center">
        <p className="text-[17px] font-normal leading-[1.5] text-[#a9adbb]">
          Copyright © 2026 Webs Design USA. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}