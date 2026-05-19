import classes from './comment-card.module.css';

export function CommentCard({ comment }: { comment: string }) {
  return (
    <div className={classes.comment}>
      <span>{comment}</span>
    </div>
  );
}
