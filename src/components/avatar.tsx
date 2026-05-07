import * as React from 'react';
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
import { cn } from '@/lib/utils';

interface AvatarProps extends React.ComponentProps<'img'> {
  profileImage: string | null;
  seed: string;
}

export function Avatar({ profileImage, seed, className, ...props }: AvatarProps) {
  const avatar = React.useMemo(
    () =>
      createAvatar(initials, {
        seed,
        radius: 50,
        scale: 75,
      }).toDataUri(),
    [seed],
  );

  return (
    <img
      src={profileImage ? profileImage : avatar}
      alt="Avatar"
      className={cn('size-10 rounded-full', className)}
      {...props}
    />
  );
}
