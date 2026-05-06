export const locales = ['am', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'am'
