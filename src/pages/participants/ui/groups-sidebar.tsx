import classes from './groups-sidebar.module.css';
import clsx from 'clsx';
import { MoreVertical, Plus, Search } from 'lucide-react';
import { Dropdown, type DropdownItem } from './dropdown';

interface GroupsSidebarProps {
  groups: string[];
  selectedGroup: string | null;
  search: string;
  onSearchChange: (value: string) => void;
  onSelect: (group: string | null) => void;
  onAddGroup?: () => void;
  onEditGroup?: (group: string) => void;
  onDeleteGroup?: (group: string) => void;
}

export function GroupsSidebar({
  groups,
  selectedGroup,
  search,
  onSearchChange,
  onSelect,
  onAddGroup,
  onEditGroup,
  onDeleteGroup,
}: GroupsSidebarProps) {
  const items = (group: string): DropdownItem[] => [
    { label: 'Отредактировать', onSelect: () => onEditGroup?.(group) },
    { label: 'Удалить', onSelect: () => onDeleteGroup?.(group) },
  ];

  return (
    <aside className={classes.sidebar}>
      <div className={classes.header}>
        <span className={classes.title}>Группы</span>
        <button className={classes.add} onClick={onAddGroup} aria-label="Добавить группу">
          <Plus size={20} />
        </button>
      </div>

      <div className={classes.search}>
        <Search size={14} className={classes.searchIcon} />
        <input
          className={classes.searchInput}
          placeholder="Найти группу"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className={classes.list}>
        <button
          className={clsx(classes.item, selectedGroup === null && classes.itemActive)}
          onClick={() => onSelect(null)}
        >
          Все участники
        </button>

        {groups.map((group) => (
          <div
            key={group}
            className={clsx(classes.item, selectedGroup === group && classes.itemActive)}
          >
            <button className={classes.itemName} onClick={() => onSelect(group)}>
              {group}
            </button>

            <Dropdown
              trigger={<MoreVertical size={16} />}
              items={items(group)}
              width={256}
              align="end"
              triggerClassName={classes.kebab}
            />
          </div>
        ))}
      </div>
    </aside>
  );
}
