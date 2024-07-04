export interface revenueApi {
  getTotal(): Promise<BaseResponseType<TotalType>>;

  getMonthRevenue(
    year: number,
    month: number
  ): Promise<BaseResponseType<MonthRevenueType[]>>;

  getLessonRevenue(
    year: number,
    lessonId: number
  ): Promise<BaseResponseType<LessonRevenue[]>>;

  updatePrice(reqData: PriceReqType): Promise<BaseResponseType<PriceType>>;
}
