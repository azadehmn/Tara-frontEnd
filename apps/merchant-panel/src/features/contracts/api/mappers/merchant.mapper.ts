import type { ContractMerchant, ContractMerchantDto } from '../../model/merchant';

export function mapContractMerchant(dto: ContractMerchantDto): ContractMerchant {
  return {
    id: dto.id,
    title: dto.title,
    branchCode: dto.branchCode,
    accessibleType: dto.accessibleType,
    provinceName: dto.provinceName,
  };
}
