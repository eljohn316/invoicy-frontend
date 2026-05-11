import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import type { User } from '@/features/auth/types';

type UpdateProfilePhotoProps = {
  user: User;
};

export function UpdateProfilePhoto({ user }: UpdateProfilePhotoProps) {
  return (
    <div className="space-y-8">
      <p className="text-bunker-900 font-semibold">Profile photo</p>
      <div className="flex items-center justify-between">
        <Avatar
          profileImage={user.profileImage}
          seed={user.fullName}
          className="size-12 flex-none"
        />
        <Button variant="primary">Update</Button>
      </div>
    </div>
  );
}
