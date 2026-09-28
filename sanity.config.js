"use client";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { projectId, dataset, apiVersion } from "./lib/sanity";

export default defineConfig({
  basePath: "/studio",
  name: "ect-department",
  title: "ECT Department Studio",
  projectId,
  dataset,
  apiVersion,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool()],
});
