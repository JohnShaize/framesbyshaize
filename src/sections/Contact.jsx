import { useState } from "react";

export const Contact = () => {
  const [result, setResult] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending...");

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setIsSuccess(false);
      setResult("Form configuration is missing. Please try again later.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData(event.target);

    // Use the user's subject inside the email subject line
    const inquirySubject = formData.get("inquiry_subject");

    formData.append("access_key", accessKey);
    formData.append(
      "subject",
      `New inquiry from Frames by Shaize: ${inquirySubject}`
    );
    formData.append("from_name", "Frames by Shaize Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setResult("Your message has been sent successfully.");
        event.target.reset();
      } else {
        setIsSuccess(false);
        setResult(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setIsSuccess(false);
      setResult("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-background px-4 pb-20 pt-5 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          {/* Left content */}
          <div className="flex flex-col justify-between rounded-[20px] border border-border bg-card p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-8 lg:p-10">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                Contact
              </p>

              <h2 className="text-4xl font-semibold leading-[0.95] text-foreground sm:text-5xl lg:text-6xl">
                Let&apos;s work together
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                Whether you’re planning a portrait session, a creative
                collaboration, or simply want to connect, I’d love to hear from
                you.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[20px] border border-border bg-background/70 p-4">
                <p className="mb-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Email
                </p>
                <a
                  href="mailto:framesbyshaize@gmail.com"
                  className="break-all text-sm text-foreground transition-colors hover:text-primary sm:text-base"
                >
                  framesbyshaize@gmail.com
                </a>
              </div>

              <div className="rounded-[20px] border border-border bg-background/70 p-4">
                <p className="mb-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Instagram
                </p>
                <a
                  href="https://instagram.com/framesbyshaize"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-foreground transition-colors hover:text-primary sm:text-base"
                >
                  @framesbyshaize
                </a>
              </div>

              <div className="rounded-[20px] border border-border bg-background/70 p-4">
                <p className="mb-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Based In
                </p>
                <p className="text-sm text-foreground sm:text-base">
                  Toronto, Canada
                </p>
              </div>

              <div className="rounded-[20px] border border-border bg-background/70 p-4">
                <p className="mb-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Response Time
                </p>
                <p className="text-sm text-foreground sm:text-base">
                  Usually within 24 hours
                </p>
              </div>
            </div>
          </div>

          {/* Right form card */}
          <div className="rounded-[20px] border border-border bg-card p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-8 lg:p-10">
            <form className="grid gap-5" onSubmit={onSubmit}>
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
                tabIndex="-1"
                autoComplete="off"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    className="w-full rounded-[20px] border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-[20px] border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="inquiry_subject"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Subject
                </label>
                <input
                  id="inquiry_subject"
                  name="inquiry_subject"
                  type="text"
                  placeholder="Portrait session, collaboration, question..."
                  required
                  className="w-full rounded-[20px] border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Tell me a little about what you’re looking for..."
                  required
                  className="w-full resize-none rounded-[20px] border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex cursor-pointer items-center justify-center rounded-full border border-border bg-primary px-6 py-3 text-sm font-medium text-background shadow-[0_14px_30px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-[1px] hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Send Inquiry"}
                </button>
              </div>

              {result && (
                <p
                  className={`text-sm ${
                    isSuccess ? "text-primary" : "text-red-500"
                  }`}
                >
                  {result}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};