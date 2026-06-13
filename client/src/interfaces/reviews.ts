import {Review, ReviewData} from '@/types/redux';

export interface ReviewTableProps {
  setSelectedReview: (data: any) => void;
  setIsInfoOpen: (data: any) => void;
  setIsConfirmationOpen: (data: any) => void;
}

export interface ReviewRowProps {
  review: Review;
  setSelectedReview: (data: any) => void;
  setIsInfoOpen: (data: any) => void;
  setIsConfirmationOpen: (data: any) => void;
}

export interface ReviewPayload {
  _id: string;
  payload: ReviewData;
}

export interface RatingStarProps {
  control?: any;
  rating?: number;
  readOnly?: boolean;
  width?: number;
}

export interface ReviewIdProps {
  reviewId: string;
}
