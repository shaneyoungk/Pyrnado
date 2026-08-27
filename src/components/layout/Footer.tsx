import { Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { ZapziveLogo } from "@/components/ui/ZapziveLogo";

const footerLinks = {
  Product: [
    { label: "Payroll", href: "/features#payroll" },
    { label: "Escrow", href: "/features#escrow" },
    { label: "Remittance", href: "/features#remit" },
    { label: "Treasury", href: "/features#treasury" },
    { label: "Developer API", href: "/docs" },
  ],
  Developers: [
    { label: "Docs", href: "/docs" },
    { label: "API Reference", href: "/docs/api-reference" },
    { label: "Webhooks", href: "/docs/webhooks" },
    { label: "Sandbox", href: "/docs/testing" },
    { label: "Status", href: "#" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Security", href: "/features#security" },
    { label: "Compliance", href: "/docs/compliance" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Terms", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Risk Disclosure", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-16 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-10 lg:mb-0">
            <Link to="/">
              <ZapziveLogo size="md" className="mb-6" />
            </Link>
            <p className="text-sm leading-relaxed text-zinc-500 font-medium">
              Zapzive is borderless finance, built for teams. Global payroll, automated payments, and treasury management in one unified platform.
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-11 h-11 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-muted transition-all text-muted-foreground hover:text-foreground"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-6 text-foreground">
                {category}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground text-base transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-zinc-600 font-medium">
            © {new Date().getFullYear()} Zapzive Network. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-zinc-600 text-xs font-semibold uppercase tracking-widest">
              Built on Polygon & Base
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

