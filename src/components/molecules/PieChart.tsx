import { ResponsivePie } from '@nivo/pie';

interface IProps {
  data: MonthRevenueType[] | undefined;
}

export const PieChart = ({ data }: IProps) => {
  const chartData =
    data?.map((item) => ({
      id: item.title,
      value: item.revenue,
    })) || [];

  return (
    <ResponsivePie
      data={chartData}
      margin={{ top: 10, right: 8, bottom: 8, left: 8 }}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: 'pastel1' }}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      enableArcLinkLabels={false}
      arcLinkLabelsTextColor={{ from: 'color' }}
      arcLinkLabelsColor={{ from: 'color' }}
      enableArcLabels={false}
    />
  );
};
