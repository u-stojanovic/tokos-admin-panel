"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Category } from "@prisma/client";
import { getCategories } from "@/lib/actions/categoriesActions";

interface CategoriesComboBoxProps {
  currCategory: string;
  onChange: (category: string) => void;
}

export function CategoriesComboBox({
  currCategory,
  onChange,
}: CategoriesComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState(currCategory);
  const [newCategory, setNewCategory] = React.useState("");

  React.useEffect(() => {
    async function fetchCategories() {
      const response = await getCategories();
      setCategories(response);
    }
    fetchCategories();
  }, []);

  const handleSelect = (currentValue: string) => {
    if (currentValue === "new-category") {
      setSelectedCategory("");
    } else {
      setSelectedCategory(currentValue);
      onChange(currentValue);
      setOpen(false);
    }
  };

  const handleNewCategoryInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setNewCategory(value);
  };

  const handleAddNewCategory = () => {
    setSelectedCategory(newCategory);
    onChange(newCategory);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedCategory || "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category or type new one..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.name}
                  onSelect={() => handleSelect(category.name)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCategory === category.name
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandItem
              key="new-category"
              value="new-category"
              onSelect={() => handleSelect("new-category")}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedCategory === "new-category"
                    ? "opacity-100"
                    : "opacity-0",
                )}
              />
              {`Create new category`}
            </CommandItem>
          </CommandList>
        </Command>
        {selectedCategory === "" && (
          <div className="p-4 flex flex-col gap-2">
            <Input
              type="text"
              value={newCategory}
              onChange={handleNewCategoryInputChange}
              placeholder="Enter new category"
              className="w-full p-2 border rounded"
            />
            <Button onClick={handleAddNewCategory} size="default">
              Add new Category
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
