import React, { useState } from "react";
import confetti from "canvas-confetti";
import { weddingConfig } from "../wedding.config";
import { Ornament, SpinningMandala } from "./Ornaments";
import { RevealOnScroll } from "./RevealOnScroll";
import { saveRsvp } from "../lib/supabase";
import { Sparkles, Heart, Users, Mail, User, Check, X } from "lucide-react";

type AttendanceMap = Record<string, "attending" | "declining" | null>;

interface RsvpData {
  name: string;
  email: string;
  adultsCount: number;
  kidsCount: number;
  guestCount: number;
  attendance: AttendanceMap;
  note: string;
  submittedAt: string;
  submissionId?: string;
  originalEmail?: string;
  originalName?: string;
}

const STORAGE_KEY = "rsvp_submission_hitesh_neha";

export const RsvpSection: React.FC = () => {
  const { couple, events } = weddingConfig;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [adultsCount, setAdultsCount] = useState(1);
  const [kidsCount, setKidsCount] = useState(0);
  const [attendance, setAttendance] = useState<AttendanceMap>(
    Object.fromEntries(events.map((e) => [e.name, null]))
  );
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [originalEmail, setOriginalEmail] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [submissionId, setSubmissionId] = useState("");

  const [submitted, setSubmitted] = useState<RsvpData | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as RsvpData;
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });
  const [error, setError] = useState<string | null>(null);

  const toggleAttendance = (eventName: string, status: "attending" | "declining") => {
    setAttendance((prev) => ({
      ...prev,
      [eventName]: prev[eventName] === status ? null : status,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your mail ID / email address.");
      return;
    }
    const anySelected = Object.values(attendance).some((v) => v !== null);
    if (!anySelected) {
      setError("Please select your attendance for at least one celebration.");
      return;
    }

    const attendingList = events
      .filter((ev) => attendance[ev.name] === "attending")
      .map((ev) => ev.name)
      .join(", ");

    const declinedList = events
      .filter((ev) => attendance[ev.name] === "declining")
      .map((ev) => ev.name)
      .join(", ");

    const totalGuests = adultsCount + kidsCount;
    const currentSubmissionId =
      submissionId ||
      submitted?.submissionId ||
      `rsvp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const prevEmail = originalEmail || email.trim();
    const prevName = originalName || name.trim();

    const data: RsvpData = {
      name: name.trim(),
      email: email.trim(),
      adultsCount,
      kidsCount,
      guestCount: totalGuests,
      attendance,
      note: note.trim(),
      submittedAt: new Date().toISOString(),
      submissionId: currentSubmissionId,
      originalEmail: prevEmail,
      originalName: prevName,
    };

    // Optimistic instant UI update: transition immediately with zero delay
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore storage errors
    }

    setSubmitted(data);
    setIsEditing(false);
    setIsSubmitting(false);
    setOriginalEmail(data.email);
    setOriginalName(data.name);

    confetti({
      particleCount: 130,
      spread: 360,
      startVelocity: 45,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#D4AF37", "#8B1E3F", "#F59E0B", "#E5A93C", "#FFF3D6", "#FFFFFF"],
      zIndex: 99999,
    });

    // Save to Google Sheet in the background asynchronously without blocking UI
    saveRsvp({
      name: data.name,
      email: data.email,
      adults: data.adultsCount,
      kids: data.kidsCount,
      guest_count: data.guestCount,
      attending_events: attendingList || "None",
      declined_events: declinedList || "None",
      haldi: attendance["Haldi"] === "attending" ? "Yes" : "No",
      marriage: attendance["Marriage"] === "attending" ? "Yes" : "No",
      sangeet: attendance["Sangeet & Cocktail"] === "attending" ? "Yes" : "No",
      vratham: attendance["Satyanarayana Vratham"] === "attending" ? "Yes" : "No",
      note: data.note || "",
      isUpdate: isEditing,
      originalEmail: prevEmail,
      originalName: prevName,
      submissionId: currentSubmissionId,
    }).catch((err) => {
      console.warn("Background Google Sheet RSVP sync error:", err);
    });
  };

  const handleEditRsvp = () => {
    if (!submitted) return;
    setName(submitted.name);
    setEmail(submitted.email);
    setAdultsCount(submitted.adultsCount || 1);
    setKidsCount(submitted.kidsCount || 0);
    setAttendance(submitted.attendance);
    setNote(submitted.note);
    setOriginalEmail(submitted.originalEmail || submitted.email);
    setOriginalName(submitted.originalName || submitted.name);
    setSubmissionId(
      submitted.submissionId ||
      `rsvp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
    );
    setIsEditing(true);
    setSubmitted(null);
  };

  const inputClass =
    "w-full border-b border-gold/40 bg-transparent px-1 py-3 font-sans text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-gold";

  const attendingEvents = submitted
    ? events.filter((e) => submitted.attendance[e.name] === "attending")
    : [];

  return (
    <section id="rsvp" className="relative overflow-hidden px-5 py-16 sm:py-24">
      <SpinningMandala className="-right-20 top-1/2 w-48 sm:w-64" />
      <Ornament variant="gold" className="-left-8 top-14 w-36 rotate-6 sm:w-48" />
      <Ornament variant="leaf" className="-right-10 bottom-10 w-36 -rotate-6 sm:w-52" />

      <div className="relative mx-auto max-w-4xl">
        <RevealOnScroll className="text-center">
          <p className="eyebrow flex items-center justify-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            Join Us in Celebration
            <Sparkles className="h-3.5 w-3.5 text-gold" />
          </p>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl text-foreground">
            RSVP &amp; Blessings
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Please let us know which celebrations you will be joining and share your heartfelt blessings for Hitesh &amp; Neha.
          </p>
          <div className="rule-gold mx-auto mt-6 w-32" />
        </RevealOnScroll>

        <div className="mt-10 sm:mt-14">
          {submitted ? (
            <RevealOnScroll>
              <div className="paper-card mx-auto max-w-xl px-7 py-10 text-center sm:px-12 sm:py-14 border border-gold/40 shadow-xl">
                <span className="text-5xl">🎉</span>
                <p className="eyebrow mt-6 text-gold-deep">RSVP Confirmed</p>
                <h3 className="mt-3 font-display text-3xl sm:text-4xl text-foreground">
                  Thank you, {submitted.name}!
                </h3>
                <div className="rule-gold mx-auto mt-5 w-24" />

                {attendingEvents.length > 0 ? (
                  <>
                    <p className="mt-6 text-sm text-muted-foreground">
                      We look forward to celebrating with you at:
                    </p>
                    <ul className="mt-4 space-y-2">
                      {attendingEvents.map((ev) => (
                        <li
                          key={ev.name}
                          className="rounded-xl border border-gold/30 bg-gold/5 px-4 py-2 font-serif text-sm"
                        >
                          <span className="text-gold font-bold">{ev.name}</span>
                          <span className="ml-2 text-muted-foreground text-xs">
                            — {ev.day}, {ev.time}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-serif text-foreground/90">
                      <span className="px-3 py-1 rounded-full border border-gold/40 bg-gold/10">
                        👨‍👩‍👧‍👦 {submitted.adultsCount} Adult{submitted.adultsCount > 1 ? 's' : ''}
                      </span>
                      {submitted.kidsCount > 0 && (
                        <span className="px-3 py-1 rounded-full border border-gold/40 bg-gold/10">
                          🎈 {submitted.kidsCount} Kid{submitted.kidsCount > 1 ? 's' : ''}
                        </span>
                      )}
                      <span className="text-muted-foreground">
                        (Total: {submitted.guestCount} {submitted.guestCount > 1 ? 'Guests' : 'Guest'})
                      </span>
                    </div>
                  </>
                ) : (
                  <p className="mt-6 text-sm text-muted-foreground">
                    We will miss you! Thank you for sending your prayers and warm wishes from afar.
                  </p>
                )}

                {submitted.note && (
                  <div className="mt-6 rounded-2xl border border-gold/30 bg-muted/20 p-4 text-center">
                    <p className="text-[11px] uppercase tracking-widest text-gold-deep font-title mb-1">
                      Your Blessing Message
                    </p>
                    <p className="font-serif text-sm italic text-foreground/90 leading-relaxed">
                      “{submitted.note}”
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleEditRsvp}
                  className="mt-8 inline-block rounded-full border border-gold/60 px-8 py-3 font-title text-xs uppercase tracking-[0.28em] text-gold-deep transition-all hover:bg-gold/10 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Edit my RSVP
                </button>
              </div>
            </RevealOnScroll>
          ) : (
            <RevealOnScroll>
              <form
                onSubmit={handleSubmit}
                className="paper-card mx-auto max-w-2xl px-6 py-9 sm:px-12 sm:py-14 border border-gold/40 shadow-xl rounded-2xl"
              >
                {isEditing && (
                  <div className="mb-6 flex items-center justify-between rounded-xl border border-gold/40 bg-gold/10 px-4 py-2.5 text-xs text-gold-deep">
                    <span className="font-serif">✏️ Editing your previously submitted response</span>
                    <button
                      type="button"
                      onClick={() => {
                        const saved = localStorage.getItem(STORAGE_KEY);
                        if (saved) setSubmitted(JSON.parse(saved));
                        setIsEditing(false);
                      }}
                      className="underline hover:text-foreground ml-2 text-[11px] cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {/* Name & Mail ID Fields */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground mb-1 font-title flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-gold" />
                      Full Name *
                    </label>
                    <input
                      className={inputClass}
                      placeholder="Your full name"
                      maxLength={80}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground mb-1 font-title flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-gold" />
                      Mail ID *
                    </label>
                    <input
                      type="email"
                      className={inputClass}
                      placeholder="name@example.com"
                      maxLength={100}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Number of Guests: Adults & Kids */}
                <div className="mt-8 rounded-2xl border border-gold/30 bg-gold/5 p-4 sm:p-5">
                  <label className="block text-[0.68rem] uppercase tracking-[0.22em] text-gold-deep font-title mb-4 flex items-center gap-1.5 font-bold">
                    <Users className="h-3.5 w-3.5 text-gold-deep" />
                    Number of Guests Attending
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Adults Counter */}
                    <div className="flex items-center justify-between rounded-xl border border-gold/30 bg-card/60 px-4 py-2.5">
                      <div>
                        <p className="font-serif text-sm font-semibold text-foreground">Adults</p>
                        <p className="text-[11px] text-muted-foreground">Age 12 and above</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setAdultsCount((a) => Math.max(1, a - 1))}
                          className="h-8 w-8 rounded-full border border-gold/50 flex items-center justify-center font-bold text-gold hover:bg-gold/15 active:scale-90 transition-all cursor-pointer"
                        >
                          −
                        </button>
                        <span className="font-title text-xl w-6 text-center text-foreground font-semibold">
                          {adultsCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAdultsCount((a) => Math.min(20, a + 1))}
                          className="h-8 w-8 rounded-full border border-gold/50 flex items-center justify-center font-bold text-gold hover:bg-gold/15 active:scale-90 transition-all cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Kids Counter */}
                    <div className="flex items-center justify-between rounded-xl border border-gold/30 bg-card/60 px-4 py-2.5">
                      <div>
                        <p className="font-serif text-sm font-semibold text-foreground">Kids</p>
                        <p className="text-[11px] text-muted-foreground">Children under 12</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setKidsCount((k) => Math.max(0, k - 1))}
                          className="h-8 w-8 rounded-full border border-gold/50 flex items-center justify-center font-bold text-gold hover:bg-gold/15 active:scale-90 transition-all cursor-pointer"
                        >
                          −
                        </button>
                        <span className="font-title text-xl w-6 text-center text-foreground font-semibold">
                          {kidsCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setKidsCount((k) => Math.min(15, k + 1))}
                          className="h-8 w-8 rounded-full border border-gold/50 flex items-center justify-center font-bold text-gold hover:bg-gold/15 active:scale-90 transition-all cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-center text-xs font-serif text-muted-foreground">
                    Total Attending: <span className="text-gold font-bold font-title">{adultsCount + kidsCount} Guests</span>
                  </p>
                </div>

                {/* Events Category Selection */}
                <div className="mt-8">
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-title">
                    Which celebrations will you be joining? *
                  </p>
                  <div className="space-y-3.5">
                    {events.map((ev) => {
                      const isAttending = attendance[ev.name] === 'attending';
                      const isDeclined = attendance[ev.name] === 'declining';

                      return (
                        <div
                          key={ev.name}
                          className={`rounded-xl border transition-all duration-300 p-4 ${
                            isAttending
                              ? 'border-gold bg-gold/10 shadow-[0_4px_16px_rgba(212,175,55,0.15)] ring-1 ring-gold/40'
                              : isDeclined
                              ? 'border-maroon/40 bg-maroon/5 opacity-80'
                              : 'border-gold/25 hover:border-gold/45 bg-card/40'
                          }`}
                        >
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                              <p className="font-title text-sm sm:text-base font-semibold text-foreground flex items-center gap-2">
                                {ev.name}
                                {isAttending && (
                                  <span className="text-[10px] uppercase font-bold text-gold tracking-widest bg-gold/20 px-2 py-0.5 rounded-full">
                                    Attending
                                  </span>
                                )}
                              </p>
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                {ev.day} · {ev.time}
                              </p>
                              <p className="text-[11px] text-muted-foreground/80 mt-0.5">
                                📍 {ev.place}
                              </p>
                            </div>

                            <div className="flex gap-2 mt-2 sm:mt-0 sm:flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => toggleAttendance(ev.name, 'attending')}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[0.68rem] uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
                                  isAttending
                                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-[#2A0810] border-[#D4AF37] shadow-sm'
                                    : 'border-gold/40 text-foreground/80 hover:border-gold hover:text-foreground'
                                }`}
                              >
                                <Check className="h-3 w-3" />
                                Will Attend
                              </button>
                              <button
                                type="button"
                                onClick={() => toggleAttendance(ev.name, 'declining')}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[0.68rem] uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
                                  isDeclined
                                    ? 'bg-maroon/15 border-maroon text-maroon'
                                    : 'border-gold/25 text-muted-foreground hover:border-maroon/40 hover:text-maroon'
                                }`}
                              >
                                <X className="h-3 w-3" />
                                Decline
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Blessings Message */}
                <div className="mt-8">
                  <label className="block text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground mb-1 font-title flex items-center gap-1.5">
                    <Heart className="h-3.5 w-3.5 text-maroon" />
                    Blessings Message for Hitesh &amp; Neha
                  </label>
                  <textarea
                    className={`${inputClass} mt-2 resize-none rounded-xl border border-gold/30 p-3 bg-muted/10`}
                    placeholder="Write your blessings, prayers, or personal message for Hitesh & Neha..."
                    rows={4}
                    maxLength={500}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <p className="text-right text-[10px] text-muted-foreground mt-1">
                    {note.length}/500 characters
                  </p>
                </div>

                {error && (
                  <p className="mt-4 text-center font-title text-xs tracking-wider text-maroon font-semibold">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-8 w-full rounded-full border border-gold/70 bg-gradient-to-r from-[#D4AF37] via-[#E5B842] to-[#D4AF37] py-4 font-serif text-xs uppercase tracking-[0.3em] text-[#2A0810] font-bold shadow-[0_4px_20px_rgba(212,175,55,0.35)] transition-all hover:scale-[1.01] hover:shadow-[0_6px_24px_rgba(212,175,55,0.5)] active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting
                    ? (isEditing ? 'Updating RSVP...' : 'Submitting RSVP...')
                    : (isEditing ? 'Update RSVP Response' : 'Confirm RSVP')}
                </button>
              </form>
            </RevealOnScroll>
          )}
        </div>
      </div>
    </section>
  );
};
