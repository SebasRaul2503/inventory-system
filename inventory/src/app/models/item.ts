export interface Item {
    id?: number | null;
    ambiente: string;
    idAmbiente?: number | null;
    descripcion: string;
    idDescripcion?: number | null;
    detalle: string;
    categoria: string;
    idCategoria?: number | null;
    idUgel?: number | null;
    fechaAdquisicion?: string | null;
    precio: number;
    fechaIngreso: string;
    imagen?: string | null;
    estado: string;
}
