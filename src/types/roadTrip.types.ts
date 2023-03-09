export type RoadTripStop = {
 dayNumber: string;
 date: string;
 morningLocation: string;
 afternoonLocation: string;
 eveningLocation: string;
 time: string;
 distance: string;
 note: string
}

export type RoadTrip = Array<RoadTripStop>