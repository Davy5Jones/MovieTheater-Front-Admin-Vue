import type {Link, PageInfo, PageLinks} from "./BaseModels";
  export interface MovieLinks {
    self: Link;

    screenings: Link;
  }
    export interface RecommendedMovieList {
      _embedded: MovieList;
    }

  export interface MovieModelDto {
    id: string;
    name: string;
    description: string;
    duration: number;
    genre: string;
    rating: number;
    img: string;
    trailer: string;
    active: boolean;
    _links: MovieLinks;
  }
    export interface MovieModelDao {
      name: string;
      description: string;
      duration: number;
      genre: string;
      rating: number;
      img: string;
      trailer: string;
    }
  export interface MovieList {
    movieModelDtoList: MovieModelDto[];
  }
  export interface MovieRootObject {
    _embedded: MovieList;
    _links: PageLinks;
    page: PageInfo;
  }
  export enum MovieGenre {
    ACTION = "ACTION",
    COMEDY = "COMEDY",
    THRILLER = "THRILLER",
    HORROR = "HORROR",
    ROMANCE = "ROMANCE",
    FICTION = "FICTION"
  }


