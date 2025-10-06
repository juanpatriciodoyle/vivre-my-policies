import styled from 'styled-components';
import {useState} from 'react';
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

interface ActiveCoverageHeaderProps {
    isLocalhost: boolean;
}

export const ActiveCoverageHeader = ({
                                         isLocalhost,
                                     }: ActiveCoverageHeaderProps) => {
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
        </HeaderContainer>
    );
};