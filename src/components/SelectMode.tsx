import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AIMode } from '@/types/common';
import { SelectLabel } from '@radix-ui/react-select';

interface Props {
  onChange?: (value: AIMode) => void;
  defaultValue?: string;
}

export function SelectMode({ onChange, defaultValue }: Props) {
  return (
    <Select defaultValue={defaultValue} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select mode" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select mode</SelectLabel>
          {Object.values(AIMode).map((mode) => (
            <SelectItem key={mode} value={mode}>
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
