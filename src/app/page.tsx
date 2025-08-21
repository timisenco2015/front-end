"use client";

import { Flex, Button, Row, Space, Radio, Avatar, Divider, Popconfirm, message } from "antd";
import { useState, useEffect } from 'react';
import { getTasks, deleteTasks, updateTask } from '@/app/service/taskService'; // assuming updateTask exists
import { useRouter } from "next/navigation";
import { DeleteOutlined } from '@ant-design/icons';
import TaskButton from './base/TaskButton';

type Task = {
  id: number;
  title: string;
  status?: string;
  color?: string;
};

export default function Home() {
  const router = useRouter();
  const [tasksCompletedCount, setTasksCompletedCount] = useState<number>(0);
  const [tasksCount, setTasksCount] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[] | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks();
    if (Array.isArray(data)) {
      const completedCount = data.filter((task: Task) => task.status === "Completed").length;
      setTasksCompletedCount(completedCount);
      setTasksCount(data.length);
      setTasks(data);
    }
  };

  const handleNewTaskClick = () => {
    router.push('/task/add');
  };

  const handleViewTaskClick = (taskId: number) => {
    router.push(`/task/view/${taskId}`);
  };

  const handleDeleteTaskClick = (taskId: number) => {
    deleteTasks(taskId)
      .then(() => {
        message.success("Delete Sucessful");
        loadTasks()})
        .catch((error) => {
          console.error(`Error deleting task. Contact admin with this Session Id: ${ localStorage.getItem("requestId")}`, error);
        message.error(`Error deleting task. Contact admin with this Session Id: ${ localStorage.getItem("requestId")}`, error);
      });
  };

  const handleToggleTaskCompletion = (taskId: number) => {
    const taskToUpdate = tasks?.find(t => t.id === taskId);
    if (!taskToUpdate) return;

    const updatedStatus = taskToUpdate.status === "Completed" ? "Not Completed" : "Completed";
    updateTask(taskId, { ...taskToUpdate, status: updatedStatus })
      .then(() => loadTasks())
       .catch((error) => {
          console.error(`Error updating task. Contact admin with this Session Id: ${ localStorage.getItem("requestId")}`, error);
        message.error(`Error updating task. Contact admin with this Session Id: ${ localStorage.getItem("requestId")}`, error);
      });;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "80%", margin: "0 auto" }}>
      
      <TaskButton
        onClick={handleNewTaskClick}
        size="small"
        alignment="center"
        padding="30px 0"
        width="100%"
        backgroundColor="#1E6F9F"
        label="New Task"
        isViewMode={false}
      />

      <Flex justify={"space-between"} style={{ width: "100%" }} >
        <Row>
          <Space>
            <p style={{ color: "#4EA8DE" }}>Tasks</p>
            <Avatar style={{ backgroundColor: "#87d068" }} size="small">{tasksCount}</Avatar>
          </Space>
        </Row>
        <Row>
          <Space>
            <p style={{ color: "#8284FA" }}>Completed</p>
            <Button size="small" style={{ borderColor:"#333333", backgroundColor:"#333333", color:"#ffffff" }}>
              {tasksCompletedCount} of {tasksCount}
            </Button>
          </Space>
        </Row>
      </Flex>

      {tasks && tasks.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", cursor:"pointer" }}>
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#262626",
                borderRadius: "10px",
                padding: "8px 16px",
                
              }}
              
            >
              <Radio
                checked={task.status === "Completed"}
                onChange={() => handleToggleTaskCompletion(task.id)}
                style={{ accentColor: "red", color: "red", padding: "4px 8px" }}
              />

              <div style={{ color: "#F2F2F2", flex: 1, margin: "0 16px", textAlign: "center" }} onClick={() => handleViewTaskClick(task.id)}>
                {task.title} — Status: {task.status}
              </div>
                <Popconfirm
  title="Delete the task"
  description="Are you sure to delete this task?"
  onConfirm={() => handleDeleteTaskClick(task.id)} // replace 123 with your task id
  onCancel={()=>{message.info("Task not deleted");;}}
  okText="Yes"
  cancelText="No"
>
  <DeleteOutlined
                style={{ color: "#808080", cursor: "pointer" }}
              />
</Popconfirm>
              
            </div>
          ))}
        </div>
      ) : (
        <>
          <Divider style={{ backgroundColor:"rgba(255, 255, 255, 0.5)" }}/>
          <img
            src="/Clipboard.png"
            alt="Logo"
            style={{ height: "40px", width:"40px" }}
          />
          <div style={{ textAlign: "center", color: "#ffffff" }}>
            <p>You don't have any tasks registered yet.</p>
            <p>Create tasks and organize your to-do items.</p>
          </div>
        </>
      )}
    </div>
  );
}
