// Type declarations 
type AreaId = number;
type TransportLinkId = number;
type PersonId = number;
type OrganisationId = number;

// The different kinds of transport between areas 
type TransportKind = 'path' | 'train' | 'car' | 'bus';

// The different kinds of organisations in an area
type OrganisationKind = 'school' | 'hospitality' | 'business' | 'medical'

// Holds the data for people in the area, including how many there are in total, the amount infected and a list of ids which relate to the people
interface PeopleData {
  total: number;
  infected: number;
  ids: PersonId[];
}

// Holds a value for the infection rate of a particular area or transport link. I.E travelling in a train has a higher risk of catching the infection than in a car
interface InfectionData {
  rateMultiplier: number;
}

// Contains the information about different areas on the map including any "subareas" which can be used for granularity.
interface Area {
  name: string;
  people: PeopleData;
  infection: InfectionData;
  subArea: AreaId[];
  organisations: OrganisationId[];
}

// The links between areas which includes the method of transport, the time it takes to travel, the infection rates and the people who are travelling
interface TransportLink {
  id: TransportLinkId;
  kind: TransportKind;
  people: PeopleData;
  link: [number, number];
  travelTime: number;
  infection: InfectionData;
}

// Used for the graphical representation of the areas, abstracted in a way which means grid based approaches and node based approaches work
interface AreaLayout {
  area: number;
  x: number;
  y: number;
}

// The base structure which contains all the data for the map
interface Layout {
  areas: AreaLayout[];
}

// Keeps track of who people have been in contact with and when
interface Contact {
  people: [PersonId, PersonId];
  timestep: number;
}

// An individual person with an id and a list of contacts which can be used for contact tracing
interface Person {
  id : PersonId;
  contact: Contact[];
}

// Organasations are places which people attend to regularly and can be restricted and shut down by the WHO etc
// Also can potentially add more testing facilities/vaccination centres via the WHO
interface Organisation {
  id: OrganisationId;
  kind: OrganisationKind;
  people: PeopleData;
  infection: InfectionData;
}