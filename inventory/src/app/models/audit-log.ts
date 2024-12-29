export interface AuditLog {
    idMovimiento?: number | null;
    descripcionItem?: string | null;
    idItem?: number | null;
    usuario: string;
    idUsuario?: number | null;
    fechaMovimiento: string;            
    detalleMovimiento: string;
}
