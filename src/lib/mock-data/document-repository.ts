import type {
  DocumentMetadata,
  DocumentMetadataInput
} from "@/lib/mock-data/documents";

export function createMockDocument(
  input: DocumentMetadataInput
): DocumentMetadata {
  return {
    ...input,
    id: `document-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    available: false
  };
}
