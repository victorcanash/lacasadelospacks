import type { FormatText, LocalizedText } from '@core/types/texts';

export type LandingItemConfig = {
  name: {
    en: string,
    es: string,
    current: string,
  },
  price: number,
  realPrice: number,
  image: string,
};

export type LandingConfig = {
  id: number,
  path: string,
  metas: {
    title: string,
  },
  name: {
    en: string,
    es: string,
    current: string,
  },
  comment: FormatText,
  images: string[],
  alt: string,
  product?: {
    selectInputTexts?: {
      label: FormatText,
      content?: FormatText,
    },
    inventories: LandingItemConfig[],
  },
  packs?: {
    selectInputTexts?: {
      label: FormatText,
      content?: FormatText,
    },
    variations: LandingItemConfig[],
  },
};

export type Landing = {
  id: number,
  name: LocalizedText,
  description: LocalizedText,
  images: string[],
  products: Product[],
  packs: ProductPack[],
};

export type ProductCategory = {
  id: number,
  name: LocalizedText,
  description: LocalizedText,
};

export type Product = {
  id: number,
  landingId: number,
  categoryId: number,
  name: LocalizedText,
  description: LocalizedText,
  rating: string,
  reviewsCount: number,
  lowestPrice: number,
  lowestRealPrice: number,
  inventories?: ProductInventory[],
  discounts?: ProductDiscount[],
  activeDiscount?: ProductDiscount,
};

export type ProductPack = {
  id: number,
  landingId: number,
  name: LocalizedText,
  description: LocalizedText,
  price: number,
  quantity: number,
  image?: string,
  originalPrice: number,
  discountPercent: number,
  inventories: ProductInventory[],
  inventoriesIds: number[],
};

export type ProductInventory = {
  id: number,
  productId: number,
  sku: string,
  name: LocalizedText,
  description: LocalizedText,
  price: number,
  quantity: number,
  image?: string,
  realPrice: number,
  bigbuy: {
    id: string,
    name: string,
    description: string,
    price: number,
    quantity: number,
  },
  product: Product,
};

export type ProductDiscount = {
  id: number,
  productId: number,
  name: LocalizedText,
  description: LocalizedText,
  discountPercent: number,
  active: boolean,
};

export type ProductReview = {
  id: number,
  createdAt: Date,
  userId?: number,
  guestUserId?: number,
  productId: number,
  rating: number,
  title: string,
  description: string,
  email: string,
  publicName: string,
  imageUrl?: string,
  product: Product,
};

export type CreateProductReview = {
  relatedProduct: number,
  rating: number,
  title: string,
  description: string,
  email: string,
  publicName: string,
};

export type ListProductReviews = {
  reviews: ProductReview[],
  totalPages: number,
  currentPage: number,
};
