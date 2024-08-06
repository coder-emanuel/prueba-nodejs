  
  // Interface for Permissions entity
 export interface Permissions {
    id: number;
    roleId: number;
    entityId: number;
    canCreate: boolean;
    canUpdate: boolean;
    canDelete: boolean;
    canGet: boolean;
  }
  