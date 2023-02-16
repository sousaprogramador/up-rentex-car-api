interface IUserResponseDTO {
  email: string;
  first_name: string;
  last_name: string;
  id: string;
  avatar: string;
  driver_license: string;
  avatar_url(): string;
}

export { IUserResponseDTO };
