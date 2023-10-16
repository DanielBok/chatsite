"use client";

import { CourseFilters, useCourseOptions } from "@/app/(with-session)/course/context";
import { makeUrl } from "@/lib/api";
import { Checkbox, Form, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";


type CourseFilterOptions = {
  countries: string[]
}


export default function CourseFilters() {
  const [countries, setCountries] = useState<string[]>([]);
  const {filters, setFilters} = useCourseOptions();
  const [form] = Form.useForm<CourseFilters>();

  useEffect(() => {
    axios.get<CourseFilterOptions>(makeUrl("course/filters"))
      .then(({data}) => {
        setCountries(data.countries.sort());

        // set default country
        const country = data.countries[Math.max(data.countries.indexOf("Singapore"), 0)];
        const newFilters: CourseFilters = {country, status: ["Active", "Inactive"]};
        setFilters(newFilters);
        form.setFieldsValue(newFilters);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="flex flex-col">
      <div className="font-bold text-2xl my-6">
        Course Filters
      </div>

      <Form
        form={form}
        labelCol={{span: 3}}
        requiredMark={false}
      >
        <Form.Item<CourseFilters>
          label={<b>Country</b>}
          name="country"
          tooltip="Country that course is in"
          rules={[{"required": true, message: "At least one country must be selected"}]}
        >
          <Select
            size="middle"
            placeholder="Select country"
            options={countries.map(c => ({label: c, value: c}))}
            value={filters.country}
            className="w-full max-w-[300px]"
            onChange={(value) => setFilters({country: value})}
          />
        </Form.Item>

        <Form.Item<CourseFilters>
          label={<b>Status</b>}
          name="status"
          tooltip="Active means the course is currently still operational"
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
            options={["Active", "Inactive"]}
            value={filters.status}
            onChange={(v) => {
              setFilters({status: v as ("Active" | "Inactive")[]});
            }}
          />
        </Form.Item>

      </Form>
    </div>
  );
}
