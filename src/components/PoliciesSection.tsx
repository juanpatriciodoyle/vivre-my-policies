import styled from 'styled-components';
import {appTexts} from '../constants/text';
import Text from './Text';
import {Coverage, PolicyCard} from './PolicyCard';
import {CarIcon} from './icons/CarIcon';
import {HouseIcon} from './icons/HouseIcon';

const SectionContainer = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const SectionTitle = styled(Text)`
    align-self: flex-start;
    margin-bottom: 20px;
`;

const CardsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const StyledCarIcon = styled(CarIcon)`
    color: ${({theme}) => theme.colors.primary};
`;

const StyledHouseIcon = styled(HouseIcon)`
    color: ${({theme}) => theme.colors.primary};
`;

const autoCoverages: Coverage[] = [
    {label: appTexts.coverageBodilyInjury, value: '$100,000 / $300,000 Limit', percentage: 75},
    {label: appTexts.coveragePropertyDamage, value: '$50,000 Limit', percentage: 50},
    {label: appTexts.coverageCollision, value: '$500 Deductible', percentage: 90},
];

const homeCoverages: Coverage[] = [
    {label: 'Dwelling Coverage', value: '$450,000', percentage: 85},
    {label: 'Personal Property', value: '$225,000', percentage: 60},
    {label: 'Liability Coverage', value: '$500,000', percentage: 100},
];

const policiesData = [
    {
        icon: <StyledCarIcon/>,
        title: appTexts.autoPolicyTitle,
        identifier: appTexts.policyIdentifierAuto,
        policyNumber: 'VIV-8374920',
        status: 'active' as const,
        coverages: autoCoverages,
    },
    {
        icon: <StyledHouseIcon/>,
        title: appTexts.homePolicyTitle,
        identifier: appTexts.policyIdentifierHome,
        policyNumber: 'VIV-2938475',
        status: 'warning' as const,
        coverages: homeCoverages,
    },
];

export const PoliciesSection = () => {
    return (
        <SectionContainer>
            <SectionTitle as="h2" $variant="h2">
                {appTexts.policiesSectionTitle}
            </SectionTitle>
            <CardsGrid>
                {policiesData.map((policy, index) => (
                    <PolicyCard
                        key={policy.policyNumber}
                        icon={policy.icon}
                        title={policy.title}
                        identifier={policy.identifier}
                        policyNumber={policy.policyNumber}
                        status={policy.status}
                        coverages={policy.coverages}
                        animationDelay={index * 100}
                    />
                ))}
            </CardsGrid>
        </SectionContainer>
    );
};