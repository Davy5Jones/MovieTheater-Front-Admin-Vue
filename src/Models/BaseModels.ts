
  export interface PageLinks {
    first: Link;
    prev?: Link;
    self: Link;
    next?: Link;
    last: Link;
  }

   export interface PageInfo {
     size: number;
     totalElements: number;
     totalPages: number;
     number: number;
   }

   export interface LoginModel{
    email: string;
    password: string;
   }

    export interface Link {
      href: string;
    }


   