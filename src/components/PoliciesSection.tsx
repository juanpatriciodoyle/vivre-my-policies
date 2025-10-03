import styled from 'styled-components';
import React from 'react';
import {appTexts} from '../constants/text';
import Text from './Text';
import {PolicyCard, PolicyStatus} from './PolicyCard';
import {CarIcon} from './icons/CarIcon';
import {HouseIcon} from './icons/HouseIcon';

interface Coverage {
    label: string;
    value: string;
    percentage: number;
}

interface DetailedCoverage {
    label: string;
    value: string;
}

interface Payment {
    date: string;
    amount: string;
    status: string;
}

interface Document {
    name: string;
    date: string;
}

export interface PolicyData {
    icon: React.ReactNode;
    title: string;
    identifier: string;
    policyNumber: string;
    status: PolicyStatus;
    coverages: Coverage[];
    detailedCoverages: DetailedCoverage[];
    billingInfo: {
        nextPayment: {
            amount: string;
            dueDate: string;
            paymentMethod: string;
        };
        paymentHistory: Payment[];
    };
    documents: Document[];
    vehicleInfo: {
        vehicle: string;
        year: string;
        registrationNo: string;
        vin: string;
        primaryDriver: string;
        address: string;
    };
}


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

const policiesData: PolicyData[] = [
    {
        icon: <StyledCarIcon/>,
        title: appTexts.autoPolicyTitle,
        identifier: 'Ford S-Max',
        policyNumber: 'VIV-8374920',
        status: 'active',
        coverages: [
            {label: appTexts.coverageBodilyInjury, value: '£20,000,000 Limit', percentage: 100},
            {label: 'Legal Cover', value: '£100,000 Limit', percentage: 75},
            {label: appTexts.coverageCollision, value: '£500 Excess', percentage: 50},
        ],
        detailedCoverages: [
            {label: 'Third-Party Liability', value: '£20,000,000 Limit'},
            {label: 'Legal Cover', value: '£100,000 Limit'},
            {label: 'Comprehensive Cover', value: 'Market Value'},
            {label: 'Collision Excess', value: '£500'},
            {label: 'Windscreen Excess', value: '£100'},
        ],
        billingInfo: {
            nextPayment: {
                amount: '£145.50',
                dueDate: 'October 25, 2025',
                paymentMethod: 'Visa ending in 4242',
            },
            paymentHistory: [
                {date: 'Sep 25, 2025', amount: '£145.50', status: 'Paid'},
                {date: 'Aug 25, 2025', amount: '£145.50', status: 'Paid'},
                {date: 'Jul 25, 2025', amount: '£145.50', status: 'Paid'},
            ],
        },
        documents: [
            {name: 'Certificate of Motor Insurance.pdf', date: 'Oct 2, 2025'},
            {name: 'Policy Wording - VIV Auto Plus.pdf', date: 'Oct 2, 2025'},
            {name: 'No Claims Discount Proof.pdf', date: 'Oct 2, 2025'},
        ],
        vehicleInfo: {
            vehicle: 'Ford S-Max',
            year: '2023',
            registrationNo: 'KC25 VIV',
            vin: 'WF0SXXGBWSKC12345',
            primaryDriver: 'Kate Crestwell',
            address: '10 Downing Street, London, SW1A 2AA, United Kingdom',
        },
    },
    {
        icon: <StyledHouseIcon/>,
        title: appTexts.homePolicyTitle,
        identifier: appTexts.policyIdentifierHome,
        policyNumber: 'VIV-2938475',
        status: 'warning',
        coverages: [
            {label: 'Dwelling Coverage', value: '$450,000', percentage: 85},
            {label: 'Personal Property', value: '$225,000', percentage: 60},
            {label: 'Liability Coverage', value: '$500,000', percentage: 100},
        ],
        detailedCoverages: [],
        billingInfo: {nextPayment: {amount: '', dueDate: '', paymentMethod: ''}, paymentHistory: []},
        documents: [],
        vehicleInfo: {vehicle: '', year: '', registrationNo: '', vin: '', primaryDriver: '', address: ''}
    },
];

interface PoliciesSectionProps {
    onViewDetails: (policy: PolicyData) => void;
}

export const PoliciesSection = ({onViewDetails}: PoliciesSectionProps) => {
    return (
        <SectionContainer>
            <SectionTitle as="h2" $variant="h2">
                {appTexts.policiesSectionTitle}
            </SectionTitle>
            <CardsGrid>
                {policiesData.map((policy) => (
                    <PolicyCard
                        key={policy.policyNumber}
                        policy={policy}
                        onViewDetails={onViewDetails}
                    />
                ))}
            </CardsGrid>
        </SectionContainer>
    );
};