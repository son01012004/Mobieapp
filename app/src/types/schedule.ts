export interface ScheduleResponse {
    id: number;
    classId: number;
    subject: string;
    teacher: string;
    room: string;
    startTime: string;
    endTime: string;
    type: 'study' | 'exam' | 'practice';
  }
  
  export interface SemesterResponse {
    id: number;
    name: string;
  }
  
  export interface Lesson {
    time: string;
    subject: string;
    studentId?: string;
    teacher?: string;
    room: string;
    color: string;
    type: 'study' | 'exam' | 'practice';
    date?: string;
  }
  
  export interface DaySchedule {
    day: string;
    lessons: Lesson[];
  }