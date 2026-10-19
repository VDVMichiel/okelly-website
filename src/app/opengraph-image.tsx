import { ImageResponse } from 'next/og'

export const alt = "Schaakclub O'Kelly — schaken in Hasselt en Limburg"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#F8F4EB',
          borderLeft: '28px solid #A8312D',
          paddingLeft: 90,
          paddingRight: 90,
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', marginBottom: 36 }}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              style={{
                width: 32,
                height: 32,
                backgroundColor: i % 2 === 0 ? '#5E0000' : '#A8312D',
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 88,
            fontWeight: 700,
            color: '#5E0000',
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Schaakclub O&apos;Kelly
        </div>
        <div style={{ display: 'flex', fontSize: 40, color: '#A8312D', marginBottom: 40 }}>
          Schaken in Hasselt &amp; Kermt &mdash; sinds 1947
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            color: '#5E0000',
            opacity: 0.85,
          }}
        >
          Elke vrijdag clubavond &middot; Meer dan 70 leden &middot; Jeugd &amp; interclub
        </div>
      </div>
    ),
    { ...size }
  )
}
