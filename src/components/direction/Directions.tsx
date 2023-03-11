import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

type Direction = {
  dayNumber: string,
  morningLocation: string,
  afternoonLocation?:string;
  eveningLocation: string,
}

type DirectionProps = {
  data: Array<Direction>
}

function Directions({ data } :DirectionProps) {
  const directionsRenderer = useRef<google.maps.DirectionsRenderer>()
  const cachedDirections = useRef(new Map<string, google.maps.DirectionsResult>())
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)

  const {dayNumber: startDayNumber, morningLocation: origin = ''} = useMemo<Partial<Direction>>(() => data.at(0) ?? {}, [data]);
  const {dayNumber: endDayNumber, eveningLocation: destination = ''  } = useMemo<Partial<Direction>>(() => data.at(data.length -1) ?? {}, [data]);

  const id = useMemo(() => `${startDayNumber}.${endDayNumber}`, [startDayNumber, endDayNumber]);
  const waypoints = useMemo(() => data.reduce((accumulator, { afternoonLocation, eveningLocation}) => [
    ...accumulator,
    ...(afternoonLocation ? afternoonLocation.split('|').map((location) => ({ location, stopover: false })) : []),
    { location: eveningLocation, }
  ].filter(Boolean)  as Array<google.maps.DirectionsWaypoint>, [] as Array<google.maps.DirectionsWaypoint>), [data])

  const onDirectionsCallback = useCallback((
    response: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if(status === 'OK' && response !== null) {
      cachedDirections.current.set(id, response)
      setDirections(response)
    } else {
      console.log({origin, destination}, status, response );
    }
  }, [destination, id, origin]);

  const onDirectionsRendererCallback = useCallback((renderer: google.maps.DirectionsRenderer) => {
    directionsRenderer.current= renderer;
  }, [])

  useEffect(() => {
    setDirections(cachedDirections.current.get(id) ?? null);
  }, [data, id])


  if(directions) {
    return (
      <DirectionsRenderer
        options={{ directions }}
        onLoad={onDirectionsRendererCallback}
      />
    )
  }

  return  (
    <DirectionsService
      options={{
        origin,
        destination,
        waypoints,
        travelMode: 'DRIVING' as google.maps.TravelMode,
        unitSystem: google.maps.UnitSystem.METRIC,
      }}
      callback={onDirectionsCallback}
    />
  )
}

export default Directions;
