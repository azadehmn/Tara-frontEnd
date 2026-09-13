export interface ContractUserDto {
  id: number;
  name: string;
  family: string;
  mobile: string;
  nationalCode: string;
  birthDate: string;
  orgProfileInfo: string;
  nationality: string;
  createdOn: string;
  profileDeactivated: boolean;
  profileDisabled: boolean;
  contractAccountDeactivated: boolean;
  contractAccountDisabled: boolean;
}

export interface ContractUser {
  id: number;
  name: string;
  family: string;
  mobile: string;
  nationalCode: string;
  birthDate: string;
  contractAccountDeactivated: boolean;
  contractAccountDisabled: boolean;
}
