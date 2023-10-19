import { useAppDispatch } from "@/store";
import { useCourseFilterOptions, useCourseIsLoading } from "@/store/course/hooks";
import { fetchCourse, fetchCourseFilterOptions } from "@/store/course/thunks";
import { CourseStatus } from "@/store/course/types";
import { Checkbox, Form, Select, Skeleton } from "antd";
import React, { useEffect, useState } from "react";

type Filters = {
  country: string
  status: CourseStatus[]
}

export default function CourseFilters() {
  const options = useCourseFilterOptions();
  const [filters, setFilters] = useState<Filters>({country: "", status: ["Active", "Inactive"]});
  const [form] = Form.useForm<Filters>();
  const dispatch = useAppDispatch();
  const isLoading = useCourseIsLoading("filters");

  useEffect(() => {
    dispatch(fetchCourseFilterOptions())
      .unwrap()
      .then(({countries}) => {
        const country = countries[Math.max(countries.indexOf("Singapore"), 0)];
        setFilters(f => ({...f, country}));
        form.setFieldsValue({country});
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const {country, status} = filters;
    if (!country || status.length === 0) {
      return;
    }
    dispatch(fetchCourse({country, status}));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filters.country, filters.status]);

  return (
    <div className="flex flex-col">
      <div className="font-bold text-2xl my-6">
        Course Filters
      </div>

      <Skeleton loading={isLoading} active>
        <Form
          form={form}
          labelCol={{span: 3}}
          requiredMark={false}
        >
          <Form.Item<Filters>
            label={<b>Country</b>}
            name="country"
            tooltip="Country that course is in"
            rules={[{"required": true, message: "At least one country must be selected"}]}
          >
            <Select
              size="middle"
              placeholder="Select country"
              options={options.countries.map(c => ({label: c, key: c}))}
              value={filters.country}
              className="w-full max-w-[300px]"
              onChange={(value) => setFilters(f => ({...f, country: value}))}
            />
          </Form.Item>

          <Form.Item<Filters>
            label={<b>Status</b>}
            name="status"
            tooltip="Active means the course is currently still operational"
            initialValue={filters.status}
            rules={[
              () => ({
                validator: (_, value: string[]) => {
                  if (value.length === 0) {
                    return Promise.reject("At least one status must be selected");
                  }
                  return Promise.resolve();
                }
              })
            ]}
          >
            <Checkbox.Group
              name="status-checkbox"
              options={options.status}
              value={filters.status}
              onChange={(v) => {
                setFilters(f => ({...f, status: v as ("Active" | "Inactive")[]}));
              }}
            />
          </Form.Item>

        </Form>
      </Skeleton>
    </div>
  );
}
