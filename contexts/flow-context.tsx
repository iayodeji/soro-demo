'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FlowContextType {
  currentPage: number;
  formData: {
    brandName: string;
    objectives: string;
    targetAudience: string;
    keyQuestions: string;
  };
  setCurrentPage: (page: number) => void;
  setFormData: (data: Partial<FlowContextType['formData']>) => void;
  navigateToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export function FlowProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormDataState] = useState({
    brandName: '',
    objectives: '',
    targetAudience: '',
    keyQuestions: '',
  });

  const setFormData = (data: Partial<FlowContextType['formData']>) => {
    setFormDataState((prev) => ({ ...prev, ...data }));
  };

  const navigateToPage = (page: number) => {
    if (page >= 1 && page <= 4) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < 4) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <FlowContext.Provider
      value={{
        currentPage,
        formData,
        setCurrentPage,
        setFormData,
        navigateToPage,
        nextPage,
        previousPage,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
}

export function useFlow() {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useFlow must be used within FlowProvider');
  }
  return context;
}
