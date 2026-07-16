'use client'

import { cn } from '@/lib/utils'
import { useFlow } from '@/contexts/flow-context'

interface NavigationProps {
  currentPage: number
}

export function Navigation({ currentPage }: NavigationProps) {
  const { navigateToPage } = useFlow()

  const pages = [
    { number: 1, title: 'Research Brief' },
    { number: 2, title: 'Student Matching' },
    { number: 3, title: 'Conversation' },
    { number: 4, title: 'Insights' },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/95 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Sòrò logo" className="h-6 w-auto" />
            <span className="text-base font-display font-bold text-foreground">Sòrò</span>
          </div>
          <span className="text-xs text-muted-foreground font-light">
            Page {currentPage} of 4
          </span>
        </div>

        <div className="flex gap-2">
          {pages.map((page) => (
            <button
              key={page.number}
              onClick={() => navigateToPage(page.number)}
              className={cn(
                'px-3 py-1 rounded-lg text-xs font-medium transition-smooth',
                currentPage === page.number
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-foreground hover:bg-muted/40 hover:border-border'
              )}
            >
              {page.number}. {page.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
