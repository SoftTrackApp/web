import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/manage/skills')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/manage/skills"!</div>
}
