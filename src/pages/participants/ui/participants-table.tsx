import classes from './participants-table.module.css';
import { MoreVertical } from 'lucide-react';
import { Dropdown } from './dropdown';
import { RoleBadge } from './role-badge';
import type { Participant } from '@/entities/participant';

interface ParticipantsTableProps {
  participants: Participant[];
  onEdit: (participant: Participant) => void;
  onDelete: (participant: Participant) => void;
}

export function ParticipantsTable({
  participants,
  onEdit,
  onDelete,
}: ParticipantsTableProps) {
  return (
    <div className={classes.wrapper}>
      <table className={classes.table}>
        <colgroup>
          <col className={classes.colParticipant} />
          <col className={classes.colRole} />
          <col className={classes.colGroups} />
          <col className={classes.colActions} />
        </colgroup>

        <thead>
          <tr>
            <th className={classes.participantHead}>Участник</th>
            <th>Роль</th>
            <th>Группы</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {participants.length === 0 && (
            <tr>
              <td className={classes.emptyCell} colSpan={4}>
                Ничего не найдено
              </td>
            </tr>
          )}

          {participants.map((participant) => (
            <tr key={participant.id}>
              <td>
                <div className={classes.participant}>
                  <span className={classes.avatar} />
                  <span className={classes.name}>
                    {participant.firstName} {participant.lastName}
                  </span>
                </div>
              </td>

              <td>
                <RoleBadge role={participant.role} />
              </td>

              <td className={classes.groupsCell}>
                <div className={classes.groups}>
                  {participant.groups.map((group) => (
                    <span key={group} className={classes.group}>
                      {group}
                    </span>
                  ))}
                </div>
              </td>

              <td className={classes.actions}>
                <Dropdown
                  trigger={<MoreVertical size={16} />}
                  items={[
                    {
                      label: 'Отредактировать',
                      onSelect: () => onEdit(participant),
                    },
                    {
                      label: 'Удалить',
                      onSelect: () => onDelete(participant),
                    },
                  ]}
                  width={256}
                  align="end"
                  triggerClassName={classes.kebab}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
