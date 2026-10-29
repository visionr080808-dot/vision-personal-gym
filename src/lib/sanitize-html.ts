import DOMPurify from "dompurify";

/** Keep the rich editor's formatting, while removing executable markup. */
export function sanitizeRichHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    // Blog content is prose, not an alternative login or contact form.
    FORBID_TAGS: ["style", "form", "input", "button", "select", "textarea"],
    ADD_ATTR: ["target"],
  });
}
