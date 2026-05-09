// Primary number (WhatsApp + Telegram)
export const CONTACT_PHONE_E164 = '251922022200'
export const CONTACT_PHONE_DISPLAY = '+251 922 022 200'
export const CONTACT_TEL_LINK = `tel:+${CONTACT_PHONE_E164}`

// Secondary number (from the flyer)
export const CONTACT_PHONE_2_E164 = '251911686689'
export const CONTACT_PHONE_2_DISPLAY = '+251 911 686 689'
export const CONTACT_TEL_2_LINK = `tel:+${CONTACT_PHONE_2_E164}`

// Email + website (from the flyer)
export const CONTACT_EMAIL = 'goldenzaf1@gmail.com'
export const CONTACT_WEBSITE_DISPLAY = 'www.goldenzaf.com'

// Telegram: t.me/+<E164> works when the user has the contact saved or is searching by number.
export const TELEGRAM_LINK = `https://t.me/+${CONTACT_PHONE_E164}`

// Social links visible on the flyer.
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/goldenzaf',
  facebook: 'https://www.facebook.com/goldenzaf',
  tiktok: 'https://www.tiktok.com/@goldenzaf',
  threads: 'https://www.threads.net/@goldenzaf',
  whatsapp: `https://wa.me/${CONTACT_PHONE_E164}`,
  telegram: TELEGRAM_LINK,
} as const

export function getWhatsAppLink(message: string) {
  return `https://wa.me/${CONTACT_PHONE_E164}?text=${encodeURIComponent(message)}`
}
