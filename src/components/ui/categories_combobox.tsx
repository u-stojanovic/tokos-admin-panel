"use client";

import React from "react";
import { ChevronsUpDown } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCategories } from "@/lib/actions/categoriesActions";
import { CategoryWithSubCategories } from "@/app/admin-panel/kategorije/ListCategories";
import { useFormContext } from "react-hook-form";
import { ProductFormInputs } from "@/app/admin-panel/proizvodi/new/form";

interface CategoriesComboBoxProps {
  currCategoryId?: number;
  currSubCategoryId?: number;
  onChange: (categoryId: number, subCategoryId: number | null) => void;
}

export function CategoriesComboBox({
  currCategoryId,
  currSubCategoryId,
  onChange,
}: CategoriesComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = React.useState<
    CategoryWithSubCategories[]
  >([]);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<
    number | undefined
  >(currCategoryId);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = React.useState<
    number | undefined | null
  >(currSubCategoryId);

  React.useEffect(() => {
    async function fetchCategories() {
      const response = await getCategories();
      setCategories(response);
    }
    fetchCategories();
  }, []);

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setSelectedSubCategoryId(null);
    onChange(categoryId, null);
    setOpen(false);
  };

  const handleSelectSubCategory = (
    categoryId: number,
    subCategoryId: number,
  ) => {
    setSelectedCategoryId(categoryId);
    setSelectedSubCategoryId(subCategoryId);
    onChange(categoryId, subCategoryId);
    setOpen(false);
  };

  const { getValues } = useFormContext<ProductFormInputs>();

  const presentCategoryValue = getValues("categoryId");
  const presentSubCategoryValue = getValues("subcategoryId");

  const selectedCategoryName = categories.find(
    (cat) => cat.id === presentCategoryValue,
  )?.name;

  const selectedSubCategoryName = categories
    .find((cat) =>
      cat.subCategory.some((sub) => sub.id === presentSubCategoryValue),
    )
    ?.subCategory.find((sub) => sub.id === presentSubCategoryValue)?.name;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          {selectedSubCategoryName ??
            selectedCategoryName ??
            "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
        <Command>
          <CommandInput
            placeholder="Search category or type new one..."
            className="px-4 py-2 border-b dark:border-gray-700"
          />
          <CommandList>
            <CommandEmpty className="py-2 text-center text-gray-500">
              No category found.
            </CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <DropdownMenu key={category.id}>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center w-full">
                      <CommandItem
                        className={`flex items-center w-full px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          selectedCategoryId === category.id &&
                          !selectedSubCategoryId
                            ? "bg-blue-100 dark:bg-blue-700"
                            : ""
                        }`}
                        onSelect={() => handleSelectCategory(category.id)}
                      >
                        <span className="flex-1 text-left">
                          {category.name}
                        </span>
                        {category.subCategory.length > 0 && (
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        )}
                      </CommandItem>
                    </div>
                  </DropdownMenuTrigger>
                  {category.subCategory.length > 0 && (
                    <DropdownMenuContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                      <DropdownMenuLabel className="px-4 py-2">
                        {category.name} Subcategories
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {category.subCategory.map((subCategory) => (
                        <DropdownMenuItem
                          key={subCategory.id}
                          className={`px-4 py-2 ${selectedSubCategoryId === subCategory.id ? "bg-blue-100 dark:bg-blue-700" : ""}`}
                          onClick={() =>
                            handleSelectSubCategory(category.id, subCategory.id)
                          }
                        >
                          {subCategory.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  )}
                </DropdownMenu>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
