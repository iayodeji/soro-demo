'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useFlow } from '@/contexts/flow-context'

const SAMPLE_DATA = {
  brandName: 'The Gen-Z Corp',
  objectives: 'Understand how Gen Z students in Lagos prefer to discover new fashion brands and what emotional triggers influence their purchasing decisions',
  targetAudience: 'Students aged 18-24 currently studying at universities in Lagos and Abuja, interested in fashion and lifestyle, active on social media platforms',
  keyQuestions: 'How do students currently discover new fashion brands? What are the main pain points? What emotional appeals resonate most? How influential are peer recommendations?',
}

export function BriefForm() {
  const { formData: contextFormData, setFormData, nextPage } = useFlow()
  const [formData, setFormDataLocal] = useState(contextFormData)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<NodeJS.Timeout | null>(null)

  // Initialize with sample data on first load
  useEffect(() => {
    if (!contextFormData.brandName) {
      setFormDataLocal(SAMPLE_DATA)
      setFormData(SAMPLE_DATA)
    }
  }, [])

  // Auto-submit after 3 seconds on mount if data is pre-filled
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.brandName && !isSubmitted) {
        setIsSubmitted(true)
      }
    }, 3000)
    setAutoAdvanceTimer(timer)
    return () => clearTimeout(timer)
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormDataLocal((prev) => ({
      ...prev,
      [name]: value,
    }))
    setFormData({ [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormData(formData)
    setIsSubmitted(true)
    // Auto-advance to next page after 2 seconds
    setTimeout(() => {
      nextPage()
    }, 3000)
  }

  const handleEditBrief = () => {
    setIsSubmitted(false)
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer)
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold text-foreground mb-2 leading-tight">
          Define Your Research Brief
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed font-light">
          Tell us about your research objectives in natural language. Sòrò&apos;s AI will intelligently match you with the most relevant students from our network.
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-10 max-w-3xl">
          {/* Brand Name */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-foreground uppercase tracking-wide">
              Brand Name
            </label>
            <input
              type="text"
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              placeholder="Enter your brand name"
              required
              className="w-full px-5 py-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-smooth hover:border-primary/30"
            />
          </div>

          {/* Research Objectives */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-foreground uppercase tracking-wide">
              Research Objectives
            </label>
            <p className="text-xs text-muted-foreground">
              What do you want to understand about your market?
            </p>
            <textarea
              name="objectives"
              value={formData.objectives}
              onChange={handleChange}
              placeholder="E.g., We want to understand how Gen Z students in Lagos prefer to discover new fashion brands and what influences their purchasing decisions..."
              required
              rows={4}
              className="w-full px-5 py-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-smooth resize-none hover:border-primary/30"
            />
          </div>

          {/* Target Audience */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-foreground uppercase tracking-wide">
              Target Audience Criteria
            </label>
            <p className="text-xs text-muted-foreground">
              Describe the ideal participants for your research
            </p>
            <textarea
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              placeholder="E.g., Students aged 18-24, currently studying at universities in Lagos and Abuja, interested in fashion and lifestyle, active on social media..."
              required
              rows={4}
              className="w-full px-5 py-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-smooth resize-none hover:border-primary/30"
            />
          </div>

          {/* Key Questions */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-foreground uppercase tracking-wide">
              Key Questions & Research Areas
            </label>
            <p className="text-xs text-muted-foreground">
              What specific insights do you want to uncover?
            </p>
            <textarea
              name="keyQuestions"
              value={formData.keyQuestions}
              onChange={handleChange}
              placeholder="E.g., How do students currently shop for fashion? What are their pain points? What would make them switch brands? How influential are peers in their purchasing decisions?..."
              required
              rows={4}
              className="w-full px-5 py-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-smooth resize-none hover:border-primary/30"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
            >
              Continue to Matching
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="px-8"
            >
              Save as Draft
            </Button>
          </div>
        </form>
      ) : (
        <div className="max-w-3xl space-y-10">
          {/* Success State */}
          <div className="p-8 rounded-2xl border border-accent/30 bg-accent/5 space-y-4 transition-smooth">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 text-accent text-xl font-bold">
                ✓
              </div>
              <div>
                <h2 className="text-3xl font-display font-bold text-foreground mb-3">
                  Brief Received
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  We&apos;re now analyzing your research requirements and matching you with the most compatible students from our network. This typically takes 2-3 minutes.
                </p>
              </div>
            </div>
          </div>

          {/* Brief Summary */}
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-foreground">Research Summary</h3>
            <div className="grid gap-4">
              <div className="p-6 rounded-xl bg-muted/20 border border-border/60 hover:border-primary/30 transition-smooth">
                <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Brand</p>
                <p className="text-lg font-medium text-foreground">{formData.brandName}</p>
              </div>
              <div className="p-6 rounded-xl bg-muted/20 border border-border/60 hover:border-primary/30 transition-smooth">
                <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Objectives</p>
                <p className="text-foreground leading-relaxed">
                  {formData.objectives}
                </p>
              </div>
              <div className="p-6 rounded-xl bg-muted/20 border border-border/60 hover:border-primary/30 transition-smooth">
                <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  Target Audience
                </p>
                <p className="text-foreground leading-relaxed">
                  {formData.targetAudience}
                </p>
              </div>
              <div className="p-6 rounded-xl bg-muted/20 border border-border/60 hover:border-primary/30 transition-smooth">
                <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  Key Questions
                </p>
                <p className="text-foreground leading-relaxed">
                  {formData.keyQuestions}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              size="lg"
              onClick={nextPage}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              View Matching Results
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleEditBrief}
              className="px-8"
            >
              Edit Brief
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
