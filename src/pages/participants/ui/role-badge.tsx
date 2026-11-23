import classes from './role-badge.module.css';
import { Tag } from '@/shared/ui/tag/tag';
import { roleLabels, roleTones, type ParticipantRole } from '@/entities/participant';

interface RoleBadgeProps {
  role: ParticipantRole;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <Tag tone={roleTones[role]} className={classes.badge}>
      {roleLabels[role]}
    </Tag>
  );
}
