import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/manage/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/manage/users"!</div>
}
