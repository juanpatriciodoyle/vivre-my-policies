import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {PolicyData} from './PoliciesSection';
import Text from './Text';
import {appTexts} from '../constants/text';
import {CloseIcon} from './icons/CloseIcon';
import {PrimaryButton, SecondaryButton} from './Button';
import {DocumentIcon} from './icons/DocumentIcon';

type Tab = 'coverage' | 'billing' | 'vehicle';

interface SidePanelProps {
    isOpen: boolean;
    onClose: () => void;
    policy: PolicyData | null;
}

const Overlay = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: ${({$isOpen}) => ($isOpen ? 1 : 0)};
    visibility: ${({$isOpen}) => ($isOpen ? 'visible' : 'hidden')};
    transition: opacity 400ms ease-out, visibility 400ms ease-out;
    z-index: 1000;
`;

const PanelContainer = styled.aside<{ $isOpen: boolean }>`
    box-sizing: border-box;
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 480px;
    height: 100%;
    background-color: ${({theme}) => theme.colors.subtleBackground};
    box-shadow: -2px 0 16px rgba(0, 0, 0, 0.1);
    transform: ${({$isOpen}) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 400ms ease-out;
    z-index: 1001;
    display: flex;
    flex-direction: column;
`;

const PanelHeader = styled.header`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid ${({theme}) => theme.colors.borders};
`;

const CloseButton = styled.button`
    box-sizing: border-box;
    background: none;
    border: none;
    cursor: pointer;
    color: ${({theme}) => theme.colors.textBody};
    padding: 8px;
    margin: -8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 150ms ease;

    &:hover {
        background-color: ${({theme}) => theme.colors.secondaryAction};
    }
`;

const KeyInfoSection = styled.div`
    padding: 24px;
    border-bottom: 1px solid ${({theme}) => theme.colors.borders};
    background-color: ${({theme}) => theme.colors.background};
`;

const TabContainer = styled.nav`
    display: flex;
    border-bottom: 1px solid ${({theme}) => theme.colors.borders};
    padding: 0 24px;
`;

const TabButton = styled.button<{ $isActive: boolean }>`
    box-sizing: border-box;
    padding: 16px 4px;
    margin-right: 24px;
    background: none;
    border: none;
    cursor: pointer;
    font-family: ${({theme}) => theme.font.primary};
    font-size: ${({theme}) => theme.font.sizes.body};
    color: ${({theme}) => theme.colors.textBody};
    font-weight: ${({theme, $isActive}) => ($isActive ? theme.font.weights.semiBold : theme.font.weights.regular)};
    position: relative;

    &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: ${({theme}) => theme.colors.primary};
        transform: ${({$isActive}) => ($isActive ? 'scaleX(1)' : 'scaleX(0)')};
        transition: transform 200ms ease-out;
    }
`;

const PanelContent = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

const ContentSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const ContentList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const ContentListItem = styled.li`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
`;

const DottedLine = styled.div`
    flex-grow: 1;
    border-bottom: 1px dotted ${({theme}) => theme.colors.borders};
    margin: 0 8px;
    transform: translateY(-4px);
`;

const DocumentItem = styled.li`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const PanelFooter = styled.footer`
    box-sizing: border-box;
    padding: 16px 24px;
    border-top: 1px solid ${({theme}) => theme.colors.borders};
    background-color: ${({theme}) => theme.colors.subtleBackground};
    display: flex;
    gap: 12px;
    justify-content: flex-end;
`;

