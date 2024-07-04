import { ResponsiveLine } from '@nivo/line';

export const LineChart = ({ data }: any) => {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 4, right: 12, bottom: 80, left: 16 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: false,
        reverse: false,
      }}
      yFormat=' >-'
      axisLeft={null}
      colors={{ scheme: 'pastel1' }}
      pointSize={4}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={4}
      pointBorderColor={{ from: 'serieColor' }}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateY: 50,
          itemWidth: 100,
          itemHeight: 20,
          itemsSpacing: 4,
          symbolSize: 20,
          symbolShape: 'circle',
          itemDirection: 'left-to-right',
          itemTextColor: '#777',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};
