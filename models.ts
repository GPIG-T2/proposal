/*

This document contains the full type references for all of the JSON structures
that are used for this interface. They are described using TypeScript, as this
is a language that strictly types JavaScript, which is the basis for JSON, making
it very close and almost exactly accurate.

Notes:
- In JS, and thus TS, integers and floats are considered the same type 'number'.
  To keep the validity of this document, we have to define these 2 types in
  terms of 'number'. To make it more readable, utility types are used to more
  concretely define what the exact type is, and to support annotations used for
  the generation of the JSON schemas.

- Properties suffixed with ? are optional, and are allowed to not appear within
  the JSON data if not necessary.
  For the purposes of the interface, implementations should consider these
  properies as either as missing entirely, or just set to null.

*/

//////////////////////// Utility definitions ////////////////////////

/**
 * @asType float
 */
type float = number;
/**
 * @asType integer
 */
type integer = number;

//////////////////////// ID Types ////////////////////////

type AreaId = integer;
type TransportLinkId = integer;
type PersonId = integer;
type OrganisationId = integer;
type RestrictionId = integer;

//////////////////////// Enums ////////////////////////

/**
 * The different kinds of transport between areas.
 */
type TransportKind =
  | "path" // Used for walking & cycling.
  | "train"
  | "car" // Can include taxis.
  | "bus"
  | "subway"
  | "tram"
  | "airplane";

/**
 * The different kinds of organisations in an area
 */
type OrganisationKind = "school" | "hospitality" | "retail" | "medical";

type RestrictionKind = "travel" | "organisation" | "lockdown";
type RestrictionStrictness = "none" | "mild" | "severe";

//////////////////////// JSON Structures ////////////////////////

/**
 * Holds the data for people in the area, including how many there are in total,
 * the amount infected and a list of ids which relate to the people.
 */
interface PeopleData {
  total: integer;
  infected: integer;
  ids: PersonId[];
}

/**
 * Holds a value for the infection rate of a particular area or transport link.
 * i.e. travelling in a train has a higher risk of catching the infection than in a car
 */
interface InfectionData {
  rateMultiplier: float;
}

/**
 * Contains the information about different areas on the map including any
 * 'subareas', which can be used for granularity.
 */
export interface Area {
  id: AreaId;
  name: string;
  people: PeopleData;
  infection: InfectionData;
  subArea: AreaId[];
  organisations: OrganisationId[];
  restrictionLevel: RestrictionStrictness;
}

/**
 * The links between areas which includes the method of transport, the time it
 * takes to travel, the infection rates and the people who are travelling.
 */
export interface TransportLink {
  id: TransportLinkId;
  kind: TransportKind;
  people: PeopleData;
  link: [AreaId, AreaId];
  travelTime: float;
  infection: InfectionData;
  restrictionLevel: RestrictionStrictness;
}

/**
 * Used for the graphical representation of the areas, abstracted in a way which
 * means grid based approaches and node based approaches work.
 */
interface AreaLayout {
  area: AreaId;
  x: float;
  y: float;
}

/**
 * The base structure which contains all the data for the map.
 */
export interface Layout {
  areas: AreaLayout[];
}

/**
 * Keeps track of who people have been in contact with and when.
 */
interface Contact {
  person: PersonId;
  timestep: integer;
}

/**
 * An individual person with an id and a list of contacts which can be used for
 * contact tracing.
 */
export interface Person {
  id: PersonId;
  contact: Contact[];
  age: integer;
  sex: integer;
}

/**
 * Organisations are places which people attend to regularly and can be
 * restricted and shut down by the WHO etc.
 *
 * Also can potentially add more testing facilities/vaccination centres via
 * the WHO.
 */
export interface Organisation {
  id: OrganisationId;
  kind: OrganisationKind;
  people: PeopleData;
  infection: InfectionData;
  restrictionLevel: RestrictionStrictness;
}

/**
 * Restrictions will dictate how the different areas are locked down.
 *
 * The arrays contain the parts of the simulation space that the restrictions
 * apply to. Overlapping parts should be resolved to the highest restriction
 * within the Virus model (for consistency in behaviour).
 */
export interface Restriction {
  id: RestrictionId;
  kind: RestrictionKind;
  strictness: RestrictionStrictness;

  areas: AreaId[];
  organisations: OrganisationId[];
  transportLinks: TransportLinkId[];
}