export const DetailsSidePanel = ({isOpen, onClose, policy}: SidePanelProps) => {
    const [activeTab, setActiveTab] = useState<Tab>('coverage');

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            setActiveTab('coverage');
        }
    }, [isOpen]);

    if (!policy) return null;

    const renderTabContent = () => {
        switch (activeTab) {
            case 'coverage':
                return (
                    <ContentSection>
                        <ContentList>
                            {policy.detailedCoverages?.map(cov => (
                                <ContentListItem key={cov.label}>
                                    <Text $variant="body">{cov.label}</Text>
                                    <DottedLine/>
                                    <Text $variant="body" style={{fontWeight: 500}}>{cov.value}</Text>
                                </ContentListItem>
                            ))}
                        </ContentList>
                    </ContentSection>
                );
            case 'billing':
                return (
                    <>
                        <ContentSection>
                            <Text as="h4" $variant="h3">{appTexts.nextPaymentSectionTitle}</Text>
                            <ContentList>
                                <ContentListItem>
                                    <Text $variant="body">{appTexts.paymentAmount}</Text>
                                    <Text $variant="body"
                                          style={{fontWeight: 500}}>{policy.billingInfo.nextPayment.amount}</Text>
                                </ContentListItem>
                                <ContentListItem>
                                    <Text $variant="body">{appTexts.paymentDueDate}</Text>
                                    <Text $variant="body"
                                          style={{fontWeight: 500}}>{policy.billingInfo.nextPayment.dueDate}</Text>
                                </ContentListItem>
                                <ContentListItem>
                                    <Text $variant="body">{appTexts.paymentMethod}</Text>
                                    <Text $variant="body"
                                          style={{fontWeight: 500}}>{policy.billingInfo.nextPayment.paymentMethod}</Text>
                                </ContentListItem>
                            </ContentList>
                        </ContentSection>
                        <ContentSection>
                            <Text as="h4" $variant="h3">{appTexts.paymentHistorySectionTitle}</Text>
                            <ContentList>
                                {policy.billingInfo.paymentHistory.map((item, index) => (
                                    <ContentListItem key={index}>
                                        <Text $variant="body">{item.date}</Text>
                                        <Text $variant="body" style={{fontWeight: 500}}>{item.amount}</Text>
                                    </ContentListItem>
                                ))}
                            </ContentList>
                        </ContentSection>
                        <ContentSection>
                            <Text as="h4" $variant="h3">{appTexts.documentsSectionTitle}</Text>
                            <ContentList>
                                {policy.documents.map((doc, index) => (
                                    <DocumentItem key={index}>
                                        <DocumentIcon/>
                                        <div>
                                            <Text $variant="body" style={{fontWeight: 500}}>{doc.name}</Text>
                                            <Text $variant="caption">{doc.date}</Text>
                                        </div>
                                    </DocumentItem>
                                ))}
                            </ContentList>
                        </ContentSection>
                    </>
                );
            case 'vehicle':
                return (
                    <ContentSection>
                        <ContentList>
                            <ContentListItem>
                                <Text $variant="body">Vehicle</Text>
                                <Text $variant="body"
                                      style={{fontWeight: 500}}>{policy.vehicleInfo.vehicle}</Text>
                            </ContentListItem>
                            <ContentListItem>
                                <Text $variant="body">Year</Text>
                                <Text $variant="body"
                                      style={{fontWeight: 500}}>{policy.vehicleInfo.year}</Text>
                            </ContentListItem>
                            <ContentListItem>
                                <Text $variant="body">Registration No</Text>
                                <Text $variant="body"
                                      style={{fontWeight: 500}}>{policy.vehicleInfo.registrationNo}</Text>
                            </ContentListItem>
                            <ContentListItem>
                                <Text $variant="body">VIN</Text>
                                <Text $variant="body" style={{fontWeight: 500}}>{policy.vehicleInfo.vin}</Text>
                            </ContentListItem>
                            <ContentListItem>
                                <Text $variant="body">Primary Driver</Text>
                                <Text $variant="body"
                                      style={{fontWeight: 500}}>{policy.vehicleInfo.primaryDriver}</Text>
                            </ContentListItem>
                            <ContentListItem>
                                <Text $variant="body">Address</Text>
                                <Text $variant="body" style={{
                                    fontWeight: 500,
                                    textAlign: 'right'
                                }}>{policy.vehicleInfo.address}</Text>
                            </ContentListItem>
                        </ContentList>
                    </ContentSection>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Overlay $isOpen={isOpen} onClick={onClose}/>
            <PanelContainer $isOpen={isOpen}>
                <PanelHeader>
                    <Text as="h2" $variant="h2">{`${policy.title}${appTexts.panelTitleSuffix}`}</Text>
                    <CloseButton onClick={onClose} aria-label="Close details panel">
                        <CloseIcon/>
                    </CloseButton>
                </PanelHeader>

                <KeyInfoSection>
                    <Text as="p" $variant="h3" style={{fontWeight: 600}}>{policy.identifier}</Text>
                    <Text as="p" $variant="caption"
                          style={{marginTop: 4}}>{`${appTexts.policyNumberPrefix}${policy.policyNumber}`}</Text>
                </KeyInfoSection>

                <TabContainer>
                    <TabButton $isActive={activeTab === 'coverage'} onClick={() => setActiveTab('coverage')}>
                        {appTexts.tabCoverage}
                    </TabButton>
                    <TabButton $isActive={activeTab === 'billing'} onClick={() => setActiveTab('billing')}>
                        {appTexts.tabBilling}
                    </TabButton>
                    <TabButton $isActive={activeTab === 'vehicle'} onClick={() => setActiveTab('vehicle')}>
                        {appTexts.tabVehicle}
                    </TabButton>
                </TabContainer>

                <PanelContent>{renderTabContent()}</PanelContent>

                <PanelFooter>
                    <SecondaryButton>{appTexts.downloadIdCardButton}</SecondaryButton>
                    <PrimaryButton>{appTexts.makePaymentButton}</PrimaryButton>
                </PanelFooter>
            </PanelContainer>
        </>
    );
};