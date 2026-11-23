import classes from './participants-toolbar.module.css';
import { ChevronDown, Search } from 'lucide-react';
import { Dropdown, type DropdownItem } from './dropdown';
import {
  roleLabels,
  roleOrder,
  type ParticipantRole,
} from '@/entities/participant';

interface ParticipantsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  role: ParticipantRole | null;
  onRoleChange: (role: ParticipantRole | null) => void;
  group: string | null;
  onGroupChange: (group: string | null) => void;
  groups: string[];
}

export function ParticipantsToolbar({
  search,
  onSearchChange,
  role,
  onRoleChange,
  group,
  onGroupChange,
  groups,
}: ParticipantsToolbarProps) {
  const roleItems: DropdownItem[] = [
    {
      label: 'Все роли',
      checked: role === null,
      onSelect: () => onRoleChange(null),
    },
    ...roleOrder.map((item) => ({
      label: roleLabels[item],
      checked: role === item,
      onSelect: () => onRoleChange(item),
    })),
  ];

  const groupItems: DropdownItem[] = [
    {
      label: 'Все группы',
      checked: group === null,
      onSelect: () => onGroupChange(null),
    },
    ...groups.map((item) => ({
      label: item,
      checked: group === item,
      onSelect: () => onGroupChange(item),
    })),
  ];

  return (
    <div className={classes.toolbar}>
      <span className={classes.title}>Все участники</span>

      <div className={classes.filters}>
        <div className={classes.search}>
          <Search size={14} className={classes.searchIcon} />
          <input
            className={classes.searchInput}
            placeholder="Найти"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        <Dropdown
          className={classes.selectRoot}
          triggerClassName={classes.select}
          trigger={
            <>
              <span className={classes.selectValue}>
                {role ? roleLabels[role] : 'Роль'}
              </span>
              <ChevronDown size={16} className={classes.chevron} />
            </>
          }
          items={roleItems}
        />

        <Dropdown
          className={classes.selectRoot}
          triggerClassName={classes.select}
          trigger={
            <>
              <span className={classes.selectValue}>{group ?? 'Группа'}</span>
              <ChevronDown size={16} className={classes.chevron} />
            </>
          }
          items={groupItems}
        />
      </div>
    </div>
  );
}
