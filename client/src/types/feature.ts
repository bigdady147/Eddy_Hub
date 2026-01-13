export interface Feature {
  _id: string;
  name: string;
  key: string;
  description?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface FeatureCardData {
  title: string;
  description: string;
  icon: string;
  key: string;
  isLocked: boolean;
  route?: string;
}
