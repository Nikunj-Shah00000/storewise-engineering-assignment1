// src/components/TaskModal.jsx
import { useState, useEffect } from 'react';
import { Modal, TextInput, Textarea, Select, Button, Group, Stack } from '@mantine/core';
import { modals } from '@mantine/modals';

const TaskModal = ({ opened, onClose, task, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'pending',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name || '',
        description: task.description || '',
        status: task.status || 'pending',
      });
    } else {
      setFormData({
        name: '',
        description: '',
        status: 'pending',
      });
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      onSave({
        ...task,
        ...formData,
      });
    }
    onClose();
  };

  const handleDelete = () => {
    modals.openConfirmModal({
      title: 'Delete Task',
      children: 'Are you sure you want to delete this task? This action cannot be undone.',
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        onDelete(task.id);
        onClose();
      },
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={task ? 'Edit Task' : 'Create Task'}
      size="lg"
      centered
    >
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Task Name"
            placeholder="Enter task name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          
          <Textarea
            label="Description"
            placeholder="Enter task description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            minRows={4}
          />
          
          <Select
            label="Status"
            value={formData.status}
            onChange={(value) => setFormData({ ...formData, status: value })}
            data={[
              { value: 'pending', label: 'Pending' },
              { value: 'in-progress', label: 'In Progress' },
              { value: 'complete', label: 'Complete' },
            ]}
          />
          
          <Group justify="space-between" mt="md">
            {task && (
              <Button color="red" onClick={handleDelete}>
                Delete
              </Button>
            )}
            <Group>
              <Button variant="light" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" color="blue">
                {task ? 'Save Changes' : 'Create Task'}
              </Button>
            </Group>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default TaskModal;