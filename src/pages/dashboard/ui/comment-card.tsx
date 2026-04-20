import type { Comment } from '../model/skill';
import classes from './comment-card.module.css';

export function CommentCard({ comment }: { comment: Comment }) {
  return (
    <div className={classes.comment}>
      <div className={classes.header}>
        <span className={classes.author}>{comment.author}</span>
        <span className={classes.date}>{new Date(comment.createdAt).toLocaleDateString()}</span>
      </div>

      <span className={classes.content}>{comment.content}</span>
    </div>
  );
}
