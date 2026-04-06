import { Card, Text, Badge, Group, Button, ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash, IconEye } from '@tabler/icons-react';
import '../styles/TaskCard.css';

const TaskCard = ({ task, onView, onDelete, onUpdate }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'yellow';
      case 'in-progress': return 'blue';
      case 'complete': return 'green';
      default: return 'gray';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'in-progress': return 'In Progress';
      case 'complete': return 'Complete';
      default: return status;
    }
  };

  const handleStatusChange = (newStatus) => {
    onUpdate({ ...task, status: newStatus });
  };

  return (
    <Card className="task-card" shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section className="card-header" withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={500} size="lg" className="task-name" lineClamp={1}>
            {task.name || `Task ${task.id}`}
          </Text>
          <Badge color={getStatusColor(task.status)} variant="light">
            {getStatusLabel(task.status)}
          </Badge>
        </Group>
      </Card.Section>

      <Card.Section className="card-body" inheritPadding py="sm">
        <Text size="sm" c="dimmed" lineClamp={3} className="task-description">
          {task.description || 'No description provided'}
        </Text>
      </Card.Section>

      <Card.Section className="card-footer" withBorder inheritPadding py="xs">
        <div className="status-selector">
          <Text size="xs" fw={500} mb={4}>Update Status:</Text>
          <Group gap="xs">
            <Button
              size="compact-xs"
              variant={task.status === 'pending' ? 'filled' : 'light'}
              color="yellow"
              onClick={() => handleStatusChange('pending')}
            >
              Pending
            </Button>
            <Button
              size="compact-xs"
              variant={task.status === 'in-progress' ? 'filled' : 'light'}
              color="blue"
              onClick={() => handleStatusChange('in-progress')}
            >
              In Progress
            </Button>
            <Button
              size="compact-xs"
              variant={task.status === 'complete' ? 'filled' : 'light'}
              color="green"
              onClick={() => handleStatusChange('complete')}
            >
              Complete
            </Button>
          </Group>
        </div>
        
        <Group justify="flex-end" mt="md">
          <ActionIcon variant="subtle" color="blue" onClick={() => onView(task)}>
            <IconEye size={18} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" onClick={() => onDelete(task.id)}>
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default TaskCard;