// Mapping from category names to direct Supabase Storage URLs
const CATEGORY_IMAGE_MAP: Record<string, string> = {
  "Air Conditioners": "https://jrbmhkfhxsiovycymkoa.supabase.co/storage/v1/object/public/product-images/products/Air%20Conditioner.png",
  "Kitchen Appliances": "https://jrbmhkfhxsiovycymkoa.supabase.co/storage/v1/object/public/product-images/products/Kitchen%20Appliances.png",
  "Refrigerators": "https://jrbmhkfhxsiovycymkoa.supabase.co/storage/v1/object/public/product-images/products/Refrigerator.png",
  "Small Appliances": "https://jrbmhkfhxsiovycymkoa.supabase.co/storage/v1/object/public/product-images/products/Kitchen%20Appliances.png",
  "Televisions": "https://jrbmhkfhxsiovycymkoa.supabase.co/storage/v1/object/public/product-images/products/TV.png",
  "Washing Machines": "https://jrbmhkfhxsiovycymkoa.supabase.co/storage/v1/object/public/product-images/products/Washing%20Machine.png",
};

/**
 * Get the public URL for a category image from Supabase Storage
 * 
 * @param categoryName - The name of the category (e.g., "Air Conditioners")
 * @returns The public URL of the image, or null if not found
 */
export function getCategoryImageUrl(categoryName: string): string | null {
  return CATEGORY_IMAGE_MAP[categoryName] || null;
}

/**
 * Get category image URLs for multiple categories
 * @param categories - Array of categories with name property
 * @returns Map of category names to image URLs
 */
export async function getCategoryImageUrls(
  categories: Array<{ name: string }>
): Promise<Record<string, string | null>> {
  const imageMap: Record<string, string | null> = {};

  for (const category of categories) {
    imageMap[category.name] = getCategoryImageUrl(category.name);
  }

  return imageMap;
}
