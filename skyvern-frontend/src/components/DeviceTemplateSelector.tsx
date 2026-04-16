import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/util/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const DEVICE_TEMPLATE_OPTIONS: Array<{
  value: string | null;
  label: string;
  description: string;
}> = [
  {
    value: null,
    label: "Desktop (Default)",
    description: "Standard desktop browser",
  },
  {
    value: "iPhone 14",
    label: "iPhone 14",
    description: "390 × 844 · iOS Safari",
  },
  {
    value: "Pixel 7",
    label: "Android (Pixel 7)",
    description: "412 × 915 · Android Chrome",
  },
  {
    value: "iPad Pro 11",
    label: "iPad Pro 11",
    description: "834 × 1194 · iOS Safari",
  },
];

interface DeviceTemplateSelectorProps {
  value: string | null;
  onChange: (value: string | null) => void;
  className?: string;
}

function DeviceTemplateSelector({
  value,
  onChange,
  className,
}: DeviceTemplateSelectorProps) {
  const [open, setOpen] = React.useState(false);

  const selected =
    DEVICE_TEMPLATE_OPTIONS.find((opt) => opt.value === value) ??
    DEVICE_TEMPLATE_OPTIONS[0]!;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-48 justify-between", className)}
        >
          <span className="truncate">{selected.label}</span>
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <Command>
          <CommandList>
            <CommandGroup>
              {DEVICE_TEMPLATE_OPTIONS.map((option) => (
                <CommandItem
                  key={option.label}
                  value={option.label}
                  onSelect={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className="flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm font-medium">{option.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {option.description}
                    </div>
                  </div>
                  {selected.value === option.value && (
                    <CheckIcon className="h-4 w-4 shrink-0" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { DeviceTemplateSelector };
