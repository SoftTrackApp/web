import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/board')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/board"!</div>
}
