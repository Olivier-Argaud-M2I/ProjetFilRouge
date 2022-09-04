import { Privilege } from "./model/Privilege";
import { Role } from "./model/Role";
import { RoleService } from "./service/role.service";


export class Constante  {

    public static API_URL = "http://localhost:8080/smartplanner/api";

    public static ROLES:Role[]=[];

    public static PRIVILEGES:Privilege[]=[];

}