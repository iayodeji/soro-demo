'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useFlow } from '@/contexts/flow-context'
import { meta, students } from '@/data/demo-data'
import type { DemoStudent } from '@/data/demo-data'

export function MatchingPipeline() {
  const { nextPage } = useFlow()
  const [matchedStudents, setMatchedStudents] = useState<DemoStudent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading and matching process
    const timer = setTimeout(() => {
      setMatchedStudents(students)
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const selectedStudents = matchedStudents.filter((s) => s.status === 'selected')

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold text-foreground mb-2 leading-tight">
          Intelligent Student Matching
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed font-light">
          Sòrò analyzed your research brief and conducted mini-intake conversations with our student network. Below are the highest-confidence matches.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-8">
          {/* Loading State */}
          <div className="p-8 rounded-md border border-border bg-card space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse flex-shrink-0"></div>
                <span className="text-foreground font-medium group-hover:text-primary transition-smooth">
                  Analyzing research objectives...
                </span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse flex-shrink-0"></div>
                <span className="text-foreground font-medium group-hover:text-primary transition-smooth">
                  Conducting student intake interviews...
                </span>
              </div>
              <div className="flex items-center gap-4 group opacity-50">
                <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30 flex-shrink-0"></div>
                <span className="text-muted-foreground font-medium">
                  Computing compatibility scores...
                </span>
              </div>
              <div className="flex items-center gap-4 group opacity-50">
                <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30 flex-shrink-0"></div>
                <span className="text-muted-foreground font-medium">
                  Deterministic matching pipeline...
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-xl bg-muted/20 border border-border hover:border-primary/30 transition-smooth">
              <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                Students Evaluated
              </p>
              <div className="h-2.5 w-full bg-border rounded-full overflow-hidden">
                <div className="h-full w-3/5 bg-primary animate-pulse rounded-full"></div>
              </div>
              <p className="text-2xl font-bold text-primary mt-3">{students.length} <span className="text-sm font-medium text-muted-foreground">/ {students.length}</span></p>
            </div>
            <div className="p-6 rounded-xl bg-muted/20 border border-border hover:border-primary/30 transition-smooth">
              <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                Avg Compatibility
              </p>
              <p className="text-2xl font-bold text-primary">{Math.round(students.reduce((total, student) => total + student.compatibilityScore, 0) / students.length)}<span className="text-sm font-medium text-muted-foreground">%</span></p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Pipeline Overview */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Analyzed', count: students.length, status: 'complete' },
              { label: 'Intake Complete', count: meta.totalConversations, status: 'complete' },
              { label: 'Scored', count: students.length, status: 'complete' },
              { label: 'Selected', count: selectedStudents.length, status: 'active' },
            ].map((stage, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-xl border transition-smooth cursor-default ${
                  stage.status === 'active'
                    ? 'border-primary/50 bg-primary/5 hover:border-primary'
                    : 'border-border/50 bg-card/40 hover:border-border'
                }`}
              >
                <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                  {stage.label}
                </p>
                <p className="text-3xl font-bold text-primary">{stage.count}</p>
              </div>
            ))}
          </div>

          {/* Selected Cohort */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                Selected Cohort ({selectedStudents.length} students)
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                These students best match your research requirements with the highest confidence scores.
              </p>
            </div>

            <div className="grid gap-5">
              {selectedStudents.map((student) => (
                <div
                  key={student.id}
                  className="p-6 rounded-md border border-border bg-card hover:border-primary/30 transition-smooth"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-foreground">
                          {student.name}
                        </h3>
                        <span className="px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold">
                          ✓ Selected
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                        {student.campus} • {student.course}
                      </p>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {student.bio}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-4 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                          Compatibility
                        </p>
                        <div className="flex items-baseline gap-1">
                          <p className="text-4xl font-bold text-primary">
                            {student.compatibilityScore}
                          </p>
                          <p className="text-sm font-semibold text-muted-foreground">%</p>
                        </div>
                      </div>
                      <div className="w-28 h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{
                            width: `${student.compatibilityScore}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Other Matches */}
          <details className="group">
            <summary className="cursor-pointer p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
              <span className="text-sm font-semibold text-foreground">
                View {matchedStudents.filter((s) => s.status !== 'selected').length} Additional Matches
              </span>
            </summary>
            <div className="mt-3 grid gap-3 p-4 border border-border rounded-lg bg-card">
              {matchedStudents
                .filter((s) => s.status !== 'selected')
                .map((student) => (
                  <div
                    key={student.id}
                    className="p-3 rounded border border-border/50 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold text-foreground">{student.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {student.campus}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">
                        {student.compatibilityScore}%
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </details>

          {/* CTA */}
          <div className="flex gap-4 pt-6">
            <Button 
              onClick={nextPage}
              size="lg" 
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Proceed to Conversations
            </Button>
            <Button type="button" variant="outline" size="lg" className="px-8">
              Customize Selection
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
