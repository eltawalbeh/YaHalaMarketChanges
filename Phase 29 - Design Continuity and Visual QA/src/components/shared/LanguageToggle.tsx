import { useLang } from "@/app/providers/LangContext"

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang()
  const ar = lang === "ar"

  function toggle() {
    setLang(ar ? "en" : "ar")
  }

  return (
    <button
      onClick={toggle}
      aria-label={ar ? "Switch to English" : "التبديل إلى العربية"}
      className={[
        "inline-flex items-center gap-2 rounded-md select-none transition-colors cursor-pointer",
        "border border-[var(--border)] bg-white text-[var(--foreground)] hover:bg-[var(--secondary)]",
        "px-4 py-2 text-sm font-medium",
        className ?? "",
      ].join(" ")}
      style={{ direction: "ltr" }}
    >
      {/* Globe icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span className="tracking-wide">{ar ? "AR" : "EN"}</span>
    </button>
  )
}
