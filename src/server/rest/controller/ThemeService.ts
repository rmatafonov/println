import { AppTheme } from '@/components/context/types';
import { UserTheme } from '@/server/db';

interface FindRequest {
  userId: number
}

interface CreateRequest {
  userId: number
  theme: AppTheme
}

export default class ThemeService {
  public find = ({ userId }: FindRequest) => UserTheme.findOne({
    where: { userId },
  });

  public createOrUpdate = (data: CreateRequest) =>
    UserTheme.upsert(
      data,
    )
}
