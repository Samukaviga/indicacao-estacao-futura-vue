type UTM = {
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
    utm_term?: string
    utm_content?: string
    gclid?: string
    fbclid?: string
    msclkid?: string
    referrer?: string
    landing_page?: string
    timestamp?: string // ISO
};

const FIRST_KEY = 'utm:first'
const LAST_KEY  = 'utm:last'
const TTL_DAYS  = 90

function nowISO() { return new Date().toISOString() }
function isExpired(ts?: string) {
    if (!ts) return true
    const d = new Date(ts)
    return (Date.now() - d.getTime()) > TTL_DAYS*24*60*60*1000
}

function read(key: string): UTM | null {
    try {
        const raw = localStorage.getItem(key)
        if (!raw) return null
        const obj = JSON.parse(raw)
        if (isExpired(obj?.timestamp)) { localStorage.removeItem(key); return null }
        return obj
    } catch { return null }
}

function write(key: string, data: UTM) {
    localStorage.setItem(key, JSON.stringify({ ...data, timestamp: nowISO() }))
}

function parseFromLocation(): UTM {
    const p = new URLSearchParams(window.location.search)
    const utm: UTM = {}
    const keys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid','msclkid'] as const
    keys.forEach(k => {
        const v = p.get(k)
        if (v) (utm as any)[k] = v
    })
    utm.referrer = document.referrer || undefined
    utm.landing_page = window.location.href
    return utm
}

function toLeadSource(utm?: UTM): string | undefined {
    const src = (utm?.utm_source || '').toLowerCase()
    const med = (utm?.utm_medium || '').toLowerCase()
    const ref = (utm?.referrer || '').toLowerCase()

    // mapeamentos comuns
    if (src.includes('google') || utm?.gclid) return 'google_ads'
    if (src.includes('facebook') || src.includes('fb') || utm?.fbclid) return 'facebook_ads'
    if (src.includes('instagram')) return 'instagram'
    if (src.includes('bing') || src.includes('msclkid')) return 'bing_ads'
    if (src.includes('tiktok')) return 'tiktok'
    if (src.includes('linkedin')) return 'linkedin'
    if (med === 'email' || src.includes('mail')) return 'email'
    if (med === 'cpc' || med === 'paid' || med === 'ppc') return 'paid_search'
    if (src === 'direct' || (!utm?.utm_source && !ref)) return 'direct'
    if (ref.includes('google.')) return 'google_organic'
    if (ref.includes('bing.')) return 'bing_organic'
    if (ref.includes('facebook.')) return 'facebook_organic'
    if (ref.includes('instagram.')) return 'instagram_organic'

    return src || undefined
}

export function useUtmAttribution() {
    function captureFromUrl() {
        const found = parseFromLocation()
        const hasAny = Object.keys(found).length > 2

        const first = read(FIRST_KEY)
        if (!first && hasAny) {
            write(FIRST_KEY, found)
        }
        if (hasAny) {
            write(LAST_KEY, found)
        } else {
            if (!first) write(FIRST_KEY, { referrer: document.referrer || undefined, landing_page: window.location.href, timestamp: nowISO() })
        }
    }

    function getFirst(): UTM | null { return read(FIRST_KEY) }
    function getLast(): UTM | null { return read(LAST_KEY) }

    return { captureFromUrl, getFirst, getLast, toLeadSource }
}
