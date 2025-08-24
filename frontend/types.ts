export type Affiliate = {
  id: number;
  name: string;
};

export type Click = {
  campaignId: number;
  campaignName: string;
  clicks: number;
};

export type Conversion = {
  id: number;
  amount: number;
  currency: string;
  createdAt: string;
};
