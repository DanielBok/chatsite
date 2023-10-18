import { useCourseOptions } from "@/app/course/context";
import { Course, DistanceMetric, Tee } from "@/app/course/types";
import { getConversionMap, TEE_COLOR_CLASS } from "@/constants";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Descriptions, Modal, Radio, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";


export default function InfoModal() {
  const {modal, setModal, course, setCourse} = useCourseOptions();

  if (modal !== "info" || !course) {
    return null;
  }

  const {
    tee_info,
    location,
    country,
    course: courseName,
    par,
    index,
    google_map_url,
    active,
    website
  } = course;


  const title = (
    <>
      <InfoCircleOutlined/>
      <span className="ml-2">{courseName} Information</span>
    </>
  );

  const tableData = formTableInfo({tee_info, par, index});

  return (
    <Modal
      title={title}
      open={modal === "info"}
      maskClosable={true}
      onCancel={onCancel}
      className="min-w-[800px]"
      footer={null}
    >
      <Descriptions bordered={true}>
        <Descriptions.Item label="Country">{country}</Descriptions.Item>
        <Descriptions.Item label="Location">{location}</Descriptions.Item>
        <Descriptions.Item label="Course">{courseName}</Descriptions.Item>
        <Descriptions.Item label="Website" span={2}><a href={website}>{website}</a></Descriptions.Item>
        <Descriptions.Item label="Is Active">
          {
            active
              ? <span className="text-green-700">True</span>
              : <span className="text-red-700">False</span>
          }
        </Descriptions.Item>
        <Descriptions.Item label="Tee Info" span={3}>
          <CourseHoleDataTable data={tableData} metric={tee_info[0].distance_metric}/>
        </Descriptions.Item>
        <Descriptions.Item label="Map" span={3}>
          <iframe
            title="Course Location"
            src={google_map_url}
            width={600}
            height={450}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"/>
        </Descriptions.Item>

      </Descriptions>
    </Modal>
  );

  function onCancel() {
    setModal(null);
    setCourse(null);
  }
}

function formTableInfo({tee_info, par, index}: Pick<Course, "tee_info" | "par" | "index">) {
  return index.map(((iv, i) => ({
    "Hole": i + 1,
    "Index": iv,
    "Par": par[i],
    ...tee_info.reduce((x, {tee, distance}) => {
      return {...x, [tee]: distance[i]};
    }, {} as Record<Tee, number>)
  })));
}


type CourseHoleDataTableProps = {
  data: ReturnType<typeof formTableInfo>;
  metric: DistanceMetric;
}

function CourseHoleDataTable({data, metric}: CourseHoleDataTableProps) {
  const conversionMap = getConversionMap(metric);
  const [currMetric, setMetric] = useState(metric);

  const columns: ColumnsType<ReturnType<typeof formTableInfo>[number]> = [
    {
      title: "Hole",
      dataIndex: "Hole",
      key: "Hole",
      width: 100,
      fixed: "left",
    },
    {
      title: "Index",
      dataIndex: "Index",
      key: "Index",
      width: 100,
    },
    {
      title: "Par",
      dataIndex: "Par",
      key: "Par",
      width: 100,
    },
    {
      title: `Distance (${currMetric})`,
      key: "Distance",
      children: Object.entries(TEE_COLOR_CLASS)
        .filter(([tee,]) => data[0].hasOwnProperty(tee))
        .map(([tee, className]) => ({
          title: tee,
          dataIndex: tee,
          render: (v) => Math.round(v * conversionMap[currMetric]),
          key: tee,
          width: 100,
          onHeaderCell: () => ({className})
        })),
    },
  ];

  return (
    <>
      <Radio.Group
        value={currMetric}
        onChange={(v) => setMetric(v.target.value)}>
        <Radio.Button value="meter">Meters</Radio.Button>
        <Radio.Button value="yard">Yards</Radio.Button>
      </Radio.Group>
      <div className="mb-2"/>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        size="small"
        pagination={false}
        rowKey="Hole"
        summary={(data) => {
          const totalDistances = Object.keys(TEE_COLOR_CLASS)
            .filter((tee) => data[0].hasOwnProperty(tee))
            .map(tee => [
              tee,
              Math.round((data.reduce((sum, {[tee as Tee]: v}) => sum + v, 0)) * conversionMap[currMetric])
            ] as [Tee, number]);

          const totalPar = data.reduce((sum, row) => sum + row.Par, 0);

          return (
            <Table.Summary.Row className="font-bold">
              <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
              <Table.Summary.Cell index={1}/>
              <Table.Summary.Cell index={2}>{totalPar}</Table.Summary.Cell>
              {totalDistances.map(([tee, total], i) => (
                <Table.Summary.Cell index={i + 3} key={tee}>{total}</Table.Summary.Cell>
              ))}
            </Table.Summary.Row>
          );
        }}
      />
    </>);
}