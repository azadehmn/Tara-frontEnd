import type { ContractUser, ContractUserDto } from '../../model/user';

export function mapContractUser(dto: ContractUserDto): ContractUser {
  return {
    id: dto.id,
    name: dto.name,
    family: dto.family,
    mobile: dto.mobile,
    nationalCode: dto.nationalCode,
    birthDate: dto.birthDate,
    contractAccountDeactivated: dto.contractAccountDeactivated,
    contractAccountDisabled: dto.contractAccountDisabled,
  };
}
