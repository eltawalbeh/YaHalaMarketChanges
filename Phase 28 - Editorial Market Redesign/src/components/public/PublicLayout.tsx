import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { PublicNav } from "./PublicNav";
import { useSite } from "@/app/providers/SiteContext";
import { useLang } from "@/app/providers/LangContext";

export function PublicLayout({ children }: { children: ReactNode }) {
  const { site } = useSite();
  const { lang } = useLang();
  const ar = lang === "ar";
  useEffect(() => {
    document.title = site.content[ar ? "seo_title_ar" : "seo_title"];
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", site.content[ar ? "seo_description_ar" : "seo_description"] || "");
  }, [site, ar]);
  return (
    <div className="public-shell min-h-screen flex flex-col" dir={ar ? "rtl" : "ltr"}>
      <PublicNav />
      <main className="public-container flex-1" id="main-content">{children}</main>
      <footer className="public-footer">
        <div className="public-footer-grid">
          <div className="public-footer-brand">
            <Link to="/" className="public-footer-wordmark">{ar ? site.brand_name_ar : site.brand_name}<span>.</span></Link>
            <p>{ar ? site.footer_text_ar : site.footer_text}</p>
            {(ar ? site.office_address_ar : site.office_address) && <address>{ar ? site.office_address_ar : site.office_address}</address>}
          </div>
          <div><h2>{ar ? "استكشف" : "EXPLORE"}</h2><Link to="/">{ar ? "الرئيسية" : "Discover"}</Link><Link to="/offers">{ar ? "الوجهات والعروض" : "Destinations & offers"}</Link><Link to="/plan">{ar ? "رحلات خاصة" : "Plan a trip"}</Link></div>
          <div><h2>{ar ? "المعلومات" : "INFORMATION"}</h2><Link to="/legal">{ar ? "الخصوصية والشروط" : "Privacy & terms"}</Link><Link to="/login">{ar ? "دخول الفريق" : "Staff access"}</Link></div>
          <div><h2>{ar ? "تواصل معنا" : "GET IN TOUCH"}</h2>{site.contact_email && <a href={"mailto:" + site.contact_email}>{site.contact_email}</a>}{site.whatsapp_number && <a href={"https://wa.me/" + site.whatsapp_number.replace(/\D/g, "")} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRightIcon size={14} /></a>}</div>
        </div>
        <div className="public-footer-bottom"><span>© {new Date().getFullYear()} {ar ? site.brand_name_ar : site.brand_name}</span><span>{ar ? "صُنعت الرحلات لتُعاش." : "Go further. Feel more."}</span></div>
      </footer>
    </div>
  );
}
