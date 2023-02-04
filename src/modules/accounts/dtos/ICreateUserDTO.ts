interface ICreateUserDTO {
  id?:string;
  first_name:string;
  last_name:string;
  password:string;
  email:string;
  driver_license:string;
  avatar?:string;
}

export { ICreateUserDTO }
