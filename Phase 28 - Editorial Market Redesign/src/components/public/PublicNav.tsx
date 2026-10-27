import { Link, NavLink } from "react-router-dom";
import { ArrowUpRightIcon, ListIcon } from "@phosphor-icons/react";
import { useLang } from "@/app/providers/LangContext";
import { useSite } from "@/app/providers/SiteContext";
import { LanguageToggle } from "@/components/shared/LanguageToggle";

export function PublicNav() {
  const { lang } = useLang();
  const { site } = useSite();
  const ar = lang === "ar";
  return (
    <header className="public-nav" dir={ar ? "rtl" : "ltr"}>
      <div className="public-nav-inner">
        <Link to="/" className="public-nav-brand" aria-label={ar ? "الصفحة الرئيسية" : "Ya Hala Market home"}>
          <picture>
            {site.logo_mobile_url && <source media="(max-width: 640px)" srcSet={site.logo_mobile_url} />}
            <img src={site.logo_url || "/assets/yahala-logo-dark.png"} alt={ar ? site.brand_name_ar : site.brand_name} />
          </picture>
        </Link>
        <nav className="public-nav-links" aria-label={ar ? "القائمة الرئيسية" : "Main navigation"}>
          <NavLink end to="/" className={({ isActive }) => isActive ? "active" : ""}>{ar ? "الرئيسية" : "Discover"}</NavLink>
          <NavLink to="/offers" className={({ isActive }) => isActive ? "active" : ""}>{ar ? "الوجهات والعروض" : "Destinations & offers"}</NavLink>
          <NavLink to="/plan" className={({ isActive }) => isActive ? "active" : ""}>{ar ? "صمّم رحلتك" : "Plan your trip"}</NavLink>
        </nav>
        <div className="public-nav-actions">
          <details className="public-mobile-menu">
            <summary aria-label={ar ? "فتح القائمة" : "Open navigation"}><ListIcon size={22} /></summary>
            <nav aria-label={ar ? "قائمة الهاتف" : "Mobile navigation"}>
              <Link to="/">{ar ? "الرئيسية" : "Discover"}</Link>
              <Link to="/offers">{ar ? "الوجهات والعروض" : "Destinations & offers"}</Link>
              <Link to="/plan">{ar ? "صمّم رحلتك" : "Plan your trip"}</Link>
              <Link to="/legal">{ar ? "الخصوصية والشروط" : "Privacy & terms"}</Link>
            </nav>
          </details>
          <LanguageToggle className="market-language-toggle" />
          <Link to="/plan" className="public-nav-cta">{ar ? "ابدأ رحلتك" : "Start planning"} <ArrowUpRightIcon size={15} /></Link>
        </div>
      </div>
    </header>
  );
}
