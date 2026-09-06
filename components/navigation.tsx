'use client'

import { cn } from '@/lib/utils'
import { useFlow } from '@/contexts/flow-context'
import { Check } from 'lucide-react'

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
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <div className="flex shrink-0 items-center gap-3">
          <img
            src="/soro-logo-horizontal.jpg"
            alt="Sóró"
            className="h-10 w-auto object-contain"
          />
        </div>

        <nav aria-label="Research workflow" className="flex min-w-0 items-center gap-1 overflow-x-auto">
          {pages.map((page) => (
            <button
              key={page.number}
              onClick={() => navigateToPage(page.number)}
              className={cn(
                'flex shrink-0 items-center gap-2 border-b-2 px-3 py-2 text-sm font-medium transition-smooth',
                currentPage === page.number
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
              )}
            >
              <span className={cn('grid h-5 w-5 place-items-center border text-xs', currentPage === page.number ? 'border-primary bg-primary text-primary-foreground' : 'border-border')}>
                {page.number < currentPage ? <Check className="h-3 w-3" /> : page.number}
              </span>
              <span className="hidden sm:inline">{page.title}</span>
            </button>
          ))}
        </nav>

        <span className="hidden shrink-0 text-xs font-medium text-muted-foreground md:inline">Step {currentPage} of 4</span>
      </div>
    </header>
  )
}
