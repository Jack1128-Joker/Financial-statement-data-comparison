import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { FinancialStatement } from '@/types/types';
import { fetchAllStatements } from '@/services/api';

interface DataContextValue {
  statements: FinancialStatement[];
  loading: boolean;
  refresh: () => Promise<void>;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [statements, setStatements] = useState<FinancialStatement[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAllStatements();
      setStatements(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <DataContext.Provider value={{ statements, loading, refresh }}>
      {children}
    </DataContext.Provider>
  );
};

export function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData 必须在 DataProvider 内使用');
  return ctx;
}