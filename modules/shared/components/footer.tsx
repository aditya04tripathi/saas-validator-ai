import Link from "next/link";
import { APP_INFO, FOOTER } from "@/modules/shared/constants";

interface FooterProps {
  isAuthenticated: boolean;
}

export default function FooterSection({ isAuthenticated }: FooterProps) {
  const footerLinks = isAuthenticated
    ? [
        { title: "Home", href: "/" },
        { title: "Dashboard", href: "/dashboard" },
        { title: "Validate", href: "/validate" },
        { title: "Billing", href: "/billing" },
        { title: "Profile", href: "/profile" },
        { title: "Privacy", href: "/privacy" },
        { title: "Terms", href: "/terms" },
      ]
    : [
        { title: "Home", href: "/" },
        { title: "About", href: "/about" },
        { title: "Privacy", href: "/privacy" },
        { title: "Terms", href: "/terms" },
        { title: "Sign In", href: "/auth/signin" },
        { title: "Sign Up", href: "/auth/signup" },
      ];

  return (
    <footer className="py-16 border-t mt-10">
      <div className="mx-auto max-w-5xl px-6">
        <Link
          href="/"
          aria-label="go home"
          className="mx-auto text-center block font-bold"
        >
          <h2>{APP_INFO.name}</h2>
        </Link>

        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-primary block duration-150 transition-colors"
            >
              {link.title}
            </Link>
          ))}
        </div>
        <span className="text-muted-foreground block text-center text-sm">
          {FOOTER.copyright(new Date().getFullYear())}
        </span>
      </div>
    </footer>
  );
}
