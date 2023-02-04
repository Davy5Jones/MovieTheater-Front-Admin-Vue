abstract class Config {
  public abstract urls: string;
}

class Development extends Config {
  public urls = "http://localhost:8080/";
}

class Production extends Config {
  public urls =
    "https://raw.githubusercontent.com/KobiShashs/TODO-JSON/main/tasks";
}

const global =
   new Development();
export default global;
