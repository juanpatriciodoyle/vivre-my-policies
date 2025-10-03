import styled from 'styled-components';
import {useState} from 'react';
import Text from './Text';
import {appTexts} from '../constants/text';
import {CheckmarkIcon} from './icons/CheckmarkIcon';
import {PrimaryButton} from './Button';
import SettingsButton from '../utils/dx/SettingsButton';
import SettingsModal from '../utils/dx/SettingsModal';

const HeaderContainer = styled.section`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-top: 24px;
`;

const SettingsButtonWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
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
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

interface  ActiveCoverageHeaderProps{
    isLocalhost: boolean;
}

export const ActiveCoverageHeader = ({isLocalhost}: ActiveCoverageHeaderProps) => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <HeaderContainer>
            <SettingsButtonWrapper>
                <SettingsButton
                    isLocalhost={isLocalhost}
                    onClick={() => setModalOpen(true)}
                    isActive={isModalOpen}
                />
            </SettingsButtonWrapper>
            <SettingsModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}/>

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
                <PrimaryButton>{appTexts.makePaymentButton}</PrimaryButton>
                <Text $variant="caption">{appTexts.nextPaymentLabel}</Text>
            </PaymentCtaContainer>
        </HeaderContainer>
    );
};