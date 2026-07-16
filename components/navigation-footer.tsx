'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFlow } from '@/contexts/flow-context';
import { Button } from '@/components/ui/button';

const pages = [
  { number: 1, title: 'Brief' },
  { number: 2, title: 'Matching' },
  { number: 3, title: 'Conversation' },
  { number: 4, title: 'Insights' },
];

export function NavigationFooter() {
  const { currentPage, previousPage, nextPage } = useFlow();

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < 4;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-md bg-background/95 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Page Indicator */}
        <div className="text-sm text-muted-foreground font-light">
          Page {currentPage} of 4 • {pages[currentPage - 1].title}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={previousPage}
            disabled={!canGoPrevious}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button
            onClick={nextPage}
            disabled={!canGoNext}
            variant="default"
            size="sm"
            className="gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
