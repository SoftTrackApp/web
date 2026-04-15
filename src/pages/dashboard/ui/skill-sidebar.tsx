import { X } from 'lucide-react';
import type { Skill } from '../model/skill';
import classes from './skill-sidebar.module.css';

interface SkillSidebarProps {
  skill: Skill;
  onClose?: () => void;
}

export function SkillSidebar({ skill, onClose }: SkillSidebarProps) {
  return (
    <div className={classes.sidebar}>
      <div className={classes.header}>
        <h1 className={classes.title}>{skill.title}</h1>
        <X className={classes.close} onClick={onClose} />
      </div>
    </div>
  );
}
