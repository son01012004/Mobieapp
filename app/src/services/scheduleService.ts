import api from '../api/api';
import { ScheduleResponse, SemesterResponse } from '../types/schedule';

export const fetchSemesters = async (): Promise<SemesterResponse[]> => {
  const response = await api.get('/api/classes/semesters');
  return response.data;
};

export const fetchStudentScheduleByWeek = async (
  studentId: string,
  startDate: string,
  endDate: string,
  semesterId: number
): Promise<ScheduleResponse[]> => {
  const response = await api.get(`/api/classes/students/${studentId}/schedules/week`, {
    params: { startDate, endDate, semesterId },
  });
  return response.data;
};

export const fetchStudentScheduleByDay = async (
  studentId: string,
  date: string
): Promise<ScheduleResponse[]> => {
  const response = await api.get(`/api/classes/students/${studentId}/schedules/day`, {
    params: { date },
  });
  return response.data;
};

export const fetchTeacherScheduleByWeek = async (
  teacherId: string,
  startDate: string,
  endDate: string,
  semesterId: number
): Promise<ScheduleResponse[]> => {
  const response = await api.get(`/api/classes/teachers/${teacherId}/schedules/week`, {
    params: { startDate, endDate, semesterId },
  });
  return response.data;
};