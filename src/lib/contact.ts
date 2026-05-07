export const CONTACT_PHONE_E164 = '251922022200'
export const CONTACT_PHONE_DISPLAY = '+251 922 022 200'
export const CONTACT_TEL_LINK = `tel:+${CONTACT_PHONE_E164}`

export const TELEGRAM_LINK = `tg://resolve?phone=${CONTACT_PHONE_E164}`

export function getWhatsAppLink(message: string) {
  return `https://wa.me/${CONTACT_PHONE_E164}?text=${encodeURIComponent(message)}`
}
