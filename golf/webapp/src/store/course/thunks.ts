import { Course, CourseFilterOptions, CourseStatus } from "@/store/course/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type FetchCourseParams = {
  country: string
  status: CourseStatus[]
}

export const fetchCourse = createAsyncThunk(
  "courses/fetch",
  async ({country, status}: FetchCourseParams) => {
    const {data} = await axios.post<Course[]>(
      "course",
      {
        active: status.length === 2 ? undefined : status[0] === "Active",
        country
      });

    return data.reduce((acc, course) => ({...acc, [course.id]: course}), {} as Record<number, Course>);
  }
);

export const fetchCourseFilterOptions = createAsyncThunk(
  "course/fetch-filter-options",
  async () => {
    const {data} = await axios.get<CourseFilterOptions>("course/filters");
    return data;
  }
);
