// Generated by Xata Codegen 0.29.5. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "community",
    columns: [
      { name: "profilePicUrl", type: "string" },
      { name: "approvalStatus", type: "int", notNull: true, defaultValue: "0" },
      { name: "discordWebhookId", type: "string", defaultValue: "" },
      {
        name: "profilePicFile",
        type: "file",
        file: { defaultPublicAccess: true },
      },
      { name: "name", type: "string", notNull: true, defaultValue: "" },
      { name: "bio", type: "string", notNull: true, defaultValue: "" },
      { name: "bioMediaUrls", type: "string", notNull: true, defaultValue: "" },
      { name: "tags", type: "string", notNull: true, defaultValue: "" },
      { name: "socials", type: "string", notNull: true, defaultValue: "" },
      {
        name: "contactDetails",
        type: "string",
        notNull: true,
        defaultValue: "",
      },
      {
        name: "bioMediaFiles",
        type: "file[]",
        "file[]": { defaultPublicAccess: true },
      },
      { name: "homeGalaxy", type: "string", notNull: true, defaultValue: "" },
      { name: "coordinates", type: "string", notNull: true, defaultValue: "" },
      {
        name: "anonymousUserGuid",
        type: "string",
        notNull: true,
        defaultValue: "",
      },
    ],
    revLinks: [{ column: "community", table: "communityBuilder" }],
  },
  {
    name: "builder",
    columns: [
      { name: "profilePicUrl", type: "string" },
      {
        name: "profilePicFile",
        type: "file",
        file: { defaultPublicAccess: true },
      },
      { name: "bio", type: "string", notNull: true, defaultValue: "" },
      { name: "platforms", type: "string", notNull: true, defaultValue: "" },
      {
        name: "buildTechniquesUsed",
        type: "string",
        notNull: true,
        defaultValue: "",
      },
      {
        name: "startedPlaying",
        type: "datetime",
        notNull: true,
        defaultValue: "2016-08-09T00:00:00.000Z",
      },
      { name: "labels", type: "string", notNull: true, defaultValue: "" },
      { name: "socials", type: "string", notNull: true, defaultValue: "" },
      {
        name: "contactDetails",
        type: "string",
        notNull: true,
        defaultValue: "",
      },
      { name: "approvalStatus", type: "int", notNull: true, defaultValue: "0" },
      {
        name: "discordWebhookId",
        type: "string",
        notNull: true,
        defaultValue: "",
      },
      { name: "name", type: "string", notNull: true, defaultValue: "" },
      {
        name: "anonymousUserGuid",
        type: "string",
        notNull: true,
        defaultValue: "",
      },
    ],
    revLinks: [
      { column: "builder", table: "communityBuilder" },
      { column: "builder", table: "planetBuildBuilder" },
    ],
  },
  {
    name: "communityBuilder",
    columns: [
      { name: "community", type: "link", link: { table: "community" } },
      { name: "builder", type: "link", link: { table: "builder" } },
    ],
  },
  {
    name: "planetBuild",
    columns: [
      { name: "name", type: "string", notNull: true, defaultValue: "" },
      { name: "mediaUrls", type: "string", notNull: true, defaultValue: "" },
      { name: "mediaFiles", type: "file[]" },
      { name: "galaxy", type: "string", notNull: true, defaultValue: "" },
      { name: "systemName", type: "string", notNull: true, defaultValue: "" },
      { name: "planetName", type: "string", notNull: true, defaultValue: "" },
      { name: "coordinates", type: "string", notNull: true, defaultValue: "" },
      {
        name: "buildTechniquesUsed",
        type: "string",
        notNull: true,
        defaultValue: "",
      },
      {
        name: "contactDetails",
        type: "string",
        notNull: true,
        defaultValue: "",
      },
      {
        name: "discordWebhookId",
        type: "string",
        notNull: true,
        defaultValue: "",
      },
      { name: "approvalStatus", type: "int", notNull: true, defaultValue: "0" },
      {
        name: "anonymousUserGuid",
        type: "string",
        notNull: true,
        defaultValue: "",
      },
    ],
    revLinks: [{ column: "planetBuild", table: "planetBuildBuilder" }],
  },
  {
    name: "planetBuildBuilder",
    columns: [
      { name: "planetBuild", type: "link", link: { table: "planetBuild" } },
      { name: "builder", type: "link", link: { table: "builder" } },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Community = InferredTypes["community"];
export type CommunityRecord = Community & XataRecord;

export type Builder = InferredTypes["builder"];
export type BuilderRecord = Builder & XataRecord;

export type CommunityBuilder = InferredTypes["communityBuilder"];
export type CommunityBuilderRecord = CommunityBuilder & XataRecord;

export type PlanetBuild = InferredTypes["planetBuild"];
export type PlanetBuildRecord = PlanetBuild & XataRecord;

export type PlanetBuildBuilder = InferredTypes["planetBuildBuilder"];
export type PlanetBuildBuilderRecord = PlanetBuildBuilder & XataRecord;

export type DatabaseSchema = {
  community: CommunityRecord;
  builder: BuilderRecord;
  communityBuilder: CommunityBuilderRecord;
  planetBuild: PlanetBuildRecord;
  planetBuildBuilder: PlanetBuildBuilderRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://AssistantNMS-9tmlv0.eu-central-1.xata.sh/db/nmsud-submission",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
