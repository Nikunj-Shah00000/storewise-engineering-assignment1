// src/components/Board.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, updateTask, cloneTask } from '../store/taskSlice';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { Button, Group, Select, Container, Title, Text, Loader } from '@mantine/core';
import { IconPlus, IconCopy } from '@tabler/icons-react';
import axios from 'axios';
import '../styles/Board.css';

const Board = () => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cloneTaskId, setCloneTaskId] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [dateLoading, setDateLoading] = useState(true);

  // Fetch current date from API
  useEffect(() => {
    const fetchDate = async () => {
      try {
        const response = await axios.get('https://10000--main--fastapi--admin.dev.storewise.in/');
        setCurrentDate(response.data.date || new Date().toLocaleDateString());
      } catch (error) {
        console.error('Error fetching date:', error);
        setCurrentDate(new Date().toLocaleDateString());
      } finally {
        setDateLoading(false);
      }
    };
    fetchDate();
  }, []);

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      name: '',
      description: '',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    dispatch(addTask(newTask));
    setSelectedTask(newTask);
    setModalOpen(true);
  };

  const handleCloneTask = () => {
    if (cloneTaskId) {
      dispatch(cloneTask(cloneTaskId));
      setCloneTaskId(null);
    }
  };

  const handleUpdateTask = (updatedTask) => {
    dispatch(updateTask(updatedTask));
    setModalOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
    if (selectedTask?.id === taskId) {
      setModalOpen(false);
      setSelectedTask(null);
    }
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const getTaskCountByStatus = () => {
    const counts = {
      pending: tasks.filter(t => t.status === 'pending').length,
      'in-progress': tasks.filter(t => t.status === 'in-progress').length,
      complete: tasks.filter(t => t.status === 'complete').length,
    };
    return counts;
  };

  const taskCounts = getTaskCountByStatus();

  return (
    <Container size="xl" className="board-container">
      <div className="header">
        <div className="header-content">
          <div>
            <Title order={1} className="title">Task Management Board</Title>
            <div className="date-display">
              {dateLoading ? <Loader size="xs" /> : <Text size="sm" c="dimmed">📅 {currentDate}</Text>}
            </div>
          </div>
          <Group>
            <Select
              placeholder="Select task to clone"
              data={tasks.map(task => ({ value: task.id.toString(), label: task.name || `Task ${task.id}` }))}
              value={cloneTaskId?.toString() || null}
              onChange={(value) => setCloneTaskId(value ? parseInt(value) : null)}
              clearable
              className="clone-select"
            />
            <Button 
              onClick={handleCloneTask} 
              variant="outline" 
              leftSection={<IconCopy size={16} />}
              disabled={!cloneTaskId}
            >
              Clone Task
            </Button>
            <Button 
              onClick={handleAddTask} 
              color="blue" 
              leftSection={<IconPlus size={16} />}
            >
              Create Task
            </Button>
          </Group>
        </div>
      </div>

      <div className="stats">
        <div className="stat-card pending">
          <span className="stat-label">Pending</span>
          <span className="stat-count">{taskCounts.pending}</span>
        </div>
        <div className="stat-card in-progress">
          <span className="stat-label">In Progress</span>
          <span className="stat-count">{taskCounts['in-progress']}</span>
        </div>
        <div className="stat-card complete">
          <span className="stat-label">Complete</span>
          <span className="stat-count">{taskCounts.complete}</span>
        </div>
        <div className="stat-card total">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-count">{tasks.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <Loader size="xl" />
        </div>
      ) : (
        <div className="tasks-grid">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onView={handleViewTask}
              onDelete={handleDeleteTask}
              onUpdate={handleUpdateTask}
            />
          ))}
          {tasks.length === 0 && (
            <div className="empty-state">
              <Text size="lg" c="dimmed" ta="center">No tasks yet. Click "Create Task" to get started!</Text>
            </div>
          )}
        </div>
      )}

      <TaskModal
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        onSave={handleUpdateTask}
        onDelete={handleDeleteTask}
      />
    </Container>
  );
};

export default Board;