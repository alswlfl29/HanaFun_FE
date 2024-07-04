import { ResponsiveLine } from '@nivo/line';

export const LineChart = () => {
  const data = [
    {
      id: '매출액',
      data: [
        {
          x: 1,
          y: 187,
        },
        {
          x: 2,
          y: 199,
        },
        {
          x: 3,
          y: 258,
        },
        {
          x: 4,
          y: 155,
        },
        {
          x: 5,
          y: 167,
        },
        {
          x: 6,
          y: 139,
        },
        {
          x: 7,
          y: 100,
        },
        {
          x: 8,
          y: 211,
        },
        {
          x: 9,
          y: 23,
        },
        {
          x: 10,
          y: 0,
        },
        {
          x: 11,
          y: 283,
        },
        {
          x: 12,
          y: 152,
        },
      ],
    },
    {
      id: '순수익',
      data: [
        {
          x: 1,
          y: 218,
        },
        {
          x: 2,
          y: 89,
        },
        {
          x: 3,
          y: 276,
        },
        {
          x: 4,
          y: 101,
        },
        {
          x: 5,
          y: 40,
        },
        {
          x: 6,
          y: 280,
        },
        {
          x: 7,
          y: 40,
        },
        {
          x: 8,
          y: 124,
        },
        {
          x: 9,
          y: 250,
        },
        {
          x: 10,
          y: 23,
        },
        {
          x: 11,
          y: 295,
        },
        {
          x: 12,
          y: 124,
        },
      ],
    },
  ];
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 4, right: 12, bottom: 80, left: 36 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      yFormat=' >-.2f'
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
