import classes from './participants-page.module.css';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  useGroupOptions,
  useParticipants,
  type Participant,
  type ParticipantRole,
} from '@/entities/participant';
import { AddParticipantDialog } from '@/features/participants';
import { GroupsSidebar } from './groups-sidebar';
import { ParticipantsToolbar } from './participants-toolbar';
import { ParticipantsTable } from './participants-table';
import { ParticipantsSkeleton } from './participants-skeleton';

export function ParticipantsPage() {
  const participants = useParticipants();
  const groupOptions = useGroupOptions();

  const [sidebarSearch, setSidebarSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState<ParticipantRole | null>(null);
  const [group, setGroup] = useState<string | null>(null);
  const [editing, setEditing] = useState<Participant | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const groups = groupOptions.data ?? [];
  const list = participants.data ?? [];

  const visibleGroups = groups.filter((item) =>
    item.toLowerCase().includes(sidebarSearch.trim().toLowerCase()),
  );

  const filtered = list.filter((participant) => {
    const query = search.trim().toLowerCase();
    const fullName =
      `${participant.firstName} ${participant.lastName}`.toLowerCase();

    if (query && !fullName.includes(query)) return false;
    if (role && participant.role !== role) return false;
    if (selectedGroup && !participant.groups.includes(selectedGroup)) {
      return false;
    }
    if (group && !participant.groups.includes(group)) return false;

    return true;
  });

  const openAdd = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  const openEdit = (participant: Participant) => {
    setEditing(participant);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setEditing(null);
    setDialogOpen(false);
  };

  return (
    <div className={classes.page}>
      <div className={classes.head}>
        <h1 className={classes.title}>Управление участниками</h1>
      </div>

      <div className={classes.body}>
        <GroupsSidebar
          groups={visibleGroups}
          selectedGroup={selectedGroup}
          search={sidebarSearch}
          onSearchChange={setSidebarSearch}
          onSelect={setSelectedGroup}
        />

        <div className={classes.content}>
          <ParticipantsToolbar
            search={search}
            onSearchChange={setSearch}
            role={role}
            onRoleChange={setRole}
            group={group}
            onGroupChange={setGroup}
            groups={groups}
          />

          <div className={classes.table}>
            {participants.isLoading ? (
              <ParticipantsSkeleton />
            ) : (
              <ParticipantsTable
                participants={filtered}
                onEdit={openEdit}
                onDelete={openEdit}
              />
            )}
          </div>

          {participants.isError && (
            <span className={classes.error}>Не удалось загрузить участников</span>
          )}

          <button className={classes.addUser} onClick={openAdd}>
            <Plus size={16} />
            Добавить пользователя
          </button>
        </div>
      </div>

      {dialogOpen && (
        <AddParticipantDialog
          onClose={closeDialog}
          initialName={editing?.firstName}
          initialSurname={editing?.lastName}
          initialRole={editing?.role}
        />
      )}
    </div>
  );
}
