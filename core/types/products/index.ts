import type { FormatText, LocalizedText } from '@core/types/texts';
import { NavItem } from '@core/types/navigation';
import { Source } from '@core/types/multimedia';

export type ProductBannerConfig = {
  items: {
    contentText: FormatText,
    source: Source,
    button: NavItem,
  }[],
};

export type InventoryConfig = {
  categories: CategoryConfig[],
  landings: LandingConfig[],
};

export type CategoryConfig = {
  id: number,
  name: LocalizedText,
  image?: string,
};

export type LandingConfig = {
  id: number,
  path: string,
  metas: {
    title: string,
    imgsAlt: string,
  },
  comment: FormatText,
  images: string[],
  characteristics: {
    details: {
      text: FormatText,
      count: number,
    },
    includes: {
      text: FormatText,
      count: number,
    },
    dimensions: {
      text: FormatText,
      count: number,
      image?: string,
    },
  },
  product?: {
    name?: LocalizedText,
    selectInputTexts?: {
      label: FormatText,
      content?: FormatText,
    },
    inventories: LandingItemConfig[],
  },
  pack?: {
    name?: LocalizedText,
    selectInputTexts?: {
      label: FormatText,
      content?: FormatText,
    },
    variations: LandingItemConfig[],
  },
  bundle?: BundleConfig,
  tutorials?: LandingTutorialConfig[],
};

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

export type LandingTutorialConfig = {
  title?: FormatText,
  content: FormatText,
  button?: NavItem,
  source: Source,
};

export type BundleConfig = {
  landingId: number,
  firstItem: BundleItemConfig,
  secondItem?: BundleItemConfig,
};

export type BundleItemConfig = {
  landingId: number,
  image: string,
  name?: FormatText,
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
  image?: string,
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
  rating: string,
  reviewsCount: number,
  metaId?: string,
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
  metaId?: string,
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
  productId?: number,
  packId?: number,
  rating: number,
  title: string,
  description: string,
  email: string,
  publicName: string,
  imageUrl?: string,
  product?: Product,
  pack?: ProductPack,
};

export type CreateProductReview = {
  relatedProduct: string,
  rating: number,
  title: string,
  description: string,
  email: string,
  publicName: string,
};
