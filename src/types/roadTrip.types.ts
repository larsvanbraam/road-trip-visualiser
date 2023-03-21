export type RoadTripStop = {
  dayNumber: string;
  date: string;
  morningLocation: string;
  afternoonLocation: string;
  eveningLocation: string;
  time: string;
  distance: string;
};

export type RoadTrip = Array<RoadTripStop>;
