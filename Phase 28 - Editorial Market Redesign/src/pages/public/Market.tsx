import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRightIcon, ArrowRightIcon, CalendarBlankIcon, MapPinIcon, MagnifyingGlassIcon, SparkleIcon } from "@phosphor-icons/react";
import { PublicLayout } from "@/components/public/PublicLayout";
import { useLang } from "@/app/providers/LangContext";
import { useSite } from "@/app/providers/SiteContext";
import { useResource } from "@/lib/request";
import { offersService } from "@/services";
import { LoadingState } from "@/components/ui/Operations";
import { assets } from "@/lib/assets";

export default function Market() {
  const { lang } = useLang();
  const { site } = useSite();
  const navigate = useNavigate();
  const ar = lang === "ar";
  const r = useResource(() => offersService.list({ status: "published" }));
  const offers = r.data || [];
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const destinations = Array.from(
    new Map(offers.filter((o) => o.cover_image_url && o.destination.city).map((o) => [o.destination.city, o] as const)).values(),
  ).slice(0, 6);
  const categories = Array.from(new Set(offers.flatMap((o) => o.tags))).filter(Boolean).slice(0, 5);
  const featured = offers.filter((o) => o.cover_image_url).slice(0, 4);
  const hero = offers.find((o) => o.cover_image_url);
  const heroImage = hero?.cover_image_url || assets.planCover;
  const copy = (key: string, fallback: string) => site.content[ar ? key + "_ar" : key] || fallback;
  const title = (o: (typeof offers)[number]) => ar ? o.title_ar || o.title : o.title;
  const cityName = (o: (typeof offers)[number]) => ar ? o.destination.city_ar || o.destination.city : o.destination.city;
  const countryName = (o: (typeof offers)[number]) => ar ? o.destination.country_ar || o.destination.country : o.destination.country;
  const offerUrl = (slug: string) => "/offers/" + encodeURIComponent(slug);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (city) params.set("city", city);
    if (date) params.set("date", date);
    navigate("/offers" + (params.toString() ? "?" + params.toString() : ""));
  }

  return (
    <PublicLayout>
      <div className="market-home">
        <section className="market-intro" aria-labelledby="market-intro-title">
          <div>
            <p className="market-eyebrow">{ar ? "اكتشف العالم مع يا هلا" : "CURATED TRAVEL BY YA HALA"}</p>
            <h1 id="market-intro-title">{copy("hero_title", ar ? "اذهب أبعد. عِش أكثر." : "Go further. Feel more.")}</h1>
          </div>
          <p className="market-intro-copy">{copy("hero_text", ar ? "وجهات ملهمة، وتجارب استثنائية، وبرامج سفر تناسب أسلوبك." : "Inspiring destinations, unforgettable experiences and journeys designed around you.")}</p>
        </section>

        <form className="market-search" onSubmit={submit} aria-label={ar ? "البحث عن الرحلات" : "Find a journey"}>
          <label className="market-search-field">
            <span><MagnifyingGlassIcon size={16} /> {ar ? "عن ماذا تبحث؟" : "WHAT ARE YOU LOOKING FOR?"}</span>
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={ar ? "رحلة أو وجهة" : "Trip or destination"} />
          </label>
          <label className="market-search-field">
            <span><MapPinIcon size={16} /> {ar ? "الوجهة" : "DESTINATION"}</span>
            <select value={city} onChange={(e) => setCity(e.target.value)} aria-label={ar ? "الوجهة" : "Destination"}>
              <option value="">{ar ? "جميع الوجهات" : "Anywhere"}</option>
              {Array.from(new Set(offers.map((o) => o.destination.city))).filter(Boolean).map((c) => (
                <option value={c} key={c}>{ar ? offers.find((o) => o.destination.city === c)?.destination.city_ar || c : c}</option>
              ))}
            </select>
          </label>
          <label className="market-search-field">
            <span><CalendarBlankIcon size={16} /> {ar ? "ابتداءً من" : "DEPARTURE FROM"}</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <button className="market-search-submit" type="submit"><MagnifyingGlassIcon size={18} /><span>{ar ? "ابحث" : "Search"}</span></button>
        </form>

        <div className="market-hero-image">
          <img src={heroImage} alt={hero ? title(hero) : (ar ? "استكشف رحلتك القادمة" : "Discover your next journey")} fetchPriority="high" />
          <div className="market-hero-overlay" />
          <div className="market-hero-caption">
            <span>{ar ? "أجمل اللحظات تبدأ برحلة" : "MAKE ROOM FOR THE UNEXPECTED"}</span>
            {hero && <Link to={offerUrl(hero.slug)}>{cityName(hero)} <ArrowUpRightIcon size={17} /></Link>}
          </div>
        </div>

        <section className="market-section" aria-labelledby="destination-heading">
          <div className="market-section-head">
            <div><p className="market-eyebrow">{ar ? "وجهات" : "DESTINATIONS"}</p><h2 id="destination-heading">{copy("destinations_title", ar ? "إلى أين ستكون رحلتك القادمة؟" : "Where will you go next?")}</h2><p className="market-section-description">{ar ? "استكشف الوجهات المتاحة في عروض يا هلا الحالية." : "Explore destinations from our currently available travel offers."}</p></div>
            <Link className="market-text-link" to="/offers">{ar ? "كل الوجهات" : "All destinations"} <ArrowUpRightIcon size={16} /></Link>
          </div>
          <LoadingState {...r} retry={r.reload} />
          {destinations.length > 0 ? (
            <div className="market-destination-grid">
              {destinations.map((o) => (
                <Link className="market-destination-card" key={o.destination.city} to={"/offers?city=" + encodeURIComponent(o.destination.city)}>
                  <div className="market-photo-wrap"><img src={o.cover_image_url || heroImage} loading="lazy" alt={cityName(o)} /></div>
                  <div className="market-card-caption"><div><h3>{cityName(o)}</h3><p>{countryName(o)}</p></div><ArrowUpRightIcon size={20} /></div>
                </Link>
              ))}
            </div>
          ) : !r.loading && !r.error ? (
            <div className="market-no-offers"><p>{ar ? "ستظهر الوجهات هنا عند نشر أول عرض." : "Destinations appear here when offers are published."}</p><Link to="/plan">{ar ? "اطلب رحلة خاصة" : "Request a custom trip"} <ArrowUpRightIcon size={16} /></Link></div>
          ) : null}
        </section>

        <section className="market-experiences" aria-labelledby="packages-heading">
          <div className="market-experiences-inner">
            <div className="market-section-head">
              <div><p className="market-eyebrow">{ar ? "تجارب ورحلات" : "EXPERIENCES"}</p><h2 id="packages-heading">{copy("experiences_title", ar ? "دع الرحلة تصبح جزءاً من حكايتك." : "Make the journey part of the story.")}</h2><p className="market-section-description">{ar ? "عروض سفر منشورة بتفاصيل يمكنك استكشافها." : "Explore published packages and discover what's included."}</p></div>
              <Link className="market-text-link" to="/offers">{ar ? "عرض كل الرحلات" : "Explore all trips"} <ArrowUpRightIcon size={16} /></Link>
            </div>
            {categories.length > 0 && <div className="market-categories"><Link to="/offers" className="active">{ar ? "الكل" : "All"}</Link>{categories.map((c) => <Link key={c} to={"/offers?search=" + encodeURIComponent(c)}>{c}</Link>)}</div>}
            <div className="market-featured-grid">
              {featured.map((o) => (
                <Link className="market-featured-card" key={o.id} to={offerUrl(o.slug)}>
                  <div className="market-photo-wrap"><img src={o.cover_image_url || heroImage} loading="lazy" alt={title(o)} />{o.tags.length > 0 && <span className="market-image-tag">{ar ? o.tags_ar?.[0] || o.tags[0] : o.tags[0]}</span>}</div>
                  <div className="market-featured-info">
                    <p className="market-meta">{cityName(o)} · {o.duration_nights} {ar ? "ليالٍ" : "nights"}</p>
                    <h3>{title(o)}</h3>
                    <div className="market-featured-bottom"><span>{o.pricing.base_price > 0 ? (ar ? "ابتداءً من " : "From ") + o.pricing.base_price.toLocaleString("en-US") + " " + o.pricing.currency : (ar ? "اطلب السعر" : "Request price")}</span><ArrowUpRightIcon size={19} /></div>
                  </div>
                </Link>
              ))}
            </div>
            {!r.loading && !r.error && featured.length === 0 && <p className="market-no-offers">{ar ? "ستظهر باقات السفر الجديدة بمجرد نشرها." : "New packages will appear here once published."}</p>}
          </div>
        </section>

        <section className="market-section market-why" aria-labelledby="why-heading">
          <div className="market-section-head"><div><p className="market-eyebrow">{ar ? "سافر بطريقتك" : "TRAVEL YOUR WAY"}</p><h2 id="why-heading">{copy("travel_title", ar ? "رحلتك. خياراتك. ذكرياتك." : "Your trip. Your way. Your memories.")}</h2><p className="market-section-description">{ar ? "تصفح عروضنا أو شاركنا فكرتك لنرتب لك تجربة سفر تناسب احتياجاتك." : "Browse ready-made journeys or share your ideas for something personal."}</p></div></div>
          <div className="market-promo-grid">
            <Link to="/plan" className="market-promo market-promo-custom" style={{ backgroundImage: "linear-gradient(180deg,rgba(8,28,39,.05),rgba(8,28,39,.72)),url(" + assets.planCover + ")" }}>
              <span className="market-promo-label">{ar ? "رحلات خاصة" : "TAILOR-MADE JOURNEYS"}</span>
              <div><h3>{ar ? "خطط رحلتك كما تحب" : "Make it yours."}</h3><span>{ar ? "ابدأ التخطيط" : "Plan your trip"} <ArrowUpRightIcon size={17} /></span></div>
            </Link>
            <Link to="/offers" className="market-promo market-promo-explore" style={{ backgroundImage: "linear-gradient(180deg,rgba(8,28,39,.08),rgba(8,28,39,.72)),url(" + (featured[1]?.cover_image_url || assets.dashboardHero) + ")" }}>
              <span className="market-promo-label">{ar ? "باقات السفر" : "CURATED PACKAGES"}</span>
              <div><h3>{ar ? "اكتشف أماكن جديدة" : "Find your next escape."}</h3><span>{ar ? "استعرض العروض" : "Browse offers"} <ArrowUpRightIcon size={17} /></span></div>
            </Link>
          </div>
        </section>
        <div className="market-endnote"><SparkleIcon size={17} /><span>{ar ? "رحلتك القادمة تبدأ هنا. يا هلا." : "Your next journey starts here. Ya Hala."}</span><Link to="/plan">{ar ? "تواصل معنا" : "Let's plan"} <ArrowRightIcon size={16} /></Link></div>
      </div>
    </PublicLayout>
  );
}
