export interface CurriculumDetailResponseDTO {
  id: number;
  curriculumId: number;
  curriculumName: string;
  subjectId: number;
  subjectName: string;
  semesterId: number;
  semesterName: string;
  isMandatory: boolean;
  createdAt: string;
}