import { RoadTrip } from '../../types/roadTrip.types';
import { Button, Drawer, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import roadTripData from '../../asset/data.json';
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
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(roadTripData[0])
              .map(((key) =>
                  <TableCell key={key}>{key}</TableCell>
              ))
            }
            <TableCell>View Route</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data) =>
            <TableRow key={data.dayNumber} selected={activeDay === data.dayNumber}>
              {Object.entries(data)
                .map(([key, value], index) =>
                  <TableCell key={`${value}.${index}`} >
                    {value || '-'}
                  </TableCell>
                )
              }
              <TableCell>
                <Button
                  sx={{whiteSpace: 'nowrap'}}
                  onClick={() => {
                   onDayButtonClick(data.dayNumber);
                  }}
                  startIcon={<DirectionsIcon />}
                  variant="outlined"
                >
                  View route
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Drawer>
  </React.Fragment>
}

export default TripOverview;