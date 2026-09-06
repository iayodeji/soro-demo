import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { FlowProvider } from '@/contexts/flow-context'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Sòrò – AI-Moderated Consumer Insights',
  description: 'Intelligent research platform for Nigerian brands',
  generator: 'Inioluwa',
  icons: {
    icon: '/soro.svg',
    apple: '/logo.jpg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F24E1E' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" style={inter.style}>
      <body className="antialiased font-sans text-foreground">
        <FlowProvider>
          {children}
        </FlowProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
