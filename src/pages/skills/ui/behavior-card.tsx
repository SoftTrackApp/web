import classes from './behavior-card.module.css';
import { LayoutTemplate, Plus } from 'lucide-react';
import { DotsMenu } from './dots-menu';
import { TemplatesLibrary } from './templates-library';
import type { Behavior, Skill, SkillTemplate } from '../model/types';

interface BehaviorCardProps {
  behavior: Behavior;
  templates: SkillTemplate[];
  onEdit: () => void;
  onRemove: () => void;
  onSkillsChange: (skills: Skill[]) => void;
}

export function BehaviorCard({
  behavior,
  templates,
  onEdit,
  onRemove,
  onSkillsChange,
}: BehaviorCardProps) {
  const addSkill = (template: SkillTemplate) => {
    if (behavior.skills.some((skill) => skill.name === template.name)) return;

    onSkillsChange([...behavior.skills, { id: crypto.randomUUID(), name: template.name }]);
  };

  const removeSkill = (id: string) => {
    onSkillsChange(behavior.skills.filter((skill) => skill.id !== id));
  };

  return (
    <div className={classes.card}>
      <div className={classes.head}>
        <span className={classes.name}>{behavior.name}</span>

        <DotsMenu
          items={[
            { label: 'Отредактировать', onSelect: onEdit },
            { label: 'Удалить', onSelect: onRemove },
          ]}
        />
      </div>

      <div className={classes.addRow}>
        <TemplatesLibrary
          templates={templates}
          onSelect={addSkill}
          triggerClassName={classes.addButton}
          trigger={
            <>
              <span className={classes.addText}>
                <Plus size={16} strokeWidth={1.33} />
                Добавить soft skill
              </span>
              <LayoutTemplate size={16} />
            </>
          }
        />
      </div>

      <div className={classes.skills}>
        {behavior.skills.map((skill) => (
          <div key={skill.id} className={classes.skill}>
            <span className={classes.skillName}>{skill.name}</span>

            <DotsMenu
              className={classes.dots}
              items={[{ label: 'Удалить', onSelect: () => removeSkill(skill.id) }]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
