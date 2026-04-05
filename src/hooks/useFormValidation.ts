import { useMemo } from 'react';
import type { CoverData } from '../utils/templates';

export function useFormValidation(data: CoverData) {
  const errors = useMemo(() => {
    const errs: Partial<Record<keyof CoverData, string>> = {};
    if (!data.subject?.trim()) errs.subject = 'Subject is required';
    if (!data.studentName?.trim()) errs.studentName = 'Student name is required';
    if (!data.rollNumber?.trim()) errs.rollNumber = 'Roll number is required';
    if (!data.courseCode?.trim()) errs.courseCode = 'Course code is required';
    return errs;
  }, [data]);

  const isValid = Object.keys(errors).length === 0;

  return { errors, isValid };
}
