import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/manage/skills')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/manage/skills"!</div>
}
