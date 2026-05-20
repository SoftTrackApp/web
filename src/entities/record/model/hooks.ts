import { useQuery } from '@tanstack/react-query';
import { RecordApi } from '../api';

interface UseRecordsProps {
  receiverId: string;
  isMine?: boolean;
}

export function useRecords({ receiverId, isMine = false }: UseRecordsProps) {
  return useQuery({
    queryKey: ['records', receiverId],
    queryFn: () =>
      isMine ? RecordApi.fetchMyRecords(receiverId) : RecordApi.fetchRecords(receiverId),
  });
}
