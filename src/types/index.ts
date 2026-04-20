/**
 * src/types/index.ts
 * Fungsi: Tempat untuk mendefinisikan tipe data (interface/type) TypeScript.
 * Berfungsi untuk memastikan data (seperti project atau service) memiliki struktur/properti yang benar.
 */

export interface ServiceType {
  id: number;
  title: string;
  description: string;
}

export interface ProjectType {
  id: number;
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  imagePlaceholder: string;
}
