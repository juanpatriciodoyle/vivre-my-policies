import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {PolicyData} from './PoliciesSection';
import Text from './Text';
import {appTexts} from '../constants/text';
import {CloseIcon} from './icons/CloseIcon';
import {PrimaryButton, SecondaryButton} from './Button';
import {DocumentIcon} from './icons/DocumentIcon';
import {useSettings} from "../utils/dx/settingsContext";
import {CURRENCY_SYMBOLS} from "../utils/dx/dx-data";
import {formatDate} from "../utils/dateUtils";

type Tab = 'coverage' | 'billing' | 'vehicle' | 'member' | 'claims' | 'status' | 'documents' | 'property';

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
    white-space: nowrap;

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

const StatusTracker = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const StatusStep = styled.li<{ $status: 'completed' | 'inProgress' | 'pending' }>`
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 16px;

    &:last-child {
        padding-bottom: 0;
    }
`;


export const DetailsSidePanel = ({isOpen, onClose, policy}: SidePanelProps) => {
    const [activeTab, setActiveTab] = useState<Tab>('coverage');
    const {settings} = useSettings();
    const currencySymbol = CURRENCY_SYMBOLS[settings.currency];

    const formatCurrency = (value: string | number) => {
        const num = Number(value);
        if (isNaN(num)) return value;
        return `${currencySymbol}${num.toLocaleString('en-GB')}`;
    }

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
            if (policy?.title === appTexts.petPolicyTitle) {
                setActiveTab('status');
            } else {
                setActiveTab('coverage');
            }
        }
    }, [isOpen, policy]);

    if (!policy) return null;

    const getTabsForPolicy = () => {
        switch (policy.title) {
            case appTexts.autoPolicyTitle:
                return [
                    {key: 'coverage', label: appTexts.tabCoverage},
                    {key: 'billing', label: appTexts.tabBilling},
                    {key: 'vehicle', label: appTexts.tabVehicle},
                ];
            case appTexts.healthPolicyTitle:
                return [
                    {key: 'coverage', label: appTexts.tabCoverage},
                    {key: 'member', label: appTexts.tabMember},
                    {key: 'claims', label: appTexts.tabClaims},
                ];
            case appTexts.petPolicyTitle:
                return [
                    {key: 'status', label: appTexts.tabStatus},
                    {key: 'documents', label: appTexts.tabDocuments},
                ];
            case appTexts.homePolicyTitle:
                return [
                    {key: 'coverage', label: appTexts.tabCoverage},
                    {key: 'billing', label: appTexts.tabBilling},
                    {key: 'property', label: appTexts.tabProperty},
                ];
            default:
                return [];
        }
    };

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
                                    <Text $variant="body"
                                          style={{fontWeight: 500}}>{formatCurrency(cov.value)}</Text>
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
                                    <DottedLine/>
                                    <Text $variant="body"
                                          style={{fontWeight: 500}}>{currencySymbol}{policy.billingInfo.nextPayment.amount.toFixed(2)}</Text>
                                </ContentListItem>
                                <ContentListItem>
                                    <Text $variant="body">{appTexts.paymentDueDate}</Text>
                                    <DottedLine/>
                                    <Text $variant="body"
                                          style={{fontWeight: 500}}>{formatDate(policy.billingInfo.nextPayment.dueDate)}</Text>
                                </ContentListItem>
                                <ContentListItem>
                                    <Text $variant="body">{appTexts.paymentMethod}</Text>
                                    <DottedLine/>
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
                                        <Text $variant="body">{formatDate(item.date)}</Text>
                                        <DottedLine/>
                                        <Text $variant="body"
                                              style={{fontWeight: 500}}>{currencySymbol}{item.amount.toFixed(2)}</Text>
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
                                            <Text $variant="caption">{formatDate(doc.date)}</Text>
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
                                <DottedLine/>
                                <Text $variant="body"
                                      style={{fontWeight: 500}}>{policy.vehicleInfo?.vehicle}</Text>
                            </ContentListItem>
                            <ContentListItem>
                                <Text $variant="body">Year</Text>
                                <DottedLine/>
                                <Text $variant="body" style={{fontWeight: 500}}>{policy.vehicleInfo?.year}</Text>
                            </ContentListItem>
                            <ContentListItem>
                                <Text $variant="body">Registration No</Text>
                                <DottedLine/>
                                <Text $variant="body"
                                      style={{fontWeight: 500}}>{policy.vehicleInfo?.registrationNo}</Text>
                            </ContentListItem>
                            <ContentListItem>
                                <Text $variant="body">VIN</Text>
                                <DottedLine/>
                                <Text $variant="body" style={{fontWeight: 500}}>{policy.vehicleInfo?.vin}</Text>
                            </ContentListItem>
                            <ContentListItem>
                                <Text $variant="body">Primary Driver</Text>
                                <DottedLine/>
                                <Text $variant="body"
                                      style={{fontWeight: 500}}>{policy.vehicleInfo?.primaryDriver}</Text>
                            </ContentListItem>
                            <ContentListItem>
                                <Text $variant="body">Address</Text>
                                <DottedLine/>
                                <Text $variant="body" style={{
                                    fontWeight: 500,
                                    textAlign: 'right'
                                }}>{policy.vehicleInfo?.address}</Text>
                            </ContentListItem>
                        </ContentList>
                    </ContentSection>
                );
            case 'property':
                return (
                    <ContentSection>
                        <ContentList>
                            <ContentListItem>
                                <Text $variant="body">Address</Text>
                                <DottedLine/>
                                <Text $variant="body"
                                      style={{
                                          fontWeight: 500,
                                          textAlign: 'right'
                                      }}>{policy.propertyInfo?.address}</Text>
                            </ContentListItem>
                            <ContentListItem>
                                <Text $variant="body">Property Type</Text>
                                <DottedLine/>
                                <Text $variant="body"
                                      style={{fontWeight: 500}}>{policy.propertyInfo?.propertyType}</Text>
                            </ContentListItem>
                            <ContentListItem>
                                <Text $variant="body">Year Built</Text>
                                <DottedLine/>
                                <Text $variant="body"
                                      style={{fontWeight: 500}}>{policy.propertyInfo?.yearBuilt}</Text>
                            </ContentListItem>
                            <ContentListItem>
                                <Text $variant="body">Occupancy</Text>
                                <DottedLine/>
                                <Text $variant="body" style={{fontWeight: 500}}>{policy.propertyInfo?.occupancy}</Text>
                            </ContentListItem>
                            <ContentListItem>
                                <Text $variant="body">Listed Building Status</Text>
                                <DottedLine/>
                                <Text $variant="body"
                                      style={{fontWeight: 500}}>{policy.propertyInfo?.listedStatus}</Text>
                            </ContentListItem>
                        </ContentList>
                    </ContentSection>
                );
            case 'member':
                return (
                    <ContentSection>
                        <ContentList>
                            <ContentListItem>
                                <Text $variant="body">Member Name</Text>
                                <DottedLine/>
                                <Text $variant="body"
                                      style={{fontWeight: 500}}>{policy.memberInfo?.name}</Text>
                            </ContentListItem>
                            <ContentListItem>
                                <Text $variant="body">Membership No</Text>
                                <DottedLine/>
                                <Text $variant="body"
                                      style={{fontWeight: 500}}>{policy.memberInfo?.membershipNo}</Text>
                            </ContentListItem>
                            <ContentListItem>
                                <Text $variant="body">Date of Birth</Text>
                                <DottedLine/>
                                <Text $variant="body" style={{fontWeight: 500}}>{policy.memberInfo?.dob}</Text>
                            </ContentListItem>
                            <ContentListItem>
                                <Text $variant="body">Primary Care Physician</Text>
                                <DottedLine/>
                                <Text $variant="body" style={{fontWeight: 500}}>{policy.memberInfo?.pcp}</Text>
                            </ContentListItem>
                        </ContentList>
                    </ContentSection>
                );
            case 'claims':
                return (
                    <ContentSection>
                        <ContentList>
                            {policy.claimsHistory?.map((claim, index) => (
                                <ContentListItem key={index}>
                                    <div>
                                        <Text $variant="body" style={{fontWeight: 500}}>{claim.service}</Text>
                                        <Text $variant="caption">{formatDate(claim.date)}</Text>
                                    </div>
                                    <Text $variant="body"
                                          style={{fontWeight: 500}}>{currencySymbol}{claim.amount.toFixed(2)}</Text>
                                </ContentListItem>
                            ))}
                        </ContentList>
                    </ContentSection>
                );
            case 'status':
                return (
                    <ContentSection>
                        <StatusTracker>
                            {policy.applicationStatus?.steps.map(step => (
                                <StatusStep key={step.name} $status={step.status}>
                                    <Text>{step.name}</Text>
                                </StatusStep>
                            ))}
                        </StatusTracker>
                        <Text as="p" $variant="caption">{policy.applicationStatus?.note}</Text>
                    </ContentSection>
                );
            case 'documents':
                return (
                    <ContentSection>
                        <ContentList>
                            {policy.documents.map((doc, index) => (
                                <DocumentItem key={index}>
                                    <DocumentIcon/>
                                    <div>
                                        <Text $variant="body" style={{fontWeight: 500}}>{doc.name}</Text>
                                        <Text $variant="caption">{formatDate(doc.date)}</Text>
                                    </div>
                                </DocumentItem>
                            ))}
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
                    <Text as="h2"
                          $variant="h2">{`${policy.title}${appTexts.panelTitleSuffix}`}</Text>
                    <CloseButton onClick={onClose} aria-label="Close details panel">
                        <CloseIcon/>
                    </CloseButton>
                </PanelHeader>

                <KeyInfoSection>
                    <Text as="p" $variant="h3" style={{fontWeight: 600}}>{policy.identifier}</Text>
                    <Text as="p" $variant="caption"
                          style={{marginTop: 4}}>{`${policy.status === 'warning' ? appTexts.applicationNumberPrefix : appTexts.policyNumberPrefix}${policy.policyNumber}`}</Text>
                </KeyInfoSection>

                <TabContainer>
                    {getTabsForPolicy().map(tab => (
                        <TabButton
                            key={tab.key}
                            $isActive={activeTab === tab.key}
                            onClick={() => setActiveTab(tab.key as Tab)}
                        >
                            {tab.label}
                        </TabButton>
                    ))}
                </TabContainer>

                <PanelContent>{renderTabContent()}</PanelContent>

                <PanelFooter>
                    {policy.title === appTexts.petPolicyTitle ? (
                        <PrimaryButton>{appTexts.uploadDocumentsButton}</PrimaryButton>
                    ) : (
                        <>
                            <SecondaryButton>{appTexts.downloadIdCardButton}</SecondaryButton>
                            <PrimaryButton>{appTexts.makePaymentButton}</PrimaryButton>
                        </>
                    )}
                </PanelFooter>
            </PanelContainer>
        </>
    );
};