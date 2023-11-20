import { createSlice } from "@reduxjs/toolkit";
import * as A from "./thunks";
import { CourseReducer } from "./types";

const initialState: CourseReducer = {
  loading: {
    courses: false,
    filters: false,
  },
  courses: {},
  filters: {
    countries: [],
    status: [],
  }
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: builder => {
    // fetch courses
    builder
      .addCase(A.fetchCourse.pending, (state) => {
        state.loading.courses = true;
      })
      .addCase(A.fetchCourse.rejected, (state) => {
        state.loading.courses = false;
      })
      .addCase(A.fetchCourse.fulfilled, (state, {payload}) => {
        state.loading.courses = false;
        state.courses = payload;
      });

    // fetch course filters
    builder
      .addCase(A.fetchCourseFilterOptions.pending, (state) => {
        state.loading.filters = true;
      })
      .addCase(A.fetchCourseFilterOptions.rejected, (state) => {
        state.loading.filters = false;
      })
      .addCase(A.fetchCourseFilterOptions.fulfilled, (state, {payload}) => {
        state.loading.filters = false;
        state.filters = payload;
      });

    // remove course
    builder
      .addCase(A.deleteCourse.pending, (state) => {
        state.loading.courses = true;
      })
      .addCase(A.deleteCourse.rejected, (state) => {
        state.loading.courses = false;
      })
      .addCase(A.deleteCourse.fulfilled, (state, {payload}) => {
        state.loading.courses = false;
        delete state.courses[payload];
      });
  }
});
