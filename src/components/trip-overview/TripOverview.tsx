import { RoadTrip, RoadTripStop } from '../../types/roadTrip.types';
import { Button, Drawer, styled, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import DirectionsIcon from '@mui/icons-material/Directions';
import React, { MutableRefObject, useCallback, useImperativeHandle, useState } from 'react';

export type TripOverviewHandles = {
  toggleDrawer():void
}

type TripOverviewProps = {
  data: RoadTrip;
  activeDay?: string;
  onDayClick: (dayNumber:string) => void
  handlesRef: MutableRefObject<TripOverviewHandles | undefined>
}

const labels: Record<keyof RoadTripStop, string> = {
  dayNumber: 'Day',
  date: 'Date',
  morningLocation: 'Morning location',
  afternoonLocation: 'Through',
  eveningLocation: 'Evening location',
  distance: 'Drive distance (km)',
  time: 'Drive duration',
}

const StyledTableRow = styled(TableRow)`
  &:nth-child(odd) {
    background: ${p => p.theme.palette.grey.A100};
  }
  
  &:hover {
    background: ${p => p.theme.palette.grey.A200};
    position: relative;
    
    > td:first-of-type::before {
      content: '';
      inline-size: 4px;
      block-size: 100%;
      position: absolute;
      inset-block-start: 0;
      inset-inline-start: 0;
      background: ${p => p.theme.palette.secondary.main}
    }
  }
`

function TripOverview({ data, activeDay, onDayClick, handlesRef }: TripOverviewProps) {
  const [drawer, setDrawer] = useState(false);

  useImperativeHandle(handlesRef, () => ({
    toggleDrawer: () => {
      setDrawer(!drawer);
    }
  }));

  const onDayButtonClick = useCallback((dayNumber:string) => {
    onDayClick(dayNumber);
    setDrawer(false);
  }, [onDayClick, setDrawer])

  return <React.Fragment>
    <Drawer
      anchor='left'
      open={drawer}
      onClose={() => setDrawer(false)}
    >
      <Table sx={{ maxWidth: '80vw' }} stickyHeader>
        <TableHead>
          <TableRow>
            {Object.keys(data[0])
              .map(((key) =>
                  <TableCell
                    sx={{whiteSpace: 'nowrap' }}
                    key={key}>
                    {labels[key as keyof RoadTripStop]}
                  </TableCell>
              ))
            }
            <TableCell>View Route</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data) =>
            <StyledTableRow key={data.dayNumber} selected={activeDay === data.dayNumber}>
              {Object.entries(data)
                .map(([key, value = '-'], index) =>
                  <TableCell key={`${value}.${index}`} >
                    <Typography variant="caption">
                      {value}
                    </Typography>
                  </TableCell>
                )
              }
              <TableCell>
                {Number(data.distance.replace(' km', '')) > 0  && <Button
                  sx={{whiteSpace: 'nowrap'}}
                  onClick={() => {
                    onDayButtonClick(data.dayNumber);
                  }}
                  startIcon={<DirectionsIcon />}
                  variant="outlined"
                  color="secondary"
                >
                  View route
                </Button>}
              </TableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </Drawer>
  </React.Fragment>
}

export default TripOverview;