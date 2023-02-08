
import global from "./ConstantService";
import tokenAxios from "./AxiosInterceptor";
import type { LoginModel, RegisterModel } from "@/Models/BaseModels";
import type { ScreeningModelDto, ScreeningRootObject } from "@/Models/ScreeningModel";
import type { MovieModelDao, MovieModelDto, MovieRootObject } from "@/Models/MovieModel";
import type { TicketDto, TicketPage } from "@/Models/TicketModels";
import type { AxiosResponse } from "axios";
import type { CustomerModelDto, UserPage } from "@/Models/UserModels";



class WebApi {
  private baseUrl = global.urls;

  public login(login: LoginModel) {
    return tokenAxios.post<string>(
      "http://localhost:8080/home/login/admin",
      login
    );
  }

  public screeningPage(
    page: number,
    sortBy: string,
    order: string
  ): Promise<AxiosResponse<ScreeningRootObject>> {
    return tokenAxios.get<ScreeningRootObject>(
      "http://localhost:8080/api/admin/screenings",
      { params: { sort: sortBy, page: page, order: order } }
    );
  }
  public screeningPageUrl(
    url: string
  ): Promise<AxiosResponse<ScreeningRootObject>> {
    return tokenAxios.get<ScreeningRootObject>(url);
  }
  public screeningPageByMovieId(
    movieId: string,
    sortBy: string,
    page: number,
    order: string
  ): Promise<AxiosResponse<ScreeningRootObject>> {
    return tokenAxios.get<ScreeningRootObject>(
      "http://localhost:8080/api/admin/screenings/by/movie/" + movieId,
      {
        params: {
          page: page,
          sort: sortBy,
          order: order,
        },
      }
    );
  }
  public screeningPageByMovieIdUrl(
    url: string
  ): Promise<AxiosResponse<ScreeningRootObject>> {
    return tokenAxios.get<ScreeningRootObject>(url);
  }
  public moviePageByUrl(url: string): Promise<AxiosResponse<MovieRootObject>> {
    return tokenAxios.get<MovieRootObject>(
      url || "http://localhost:8080/api/admin/movies"
    );
  }
  public moviePage(
    page: string,
    sortBy: string,
    order: string
  ): Promise<AxiosResponse<MovieRootObject>> {
    return tokenAxios.get<MovieRootObject>(
      "http://localhost:8080/api/admin/movies",
      { params: { sort: sortBy, page: page, order: order } }
    );
  }

  public singleMovie(id: string): Promise<AxiosResponse<MovieModelDto>> {
    return tokenAxios.get<MovieModelDto>(
      "http://localhost:8080/api/admin/movies/" + id
    );
  }
  public activationMovie(
    id: string,
    active: boolean
  ): Promise<AxiosResponse<MovieModelDto>> {
    console.log(id);
    return tokenAxios.put<MovieModelDto>(
      `http://localhost:8080/api/admin/movies/activate`,
      {},

      {
        params: {
          id: id,
          active: active,
        },
      }
    );
  }

  public singleScreening(
    id: string
  ): Promise<AxiosResponse<ScreeningModelDto>> {
    return tokenAxios.get<ScreeningModelDto>(
      "http://localhost:8080/api/admin/screenings/" + id
    );
  }

  public GetTicketsUrl(url: string): Promise<AxiosResponse<TicketPage>> {
    return tokenAxios.get<TicketPage>(
      url || "http://localhost:8080/api/admin/purchases"
    );
  }
  public GetTicketPage(
    page: number,
    sortBy: string,
    order: string
  ): Promise<AxiosResponse<TicketPage>> {
    return tokenAxios.get<TicketPage>(
      "http://localhost:8080/api/admin/purchases",
      { params: { sort: sortBy, page: page, order: order } }
    );
  }
  public GetTicketPageByCustomer(
    page: number,
    sortBy: string,
    order: string,
    customerId: number
  ): Promise<AxiosResponse<TicketPage>> {
    return tokenAxios.get<TicketPage>(
      "http://localhost:8080/api/admin/purchases",
      { params: { sort: sortBy, page: page, order: order, id: customerId } }
    );
  }

  public GetUserPage(
    page: number,
    sortBy: string,
    order: string
  ): Promise<AxiosResponse<UserPage>> {
    return tokenAxios.get<UserPage>(
      "http://localhost:8080/api/admin/customers",
      { params: { sort: sortBy, page: page, order: order } }
    );
  }

  public GetUserPageUrl(url: string): Promise<AxiosResponse<UserPage>> {
    return tokenAxios.get<UserPage>(url);
  }
  public GetSingleUser(
    customerId: number
  ): Promise<AxiosResponse<CustomerModelDto>> {
    return tokenAxios.get<CustomerModelDto>(
      "http://localhost:8080/api/admin/customers/" + customerId
    );
  }
  public SingleTicket(id: string): Promise<AxiosResponse<TicketDto>> {
    return tokenAxios.get<TicketDto>(
      "http://localhost:8080/api/admin/purchases/" + id
    );
  }

  public AddMovie(
    movie:MovieModelDao
  ): Promise<AxiosResponse<MovieModelDto>> {
    return tokenAxios.post<MovieModelDto>(
      "http://localhost:8080/api/admin/movies",
       movie
    );
  }
}


const webApi = new WebApi();
export default webApi;
