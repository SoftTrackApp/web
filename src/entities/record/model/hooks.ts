import { useQuery } from '@tanstack/react-query';
import { RecordApi } from '../api';

export function useRecords(receiverId: string) {
  return useQuery({
    queryKey: ['records'],
    queryFn: () => RecordApi.fetchRecords(receiverId),
  });
}
