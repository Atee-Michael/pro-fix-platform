export const allowedDocumentExtensions = [".pdf", ".jpg", ".jpeg", ".png"] as const;
export const allowedDocumentMimeTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png"
] as const;
export const blockedExecutableExtensions = [
  ".exe",
  ".msi",
  ".bat",
  ".cmd",
  ".com",
  ".scr",
  ".ps1",
  ".sh",
  ".js"
] as const;
export const futureMaximumDocumentSizeBytes = 10 * 1024 * 1024;

export const documentCategories = [
  "diagnosticReport",
  "inspectionReport",
  "serviceReport",
  "receipt",
  "invoice"
] as const;

export type DocumentCategory = (typeof documentCategories)[number];

export type DocumentMetadata = {
  id: string;
  customerId: string;
  vehicleId: string;
  appointmentId: string;
  category: DocumentCategory;
  title: string;
  notes: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  createdAt: string;
  available: boolean;
};

export type DocumentMetadataInput = Omit<
  DocumentMetadata,
  "id" | "createdAt" | "available"
>;

export const mockDocuments: DocumentMetadata[] = [
  {
    id: "document-501",
    customerId: "customer-001",
    vehicleId: "vehicle-001",
    appointmentId: "appointment-101",
    category: "diagnosticReport",
    title: "Drivetrain diagnostic report",
    notes: "Customer copy of initial diagnostic findings.",
    fileName: "diagnostic-report-pf21-bmw.pdf",
    mimeType: "application/pdf",
    sizeBytes: 842300,
    createdAt: "2026-07-22T15:10:00.000Z",
    available: true
  },
  {
    id: "document-502",
    customerId: "customer-001",
    vehicleId: "vehicle-002",
    appointmentId: "appointment-099",
    category: "serviceReport",
    title: "Annual service summary",
    notes: "",
    fileName: "service-summary-pf19-mini.pdf",
    mimeType: "application/pdf",
    sizeBytes: 615200,
    createdAt: "2026-06-10T15:00:00.000Z",
    available: false
  },
  {
    id: "document-503",
    customerId: "customer-001",
    vehicleId: "vehicle-001",
    appointmentId: "appointment-099",
    category: "receipt",
    title: "Annual service receipt",
    notes: "Mock receipt metadata.",
    fileName: "receipt-pf-2026-041.pdf",
    mimeType: "application/pdf",
    sizeBytes: 184500,
    createdAt: "2026-06-10T15:10:00.000Z",
    available: true
  },
  {
    id: "document-504",
    customerId: "customer-001",
    vehicleId: "vehicle-002",
    appointmentId: "appointment-098",
    category: "invoice",
    title: "Air-conditioning invoice",
    notes: "",
    fileName: "invoice-pf-2026-030.pdf",
    mimeType: "application/pdf",
    sizeBytes: 202400,
    createdAt: "2026-05-15T16:00:00.000Z",
    available: true
  }
];
