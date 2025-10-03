import styled from 'styled-components';
import React, {useMemo} from 'react';
import {appTexts} from '../constants/text';
import Text from './Text';
import {PolicyCard, PolicyStatus} from './PolicyCard';
import {CarIcon} from './icons/CarIcon';
import {HealthIcon} from './icons/HealthIcon';
import {PetIcon} from './icons/PetIcon';
import {LifeIcon} from './icons/LifeIcon';
import {PrimaryButton} from './Button';
import {HouseIcon} from './icons/HouseIcon';
import {Product} from '../utils/dx/types';
import {getRelativeDate} from '../utils/dateUtils';

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
    date: Date;
    amount: number;
    status: string;
}

interface Document {
    name: string;
    date: Date;
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
            amount: number;
            dueDate: Date;
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
    propertyInfo?: {
        address: string;
        propertyType: string;
        yearBuilt: string;
        occupancy: string;
        listedStatus: string;
    };
    memberInfo?: {
        name: string;
        membershipNo: string;
        dob: string;
        pcp: string;
    };
    claimsHistory?: {
        date: Date;
        service: string;
        amount: number;
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
    gap: 30px;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
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

const StyledHouseIcon = styled(HouseIcon)`
    color: #4f9a7c;
`;

export const allPolicies: { [key: string]: PolicyData } = {
    auto: {
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
            {label: 'Third-Party Liability', value: '20000000'},
            {label: 'Legal Cover', value: '100000'},
            {label: 'Comprehensive Cover', value: 'Market Value'},
            {label: 'Collision Excess', value: '500'},
            {label: 'Windscreen Excess', value: '100'},
        ],
        billingInfo: {
            nextPayment: {
                amount: 145.50,
                dueDate: getRelativeDate(22),
                paymentMethod: 'Visa ending in 4242',
            },
            paymentHistory: [
                {date: getRelativeDate(-8), amount: 145.50, status: 'Paid'},
                {date: getRelativeDate(-38), amount: 145.50, status: 'Paid'},
                {date: getRelativeDate(-69), amount: 145.50, status: 'Paid'},
            ],
        },
        documents: [
            {name: 'Certificate of Motor Insurance.pdf', date: getRelativeDate(-1)},
            {name: 'Policy Wording - VIV Auto Plus.pdf', date: getRelativeDate(-1)},
            {name: 'No Claims Discount Proof.pdf', date: getRelativeDate(-1)},
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
    health: {
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
            {label: 'Out-patient Limit', value: '2000'},
            {label: 'Therapies Cover', value: 'Full Cover (Physio, Osteo)'},
            {label: 'Annual Excess', value: '250'},
        ],
        memberInfo: {
            name: 'Kate Crestwell',
            membershipNo: 'VIV-944821-01',
            dob: 'August 15, 1988',
            pcp: 'Dr. Eleanor Vance',
        },
        claimsHistory: [
            {date: getRelativeDate(-52), service: 'Physiotherapy Session', amount: 85.00, status: 'Approved & Paid'},
            {
                date: getRelativeDate(-136),
                service: 'Specialist Consultation',
                amount: 250.00,
                status: 'Approved & Paid'
            },
        ],
        billingInfo: {
            nextPayment: {amount: 95.00, dueDate: getRelativeDate(15), paymentMethod: 'Direct Debit'},
            paymentHistory: []
        },
        documents: [],
    },
    pet: {
        icon: <StyledPetIcon/>,
        title: appTexts.petPolicyTitle,
        identifier: 'Buddy (Golden Retriever)',
        policyNumber: 'VIV-PET-APP-73519',
        status: 'warning',
        coverages: [],
        detailedCoverages: [],
        applicationStatus: {
            steps: [
                {name: 'Application Submitted (Oct 3, 2025)', status: 'completed'},
                {name: 'Underwriting Review', status: 'inProgress'},
                {name: 'Policy Decision', status: 'pending'},
                {name: 'Policy Active', status: 'pending'},
            ],
            note: 'Your application is currently with our underwriting team. This typically takes 3-5 working days. We will notify you by email as soon as there is an update.',
        },
        documents: [
            {name: 'Buddy - Vet History Report.pdf', date: getRelativeDate(0)},
            {name: 'Buddy - Microchip Certificate.pdf', date: getRelativeDate(0)},
        ],
        billingInfo: {nextPayment: {amount: 0, dueDate: new Date(), paymentMethod: ''}, paymentHistory: []},
    },
    home: {
        icon: <StyledHouseIcon/>,
        title: appTexts.homePolicyTitle,
        identifier: '10 Downing Street, London',
        policyNumber: 'VIV-HOM-551982',
        status: 'active',
        coverages: [
            {label: 'Buildings Cover', value: '£2,000,000', percentage: 100},
            {label: 'Contents Cover', value: '£150,000', percentage: 75},
            {label: 'Personal Belongings', value: '£10,000', percentage: 50},
        ],
        detailedCoverages: [
            {label: 'Buildings Cover', value: '2000000'},
            {label: 'Contents Cover', value: '150000'},
            {label: 'Personal Belongings', value: '10000'},
            {label: 'Accidental Damage', value: 'Included'},
            {label: 'Legal Expenses', value: '100000'},
            {label: 'Standard Excess', value: '500'},
        ],
        billingInfo: {
            nextPayment: {
                amount: 65.00,
                dueDate: getRelativeDate(29),
                paymentMethod: 'Visa ending in 4242',
            },
            paymentHistory: [
                {date: getRelativeDate(-2), amount: 65.00, status: 'Paid'},
                {date: getRelativeDate(-32), amount: 65.00, status: 'Paid'},
                {date: getRelativeDate(-63), amount: 65.00, status: 'Paid'},
            ],
        },
        documents: [
            {name: 'Home Insurance Policy Schedule.pdf', date: getRelativeDate(-2)},
            {name: 'Insurance Product Information Document (IPID).pdf', date: getRelativeDate(-2)},
            {name: 'Policy Wording - Vivre Home Plus.pdf', date: getRelativeDate(-2)},
        ],
        propertyInfo: {
            address: '10 Downing Street, London, SW1A 2AA, United Kingdom',
            propertyType: 'Terraced House',
            yearBuilt: 'c. 1735',
            occupancy: 'Primary Residence',
            listedStatus: 'Grade I',
        },
    }
}

interface PoliciesSectionProps {
    onViewDetails: (policy: PolicyData) => void;
    product: Product;
}

export const PoliciesSection = ({onViewDetails, product}: PoliciesSectionProps) => {
    const policiesToDisplay = useMemo(() => {
        if (product === 'Health') {
            return [allPolicies.health, allPolicies.home, allPolicies.pet];
        }
        return [allPolicies.auto, allPolicies.health, allPolicies.pet];
    }, [product]);

    return (
        <SectionContainer>
            <SectionTitle as="h2" $variant="h2">
                {appTexts.policiesSectionTitle}
            </SectionTitle>
            <CardsGrid>
                {policiesToDisplay.map((policy) => (
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