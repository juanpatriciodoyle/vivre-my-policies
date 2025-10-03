import styled from 'styled-components';
import React from 'react';
import {appTexts} from '../constants/text';
import Text from './Text';
import {PolicyCard, PolicyStatus} from './PolicyCard';
import {CarIcon} from './icons/CarIcon';
import {HealthIcon} from './icons/HealthIcon';
import {PetIcon} from './icons/PetIcon';
import {LifeIcon} from './icons/LifeIcon';
import {PrimaryButton} from './Button';

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
    vehicleInfo?: {
        vehicle: string;
        year: string;
        registrationNo: string;
        vin: string;
        primaryDriver: string;
        address: string;
    };
    memberInfo?: {
        name: string;
        membershipNo: string;
        dob: string;
        pcp: string;
    };
    claimsHistory?: {
        date: string;
        service: string;
        amount: string;
        status: string;
    }[];
    applicationStatus?: {
        steps: {
            name: string;
            status: 'completed' | 'inProgress' | 'pending';
        }[],
        note: string;
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

const UpsellCard = styled.a`
    box-sizing: border-box;
    background-color: #FFFFFF;
    padding: 24px;
    border-radius: ${({theme}) => theme.sizing.borderRadius.cards};
    border: 1px dashed ${({theme}) => theme.colors.borders};
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    text-decoration: none;
    color: inherit;
    transition: all 150ms ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
        border-color: ${({theme}) => theme.colors.primary};
    }
`;

const UpsellIconWrapper = styled.div`
    color: ${({theme}) => theme.colors.primary};
    margin-bottom: 16px;
`;

const FullWidthButton = styled(PrimaryButton)`
    width: 100%;
    margin-top: 24px;
`;

const StyledCarIcon = styled(CarIcon)`
    color: #4f9a7c;
`;

const StyledHealthIcon = styled(HealthIcon)`
    color: #4f9a7c;
`;

const StyledPetIcon = styled(PetIcon)`
    color: #4f9a7c;
`;

const StyledLifeIcon = styled(LifeIcon)`
    color: #4f9a7c;
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
        icon: <StyledHealthIcon/>,
        title: appTexts.healthPolicyTitle,
        identifier: 'Kate Crestwell',
        policyNumber: 'VIV-HLT-944821',
        status: 'active',
        coverages: [
            {label: 'Hospital Cover', value: 'Full Cover', percentage: 100},
            {label: 'Out-patient Limit', value: '£2,000 / year', percentage: 80},
            {label: 'Therapies Cover', value: 'Full Cover', percentage: 100},
        ],
        detailedCoverages: [
            {label: 'Plan Type', value: 'Vivre Health Plus - Comprehensive'},
            {label: 'Hospital Cover', value: 'Full Cover for Private & NHS Hospitals'},
            {label: 'Out-patient Limit', value: '£2,000 / year'},
            {label: 'Therapies Cover', value: 'Full Cover (Physio, Osteo)'},
            {label: 'Annual Excess', value: '£250'},
        ],
        memberInfo: {
            name: 'Kate Crestwell',
            membershipNo: 'VIV-944821-01',
            dob: 'August 15, 1988',
            pcp: 'Dr. Eleanor Vance',
        },
        claimsHistory: [
            {date: 'Aug 12, 2025', service: 'Physiotherapy Session', amount: '£85.00', status: 'Approved & Paid'},
            {date: 'May 20, 2025', service: 'Specialist Consultation', amount: '£250.00', status: 'Approved & Paid'},
        ],
        billingInfo: {nextPayment: {amount: '', dueDate: '', paymentMethod: ''}, paymentHistory: []},
        documents: [],
    },
    {
        icon: <StyledPetIcon/>,
        title: appTexts.petPolicyTitle,
        identifier: 'Buddy (Golden Retriever)',
        policyNumber: 'VIV-PET-APP-73519',
        status: 'warning',
        coverages: [],
        detailedCoverages: [],
        applicationStatus: {
            steps: [
                {name: 'Application Submitted', status: 'completed'},
                {name: 'Underwriting Review', status: 'inProgress'},
                {name: 'Policy Decision', status: 'pending'},
                {name: 'Policy Active', status: 'pending'},
            ],
            note: 'Your application is currently with our underwriting team. This typically takes 3-5 working days. We will notify you by email as soon as there is an update.',
        },
        documents: [
            {name: 'Buddy - Vet History Report.pdf', date: 'Uploaded Oct 3, 2025'},
            {name: 'Buddy - Microchip Certificate.pdf', date: 'Uploaded Oct 3, 2025'},
        ],
        billingInfo: {nextPayment: {amount: '', dueDate: '', paymentMethod: ''}, paymentHistory: []},
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
                <UpsellCard href="/products/life-insurance">
                    <UpsellIconWrapper>
                        <StyledLifeIcon/>
                    </UpsellIconWrapper>
                    <Text as="h3" $variant="h3" style={{marginBottom: 8}}>{appTexts.lifeUpsellTitle}</Text>
                    <Text $variant="body">{appTexts.lifeUpsellBody}</Text>
                    <FullWidthButton>{appTexts.getQuoteButton}</FullWidthButton>
                </UpsellCard>
            </CardsGrid>
        </SectionContainer>
    );
};