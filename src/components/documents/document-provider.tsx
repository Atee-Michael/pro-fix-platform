"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { createMockDocument } from "@/lib/mock-data/document-repository";
import {
  mockDocuments,
  type DocumentMetadata,
  type DocumentMetadataInput
} from "@/lib/mock-data/documents";

type DocumentContextValue = {
  documents: DocumentMetadata[];
  addDocumentMetadata: (input: DocumentMetadataInput) => DocumentMetadata;
};

const DocumentContext = createContext<DocumentContextValue | null>(null);

export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const [documents, setDocuments] = useState<DocumentMetadata[]>(() =>
    mockDocuments.map((document) => ({ ...document }))
  );
  const addDocumentMetadata = useCallback((input: DocumentMetadataInput) => {
    const document = createMockDocument(input);
    setDocuments((current) => [document, ...current]);
    return document;
  }, []);
  const value = useMemo(
    () => ({ documents, addDocumentMetadata }),
    [documents, addDocumentMetadata]
  );
  return (
    <DocumentContext.Provider value={value}>{children}</DocumentContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentContext);
  if (!context) throw new Error("useDocuments must be used within DocumentProvider");
  return context;
}
