type AreaId = number;
type TransportLinkId = number;

interface PeopleData {
  total: number;
  infected: number;
}

interface InfectionData {
  rateMultiplier: number;
}

interface Area {
  name: string;
  people: PeopleData;
  infection: InfectionData;
  subArea: AreaId[];
}

type TransportKind = 'path' | 'train' | 'car' | 'bus';

interface TransportLink {
  id: TransportLinkId;
  kind: TransportKind;
  people: PeopleData;
  link: [number, number];
  travelTime: number;
  infection: InfectionData;
}

interface AreaLayout {
  area: number;
  x: number;
  y: number;
}

interface Layout {
  areas: AreaLayout
}
