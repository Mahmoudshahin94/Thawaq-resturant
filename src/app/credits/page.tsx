import Link from "next/link";
import credits from "@/lib/photo-credits.json";

export const metadata = { title: "Photo credits — مطعم الذواق" };

export default function CreditsPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-10" dir="ltr">
      <Link href="/" className="text-primary text-sm font-semibold">← Menu</Link>
      <h1 className="text-xl font-bold text-ink mt-4 mb-1">Photo credits</h1>
      <p className="text-ink-3 text-sm mb-6">Food photos are from Wikimedia Commons under open licenses.</p>
      <ul className="space-y-3">
        {credits.map((c) => (
          <li key={c.file} className="text-sm text-ink-2">
            <a href={c.source} target="_blank" rel="noopener noreferrer" className="text-ink font-semibold underline">
              {c.title}
            </a>{" "}
            — {c.author} · {c.license}
          </li>
        ))}
      </ul>
    </main>
  );
}
