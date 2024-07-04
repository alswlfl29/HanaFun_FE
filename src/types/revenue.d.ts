interface TotalType {
  totalRevenue: number;
}

interface MonthRevenueType {
  lessonId: number;
  title: string;
  revenue: number;
}

interface LessonRevenue {
  month: number;
  lessonId: number;
  title: string;
  revenue: number;
  materialPrice: number;
  rentalPrice: number;
  etcPrice: number;
}

interface PriceReqType {
  lessonId: number;
  year: number;
  month: number;
  materialPrice: number;
  rentalPrice: number;
  etcPrice: number;
}

interface PriceType {
  lessonId: number;
  materialPrice: number;
  rentalPrice: number;
  etcPrice: number;
}
