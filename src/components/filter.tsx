import { useNavigate, useSearch } from '@tanstack/react-router';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './dropdown';

export function Filter() {
  const search = useSearch({ from: '/(home)/_layout' });
  const navigate = useNavigate();

  function onSetStatus(checked: boolean, value: 'draft' | 'pending' | 'paid') {
    navigate({
      to: '/',
      search: (prev) => {
        if (checked) {
          return {
            ...prev,
            status: [...(prev.status || []), value],
          };
        }

        return {
          ...prev,
          status: [...(prev.status || []).filter((s) => s !== value)],
        };
      },
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Filter</DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuCheckboxItem
          checked={search.status.includes('draft')}
          onCheckedChange={(checked) => onSetStatus(checked, 'draft')}>
          Draft
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={search.status.includes('pending')}
          onCheckedChange={(checked) => onSetStatus(checked, 'pending')}>
          Pending
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={search.status.includes('paid')}
          onCheckedChange={(checked) => onSetStatus(checked, 'paid')}>
          Status
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
