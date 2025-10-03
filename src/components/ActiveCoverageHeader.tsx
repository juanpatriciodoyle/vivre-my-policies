import styled from 'styled-components';
import Text from './Text';
import {appTexts} from '../constants/text';
import {CheckmarkIcon} from './icons/CheckmarkIcon';
import {PrimaryButton} from './Button';

const HeaderContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const IconCircle = styled.div`
    box-sizing: border-box;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: ${({theme}) => theme.colors.primaryTint};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
`;

const StyledIcon = styled(CheckmarkIcon)`
    width: 24px;
    height: 24px;
    color: ${({theme}) => theme.colors.primary};
`;

const PrimaryHeading = styled(Text)`
    font-weight: ${({theme}) => theme.font.weights.bold};
    margin-bottom: 8px;
`;

const SupportingText = styled(Text)`
    margin-bottom: 24px;
`;

const PaymentCtaContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 16px;
`;

export const ActiveCoverageHeader = () => {
    return (
        <HeaderContainer>
            <IconCircle>
                <StyledIcon/>
            </IconCircle>
            <PrimaryHeading as="h2" $variant="h2">
                {appTexts.coverageHeading}
            </PrimaryHeading>
            <SupportingText as="p" $variant="body">
                {appTexts.coverageSubheading}
            </SupportingText>
            <PaymentCtaContainer>
                <Text $variant="caption">{appTexts.nextPaymentLabel}</Text>
                <PrimaryButton>{appTexts.makePaymentButton}</PrimaryButton>
            </PaymentCtaContainer>
        </HeaderContainer>
    );
};