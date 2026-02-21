/** Format Uzbek phone: +998 (XX) XXX-XX-XX */
export function formatPhoneUz(value: string): string {
  const digits = value.replace(/\D/g, "");
  let clean = digits;
  if (digits.startsWith("998")) {
    clean = digits.slice(3);
  } else if (digits.startsWith("8") && digits.length > 1) {
    clean = digits.slice(1);
  }
  clean = clean.slice(0, 9);

  if (clean.length === 0) return "";
  if (clean.length <= 2) return `+998 (${clean}`;
  if (clean.length <= 5)
    return `+998 (${clean.slice(0, 2)}) ${clean.slice(2)}`;
  if (clean.length <= 7)
    return `+998 (${clean.slice(0, 2)}) ${clean.slice(2, 5)}-${clean.slice(5)}`;
  return `+998 (${clean.slice(0, 2)}) ${clean.slice(2, 5)}-${clean.slice(5, 7)}-${clean.slice(7, 9)}`;
}

/** Extract digits for API: 998901234567 */
export function parsePhoneForSubmit(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("998")) return digits;
  if (digits.startsWith("8") && digits.length >= 10)
    return "998" + digits.slice(1, 10);
  if (digits.length >= 9) return "998" + digits.slice(-9);
  return digits;
}
