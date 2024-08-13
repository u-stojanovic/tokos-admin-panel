"use client";

import { useFetchCategories } from "@/lib/hooks/category/useFetchCategories";
import ListCategories from "./ListCategories";
import ListCategoriesSkeleton from "./ListCategoriesSkeleton";

export default function Kategorije() {
  const { data: categories, isLoading } = useFetchCategories();

  if (!categories && isLoading) return <ListCategoriesSkeleton />;

  if (!categories) return <div>No Categories found</div>;

  return <ListCategories categories={categories as any} />;
}
