"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import { edit, trash } from "@/app/utils/Icons";
import React from "react";
import styled from "styled-components";
import formatDate from "@/app/utils/formatDate";
import Modal from "../Modals/Modal";
import UpdateContent from "../Modals/UpdateContent";
import CreateContent from "../Modals/CreateContent";

interface Props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  id: string;
}

function TaskItem({ title, description, date, isCompleted, id }: Props) {
  const {
    theme,
    deleteTask,
    updateTask,
    openModal,
    modal,
    setModalData,
    modalData,
  } = useGlobalState();

  // Open modal and pass the current task data to it for editing
  const handleEdit = () => {
    const taskData = {
      title,
      description,
      date,
      isCompleted,
      id,
      important: false,
    }; // Default value for important
    setModalData(taskData);
    openModal();
  };

  return (
    <TaskItemStyled theme={theme}>
      {/* {modal && <Modal content={<UpdateContent />} />}  Modal content is UpdateContent only when modalData is set */}
      {modal && (
        <Modal
          content={modalData ? <UpdateContent /> : <CreateContent />} // Check modalData to decide content
        />
      )}
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{formatDate(date)}</p>
      <div className="task-footer">
        {isCompleted ? (
          <button
            className="completed"
            onClick={() => {
              const task = { id, isCompleted: !isCompleted };
              updateTask(task);
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className="incomplete"
            onClick={() => {
              const task = { id, isCompleted: !isCompleted };
              updateTask(task);
            }}
          >
            Incomplete
          </button>
        )}
        <button className="edit" onClick={handleEdit}>
          {edit}
        </button>
        <button
          className="delete"
          onClick={() => {
            deleteTask(id);
          }}
        >
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};
  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }

    .completed {
      background: ${(props) => props.theme.colorGreenDark} !important;
    }
  }
`;

export default TaskItem;
