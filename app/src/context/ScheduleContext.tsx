import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ScheduleContextType {
  studentId: string | null;
  setStudentId: (id: string | null) => void;
  semesterId: number | null;
  setSemesterId: (id: number | null) => void;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export const ScheduleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [studentId, setStudentId] = useState<string | null>(null);
  const [semesterId, setSemesterId] = useState<number | null>(null);

  return (
    <ScheduleContext.Provider value={{ studentId, setStudentId, semesterId, setSemesterId }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
};