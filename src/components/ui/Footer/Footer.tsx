"use client";

import Logo from "@/components/logo/Logo";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
} from "lucide-react";
import { colors } from "@/Helpers/colors";

export default function Footer() {
  return (
    <footer style={{background:colors.secondary ,color:colors.accentForeground}} className="bg-gradient-to-b from-purple-50 to-pink-50 mt-12">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Column 1 - About */}
        <div>
          <div className="mb-3">
            <Logo />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            ShopMart is your one-stop shop for all your needs. We bring you the
            best quality products at unbeatable prices with fast delivery.
          </p>
          <div className="flex flex-wrap gap-4 mt-4 text-gray-600">
            <Link href="#" className="hover:text-purple-500 transition">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="hover:text-purple-500 transition">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="hover:text-purple-500 transition">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="hover:text-purple-500 transition">
              <Youtube size={20} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/zeinab-ali-a2b89b204/"
              target="_blank"
              className="hover:text-purple-500 transition"
            >
              <Linkedin size={20} />
            </Link>
            <Link
              href="https://github.com/zeinab818"
              target="_blank"
              className="hover:text-purple-500 transition"
            >
              <Github size={20} />
            </Link>
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3  style={{color:colors.accentForeground}}className="text-lg font-semibold mb-3 text-gray-800">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-purple-500">Home</Link></li>
            <li><Link href="/products" className="hover:text-purple-500">Products</Link></li>
            <li><Link href="/categories" className="hover:text-purple-500">Categories</Link></li>
            <li><Link href="/allorders" className="hover:text-purple-500">Orders</Link></li>
            <li><Link href="/wishlist" className="hover:text-purple-500">Wishlist</Link></li>
          </ul>
        </div>

        {/* Column 3 - Customer Service */}
        <div>
          <h3 style={{color:colors.accentForeground}} className="text-lg font-semibold mb-3 text-gray-800">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/about" className="hover:text-purple-500">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-purple-500">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-purple-500">FAQs</Link></li>
            <li><Link href="/privacy" className="hover:text-purple-500">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-purple-500">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Column 4 - Contact */}
        <div>
          <h3 style={{color:colors.accentForeground}} className="text-lg font-semibold mb-3 text-gray-800">Get in Touch</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <Mail size={18} /> safaali8118@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} /> +20 10* *** ***
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={18} /> *** ***, Giza, Egypt
            </li>
          </ul>
          <div className="mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-2 focus:ring-2 focus:ring-purple-400 outline-none"
            />
            <button className="w-full bg-purple-600 text-white py-2 rounded-md text-sm hover:bg-purple-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{background:colors.background ,color:colors.accentForeground}} className="bg-gray-800 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} ShopMart. All rights reserved.
      </div>
    </footer>
  );
}
