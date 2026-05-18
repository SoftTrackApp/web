import classes from './dragging-state.module.css';
import { Plus } from 'lucide-react';
import { Typography } from '@/shared/ui/typography';
import { useDroppable } from '@dnd-kit/react';

export function DraggingState() {
  const { ref } = useDroppable({ id: 'droppable' });
  
  return (
    <section className={classes.middleSection} ref={ref}>
      <div className={classes.suggestion}>
        <div className={classes.bigIcon}>
          <Plus size={64} />
        </div>

        <Typography variant="h3" className={classes.suggestionTitle}>
          Начните с выбора ученика
        </Typography>
      </div>
    </section>
  );
}
