/**
 * src/data/index.ts
 * Fungsi: Sebagai "database" sementara berisi data statis (hardcoded).
 * Tujuannya agar kode di UI (komponen) lebih bersih dan data lebih mudah diubah/diupdate.
 */

import { ServiceType, ProjectType } from "../types";

// Isi array ini nanti dengan data layananmu
export const servicesData: ServiceType[] = [];

// Isi array ini nanti dengan data proyek-proyekmu
export const projectsData: ProjectType[] = [];
