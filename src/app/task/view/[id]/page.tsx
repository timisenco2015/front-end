"use client";

import React, { useState, useEffect } from "react";
import { Form, Input, Button, Space, message } from "antd";
import { useRouter, useParams } from "next/navigation";
import TaskButton from '../../../base/TaskButton';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getTasks } from '@/app/service/taskService';


interface Task {
  id: number;
  title: string;
  color: string;
  status: string;
  timeStamp: string;
}

export default function ViewTask() {
  const router = useRouter();
  const params = useParams();
  const taskId = params?.id;

  const [form] = Form.useForm();
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [task, setTask] = useState<Task | null>(null);

  const colors = [
    { name: "red", hex: "#FF3B30" },
    { name: "orange", hex: "#FF9500" },
    { name: "yellow", hex: "#FFCC00" },
    { name: "green", hex: "#34C759" },
    { name: "blue", hex: "#007AFF" },
    { name: "indigo", hex: "#5856D6" },
    { name: "purple", hex: "#AF52DE" },
    { name: "pink", hex: "#FF2D55" },
  ];

  useEffect(() => {
    if (taskId) {
      getTasks().then((data: Task[]) => {
        const task = data.find((task) => task.id.toString() === taskId);
        if (task) {
          setTask(task);
          setSelectedColor(task.color);
          form.setFieldsValue({ title: task.title });
        }
      })
       .catch((error) => {
          console.error(`Error getting all tasks. Contact admin with this Session Id: ${ localStorage.getItem("requestId")}`, error);
        message.error(`Error getting all tasks. Contact admin with this Session Id: ${ localStorage.getItem("requestId")}`, error);
      });;
    }
  }, [taskId, form]);

  const navigateToHome = () => router.push("/");

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "24px", width: "80%", margin: "0 auto", padding: "16px" }}>
      <div style={{ alignSelf: "flex-start" }}>
        <Button size="large" type="link" onClick={navigateToHome} icon={<ArrowLeftOutlined />} style={{ color: "#ffffff" }} />
      </div>

      <Form form={form} layout="vertical" style={{ width: "100%" }}>
        <Form.Item label="Title" name="title">
          <Input
            style={{ width: "100%", backgroundColor:"#262626", borderColor:"#333333", color:"#F2F2F2" }}
            placeholder="Ex. Brush your teeth"
            disabled
          />
        </Form.Item>

        <Form.Item label="Color">
          <Space wrap size="small">
            {colors.map((color) => (
              <div key={color.name} style={{ textAlign: "center" }}>
                <Button
                  type={selectedColor === color.name ? "primary" : "default"}
                  shape="circle"
                  style={{
                    backgroundColor: color.hex,
                    border: selectedColor === color.name ? "2px solid white" : "none",
                  }}
                  disabled
                />
                <div style={{ color: "#F2F2F2", fontSize: "12px", marginTop: "4px" }}>
                  {color.name.charAt(0).toUpperCase() + color.name.slice(1)}
                </div>
              </div>
            ))}
          </Space>
        </Form.Item>

        <Form.Item>
          <TaskButton
             onClick={() => {}}
            size="small"
            alignment="center"
            padding="30px 0"
            width="100%"
            label="Save Task"
            backgroundColor="#1E6F9F"
            isViewMode={true}
          />
        </Form.Item>
      </Form>

      <style jsx>{`
        input::placeholder {
          color: #F2F2F2;
        }
      `}</style>
    </div>
  );
}
