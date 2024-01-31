import { Grid, GridItem } from '@hope-ui/solid';
import { Component, JSX } from 'solid-js';

export enum GridItemSize {
  xsmol,
  smol,
  small,
  medium,
  long,
  xlong,
  xxlong,
  xxxlong,
  full,
}

interface IGridItemProps {
  colSpan: GridItemSize;
  rowSpan: GridItemSize;
  children: JSX.Element;
}

export const FormFieldGridCell: Component<IGridItemProps> = (props: IGridItemProps) => {
  const getSpanNumber = (grdSize: GridItemSize) => {
    if (grdSize == GridItemSize.xsmol) return 1;
    if (grdSize == GridItemSize.smol) return 2;
    if (grdSize == GridItemSize.small) return 3;
    if (grdSize == GridItemSize.medium) return 4;
    if (grdSize == GridItemSize.long) return 6;
    if (grdSize == GridItemSize.xlong) return 6;
    if (grdSize == GridItemSize.xxlong) return 8;
    if (grdSize == GridItemSize.xxxlong) return 10;
    if (grdSize == GridItemSize.full) return 12;
  };

  return (
    <GridItem
      colSpan={getSpanNumber(props.colSpan)}
      rowSpan={getSpanNumber(props.rowSpan)}
      data-colspan={getSpanNumber(props.colSpan)}
      data-rowspan={getSpanNumber(props.rowSpan)}
    >
      {props.children}
    </GridItem>
  );
};

interface IGridProps {
  children: JSX.Element;
}

export const FormFieldGrid: Component<IGridProps> = (props: IGridProps) => {
  return (
    <Grid
      templateColumns={{
        '@initial': 'repeat(2, 1fr)',
        '@xl': 'repeat(12, 1fr)',
        '@lg': 'repeat(12, 1fr)',
        '@md': 'repeat(12, 1fr)',
        '@sm': 'repeat(2, 1fr)',
      }}
      gap="$6"
    >
      {props.children}
    </Grid>
  );
};
