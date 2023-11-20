import { useRootSelector } from "@/store";
import { CourseReducer } from "@/store/course/types";

export const useCourses = () => useRootSelector(s => s.course.courses);
export const useCourseFilterOptions = () => useRootSelector((s) => s.course.filters);
export const useCourseIsLoading = (key: keyof CourseReducer["loading"]) => useRootSelector((s) => s.course.loading[key]);
