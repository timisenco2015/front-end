"use client";

import React, { useState } from "react";
import { Form, Input, Button, Space, message } from "antd";
import { useRouter } from "next/navigation";
import TaskButton from '../../base/TaskButton';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { createTask } from '@/app/service/taskService';

interface Task {
  title: string;
  color: string;
  status: string;
  timeStamp: string;
}

export default function Add() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [selectedColor, setSelectedColor] = useState<string>("");

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

  const onFinish = (values: any) => {
    const newTask: Task = {
      title: values.title,
      color: selectedColor,
      status: "Not Completed",
      timeStamp: new Date().toISOString(),
    };

    createTask(newTask)
      .then(() => router.push("/"))
       .catch((error) => {
          console.error(`Error creating task. Contact admin with this Session Id: ${ localStorage.getItem("requestId")}`, error);
        message.error(`Error creating task. Contact admin with this Session Id: ${ localStorage.getItem("requestId")}`, error);
      });;
  };

  const navigateToHome = () => router.push("/");

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "24px", width: "80%", margin: "0 auto", padding: "16px" }}>
      <div style={{ alignSelf: "flex-start" }}>
        <Button size="large" type="link" onClick={navigateToHome} icon={<ArrowLeftOutlined />} style={{ color: "#ffffff" }} />
      </div>

      <Form form={form} onFinish={onFinish} layout="vertical" style={{ width: "100%" }}>
        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please input the title!" }]}>
          <Input
            style={{ width: "100%", backgroundColor:"#262626", borderColor:"#333333", color:"#F2F2F2" }}
            placeholder="Ex. Brush your teeth"
          />
        </Form.Item>

        <Form.Item label="Color" rules={[{ required: true, message: "Please select a color!" }]}>
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
                  onClick={() => setSelectedColor(color.name)}
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
            onClick={() => form.submit()}
            size="small"
            alignment="center"
            padding="30px 0"
            width="100%"
            label="Add Task"
            backgroundColor="#1E6F9F"
            isViewMode={false}
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
