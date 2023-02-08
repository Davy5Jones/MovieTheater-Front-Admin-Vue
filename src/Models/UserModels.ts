import type { Link, PageInfo, PageLinks } from "./BaseModels";



export interface Links {
  self: Link;
}

  export interface CustomerModelDto {
    id: number;
    emailAddress: string;
    customerName: string;
    registered: Date;
    lastSeen: Date;
    purchases:number;
    _links: Links;
  }

export interface Embedded {
  customerModelDtoList: CustomerModelDto[];
}



export interface UserPage {
  _embedded: Embedded;
  _links: PageLinks;
  page: PageInfo;
}
