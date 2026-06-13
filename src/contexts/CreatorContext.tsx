import { createContext, useContext, type ReactNode } from 'react';

interface CreatorContextValue {
  resetCreator: () => void;
}

const CreatorContext = createContext<CreatorContextValue | null>(null);

interface CreatorProviderProps {
  children: ReactNode;
  onReset: () => void;
}

export function CreatorProvider({ children, onReset }: CreatorProviderProps) {
  return (
    <CreatorContext.Provider value={{ resetCreator: onReset }}>
      {children}
    </CreatorContext.Provider>
  );
}

export function useCreatorContext() {
  const context = useContext(CreatorContext);
  if (!context) {
    throw new Error('useCreatorContext must be used within CreatorProvider');
  }
  return context;
}
